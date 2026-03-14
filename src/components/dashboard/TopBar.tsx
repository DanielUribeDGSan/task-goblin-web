import React, { useState } from "react";
import { Languages, PanelLeft, Tag } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";
import { PricingInfoModal } from "../PricingInfoModal";
import { motion, type Variants } from "framer-motion";

export const TopBar = ({ isVisible = true }: { isVisible?: boolean }) => {
  const { lang, setLang, t } = useLanguage();
  const { isMobile, toggleSidebar } = useLayout();
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const topBarVariants: Variants = {
    visible: { 
      y: 0, 
      height: "auto",
      opacity: 1, 
      transition: { 
        duration: 0.3, 
        ease: "easeOut",
        height: { duration: 0.3 }
      } 
    },
    hidden: { 
      y: -20, // Subtle lift instead of full -100 to avoid excessive movement with height 0
      height: 0,
      opacity: 0, 
      transition: { 
        duration: 0.2, 
        ease: "easeIn",
        height: { duration: 0.25 }
      } 
    },
  };

  const content = () => {
    if (isMobile) {
      return (
        <>
          <div className="flex flex-row flex-wrap w-full gap-x-4 gap-y-3 p-4 items-center">
            <div className="flex items-center gap-2">
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
                    alt="Task Goblin logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-lg font-bold text-white leading-none ml-2 truncate text-nowrap">
                  {t.appName}
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
          />
        </>
      );
    }

    return (
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden glass">
            <img
              src="/icon/TaskGoblin.png"
              alt="Task Goblin logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white leading-none">
              {t.appName}
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
        />
      </div>
    );
  };

  return (
    <motion.div
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={topBarVariants}
      className="sticky top-0 z-100 bg-transparent"
    >
      {content()}
    </motion.div>
  );
};

