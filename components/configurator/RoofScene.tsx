"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import { HouseModel } from "@/components/configurator/HouseModel";
import type { RoofConfiguration } from "@/lib/types";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const IDLE_MS = 3000;

function AutoRotate({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl> }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    let timer: ReturnType<typeof setTimeout>;

    function startTimer() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (controlsRef.current) controlsRef.current.autoRotate = true;
      }, IDLE_MS);
    }

    function onInteraction() {
      if (controlsRef.current) controlsRef.current.autoRotate = false;
      startTimer();
    }

    startTimer();
    canvas.addEventListener("pointermove", onInteraction);
    canvas.addEventListener("pointerdown", onInteraction);
    canvas.addEventListener("wheel", onInteraction);

    return () => {
      clearTimeout(timer);
      canvas.removeEventListener("pointermove", onInteraction);
      canvas.removeEventListener("pointerdown", onInteraction);
      canvas.removeEventListener("wheel", onInteraction);
    };
  }, [gl, controlsRef]);

  return null;
}

function CameraReset({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl> }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    function onDblClick() {
      controlsRef.current?.reset();
    }
    canvas.addEventListener("dblclick", onDblClick);
    return () => canvas.removeEventListener("dblclick", onDblClick);
  }, [gl, controlsRef]);

  return null;
}

type RoofSceneProps = {
  configuration: RoofConfiguration;
  isPending: boolean;
};

export function RoofScene({ configuration, isPending: _isPending }: RoofSceneProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const compactQuery = window.matchMedia("(max-width: 1080px)");
    const mobileQuery = window.matchMedia("(max-width: 720px)");

    const updateFlags = () => {
      setIsCompact(compactQuery.matches);
      setIsMobile(mobileQuery.matches);
    };

    updateFlags();
    compactQuery.addEventListener("change", updateFlags);
    mobileQuery.addEventListener("change", updateFlags);

    return () => {
      compactQuery.removeEventListener("change", updateFlags);
      mobileQuery.removeEventListener("change", updateFlags);
    };
  }, []);

  return (
    <Canvas
      camera={
        isMobile
    ? { position: [6.2, 3.2, 7.1], fov: 44 }
    : isCompact
    ? { position: [7.6, 4.1, 8.6], fov: 38 }
    : { position: [7.9, 4.55, 8.75], fov: 35 }
      }
      shadows
    >
      <color attach="background" args={["#f5efe7"]} />
      <ambientLight intensity={2.25} />
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
        <HouseModel configuration={configuration} />
      </Suspense>

      <ContactShadows
        opacity={isMobile ? 0.18 : isCompact ? 0.2 : 0.22}
        scale={isMobile ? 6.8 : isCompact ? 8.2 : 9.5}
        blur={3.6}
        far={isMobile ? 2.8 : isCompact ? 3.4 : 4.2}
        resolution={1024}
        color="#8f7d6c"
        position={isMobile ? [0, -0.62, 0] : isCompact ? [0, -1.08, 0] : [0, -0.62, 0]}
      />

      <AutoRotate controlsRef={controlsRef} />
      <CameraReset controlsRef={controlsRef} />

      <OrbitControls
        ref={controlsRef}
        autoRotateSpeed={0.8}
        enablePan
        enableZoom
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.82}
        zoomSpeed={0.9}
        panSpeed={0.95}
        screenSpacePanning
        minDistance={isMobile ? 4.8 : 3}
        maxDistance={48}
        target={isMobile ? [0, 0.3, 0] : isCompact ? [0, -0.55, 0] : [0, 0.15, 0]}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 1.72}
      />
    </Canvas>
  );
}
