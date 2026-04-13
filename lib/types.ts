export type RoofShape = "gable" | "single_slope" | "hip" | "tent";

export type RoofMaterialType = "corrugated" | "metal_tile" | "standing_seam";

export type ColorValue =
  | "graphite"
  | "brown"
  | "red"
  | "green"
  | "gray"
  | "blue"
  | "black";

export type ColorOption = {
  value: ColorValue;
  label: string;
  hex: string;
  accent: string;
};

export type RoofConfiguration = {
  roofShape: RoofShape;
  materialType: RoofMaterialType;
  color: ColorOption;
};

export type RoofShapeOption = {
  value: RoofShape;
  label: string;
  description: string;
};

export type MaterialOption = {
  value: RoofMaterialType;
  label: string;
  description: string;
};

export type RequestFormState = {
  name: string;
  phone: string;
  email: string;
};
