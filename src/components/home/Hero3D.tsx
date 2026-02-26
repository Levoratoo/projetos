"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Blob() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();
    mesh.rotation.x = t * 0.1 + state.pointer.y * 0.3;
    mesh.rotation.y = t * 0.12 + state.pointer.x * 0.35;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1.1, 2]} />
      <meshPhysicalMaterial
        color="#0b1110"
        roughness={0.35}
        metalness={0.25}
        transmission={0.05}
        thickness={0.8}
        emissive="#38f89a"
        emissiveIntensity={0.25}
        clearcoat={0.3}
      />
    </mesh>
  );
}

function ParticleField() {
  const positions = useMemo(() => {
    const count = 320;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      data[i] = (Math.random() - 0.5) * 12;
      data[i + 1] = (Math.random() - 0.5) * 8;
      data[i + 2] = -Math.random() * 8;
    }
    return data;
  }, []);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#4ade80"
        size={0.02}
        sizeAttenuation
        opacity={0.25}
        depthWrite={false}
      />
    </Points>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="absolute inset-0"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0b0f0d"]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 2, 3]} intensity={0.6} color="#6ef9a8" />
      <pointLight position={[-2, -1, 2]} intensity={0.3} color="#5edc8d" />
      <ParticleField />
      <Blob />
    </Canvas>
  );
}
