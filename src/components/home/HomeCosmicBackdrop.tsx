import { withBasePath } from "@/lib/basePath";

/**
 * Hero da home: foto de fundo + véu escuro + vermelho + partículas (resto igual).
 */
export function HomeCosmicBackdrop() {
  return (
    <>
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${withBasePath("/case-hero-bg.png")})`
        }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_130%_55%_at_50%_-5%,rgba(160,22,38,0.42),transparent_52%),radial-gradient(ellipse_90%_80%_at_86%_48%,rgba(220,32,48,0.48),transparent_55%),radial-gradient(ellipse_55%_45%_at_72%_52%,rgba(255,72,72,0.22),transparent_50%),radial-gradient(circle_at_10%_20%,rgba(90,8,18,0.35),transparent_38%),radial-gradient(circle_at_30%_85%,rgba(40,0,8,0.25),transparent_40%)]"
        aria-hidden
      />
      <div className="hero-starfield absolute inset-0 -z-10" aria-hidden />
      <div className="absolute inset-0 -z-10 opacity-[0.08] tech-grid" aria-hidden />
      <div
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:linear-gradient(transparent_0%,rgba(255,255,255,0.04)_12%,transparent_24%)] [background-size:100%_7px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[-14%] top-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(120,10,24,0.22),rgba(120,10,24,0)_70%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[-12%] top-[10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(255,48,48,0.28),rgba(255,48,48,0)_62%)] blur-3xl"
        aria-hidden
      />
    </>
  );
}
