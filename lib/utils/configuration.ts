import { COLOR_OPTIONS, DEFAULT_CONFIGURATION, MATERIAL_OPTIONS, ROOF_SHAPE_OPTIONS } from "@/data/configurator";
import type { ColorValue, RoofConfiguration, RoofMaterialType, RoofShape } from "@/lib/types";

export function normalizeConfiguration(value: unknown): RoofConfiguration {
  if (!value || typeof value !== "object") {
    return DEFAULT_CONFIGURATION;
  }

  const candidate = value as Partial<RoofConfiguration> & {
    roofShape?: RoofShape;
    materialType?: RoofMaterialType;
    color?: { value?: ColorValue };
  };

  const roofShape =
    ROOF_SHAPE_OPTIONS.find((option) => option.value === candidate.roofShape)?.value ??
    DEFAULT_CONFIGURATION.roofShape;
  const materialType =
    MATERIAL_OPTIONS.find((option) => option.value === candidate.materialType)?.value ??
    DEFAULT_CONFIGURATION.materialType;
  const color =
    COLOR_OPTIONS.find((option) => option.value === candidate.color?.value) ??
    DEFAULT_CONFIGURATION.color;

  return {
    roofShape,
    materialType,
    color,
  };
}

export function buildConfigurationSearch(configuration: RoofConfiguration) {
  const params = new URLSearchParams();
  params.set("shape", configuration.roofShape);
  params.set("material", configuration.materialType);
  params.set("color", configuration.color.value);
  return params.toString();
}

export function readConfigurationFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const roofShape = params.get("shape");
  const materialType = params.get("material");
  const color = params.get("color");

  if (!roofShape && !materialType && !color) {
    return null;
  }

  return normalizeConfiguration({
    roofShape,
    materialType,
    color: { value: color },
  });
}
