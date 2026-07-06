"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Color, Mesh, MeshStandardMaterial, Material, Object3D } from "three";
import type { RoofConfiguration, RoofMaterialType, RoofShape } from "@/lib/types";
import { HOUSE_MODELS } from "@/data/configurator";

const LOCKED_MESH_NAMES = ["podstav"];

const ROOF_MATERIALS = {
  corrugated: { roughness: 0.5, metalness: 0.24, emissiveIntensity: 0.08 },
  metal_tile: { roughness: 0.46, metalness: 0.3, emissiveIntensity: 0.08 },
  standing_seam: { roughness: 0.34, metalness: 0.42, emissiveIntensity: 0.08 },
} satisfies Record<
  RoofMaterialType,
  { roughness: number; metalness: number; emissiveIntensity: number }
>;

// house.glb — объекты крыши по форме и материалу
const HOUSE1_SHAPE_OBJECTS = {
  default: {
    metal_tile: ["Roof_Metal"],
    corrugated: ["Roof_Profnastil"],
    standing_seam: ["Roof_Falcev"],
  },
  hip: {
    metal_tile: ["Roof_Valm_Metal2"],
    corrugated: ["Roof_Valm_Prof"],
    standing_seam: ["Roof_Valm_Falc"],
  },
} satisfies Record<"default" | "hip", Record<RoofMaterialType, string[]>>;

// house2.glb — объекты крыши по материалу (только двускатная форма)
const HOUSE2_MATERIAL_OBJECTS = {
  metal_tile: ["Roof_2skat_Metall"],
  corrugated: ["Roof_2skat_Profnastil"],
  standing_seam: ["Roof_2skat_Falcnastil"],
} satisfies Record<RoofMaterialType, string[]>;

// house3.glb — объекты крыши по материалу (вальмовая форма)
const HOUSE3_MATERIAL_OBJECTS = {
  metal_tile: ["roof_main_metal"],
  corrugated: ["roof_main_profnastil"],
  standing_seam: ["roof_main_falcnastil"],
} satisfies Record<RoofMaterialType, string[]>;

type ModelConfig = {
  allRoofObjects: string[];
  baseObjects: string[];
  getRoofObjectNames: (roofShape: RoofShape, materialType: RoofMaterialType) => string[];
};

const MODEL_CONFIGS: Record<string, ModelConfig> = {
  [HOUSE_MODELS.default]: {
    allRoofObjects: [
      ...Object.values(HOUSE1_SHAPE_OBJECTS.default).flat(),
      ...Object.values(HOUSE1_SHAPE_OBJECTS.hip).flat(),
    ],
    baseObjects: ["Roof_Base"],
    getRoofObjectNames: (roofShape, materialType) => {
      const shapeKey = roofShape === "hip" ? "hip" : "default";
      return HOUSE1_SHAPE_OBJECTS[shapeKey][materialType];
    },
  },
  [HOUSE_MODELS.gable]: {
    allRoofObjects: Object.values(HOUSE2_MATERIAL_OBJECTS).flat(),
    baseObjects: ["Roof_2skat_Base"],
    getRoofObjectNames: (_roofShape, materialType) => HOUSE2_MATERIAL_OBJECTS[materialType],
  },
  [HOUSE_MODELS.hip]: {
    allRoofObjects: Object.values(HOUSE3_MATERIAL_OBJECTS).flat(),
    baseObjects: [],
    getRoofObjectNames: (_roofShape, materialType) => HOUSE3_MATERIAL_OBJECTS[materialType],
  },
};

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

export function HouseModel({
  configuration,
  modelPath,
}: {
  configuration: RoofConfiguration;
  modelPath: string;
}) {
  const { scene } = useGLTF(modelPath);
  const clonedScene = useMemo(() => scene.clone(true), [scene]);
  const roofMaterialConfig = ROOF_MATERIALS[configuration.materialType];
  const modelConfig = MODEL_CONFIGS[modelPath] ?? MODEL_CONFIGS[HOUSE_MODELS.default];

  useEffect(() => {
    setShadows(clonedScene);

    // Сохраняем оригинальные материалы заблокированных объектов до любых изменений
    const savedLockedMaterials = new Map<Mesh, Material | Material[]>();
    findObjects(clonedScene, LOCKED_MESH_NAMES).forEach((obj) => {
      obj.traverse((child) => {
        if (child instanceof Mesh) savedLockedMaterials.set(child, child.material);
      });
    });

    if (modelConfig.baseObjects.length > 0) {
      const baseObjects = findObjects(clonedScene, modelConfig.baseObjects);
      setVisible(baseObjects, true);
    }

    const allRoofObjects = findObjects(clonedScene, modelConfig.allRoofObjects);
    setVisible(allRoofObjects, false);

    const activeRoofNames = modelConfig.getRoofObjectNames(
      configuration.roofShape,
      configuration.materialType
    );
    const activeRoof = findObjects(clonedScene, activeRoofNames);
    setVisible(activeRoof, true);

    activeRoof.forEach((object) => {
      object.traverse((child) => {
        if (!(child instanceof Mesh)) return;

        const childNameLower = child.name.toLowerCase();
        if (LOCKED_MESH_NAMES.some((locked) => childNameLower.includes(locked))) return;

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

    // Восстанавливаем оригинальные материалы заблокированных объектов
    savedLockedMaterials.forEach((material, mesh) => {
      mesh.material = material;
    });
  }, [
    clonedScene,
    modelConfig,
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

// Preload только самой лёгкой модели (26 MB).
// house2.glb (61 MB) и house3.glb (32 MB) загружаются по требованию,
// иначе на мобильных одновременно качается ~119 MB и WebGL падает по памяти.
useGLTF.preload(HOUSE_MODELS.default);

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
