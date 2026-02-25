import { Languages, PanelLeft } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";

export const TopBar = () => {
  const { lang, setLang, t } = useLanguage();
  const { isMobile, toggleSidebar } = useLayout();

  if (isMobile) {
    return (
      <div className="flex flex-col w-full gap-3 p-4 items-start">
        <div className="flex items-center gap-2 w-auto">
          <button
            type="button"
            onClick={toggleSidebar}
            className="w-10 h-10 shrink-0 rounded-xl glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            aria-label="Abrir menú"
          >
            <PanelLeft size={22} />
          </button>
          <div className="flex items-center min-w-0">
            <div className="w-9 h-9 rounded-xl overflow-hidden glass shrink-0">
              <img
                src="/icon/TaskGoblin.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-lg font-bold text-white leading-none ml-2 truncate">
              {t.appName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 w-auto">
          <Languages size={18} className="text-sh-text-muted shrink-0" />
          <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
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
              className={`px-3 py-2 text-sm font-medium transition-colors ${
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
  }

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
