"use client";

import { useMemo } from "react";
import { DoubleSide, RepeatWrapping, CanvasTexture } from "three";
import type { RoofConfiguration, RoofMaterialType, RoofShape } from "@/lib/types";

type Vec3 = [number, number, number];

type RoofPart = {
  size: Vec3;
  position: Vec3;
  rotation: Vec3;
};

type AccentPart = {
  size: Vec3;
  position: Vec3;
  rotation: Vec3;
  color: string;
};

type RoofGeometry = {
  slabs: RoofPart[];
  accents?: AccentPart[];
};

type RoofBase = {
  position: Vec3;
  size: Vec3;
};

type RoofShapeModel = {
  roof: RoofGeometry;
  body: RoofBase;
};

const MATERIAL_SURFACE = {
  corrugated: { bump: 18, repeatX: 14, repeatY: 6, roughness: 0.72, metalness: 0.26 },
  metal_tile: { bump: 26, repeatX: 9, repeatY: 8, roughness: 0.58, metalness: 0.36 },
  standing_seam: { bump: 12, repeatX: 7, repeatY: 4, roughness: 0.42, metalness: 0.32 },
} satisfies Record<
  RoofMaterialType,
  { bump: number; repeatX: number; repeatY: number; roughness: number; metalness: number }
>;

export function RoofModel({ configuration }: { configuration: RoofConfiguration }) {
  const roofTexture = useMemo(
    () =>
      createRoofTexture(
        configuration.materialType,
        configuration.color.hex,
        configuration.color.accent,
      ),
    [configuration.materialType, configuration.color.accent, configuration.color.hex],
  );

  const materialConfig = MATERIAL_SURFACE[configuration.materialType];
  const model = useMemo(
    () => createRoofGeometry(configuration.roofShape),
    [configuration.roofShape],
  );

  const roofMaterialProps = {
    color: configuration.color.hex,
    side: DoubleSide,
    roughness: materialConfig.roughness,
    metalness: materialConfig.metalness,
    map: roofTexture,
  } as const;

  return (
    <group>
      <mesh castShadow receiveShadow position={model.body.position}>
        <boxGeometry args={model.body.size} />
        <meshStandardMaterial color="#f4eadf" roughness={0.98} metalness={0.02} />
      </mesh>

      <mesh castShadow receiveShadow position={[0, -0.08, 1.45]}>
        <boxGeometry args={[3.78, 0.88, 0.14]} />
        <meshStandardMaterial color="#ece1d3" roughness={0.95} metalness={0.02} />
      </mesh>

      {model.roof.slabs.map((part, index) => (
        <mesh
          key={`${configuration.roofShape}-${index}`}
          castShadow
          receiveShadow
          rotation={part.rotation}
          position={part.position}
        >
          <boxGeometry args={part.size} />
          <meshStandardMaterial {...roofMaterialProps} />
        </mesh>
      ))}

      {model.roof.accents?.map((part, index) => (
        <mesh
          key={`${configuration.roofShape}-accent-${index}`}
          castShadow
          receiveShadow
          rotation={part.rotation}
          position={part.position}
        >
          <boxGeometry args={part.size} />
          <meshStandardMaterial color={part.color} roughness={0.88} metalness={0.06} />
        </mesh>
      ))}
    </group>
  );
}

function createRoofGeometry(shape: RoofShape): RoofShapeModel {
  switch (shape) {
    case "single_slope":
      return {
        body: {
          position: [0, -0.58, 0],
          size: [3.6, 1.12, 2.8],
        },
        roof: {
          slabs: [
            {
              size: [4.05, 0.12, 3.15],
              rotation: [0, 0, -0.34],
              position: [0.12, 1.15, 0],
            },
          ],
        },
      };
    case "hip":
      return {
        body: {
          position: [0, -0.55, 0],
          size: [3.55, 1.1, 2.75],
        },
        roof: {
          slabs: [
            {
              size: [1.78, 0.12, 3.05],
              rotation: [0, 0, 0.5],
              position: [-0.86, 1.08, 0],
            },
            {
              size: [1.78, 0.12, 3.05],
              rotation: [0, 0, -0.5],
              position: [0.86, 1.08, 0],
            },
            {
              size: [2.9, 0.12, 1.42],
              rotation: [0.4, 0, 0],
              position: [0, 1.04, -0.7],
            },
            {
              size: [2.9, 0.12, 1.42],
              rotation: [-0.4, 0, 0],
              position: [0, 1.04, 0.7],
            },
          ],
          accents: [
            {
              size: [0.16, 0.16, 2.9],
              rotation: [0, 0, 0],
              position: [0, 1.45, 0],
              color: "#d5cabb",
            },
          ],
        },
      };
    case "tent":
      return {
        body: {
          position: [0, -0.58, 0],
          size: [3.05, 1.16, 3.05],
        },
        roof: {
          slabs: [
            {
              size: [3, 0.12, 1.55],
              rotation: [0.46, 0, 0],
              position: [0, 1.02, -0.78],
            },
            {
              size: [3, 0.12, 1.55],
              rotation: [-0.46, 0, 0],
              position: [0, 1.02, 0.78],
            },
            {
              size: [1.55, 0.12, 3],
              rotation: [0, 0, 0.46],
              position: [-0.78, 1.02, 0],
            },
            {
              size: [1.55, 0.12, 3],
              rotation: [0, 0, -0.46],
              position: [0.78, 1.02, 0],
            },
          ],
          accents: [
            {
              size: [0.18, 0.18, 0.18],
              rotation: [0, 0, 0],
              position: [0, 1.52, 0],
              color: "#d5cabb",
            },
          ],
        },
      };
    case "gable":
    default:
      return {
        body: {
          position: [0, -0.55, 0],
          size: [3.6, 1.1, 2.8],
        },
        roof: {
          slabs: [
            {
              size: [2.14, 0.12, 3.2],
              rotation: [0, 0, 0.48],
              position: [-0.88, 1.1, 0],
            },
            {
              size: [2.14, 0.12, 3.2],
              rotation: [0, 0, -0.48],
              position: [0.88, 1.1, 0],
            },
          ],
          accents: [
            {
              size: [0.14, 0.14, 3.08],
              rotation: [0, 0, 0],
              position: [0, 1.45, 0],
              color: "#d5cabb",
            },
          ],
        },
      };
  }
}

function createRoofTexture(
  material: RoofMaterialType,
  fill: string,
  stroke: string,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (!context) {
    return undefined;
  }

  context.fillStyle = fill;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = stroke;
  context.lineWidth = material === "metal_tile" ? 7 : material === "corrugated" ? 5 : 4;

  if (material === "corrugated") {
    for (let x = -40; x < canvas.width + 40; x += 30) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x + 50, canvas.height);
      context.stroke();
    }
  }

  if (material === "metal_tile") {
    for (let y = 36; y < canvas.height; y += 58) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }
    for (let x = 20; x < canvas.width; x += 56) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
  }

  if (material === "standing_seam") {
    for (let x = 24; x < canvas.width; x += 62) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }
  }

  const texture = new CanvasTexture(canvas);
  const surface = MATERIAL_SURFACE[material];

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(surface.repeatX, surface.repeatY);

  return texture;
}
