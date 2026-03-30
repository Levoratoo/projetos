"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

export type Locale = "pt" | "en" | "es" | "zh" | "de" | "ja";

const STORAGE_KEY = "printbag-locale";

const LOCALE_ORDER: Locale[] = ["pt", "en", "es", "zh", "de", "ja"];

function isLocale(v: string | null): v is Locale {
  return (
    v === "pt" ||
    v === "en" ||
    v === "es" ||
    v === "zh" ||
    v === "de" ||
    v === "ja"
  );
}

/** `?lang=` na URL (mesma prioridade que no currículo), exportado para `LocaleUrlSync`. */
export function localeFromSearchParam(raw: string | null): Locale | null {
  if (raw == null || raw === "") return null;
  const v = raw.trim().toLowerCase();
  if (v === "pt-br" || v === "pt_br") return "pt";
  if (isLocale(v)) return v;
  return null;
}

function localeToHtmlLang(locale: Locale): string {
  switch (locale) {
    case "en":
      return "en";
    case "es":
      return "es";
    case "zh":
      return "zh-CN";
    case "de":
      return "de";
    case "ja":
      return "ja";
    default:
      return "pt-BR";
  }
}

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * Idioma ao abrir o site: português por padrão; só outro idioma se `?lang=` estiver na URL.
 * O que o usuário escolher no seletor continua sendo salvo em localStorage (para referência),
 * mas não restauramos esse valor na próxima abertura — cada visita começa em PT até trocar de novo.
 */
function readInitialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = localeFromSearchParam(params.get("lang"));
    if (fromUrl) return fromUrl;
  } catch {
    /* ignore */
  }
  return "pt";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    setLocaleState(readInitialLocale());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = localeToHtmlLang(locale);
    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const i = LOCALE_ORDER.indexOf(prev);
      return LOCALE_ORDER[(i + 1) % LOCALE_ORDER.length];
    });
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

/**
 * Mantém o idioma alinhado ao `?lang=` em navegações client-side (voltar/avançar, links com query).
 * Deve ficar dentro de `LocaleProvider` e `Suspense` (usa `useSearchParams`).
 */
export function LocaleUrlSync() {
  const { setLocale } = useLocale();
  const searchParams = useSearchParams();
  useEffect(() => {
    const fromUrl = localeFromSearchParam(searchParams.get("lang"));
    if (fromUrl) setLocale(fromUrl);
  }, [searchParams, setLocale]);
  return null;
}
