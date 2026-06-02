import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { type Lang, translations } from "../i18n/translations";

const STORAGE_KEY = "taskgoblin-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations[Lang];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { readonly children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (globalThis.window === undefined) return "es";
    const stored = globalThis.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "es") return stored;
    
    // Auto-detect if not stored
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (!tz.startsWith("America/")) return "en";
      
      const usCanadaRegex = /New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Honolulu|Toronto|Vancouver|Montreal|Winnipeg|Edmonton|Halifax|St_Johns|Detroit|Indiana|Kentucky|Boise|Juneau|Sitka|Yakutat|Nome|Dawson|Regina|Swift_Current|Whitehorse|Inuvik|Iqaluit|Pangnirtung|Resolute|Rankin_Inlet|Cambridge_Bay|Nipigon|Rainy_River|Thunder_Bay|Atikokan|Creston|Dawson_Creek|Fort_Nelson/;
      if (usCanadaRegex.test(tz)) return "en";
      
      return "es";
    } catch (e) {
      return "es";
    }
  });

  const updateLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    if (globalThis.window !== undefined) {
      globalThis.localStorage.setItem(STORAGE_KEY, newLang);
      // Manually trigger a storage event for same-window listeners
      globalThis.dispatchEvent(new Event("storage_sync"));
    }
  }, []);

  useEffect(() => {
    const handleSync = () => {
      const stored = globalThis.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && (stored === "en" || stored === "es") && stored !== lang) {
        setLang(stored);
      }
    };

    globalThis.addEventListener("storage", handleSync);
    globalThis.addEventListener("storage_sync", handleSync);
    return () => {
      globalThis.removeEventListener("storage", handleSync);
      globalThis.removeEventListener("storage_sync", handleSync);
    };
  }, [lang]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang: updateLang,
    t: translations[lang]
  }), [lang, updateLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
