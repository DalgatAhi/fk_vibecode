import { z } from "zod";
import { COLOR_OPTIONS, MATERIAL_OPTIONS, ROOF_SHAPE_OPTIONS } from "@/data/configurator";

const colorValues = COLOR_OPTIONS.map((option) => option.value);
const materialValues = MATERIAL_OPTIONS.map((option) => option.value);
const shapeValues = ROOF_SHAPE_OPTIONS.map((option) => option.value);

export const requestFormSchema = z.object({
  name: z.string().trim().min(2, "Укажите имя."),
  phone: z.string().trim().min(6, "Укажите телефон."),
  email: z.union([z.string().trim().email(), z.literal("")]).optional(),
  createdAt: z.string().datetime(),
  configuration: z.object({
    roofShape: z.enum(shapeValues as [typeof shapeValues[number], ...typeof shapeValues[number][]]),
    materialType: z.enum(
      materialValues as [typeof materialValues[number], ...typeof materialValues[number][]],
    ),
    color: z.object({
      value: z.enum(colorValues as [typeof colorValues[number], ...typeof colorValues[number][]]),
      label: z.string(),
      hex: z.string(),
      accent: z.string(),
    }),
  }),
});
