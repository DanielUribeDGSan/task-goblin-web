import React, { useState } from "react";
import { Tag } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";
import { PricingInfoModal } from "../PricingInfoModal";
import { APP_CONFIGS } from "../../constants/app_data";
import { DynamicIsland } from "./DynamicIsland";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

type AppType = keyof typeof APP_CONFIGS;

export const TopBar = ({ isVisible = true, appType = "task-goblin" }: { isVisible?: boolean, appType?: AppType }) => {
  const { lang, setLang, t } = useLanguage();
  const { isMobile } = useLayout();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const content = () => {
    return (
      <div className="relative w-full flex flex-col items-center">
        {/* Dynamic Island Wrapper */}
        <div className="w-full max-w-[1600px] px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-10 h-10 lg:flex hidden order-1" /> {/* Spacer */}

          <div className="flex-1 flex justify-center w-full order-1 md:order-2">
            <DynamicIsland activeAppId={appType} />
          </div>

          {/* Right Actions: Language & Pricing proooo */}
          <div className="flex items-center gap-2 lg:gap-4 h-[50px] order-2 md:order-3">
            {isMobile && (
              <button
                type="button"
                onClick={() => setIsPricingModalOpen(true)}
                className="w-10 h-10 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Ver Precio"
              >
                <Tag size={18} />
              </button>
            )}

            <div className="flex items-center gap-2 shrink-0">
              <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <button
                  type="button"
                  onClick={() => setLang("es")}
                  className={`px-3 py-1.5 text-xs font-bold transition-all ${lang === "es"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 text-xs font-bold transition-all ${lang === "en"
                    ? "bg-white text-black"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                    }`}
                >
                  EN
                </button>
              </div>
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
      className={`absolute top-0 left-0 right-0 z-[100] bg-transparent transition-all duration-500 ease-in-out origin-top ${isVisible
        ? "translate-y-0 opacity-100 pointer-events-auto"
        : "-translate-y-full opacity-0 pointer-events-none scale-95 blur-md"
        }`}
    >
      {/* Floating Notice - Top Left */}
      <div className="absolute top-6 left-6 hidden xl:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 glass rounded-full px-4 py-2.5 border border-white/10 shadow-xl"
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 25 },
          }}
        >
          <Info size={18} className="shrink-0 text-sh-text-muted" aria-hidden />
          <p className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--sh-accent)' }}>
            {t.newFeaturesNotice}
          </p>
        </motion.div>
      </div>

      {content()}
    </div>
  );
};
