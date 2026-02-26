"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StoryCopy, StoryCopyStatic } from "@/components/StoryCopy";
import { PostFX } from "@/components/three/PostFX";
import { Container } from "@/components/Container";
import { type EnvPreset, getEnvPreset } from "@/components/three/envPresets";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

function canUseWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl") || canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

export function ScrollStory3D() {
  const searchParams = useSearchParams();
  const [enable3d, setEnable3d] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hdriAvailable, setHdriAvailable] = useState(true);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 767px)").matches;
  }, []);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const queryHdri = searchParams.get("hdri");
  const queryEnv = searchParams.get("env");
  const debug = searchParams.get("dbg") === "1";
  const enableHdriEnv = process.env.NEXT_PUBLIC_ENABLE_HDRI !== "false";
  const enableHdri =
    enableHdriEnv &&
    !reducedMotion &&
    !isMobile &&
    (queryHdri === "0" ? false : true);
  const envPreset = (queryEnv === "int" || queryEnv === "studio" || queryEnv === "city"
    ? queryEnv
    : "studio") as EnvPreset;
  const preset = getEnvPreset(envPreset);

  useEffect(() => {
    if (!enableHdri) {
      setHdriAvailable(false);
      return;
    }
    const controller = new AbortController();
    fetch(`/hdr/${preset.hdriFile}`, { method: "HEAD", signal: controller.signal })
      .then((res) => setHdriAvailable(res.ok))
      .catch(() => setHdriAvailable(false));
    return () => controller.abort();
  }, [enableHdri, preset.hdriFile]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const isMobile = window.innerWidth < 768;
      const allow3d = !reduced.matches && !isMobile && canUseWebGL();
      setEnable3d(allow3d);
    };

    update();
    window.addEventListener("resize", update);
    reduced.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  function FadeController() {
    const scroll = useScroll();
    useFrame(() => {
      const wrap = canvasWrapRef.current;
      if (!wrap) return;
      const offset = scroll.offset;
      const fade = offset > 0.9 ? Math.max(0, 1 - (offset - 0.9) / 0.1) : 1;
      wrap.style.opacity = `${fade}`;
    });
    return null;
  }

  return (
    <section className="relative h-[220vh]">
      <div className="sticky top-0 h-screen">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(86,255,146,0.14),_transparent_60%),radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.08),_transparent_60%)]" />
        <div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:56px_56px]" />

        {mounted && enable3d ? (
          <div ref={canvasWrapRef} className="absolute inset-0 pointer-events-auto">
            <Canvas
              className="absolute inset-0"
              dpr={[1, 1.5]}
              gl={{ antialias: true, powerPreference: "high-performance" }}
              camera={{ position: [0, 0, 7], fov: 40 }}
              frameloop="demand"
            >
              <ScrollControls pages={2.2} damping={0.15}>
                <Scene envPreset={envPreset} enableHdri={enableHdri && hdriAvailable} />
                <PostFX
                  envDebug={{
                    enableHdri: enableHdri && hdriAvailable,
                    envPreset,
                    hdriFile: preset.hdriFile
                  }}
                />
                <FadeController />
                <Scroll html>
                  <StoryCopy />
                </Scroll>
              </ScrollControls>
            </Canvas>
          </div>
        ) : mounted ? (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(86,255,146,0.14),_transparent_60%),linear-gradient(180deg,rgba(7,9,10,0.9),rgba(7,9,10,0.4))]" />
            <StoryCopyStatic />
          </div>
        ) : null}
      </div>

    </section>
  );
}
