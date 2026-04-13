"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, ContactShadows, Html, OrbitControls } from "@react-three/drei";
import { HouseModel } from "@/components/configurator/HouseModel";
import type { RoofConfiguration } from "@/lib/types";

type RoofSceneProps = {
  configuration: RoofConfiguration;
  isPending: boolean;
};

export function RoofScene({ configuration, isPending: _isPending }: RoofSceneProps) {
  return (
    <Canvas camera={{ position: [8.5, 4.8, 9.5], fov: 36 }} shadows>
      <color attach="background" args={["#f5efe7"]} />
      <ambientLight intensity={1.25} />
      <hemisphereLight intensity={0.75} groundColor="#d6c8ba" color="#fff6ed" />
      <directionalLight
        castShadow
        intensity={2.8}
        position={[8, 12, 6]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        castShadow
        intensity={1}
        position={[-6, 7, 5]}
        angle={0.42}
        penumbra={0.4}
      />
      <Suspense
        fallback={
          <Html center>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.86)",
                border: "1px solid rgba(31,28,24,0.12)",
                color: "#645c52",
                fontSize: 14,
              }}
            >
              Загружаем 3D-модель дома...
            </div>
          </Html>
        }
      >
        <Bounds fit clip observe margin={1.24}>
          <HouseModel configuration={configuration} />
        </Bounds>
      </Suspense>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <circleGeometry args={[10.5, 96]} />
        <meshStandardMaterial color="#d9d0c6" roughness={1} metalness={0.02} />
      </mesh>
      <ContactShadows
        opacity={0.34}
        scale={12}
        blur={2.4}
        far={4.2}
        resolution={1024}
        color="#8f7d6c"
        position={[0, -1.18, 0]}
      />
      <OrbitControls
        enablePan
        enableZoom
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.82}
        zoomSpeed={0.9}
        panSpeed={0.95}
        screenSpacePanning
        minDistance={3}
        maxDistance={48}
        target={[0, 0.15, 0]}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 1.72}
      />
    </Canvas>
  );
}
