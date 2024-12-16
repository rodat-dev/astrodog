"use client";
import {
  Environment,
  PresentationControls,
  Float,
  Preload,
  Lightformer,
  Stars,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BufferGeometry,
  Material,
  NormalBufferAttributes,
  Object3DEventMap,
  Points,
} from "three";
import { cn } from "@/lib/utils";

const AstrodogModel = dynamic(() => import("@/components/3d/astrodog-model"), {
  ssr: false,
});

function StarryBackground() {
  const stars =
    useRef<
      Points<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);
  useFrame(({ clock }) => {
    stars.current!.rotation.y = clock.getElapsedTime() * 0.002;
    stars.current!.rotation.x = clock.getElapsedTime() * 0.003;
  });

  return (
    <>
      <Stars
        ref={stars}
        count={800}
        factor={0.9}
        depth={80}
        speed={1.2}
        saturation={0.25}
        radius={80}
      />
    </>
  );
}

const ASTRODOG_POSITIONS = (isHome: boolean) => (isHome ? -10 : -30);

export default function AstrodogScene() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true));
  if (!mounted) return null;

  const isHome = pathname === "/";

  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      inert={!isHome}
      className={cn(
        "z-1 pointer-events-auto h-full w-full overflow-hidden bg-transparent",
        isHome
          ? "z-1 pointer-events-auto cursor-pointer touch-none"
          : "pointer-events-none",
      )}
    >
      <Suspense fallback={null}>
        <StarryBackground />
      </Suspense>

      <Suspense fallback={null}>
        <PresentationControls
          global
          cursor
          azimuth={[-Infinity, Infinity]}
          config={{ mass: 1, tension: 170, friction: 26 }}
        >
          <Float>
            <AstrodogModel positionY={ASTRODOG_POSITIONS(isHome)} />
          </Float>
        </PresentationControls>

        <Environment resolution={512}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={100}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={2}
            />
            <Lightformer
              form="circle"
              intensity={2}
              rotation-y={Math.PI / 2}
              position={[-5, 1, -1]}
              scale={2}
            />
            <Lightformer
              form="circle"
              intensity={4}
              rotation-y={Math.PI / 2}
              position={[-5, -1, -1]}
              scale={2}
            />
            <Lightformer
              form="circle"
              intensity={3}
              rotation-y={-Math.PI / 2}
              position={[10, 1, 0]}
              scale={8}
            />
            <Lightformer
              form="ring"
              color="#4060ff"
              intensity={80}
              position={[10, -5, 0]}
              scale={10}
            />
          </group>
        </Environment>
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
