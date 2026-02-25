import { Languages } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

export const TopBar = () => {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl overflow-hidden glass">
          <img
            src="/icon/TaskGoblin.png"
            alt="Task Goblin"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white leading-none">
            {t.appName}
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Languages size={20} className="text-sh-text-muted shrink-0" />
        <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5">
          <button
            type="button"
            onClick={() => setLang("es")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === "es"
                ? "bg-brand-cyan text-black"
                : "text-sh-text-muted hover:text-white"
            }`}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              lang === "en"
                ? "bg-brand-cyan text-black"
                : "text-sh-text-muted hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
};
