"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Cube() {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = t * 0.35;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.15 + 0.25;
      group.current.position.y = Math.sin(t * 1.2) * 0.08;
    }
  });

  const materials = useMemo(() => {
    const make = (hex, emissive = "#ff4500", eInt = 0.15) =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(hex),
        metalness: 0.15,
        roughness: 0.25,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        emissive: new THREE.Color(emissive),
        emissiveIntensity: eInt,
      });

    return [
      make("#e85a00"), // right
      make("#ff8533"), // left
      make("#ff8a1f", "#ff6a00", 0.35), // top
      make("#cc5200"), // bottom
      make("#ff6a00"), // front
      make("#ff6a00"), // back
    ];
  }, []);

  return (
    <group ref={group}>
      <RoundedBox
        args={[1.6, 1.6, 1.6]}
        radius={0.12}
        smoothness={6}
        castShadow
        receiveShadow
      >
        {materials.map((m, i) => (
          <primitive
            key={i}
            object={m}
            attach={`material-${i}`}
          />
        ))}
      </RoundedBox>

      {/* White frame */}
      <mesh>
        <boxGeometry args={[1.62, 1.62, 1.62]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glow shell */}
      <mesh scale={1.04}>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshBasicMaterial
          color="#ff6a00"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

function GroundGlow() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.3, 0]}
    >
      <circleGeometry args={[2.2, 64]} />
      <meshBasicMaterial
        color="#ff6a00"
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

export default function HeroCube() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{
        position: [2.2, 2.2, 3.2],
        fov: 45,
      }}
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight
        intensity={0.6}
        color="#ffb27a"
      />

      <directionalLight
        position={[3, 5, 2]}
        intensity={1.4}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      <pointLight
        position={[-3, 2, -2]}
        intensity={0.8}
        color="#ff7a1f"
      />

      <pointLight
        position={[0, -2, 2]}
        intensity={0.4}
        color="#ff4500"
      />

      <Float
        speed={1.2}
        rotationIntensity={0.2}
        floatIntensity={0.6}
      >
        <Cube />
      </Float>

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.55}
        scale={6}
        blur={2.6}
        far={2}
        color="#ff4500"
      />

      <GroundGlow />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}