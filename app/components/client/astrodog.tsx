"use client";
import {
  Stars,
  Environment,
  PresentationControls,
  Float,
  Preload,
  Lightformer,
} from "@react-three/drei";
import { useControls, button } from "leva";
import { Canvas, CanvasProps, useFrame, useThree } from "@react-three/fiber";
import dynamic from "next/dynamic";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  BufferGeometry,
  Material,
  NormalBufferAttributes,
  Object3DEventMap,
  Points,
} from "three";
import { useInView } from "motion/react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const AstrodogModel = dynamic(() => import("@/app/components/client/model"));

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
    <Stars
      ref={stars}
      count={10000}
      factor={0.8}
      depth={50}
      speed={1.2}
      saturation={0.5}
      radius={100}
    />
  );
}

function AstrodogScene() {
  return (
    <>
      <StarryBackground />
      <PresentationControls
        global
        cursor
        azimuth={[-Infinity, Infinity]}
        config={{ mass: 1, tension: 170, friction: 26 }}
      >
        <Float>
          <Suspense fallback={null}>
            <AstrodogModel />
          </Suspense>
        </Float>
      </PresentationControls>

      <Environment resolution={256}>
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
      <Preload all />
    </>
  );
}

export default function Astrodog() {
  const astrodogRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => setMounted(true));
  if (!mounted) return null;

  const isHome = pathname === "/";

  return (
    <div
      className={`fixed left-0 top-0 h-dvh w-dvw ${!isHome ? "pointer-events-none -z-10" : "pointer-events-auto"}`}
    >
      <Canvas
        ref={astrodogRef}
        inert={!isHome}
        frameloop={!isHome ? "never" : "always"}
        className={`bg-linear-to-br inert:-z-10 inert:opacity-50 inert:pointer-events-none dark:grayscale-100 touch-none overflow-hidden from-slate-950 via-blue-950 to-violet-950 grayscale-0 transition-all duration-500`}
        camera={{ position: [0, 5, 10], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <AstrodogScene />
      </Canvas>
    </div>
  );
}
