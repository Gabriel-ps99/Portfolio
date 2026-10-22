import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { content, type Content, type Lang } from "./content";

const STORAGE_KEY = "portfolio-lang";

interface LanguageValue {
  lang: Lang;
  t: Content;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    // storage unavailable (private mode, blocked cookies)
  }

  // First match wins: respects the visitor's preference order.
  for (const code of navigator.languages ?? [navigator.language]) {
    const base = code.toLowerCase().split("-")[0];
    if (base === "pt") return "pt";
    if (base === "en") return "en";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggle = useCallback(() => setLang(lang === "pt" ? "en" : "pt"), [lang, setLang]);

  useEffect(() => {
    const { meta } = content[lang];
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, t: content[lang], setLang, toggle }),
    [lang, setLang, toggle],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
