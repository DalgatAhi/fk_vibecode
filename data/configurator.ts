import type { ColorOption, MaterialOption, RoofConfiguration, RoofShapeOption } from "@/lib/types";

export const HOUSE_MODELS = {
  default: "/models/house.glb",
  gable: "/models/house2.glb",
  hip: "/models/house3.glb",
} as const;

export type HouseModelKey = keyof typeof HOUSE_MODELS;

export const COLOR_OPTIONS: ColorOption[] = [
  { value: "graphite", label: "Графит", hex: "#4b4f57", accent: "#35373d" },
  { value: "brown", label: "Коричневый", hex: "#6d4937", accent: "#503427" },
  { value: "red", label: "Красный", hex: "#b53f36", accent: "#8c2a22" },
  { value: "green", label: "Зеленый", hex: "#476750", accent: "#2f4836" },
  { value: "gray", label: "Серый", hex: "#8f9398", accent: "#6b7075" },
  { value: "blue", label: "Синий", hex: "#355f8d", accent: "#254463" },
  { value: "black", label: "Черный", hex: "#252525", accent: "#111111" },
];

export const ROOF_SHAPE_OPTIONS: RoofShapeOption[] = [
  {
    value: "gable",
    label: "Двускатная",
    description: "Классическая симметричная крыша с двумя скатами.",
  },
  {
    value: "single_slope",
    label: "Вальмовая",
    description: "Минималистичная форма с одним направленным уклоном.",
  },
  {
    value: "hip",
    label: "Четырёхскатная",
    description: "Четырёхскатная конструкция для домов сложной формы.",
  },
  {
    value: "tent",
    label: "Шатровая",
    description: "Пирамидальная схема для компактных построек.",
  },
];

export const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    value: "corrugated",
    label: "Профнастил",
    description: "Жёсткий лист с выраженной диагональной фактурой.",
  },
  {
    value: "metal_tile",
    label: "Металлочерепица",
    description: "Ритмичный профиль с более декоративным рисунком.",
  },
  {
    value: "standing_seam",
    label: "Фальцнастил",
    description: "Сдержанная поверхность с вертикальными швами.",
  },
];

export const DEFAULT_CONFIGURATION: RoofConfiguration = {
  roofShape: "gable",
  materialType: "metal_tile",
  color: COLOR_OPTIONS[0],
};

export const DEFAULT_REQUEST_FORM = {
  name: "",
  phone: "",
  email: "",
};
