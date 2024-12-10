import * as THREE from "three";
import { useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { lerp } from "three/src/math/MathUtils.js";
import { motion } from "framer-motion-3d";

type GLTFResult = GLTF & {
  nodes: {
    Mesh001: THREE.SkinnedMesh;
    Mesh001_1: THREE.SkinnedMesh;
    Mesh001_2: THREE.SkinnedMesh;
    Mesh001_3: THREE.SkinnedMesh;
    Mesh001_4: THREE.SkinnedMesh;
    Mesh001_5: THREE.SkinnedMesh;
    Mesh001_6: THREE.SkinnedMesh;
    Mesh001_7: THREE.SkinnedMesh;
    Moon001: THREE.Mesh;
    Bone: THREE.Bone;
    Bone005: THREE.Bone;
    Bone024: THREE.Bone;
    neutral_bone: THREE.Bone;
  };
  materials: {
    ["Mat.008"]: THREE.MeshPhysicalMaterial;
    ["Mat.009"]: THREE.MeshPhysicalMaterial;
    ["Mat.010"]: THREE.MeshPhysicalMaterial;
    ["Mat.011"]: THREE.MeshPhysicalMaterial;
    ["Mat.012"]: THREE.MeshPhysicalMaterial;
    ["Mat.013"]: THREE.MeshStandardMaterial;
    ["Mat.014"]: THREE.MeshStandardMaterial;
    ["Mat.015"]: THREE.MeshStandardMaterial;
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

//@ts-expect-error - untyped group
export default function AstrodogModel(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const [finishedEntry, setFinishedEntry] = useState(false);
  const { nodes, materials, animations } = useGLTF(
    process.env.NEXT_PUBLIC_ASTRODOG_URL as string,
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const markAsTransitioned = () => {
    setFinishedEntry(true);
  };

  useFrame(({ clock, camera }) => {
    if (group.current && !finishedEntry) {
      camera.position.setY(
        lerp(
          camera.position.y,
          group.current.position.y + 15,
          clock.getElapsedTime() * 0.01,
        ),
      );

      if (Math.abs(camera.position.y - (group.current.position.y + 15)) < 0.2) {
        markAsTransitioned();
      }
    }
    actions?.floating?.play();
  });

  return (
    <>
      <group
        scale={2.5}
        position={[0, -20, 1]}
        rotation={[-0.5, 0, 0]}
        ref={group}
        {...props}
        dispose={null}
      >
        <group name="Scene">
          <group
            name="Armature"
            position={[-0.015, 3.732, 0.091]}
            rotation={[0.262, 0, 0]}
            scale={0.2}
          >
            <group name="arm_1">
              <skinnedMesh
                name="Mesh001"
                geometry={nodes.Mesh001.geometry}
                material={materials["Mat.008"]}
                skeleton={nodes.Mesh001.skeleton}
              />
              <skinnedMesh
                name="Mesh001_1"
                geometry={nodes.Mesh001_1.geometry}
                material={materials["Mat.009"]}
                skeleton={nodes.Mesh001_1.skeleton}
              />
              <skinnedMesh
                name="Mesh001_2"
                geometry={nodes.Mesh001_2.geometry}
                material={materials["Mat.010"]}
                skeleton={nodes.Mesh001_2.skeleton}
              />
              <skinnedMesh
                name="Mesh001_3"
                geometry={nodes.Mesh001_3.geometry}
                material={materials["Mat.011"]}
                skeleton={nodes.Mesh001_3.skeleton}
              />
              <skinnedMesh
                name="Mesh001_4"
                geometry={nodes.Mesh001_4.geometry}
                material={materials["Mat.012"]}
                skeleton={nodes.Mesh001_4.skeleton}
              />
              <skinnedMesh
                name="Mesh001_5"
                geometry={nodes.Mesh001_5.geometry}
                material={materials["Mat.013"]}
                skeleton={nodes.Mesh001_5.skeleton}
              />
              <skinnedMesh
                name="Mesh001_6"
                geometry={nodes.Mesh001_6.geometry}
                material={materials["Mat.014"]}
                skeleton={nodes.Mesh001_6.skeleton}
              />
              <skinnedMesh
                name="Mesh001_7"
                geometry={nodes.Mesh001_7.geometry}
                material={materials["Mat.015"]}
                skeleton={nodes.Mesh001_7.skeleton}
              />
            </group>
            <primitive object={nodes.Bone} />
            <primitive object={nodes.Bone005} />
            <primitive object={nodes.Bone024} />
            <primitive object={nodes.neutral_bone} />
          </group>
          <mesh
            name="Moon001"
            castShadow
            receiveShadow
            geometry={nodes.Moon001.geometry}
            material={materials["Material.002"]}
            scale={3}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload(process.env.NEXT_PUBLIC_ASTRODOG_URL as string);
