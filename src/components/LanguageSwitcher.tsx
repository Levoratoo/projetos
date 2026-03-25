"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, type Locale } from "@/state/locale";

const SH = 30 / 13;

function FlagUS({
  className,
  clipId,
}: {
  className?: string;
  clipId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="60" height="30" rx="2" ry="2" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="30" fill="#B22234" />
        <rect y={SH} width="60" height={SH} fill="#fff" />
        <rect y={SH * 3} width="60" height={SH} fill="#fff" />
        <rect y={SH * 5} width="60" height={SH} fill="#fff" />
        <rect y={SH * 7} width="60" height={SH} fill="#fff" />
        <rect y={SH * 9} width="60" height={SH} fill="#fff" />
        <rect y={SH * 11} width="60" height={SH} fill="#fff" />
        <rect width="24" height={SH * 7} fill="#3C3B6E" />
        <g fill="#fff">
          <circle cx="4" cy="2.8" r="0.85" />
          <circle cx="8" cy="2.8" r="0.85" />
          <circle cx="12" cy="2.8" r="0.85" />
          <circle cx="16" cy="2.8" r="0.85" />
          <circle cx="20" cy="2.8" r="0.85" />
          <circle cx="6" cy="5.6" r="0.85" />
          <circle cx="10" cy="5.6" r="0.85" />
          <circle cx="14" cy="5.6" r="0.85" />
          <circle cx="18" cy="5.6" r="0.85" />
          <circle cx="4" cy="8.4" r="0.85" />
          <circle cx="8" cy="8.4" r="0.85" />
          <circle cx="12" cy="8.4" r="0.85" />
          <circle cx="16" cy="8.4" r="0.85" />
          <circle cx="20" cy="8.4" r="0.85" />
          <circle cx="6" cy="11.2" r="0.85" />
          <circle cx="10" cy="11.2" r="0.85" />
          <circle cx="14" cy="11.2" r="0.85" />
          <circle cx="18" cy="11.2" r="0.85" />
        </g>
      </g>
    </svg>
  );
}

function FlagBR({
  className,
  clipId,
}: {
  className?: string;
  clipId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="-20 -10 40 20"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="-20" y="-10" width="40" height="20" rx="2" ry="2" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect x="-20" y="-10" width="40" height="20" fill="#009c3b" />
        <path fill="#ffdf00" d="M0 -6.5 L18 0 L0 6.5 L-18 0 Z" />
        <circle cx="0" cy="0" r="4.3" fill="#002776" />
        <circle cx="0.5" cy="-0.5" r="1.1" fill="#fff" opacity="0.12" />
      </g>
    </svg>
  );
}

function FlagES({
  className,
  clipId,
}: {
  className?: string;
  clipId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="60" height="30" rx="2" ry="2" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="7.5" fill="#AA151B" />
        <rect y="7.5" width="60" height="15" fill="#F1BF00" />
        <rect y="22.5" width="60" height="7.5" fill="#AA151B" />
      </g>
    </svg>
  );
}

function FlagCN({
  className,
  clipId,
}: {
  className?: string;
  clipId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 900 600"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="900" height="600" rx="36" ry="36" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="900" height="600" fill="#de2910" />
        <g fill="#ffde00">
          <path d="m135 120 20 62h64l-52 38 20 62-52-38-52 38 20-62-52-38h64z" />
          <path d="m277 144 13 40 42-30-32 25 12 40-28-32-28 32 12-40-32-25 42 30z" />
          <path d="m313 216 13 40 42-30-32 25 12 40-28-32-28 32 12-40-32-25 42 30z" />
          <path d="m313 288 13 40 42-30-32 25 12 40-28-32-28 32 12-40-32-25 42 30z" />
          <path d="m277 360 13 40 42-30-32 25 12 40-28-32-28 32 12-40-32-25 42 30z" />
        </g>
      </g>
    </svg>
  );
}

function FlagDE({
  className,
  clipId,
}: {
  className?: string;
  clipId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="60" height="30" rx="2" ry="2" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="10" fill="#000" />
        <rect y="10" width="60" height="10" fill="#DD0000" />
        <rect y="20" width="60" height="10" fill="#FFCE00" />
      </g>
    </svg>
  );
}

function FlagJP({
  className,
  clipId,
}: {
  className?: string;
  clipId: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 30"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="60" height="30" rx="2" ry="2" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="30" fill="#fff" />
        <circle cx="30" cy="15" r="9" fill="#BC002D" />
      </g>
    </svg>
  );
}

type FlagComp = typeof FlagBR;

