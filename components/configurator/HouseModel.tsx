"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Color, Mesh, MeshStandardMaterial, Material, Object3D } from "three";
import type { RoofConfiguration, RoofMaterialType, RoofShape } from "@/lib/types";

const MODEL_PATH = "/models/house.glb";

const ROOF_MATERIALS = {
  corrugated: { roughness: 0.5, metalness: 0.24, emissiveIntensity: 0.08 },
  metal_tile: { roughness: 0.46, metalness: 0.3, emissiveIntensity: 0.08 },
  standing_seam: { roughness: 0.34, metalness: 0.42, emissiveIntensity: 0.08 },
} satisfies Record<
  RoofMaterialType,
  { roughness: number; metalness: number; emissiveIntensity: number }
>;

const SHAPE_ROOF_OBJECTS = {
  default: {
    metal_tile: ["Roof_Metal"],
    corrugated: ["Roof_Profnastil"],
    standing_seam: ["Roof_Falcev"],
  },
  hip: {
    metal_tile: ["Roof_Valm_Metal"],
    corrugated: ["Roof_Valm_Prof"],
    standing_seam: ["Roof_Valm_Falc"],
  },
} satisfies Record<"default" | "hip", Record<RoofMaterialType, string[]>>;

const ROOF_BASE_OBJECTS = ["Roof_Base"];

const ALL_ROOF_OBJECT_NAMES = [
  ...Object.values(SHAPE_ROOF_OBJECTS.default).flat(),
  ...Object.values(SHAPE_ROOF_OBJECTS.hip).flat(),
];

function findObjects(scene: Object3D, names: string[]) {
  const result: Object3D[] = [];

  scene.traverse((child) => {
    const childName = child.name.toLowerCase();

    if (names.some((name) => childName.includes(name.toLowerCase()))) {
      result.push(child);
    }
  });

  return result;
}

function getRoofObjectNames(roofShape: RoofShape, materialType: RoofMaterialType) {
  const shapeKey = roofShape === "hip" ? "hip" : "default";
  return SHAPE_ROOF_OBJECTS[shapeKey][materialType];
}

function setVisible(objects: Object3D[], visible: boolean) {
  objects.forEach((obj) => {
    obj.visible = visible;

    obj.traverse((child) => {
      child.visible = visible;
    });
  });
}

function setShadows(scene: Object3D) {
  scene.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    child.castShadow = true;
    child.receiveShadow = true;
  });
}

export function HouseModel({ configuration }: { configuration: RoofConfiguration }) {
  const { scene } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const roofMaterialConfig = ROOF_MATERIALS[configuration.materialType];

  useEffect(() => {
    setShadows(clonedScene);

    const roofBaseObjects = findObjects(clonedScene, ROOF_BASE_OBJECTS);
    setVisible(roofBaseObjects, true);

    const allRoofObjects = findObjects(clonedScene, ALL_ROOF_OBJECT_NAMES);
    setVisible(allRoofObjects, false);

    const activeRoof = findObjects(
      clonedScene,
      getRoofObjectNames(configuration.roofShape, configuration.materialType)
    );

    setVisible(activeRoof, true);

    activeRoof.forEach((object) => {
      object.traverse((child) => {
        if (!(child instanceof Mesh)) return;

        child.material = prepareRoofMaterial(
          child.material,
          configuration.color.hex,
          roofMaterialConfig.roughness,
          roofMaterialConfig.metalness,
          roofMaterialConfig.emissiveIntensity,
          configuration.materialType
        );
      });
    });
  }, [
    clonedScene,
    configuration.roofShape,
    configuration.materialType,
    configuration.color.hex,
    roofMaterialConfig.roughness,
    roofMaterialConfig.metalness,
    roofMaterialConfig.emissiveIntensity,
  ]);

  return (
    <group rotation={[0, -Math.PI / 3.6, 0]} position={[0, -0.55, 0]}>
      <primitive object={clonedScene} scale={0.42} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

function prepareRoofMaterial(
  material: Mesh["material"],
  colorHex: string,
  roughness: number,
  metalness: number,
  emissiveIntensity: number,
  materialType: RoofMaterialType
): Material | Material[] {
  const apply = (source: Material) => {
    if (!(source instanceof MeshStandardMaterial)) {
      const mat = new MeshStandardMaterial();

      mat.color.set(colorHex);
      mat.emissive.set(new Color(colorHex)).multiplyScalar(emissiveIntensity);
      mat.roughness = roughness;
      mat.metalness = metalness;
      mat.needsUpdate = true;

      return mat;
    }

    const next = source.clone();
    const isStandingSeam = materialType === "standing_seam";

    if (isStandingSeam) {
      next.map = source.map;
      next.normalMap = source.normalMap;
      next.bumpMap = source.bumpMap;
      next.roughnessMap = source.roughnessMap;
      next.metalnessMap = source.metalnessMap;

      next.color.set(colorHex);
      next.emissive.set(new Color(colorHex)).multiplyScalar(0.12);

      next.roughness = 0.38;
      next.metalness = 0.3;
      next.envMapIntensity = 1.6;

      if (next.normalScale) {
        next.normalScale.set(3.5, 3.5);
      }

      next.bumpScale = 0.35;
    } else {
      next.map = null;
      next.normalMap = source.normalMap;
      next.bumpMap = source.bumpMap;
      next.roughnessMap = source.roughnessMap;
      next.metalnessMap = source.metalnessMap;

      next.color.set(colorHex);
      next.emissive.set(new Color(colorHex)).multiplyScalar(emissiveIntensity);

      next.roughness = roughness;
      next.metalness = metalness;
      next.envMapIntensity = 1.15;
    }

    next.toneMapped = true;
    next.needsUpdate = true;

    return next;
  };

  if (Array.isArray(material)) {
    return material.map(apply);
  }

  return apply(material);
}