/** Cores dos painéis de preview (modal + timeline) por slug do case. */
export function getPreviewChrome(slug: string) {
  if (slug === "claymoon-press-kit" || slug === "quint-press-kit") {
    return {
      radial: "rgba(124, 58, 237, 0.22)",
      radialSoft: "rgba(124, 58, 237, 0.1)",
      ctaBackground:
        "linear-gradient(165deg, rgba(124,58,237,0.5) 0%, rgba(76,29,149,0.38) 45%, rgba(45,15,90,0.58) 100%)",
      ctaShadow:
        "inset 0 1px 0 rgba(255,255,255,0.14), 0 0 32px rgba(124,58,237,0.35), 0 0 8px rgba(167,139,250,0.45), 0 8px 24px rgba(0,0,0,0.4)",
      ctaBorder: "1px solid rgba(167,139,250,0.4)"
    };
  }
  return {
    radial: "rgba(255, 59, 59, 0.14)",
    radialSoft: "rgba(255, 59, 59, 0.1)",
    ctaBackground:
      "linear-gradient(165deg, rgba(255,72,72,0.42) 0%, rgba(220,30,30,0.32) 45%, rgba(140,12,24,0.55) 100%)",
    ctaShadow:
      "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 32px rgba(255,59,59,0.38), 0 0 8px rgba(255,59,59,0.55), 0 8px 24px rgba(0,0,0,0.4)",
    ctaBorder: "1px solid rgba(255,72,72,0.35)"
  };
}
