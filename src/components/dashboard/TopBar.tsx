import React, { useState } from "react";
import { Languages, PanelLeft, Tag } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";
import { PricingInfoModal } from "../PricingInfoModal";
import { APP_CONFIGS } from "../../constants/app_data";

type AppType = keyof typeof APP_CONFIGS;

export const TopBar = ({ isVisible = true, appType = "task-goblin" }: { isVisible?: boolean, appType?: AppType }) => {
  const { lang, setLang, t } = useLanguage();
  const { isMobile, toggleSidebar } = useLayout();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const config = APP_CONFIGS[appType];

  const content = () => {
    const appName = appType === "nexo" ? t.nexoAppName : t.appName;
    const appIcon = config.iconPath;

    if (isMobile) {
      return (
        <>
          <div className="flex flex-row flex-wrap w-full gap-x-4 gap-y-3 p-4 items-center">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSidebar}
                className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Abrir menú"
              >
                <PanelLeft size={22} />
              </button>
              <div className="flex items-center min-w-0">
                <div className="w-9 h-9 rounded-xl overflow-hidden glass shrink-0 p-1.5 flex items-center justify-center">
                  <img
                    src={appIcon}
                    alt={`${appName} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-lg font-bold text-white leading-none ml-2 truncate text-nowrap">
                  {appName}
                </h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsPricingModalOpen(true)}
              className="w-10 h-10 shrink-0 rounded-lg glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Ver Precio"
            >
              <Tag size={18} />
            </button>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <Languages size={18} className="text-sh-text-muted shrink-0 mx-1" />
              <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5">
                <button
                  type="button"
                  onClick={ () => setLang("es")}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${lang === "es"
                      ? "bg-brand-cyan text-black"
                      : "text-sh-text-muted hover:text-white"
                    }`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={ () => setLang("en")}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${lang === "en"
                      ? "bg-brand-cyan text-black"
                      : "text-sh-text-muted hover:text-white"
                    }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
          <PricingInfoModal
            isOpen={isPricingModalOpen}
            onClose={() => setIsPricingModalOpen(false)}
            appType={appType}
          />
        </>
      );
    }

    return (
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden glass p-2">
            <img
              src={appIcon}
              alt={`${appName} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-none">
              {appName}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3 w-auto">
          <div className="flex items-center gap-2">
            <Languages size={20} className="text-sh-text-muted shrink-0 mx-1" />
            <div className="flex rounded-lg overflow-hidden border border-white/10 bg-white/5">
              <button
                type="button"
                onClick={ () => setLang("es")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${lang === "es"
                    ? "bg-brand-cyan text-black"
                    : "text-sh-text-muted hover:text-white"
                  }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={ () => setLang("en")}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${lang === "en"
                    ? "bg-brand-cyan text-black"
                    : "text-sh-text-muted hover:text-white"
                  }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
        <PricingInfoModal
          isOpen={isPricingModalOpen}
          onClose={() => setIsPricingModalOpen(false)}
          appType={appType}
        />
      </div>
    );
  };

  return (
    <div
      className={`sticky top-0 z-100 bg-transparent transition-all duration-300 ease-in-out origin-top border-b border-transparent ${
        isVisible 
          ? "translate-y-0 opacity-100 pointer-events-auto pb-0" 
          : "-translate-y-full opacity-0 pointer-events-none -mb-[100px]" // Use negative margin to "swallow" the space without shrinking
      }`}
    >
      {content()}
    </div>
  );
};
