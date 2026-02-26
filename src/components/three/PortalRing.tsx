"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

type PortalRingProps = {
  metalness?: number;
  roughness?: number;
  envMapIntensity?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
};

export const PortalRing = forwardRef<THREE.Mesh, PortalRingProps>((props, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useImperativeHandle(ref, () => meshRef.current as THREE.Mesh);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.3, 0.1, 16, 80]} />
      <meshPhysicalMaterial
        color="#0a1210"
        emissive="#39f49b"
        emissiveIntensity={0.35}
        metalness={props.metalness ?? 0.25}
        roughness={props.roughness ?? 0.3}
        envMapIntensity={props.envMapIntensity ?? 0.6}
        clearcoat={props.clearcoat ?? 0}
        clearcoatRoughness={props.clearcoatRoughness ?? 0.5}
      />
    </mesh>
  );
});

PortalRing.displayName = "PortalRing";
