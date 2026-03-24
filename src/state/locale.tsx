"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(v)) return v;
  } catch {
    /* ignore */
  }
  return "pt";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocaleState(readStoredLocale());
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
