"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { previewProjects } from "@/data/projects";
import { useProjectPreview } from "@/state/projectPreview";

type ProjectPanelsProps = {
  metalness?: number;
  roughness?: number;
  envMapIntensity?: number;
};

function range(value: number, min: number, max: number) {
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
}

function ease(value: number) {
  return value * value * (3 - 2 * value);
}

export function ProjectPanels(props: ProjectPanelsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const glowRefs = useRef<THREE.Mesh[]>([]);
  const scroll = useScroll();
  const { openPreview } = useProjectPreview();
  const [hovered, setHovered] = useState<string | null>(null);

  const panels = useMemo(
    () =>
      previewProjects.slice(0, 3).map((project, index) => ({
        slug: project.slug,
        pos: [-2.2 + index * 2.2, 0.4 - index * 0.2, -0.8],
        rot: [0, (index - 1) * 0.25, 0]
      })),
    []
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const offset = scroll.offset;
    const s0 = ease(range(offset, 0, 0.33));
    const s1 = ease(range(offset, 0.33, 0.66));
    const s2 = ease(range(offset, 0.66, 0.9));
    const s3 = ease(range(offset, 0.9, 1));

    group.position.y = THREE.MathUtils.damp(group.position.y, s1 * 0.2 - s3 * 0.25, 4, delta);
    group.position.z = THREE.MathUtils.damp(group.position.z, -1 + s2 * 0.4, 4, delta);
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, (s2 - s0) * 0.15, 4, delta);

    meshRefs.current.forEach((mesh, index) => {
      const base = panels[index];
      if (!base) return;
      const isHover = hovered === base.slug;
      const driftX = (s2 - s0) * 0.25;
      const driftY = (s1 - s3) * 0.2;
      const lift = isHover ? 0.12 : 0;
      const scale = isHover ? 1.04 : 1;

      mesh.position.x = THREE.MathUtils.damp(
        mesh.position.x,
        base.pos[0] + driftX,
        6,
        delta
      );
      mesh.position.y = THREE.MathUtils.damp(
        mesh.position.y,
        base.pos[1] + driftY + lift,
        6,
        delta
      );
      mesh.rotation.y = THREE.MathUtils.damp(
        mesh.rotation.y,
        base.rot[1] + (s2 - s1) * 0.2,
        6,
        delta
      );
      mesh.rotation.x = THREE.MathUtils.damp(
        mesh.rotation.x,
        base.rot[0] + (s1 - s0) * 0.15,
        6,
        delta
      );
      mesh.scale.setScalar(THREE.MathUtils.damp(mesh.scale.x, scale, 6, delta));

      const glow = glowRefs.current[index];
      if (glow) {
        glow.position.copy(mesh.position);
        glow.rotation.copy(mesh.rotation);
        glow.scale.setScalar(THREE.MathUtils.damp(glow.scale.x, scale * 1.05, 6, delta));
        const material = glow.material as THREE.MeshBasicMaterial;
        material.opacity = THREE.MathUtils.damp(material.opacity, isHover ? 0.35 : 0.1, 6, delta);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {panels.map((panel, idx) => (
        <group key={panel.slug}>
          <mesh
            ref={(node) => {
              if (node) meshRefs.current[idx] = node;
            }}
            position={panel.pos as [number, number, number]}
            rotation={panel.rot as [number, number, number]}
            onPointerOver={(event) => {
              event.stopPropagation();
              document.body.style.cursor = "pointer";
              setHovered(panel.slug);
            }}
            onPointerOut={() => {
              document.body.style.cursor = "default";
              setHovered(null);
            }}
            onClick={(event) => {
              event.stopPropagation();
              openPreview(panel.slug);
            }}
          >
            <planeGeometry args={[1.8, 1.1, 1, 1]} />
            <meshStandardMaterial
              color="#0f1513"
              emissive="#2fe089"
              emissiveIntensity={0.15}
              metalness={props.metalness ?? 0.15}
              roughness={props.roughness ?? 0.45}
              envMapIntensity={props.envMapIntensity ?? 0.6}
            />
          </mesh>
          <mesh
            ref={(node) => {
              if (node) glowRefs.current[idx] = node;
            }}
            position={panel.pos as [number, number, number]}
            rotation={panel.rot as [number, number, number]}
          >
            <planeGeometry args={[1.9, 1.2, 1, 1]} />
            <meshBasicMaterial
              color="#39f49b"
              transparent
              opacity={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
