"use client";

import { useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { Color, Mesh, MeshStandardMaterial, Material } from "three";
import type { RoofConfiguration, RoofMaterialType } from "@/lib/types";

const MODEL_PATH = "/models/house.glb";

const ROOF_MATERIALS = {
  corrugated: { roughness: 0.72, metalness: 0.22 },
  metal_tile: { roughness: 0.58, metalness: 0.34 },
  standing_seam: { roughness: 0.42, metalness: 0.38 },
} satisfies Record<RoofMaterialType, { roughness: number; metalness: number }>;

export function HouseModel({ configuration }: { configuration: RoofConfiguration }) {
  const { scene } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const roofMaterialConfig = ROOF_MATERIALS[configuration.materialType];
  const [isCompact, setIsCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compactQuery = window.matchMedia("(max-width: 1080px)");
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateLayoutFlags = () => {
      setIsCompact(compactQuery.matches);
      setIsMobile(mediaQuery.matches);
    };

    updateLayoutFlags();
    compactQuery.addEventListener("change", updateLayoutFlags);
    mediaQuery.addEventListener("change", updateLayoutFlags);

    return () => {
      compactQuery.removeEventListener("change", updateLayoutFlags);
      mediaQuery.removeEventListener("change", updateLayoutFlags);
    };
  }, []);

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (isRoofMesh(child)) {
        child.material = prepareRoofMaterial(
          child.material,
          configuration.color.hex,
          roofMaterialConfig.roughness,
          roofMaterialConfig.metalness
        );
      }
    });
  }, [
    clonedScene,
    configuration.color.hex,
    roofMaterialConfig.roughness,
    roofMaterialConfig.metalness,
  ]);

  return (
    <group
      rotation={[0, -Math.PI / 3.6, 0]}
      position={isMobile ? [0, -2.38, 0] : isCompact ? [0, -1.05, 0] : [0, -0.55, 0]}
    >
      <primitive object={clonedScene} scale={isMobile ? 0.62 : isCompact ? 0.52 : 0.42} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

function isRoofMesh(mesh: Mesh) {
  const meshName = (mesh.name || "").toLowerCase();

  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  const materialNames = materials.map((mat) => (mat?.name || "").toLowerCase());

  return (
    meshName.includes("roof") ||
    materialNames.some(
      (name) =>
        name === "roof_material" ||
        name.includes("roof_material") ||
        name.includes("roof")
    )
  );
}

function prepareRoofMaterial(
  material: Mesh["material"],
  colorHex: string,
  roughness: number,
  metalness: number
): Material | Material[] {
  const applyMaterial = (source: Material) => {
    if (!(source instanceof MeshStandardMaterial)) {
      const fallback = new MeshStandardMaterial();
      fallback.color.set(colorHex);
      fallback.emissive.set(colorHex).multiplyScalar(0.12);
      fallback.roughness = roughness;
      fallback.metalness = metalness;
      fallback.needsUpdate = true;
      return fallback;
    }

    const next = source.clone();
    next.name = source.name;
    next.color.set(colorHex);
    next.emissive.set(colorHex).multiplyScalar(0.12);
    next.roughness = roughness;
    next.metalness = metalness;
    next.needsUpdate = true;
    return next;
  };

  if (Array.isArray(material)) {
    return material.map((item) => applyMaterial(item));
  }

  return applyMaterial(material);
}