const OPTIONS: {
  locale: Locale;
  /** Código curto no botão (PT, EN…) */
  code: string;
  /** Nome no menu (nativo) */
  name: string;
  Flag: FlagComp;
  triggerUppercase: boolean;
}[] = [
  { locale: "pt", code: "PT", name: "Português", Flag: FlagBR, triggerUppercase: true },
  { locale: "en", code: "EN", name: "English", Flag: FlagUS, triggerUppercase: true },
  { locale: "es", code: "ES", name: "Español", Flag: FlagES, triggerUppercase: true },
  { locale: "zh", code: "中文", name: "中文", Flag: FlagCN, triggerUppercase: false },
  { locale: "de", code: "DE", name: "Deutsch", Flag: FlagDE, triggerUppercase: true },
  { locale: "ja", code: "JA", name: "日本語", Flag: FlagJP, triggerUppercase: true },
];

/* ─── tamanhos de bandeira ─── */
const flagTriggerWrap =
  "shrink-0 overflow-hidden rounded-[3px] shadow-[0_1px_6px_rgba(0,0,0,0.5)] ring-1 ring-white/20";
const flagTrigger = "h-[13px] w-[20px] block";

const flagItemWrap =
  "shrink-0 overflow-hidden rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.5)] ring-1 ring-white/10";
const flagItem = "h-[15px] w-[22px] block";

/** Dropdown: pílula com bandeira + código + chevron; lista com nomes completos. */
export function LanguageSwitcher() {
  const rawId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale } = useLocale();
  const pathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const router = useRouter();

  const current = OPTIONS.find((o) => o.locale === locale) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    function onPointer(e: MouseEvent | TouchEvent) {
      const el = rootRef.current;
      if (!el) return;
      const target = e.target;
      if (target instanceof Node && !el.contains(target)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(next: Locale) {
    setLocale(next);
    setOpen(false);
    if (/(^|\/)curriculo(\/|$)/.test(pathname)) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", next);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }
  }

  const triggerClip = `${rawId}-t`;
  const Chevron = open ? ChevronUp : ChevronDown;

  return (
    <div ref={rootRef} className="relative select-none print:hidden">
      {/* ── Pílula trigger ── */}
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Idioma"
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex items-center gap-[7px] rounded-full",
          "border border-[rgba(200,30,50,0.75)]",
          "bg-[rgba(6,2,4,0.72)] px-[11px] py-[7px]",
          "text-[11px] font-bold tracking-[0.13em] text-white",
          "shadow-[0_0_0_1px_rgba(255,59,59,0.08),0_6px_24px_rgba(0,0,0,0.5)]",
          "backdrop-blur-sm transition-all duration-150",
          "hover:border-[rgba(255,59,59,0.95)] hover:bg-[rgba(12,4,7,0.82)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow",
          current.triggerUppercase ? "uppercase" : "",
        ].join(" ")}
      >
        <span className={flagTriggerWrap}>
          <current.Flag clipId={triggerClip} className={flagTrigger} />
        </span>
        <span className="leading-none">{current.code}</span>
        <Chevron
          className="h-[13px] w-[13px] shrink-0 text-white/60"
          strokeWidth={2.5}
          aria-hidden
        />
      </button>

      {/* ── Menu ── */}
      {open && (
        <ul
          role="listbox"
          aria-label="Escolher idioma"
          className={[
            "absolute left-0 top-[calc(100%+6px)] z-[80]",
            "w-[168px] overflow-hidden rounded-2xl",
            "border border-[rgba(255,255,255,0.07)]",
            "bg-[rgba(8,3,5,0.97)]",
            "py-1",
            "shadow-[0_8px_40px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.04)]",
            "backdrop-blur-xl",
          ].join(" ")}
        >
          {OPTIONS.map((opt) => {
            const selected = opt.locale === locale;
            const clipId = `${rawId}-${opt.locale}`;
            return (
              <li key={opt.locale} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => select(opt.locale)}
                  className={[
                    "flex w-full items-center gap-[10px]",
                    "px-3 py-[9px] text-left",
                    "text-[13px] leading-none transition-colors duration-100",
                    "focus-visible:outline-none",
                    selected
                      ? "bg-[rgba(90,10,20,0.9)] font-bold text-white"
                      : "font-medium text-[rgba(255,255,255,0.42)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[rgba(255,255,255,0.78)]",
                  ].join(" ")}
                >
                  <span className={flagItemWrap}>
                    <opt.Flag clipId={clipId} className={flagItem} />
                  </span>
                  {opt.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
