import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { APP_CONFIGS } from "../../constants/app_data";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";

type AppType = keyof typeof APP_CONFIGS;

interface DynamicIslandProps {
  activeAppId: AppType;
}

export const DynamicIsland = ({ activeAppId }: DynamicIslandProps) => {
  const { t } = useLanguage();
  const { isMobile } = useLayout();
  const [isExpanded, setIsExpanded] = useState(false);
  const activeConfig = APP_CONFIGS[activeAppId];
  
  const appIds = Object.keys(APP_CONFIGS) as AppType[];
  const inactiveAppIds = appIds.filter(id => id !== activeAppId);

  const activeName = activeAppId === "task-goblin" ? t.appName : activeAppId === "nexo" ? t.nexoAppName : t.floatyAppName;
  const rawDesc = activeAppId === "task-goblin" ? t.modalInfo.subtitle : activeAppId === "nexo" ? t.nexoIntro.split('.')[0] : t.floatyIntro.split('.')[0];
  
  // Truncate description to 50 chars
  const activeDesc = rawDesc.length > 50 ? `${rawDesc.substring(0, 47)}...` : rawDesc;

  return (
    <div className={`relative flex flex-col items-center w-full ${isMobile ? 'min-h-[80px] pt-2' : 'min-h-[100px] pt-4'} pointer-events-auto z-[200]`}>
      <motion.div
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
        className={`bg-black shadow-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center border border-white/5 ${isExpanded ? 'absolute z-[201]' : 'relative'}`}
        initial={false}
        animate={{ 
          width: isExpanded 
            ? (isMobile ? "calc(100% - 24px)" : 440) 
            : (isMobile ? "min(320px, 85vw)" : 320),
          height: isExpanded 
            ? (isMobile ? 240 : 130) 
            : 48,
          borderRadius: isExpanded ? "2.2rem" : "1.6rem",
          backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.98)" : "rgba(0, 0, 0, 1)"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* COLLAPSED STATE (PILL) */
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between w-full px-5 h-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center">
                  <img src={activeConfig.iconPath} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="text-[14px] font-bold text-white tracking-wide uppercase opacity-90">
                  {activeName}
                </span>
              </div>

              <div className="flex flex-col items-center gap-0.5 mt-1">
                <div className="flex items-center gap-2 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                  {inactiveAppIds.map(id => (
                    <div key={id} className="w-4 h-4 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                      <img src={APP_CONFIGS[id].iconPath} alt="" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* EXPANDED STATE (LARGE CARD) */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col w-full h-full p-4 sm:p-5 justify-center"
            >
              <div className={`flex ${isMobile ? 'flex-col gap-4' : 'flex-row justify-between gap-6'} items-center w-full`}>
                {/* Left: Active App Info */}
                <div className={`flex items-center gap-4 flex-1 min-w-0 ${isMobile ? 'w-full px-2' : ''}`}>
                  <motion.div 
                    layoutId="large-icon"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 p-2.5 flex items-center justify-center shadow-inner shrink-0"
                  >
                    <img src={activeConfig.iconPath} alt="" className="w-full h-full object-contain shadow-2xl" />
                  </motion.div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight truncate">
                      {activeName}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-white/40 font-medium truncate">
                      {activeDesc}
                    </p>
                  </div>
                </div>

                {/* Right: More Apps Switcher */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-white/20">
                    <span className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase">
                      {t.moreAppsTitle}
                    </span>
                    <ChevronDown size={18} className="animate-bounce" />
                  </div>
                  <div className="flex gap-2">
                    {inactiveAppIds.map(id => {
                      const cfg = APP_CONFIGS[id];
                      const name = id === "task-goblin" ? t.appName : id === "nexo" ? t.nexoAppName : t.floatyAppName;
                      return (
                        <a
                          key={id}
                          href={cfg.path}
                          className="flex flex-col items-center gap-1 group"
                        >
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-105 transition-all">
                            <img src={cfg.iconPath} alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-[8px] sm:text-[9px] font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase">
                            {name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {!isExpanded && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mt-2 text-white/20"
        >
          <ChevronUp size={14} className="animate-bounce" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] -mt-1">
            {t.seeMoreApps}
          </span>
        </motion.div>
      )}
    </div>
  );
};
