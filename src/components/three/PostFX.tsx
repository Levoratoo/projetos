"use client";

import {
  EffectComposer,
  EffectPass,
  RenderPass,
  BloomEffect,
  NoiseEffect,
  VignetteEffect,
  ToneMappingEffect,
  DepthOfFieldEffect,
  ToneMappingMode,
  BlendFunction
} from "postprocessing";
import { useEffect, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSearchParams } from "next/navigation";
import { getFxPreset, type FxQuality } from "@/components/three/fxPresets";

type EnvDebug = {
  enableHdri: boolean;
  envPreset: string;
  hdriFile: string;
};

function detectMobile() {
  if (typeof window === "undefined") return false;
  const small = window.matchMedia("(max-width: 767px)").matches;
  const ua = navigator.userAgent.toLowerCase();
  const uaMobile = /android|iphone|ipad|ipod|mobile/.test(ua);
  return small || uaMobile;
}

function parseQuality(value: string | null): FxQuality | null {
  if (!value) return null;
  if (value === "low" || value === "med" || value === "high") return value;
  return null;
}

function parseFlag(value: string | null): boolean | null {
  if (value === "1") return true;
  if (value === "0") return false;
  return null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseEnvNumber(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function PostFX({ envDebug }: { envDebug?: EnvDebug }) {
  const { gl, scene, camera, size } = useThree();
  const searchParams = useSearchParams();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lowMemory, setLowMemory] = useState(false);
  const [highMemory, setHighMemory] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setReducedMotion(reduced.matches);
      setIsMobile(detectMobile());
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      setLowMemory(typeof memory === "number" ? memory <= 4 : false);
      setHighMemory(typeof memory === "number" ? memory >= 8 : false);
    };

    update();
    window.addEventListener("resize", update);
    reduced.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const enableFxEnv = process.env.NEXT_PUBLIC_ENABLE_FX !== "false";
  const enableDofEnv = process.env.NEXT_PUBLIC_ENABLE_DOF === "true";

  const queryFx = parseFlag(searchParams.get("fx"));
  const queryDof = parseFlag(searchParams.get("dof"));
  const queryQuality = parseQuality(searchParams.get("q"));
  const debug = searchParams.get("dbg") === "1";

  const autoQuality: FxQuality = useMemo(() => {
    if (isMobile || lowMemory) return "low";
    if (highMemory) return "high";
    return "med";
  }, [highMemory, isMobile, lowMemory]);

  const quality = queryQuality ?? autoQuality;
  const enableFx = (queryFx ?? enableFxEnv) && !reducedMotion;

  const dofEnabled = useMemo(() => {
    if (!enableFx) return false;
    if (reducedMotion || isMobile) return false;
    if (!enableDofEnv && queryDof === null) return false;
    if (queryDof === true) return true;
    if (queryDof === false) return false;
    return enableDofEnv;
  }, [enableDofEnv, enableFx, isMobile, queryDof, reducedMotion]);

  const preset = getFxPreset(quality);

  const grainOpacity = clamp(
    parseEnvNumber(process.env.NEXT_PUBLIC_GRAIN_OPACITY, 0.14),
    0.1,
    0.18
  );
  const bloomIntensity = clamp(
    parseEnvNumber(process.env.NEXT_PUBLIC_BLOOM_INTENSITY, 0.4),
    0.25,
    0.55
  );
  const exposure = clamp(
    parseEnvNumber(process.env.NEXT_PUBLIC_EXPOSURE, 1.0),
    0.8,
    1.2
  );

  const vignetteOffset = clamp(preset.vignetteOffset, 0.1, 0.2);
  const vignetteDarkness = clamp(preset.vignetteDarkness, 0.15, 0.25);
  const bloomThreshold = clamp(preset.bloomThreshold, 0.85, 0.95);
  const bloomSmoothing = clamp(preset.bloomSmoothing, 0.85, 0.95);

  const composer = useMemo(() => {
    const comp = new EffectComposer(gl);
    return comp;
  }, [gl]);

  useEffect(() => {
    composer.setSize(size.width, size.height);
  }, [composer, size]);

  useEffect(() => {
    if (!enableFx) return;

    composer.removeAllPasses();
    composer.addPass(new RenderPass(scene, camera));

    const tone = new ToneMappingEffect({
      mode: ToneMappingMode.ACES_FILMIC,
      exposure
    });

    const bloom = new BloomEffect({
      intensity: bloomIntensity,
      luminanceThreshold: bloomThreshold,
      luminanceSmoothing: bloomSmoothing
    });

    const noise = new NoiseEffect({
      opacity: grainOpacity,
      blendFunction: BlendFunction.SOFT_LIGHT
    });

    const vignette = new VignetteEffect({
      eskil: false,
      offset: vignetteOffset,
      darkness: vignetteDarkness
    });

    const effects = [tone, bloom, noise, vignette];

    if (dofEnabled) {
      effects.push(
        new DepthOfFieldEffect(camera, {
          focusDistance: preset.dofFocusDistance,
          focalLength: preset.dofFocalLength,
          bokehScale: preset.dofBokehScale,
          height: preset.dofHeight
        })
      );
    }

    const pass = new EffectPass(camera, ...effects);
    pass.renderToScreen = true;
    composer.addPass(pass);

    return () => {
      composer.removePass(pass);
    };
  }, [
    camera,
    composer,
    dofEnabled,
    enableFx,
    exposure,
    grainOpacity,
    bloomIntensity,
    bloomThreshold,
    bloomSmoothing,
    preset,
    scene,
    vignetteDarkness,
    vignetteOffset
  ]);

  useFrame((_, delta) => {
    if (!enableFx) return;
    composer.render(delta);
  }, 1);

  if (!enableFx) return null;

  return debug ? (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[90] rounded-xl border border-white/10 bg-black/70 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-mist/80 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
      <div>quality: {quality}</div>
      <div>fx: {enableFx ? "on" : "off"}</div>
      <div>dof: {dofEnabled ? "on" : "off"}</div>
      {envDebug ? (
        <>
          <div>hdri: {envDebug.enableHdri ? "on" : "off"}</div>
          <div>env: {envDebug.envPreset}</div>
          <div>file: /hdr/{envDebug.hdriFile}</div>
        </>
      ) : null}
      <div>exp: {exposure.toFixed(2)}</div>
      <div>bloom: {bloomIntensity.toFixed(2)}</div>
      <div>grain: {grainOpacity.toFixed(2)}</div>
      <div>vignette: {vignetteDarkness.toFixed(2)}</div>
    </div>
  ) : null;
}
