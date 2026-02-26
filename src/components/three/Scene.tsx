"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Environment, useScroll } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { PortalRing } from "@/components/three/PortalRing";
import { ProjectPanels } from "@/components/three/ProjectPanels";
import { getEnvPreset, type EnvPreset } from "@/components/three/envPresets";

function range(value: number, min: number, max: number) {
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function ease(value: number) {
  return value * value * (3 - 2 * value);
}

type SceneProps = {
  envPreset: EnvPreset;
  enableHdri: boolean;
};

export default function Scene({ envPreset, enableHdri }: SceneProps) {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();
  const preset = getEnvPreset(envPreset);

  const baseScale = THREE.MathUtils.clamp(
    Math.min(viewport.width, viewport.height) / 6,
    0.85,
    1.15
  );

  useFrame((state, delta) => {
    const offset = scroll.offset;
    const sceneGroup = groupRef.current;
    if (!sceneGroup) return;

    const s0 = ease(range(offset, 0, 0.25));
    const s1 = ease(range(offset, 0.25, 0.5));
    const s2 = ease(range(offset, 0.5, 0.75));
    const s3 = ease(range(offset, 0.75, 1));

    sceneGroup.rotation.y = THREE.MathUtils.damp(
      sceneGroup.rotation.y,
      (s1 - s2) * 0.6,
      4,
      delta
    );
    sceneGroup.rotation.x = THREE.MathUtils.damp(
      sceneGroup.rotation.x,
      (s2 - s0) * 0.35,
      4,
      delta
    );

    const breath = 1 + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.015;
    const exit = THREE.MathUtils.clamp((offset - 0.9) / 0.1, 0, 1);
    const exitScale = 1 - exit * 0.08;
    sceneGroup.scale.setScalar(baseScale * breath * exitScale);
    sceneGroup.position.y = THREE.MathUtils.damp(
      sceneGroup.position.y,
      exit * 0.6,
      4,
      delta
    );

    cameraTarget.current.set(0, 0, 0);
    const camera = state.camera as THREE.PerspectiveCamera;
    const targetZ = THREE.MathUtils.clamp(9 - s1 * 1.4 - s2 * 1.1 - s3 * 0.6, 7, 12);
    const targetY = THREE.MathUtils.clamp((s3 - s1) * 0.7, -0.5, 1.2);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 4, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, (s2 - s0) * 0.6, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4, delta);
    camera.lookAt(cameraTarget.current);

    const ring = ringRef.current;
    if (ring) {
      ring.rotation.y = THREE.MathUtils.damp(
        ring.rotation.y,
        (s2 - s0) * 0.6,
        4,
        delta
      );
    }
  });

  return (
    <>
      {enableHdri ? (
        <Environment
          files={`/hdr/${preset.hdriFile}`}
          environmentIntensity={preset.envIntensity}
          background={preset.background}
        />
      ) : null}
      <group ref={groupRef}>
        <directionalLight
          position={preset.lights.key.position}
          intensity={preset.lights.key.intensity}
          color={preset.lights.key.color}
        />
        <directionalLight
          position={preset.lights.rim.position}
          intensity={preset.lights.rim.intensity}
          color={preset.lights.rim.color}
        />
        <ambientLight intensity={0.2} />
        <directionalLight
          position={preset.lights.fill.position}
          intensity={preset.lights.fill.intensity}
          color={preset.lights.fill.color}
        />
        <PortalRing
          ref={ringRef}
          metalness={preset.materialTuning.metalness}
          roughness={preset.materialTuning.roughness}
          envMapIntensity={preset.materialTuning.envMapIntensity}
          clearcoat={preset.materialTuning.clearcoat}
          clearcoatRoughness={preset.materialTuning.clearcoatRoughness}
        />
        <ProjectPanels
          metalness={preset.materialTuning.metalness * 0.6}
          roughness={Math.min(0.6, preset.materialTuning.roughness + 0.15)}
          envMapIntensity={preset.materialTuning.envMapIntensity}
        />
      </group>
    </>
  );
}
