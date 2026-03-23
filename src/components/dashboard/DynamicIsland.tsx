import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_CONFIGS } from "../../constants/app_data";
import { useLanguage } from "../../contexts/LanguageContext";

type AppType = keyof typeof APP_CONFIGS;

interface DynamicIslandProps {
  activeAppId: AppType;
}

export const DynamicIsland = ({ activeAppId }: DynamicIslandProps) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const activeConfig = APP_CONFIGS[activeAppId];
  
  const appIds = Object.keys(APP_CONFIGS) as AppType[];
  const inactiveAppIds = appIds.filter(id => id !== activeAppId);

  const activeName = activeAppId === "task-goblin" ? t.appName : activeAppId === "nexo" ? t.nexoAppName : t.floatyAppName;
  const rawDesc = activeAppId === "task-goblin" ? t.modalInfo.subtitle : activeAppId === "nexo" ? t.nexoIntro.split('.')[0] : t.floatyIntro.split('.')[0];
  
  // Truncate description to 50 chars
  const activeDesc = rawDesc.length > 50 ? `${rawDesc.substring(0, 47)}...` : rawDesc;

  return (
    <div className="relative flex justify-center w-full pt-4 pointer-events-auto">
      <motion.div
        layout
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="relative bg-black shadow-2xl overflow-hidden cursor-pointer flex flex-col items-center justify-center border border-white/5"
        initial={false}
        animate={{ 
          width: isExpanded ? 440 : 280,
          height: isExpanded ? 130 : 44,
          borderRadius: isExpanded ? "2.5rem" : "1.4rem",
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
              className="flex items-center justify-between w-full px-4 h-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={activeConfig.iconPath} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="text-[13px] font-bold text-white tracking-wide uppercase opacity-90">
                  {activeName}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                {inactiveAppIds.map(id => (
                  <div key={id} className="w-5 h-5 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
                    <img src={APP_CONFIGS[id].iconPath} alt="" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* EXPANDED STATE (LARGE CARD) */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col w-full h-full p-5 justify-center"
            >
              <div className="flex items-center justify-between w-full gap-6">
                {/* Left: Active App Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <motion.div 
                    layoutId="large-icon"
                    className="w-14 h-14 rounded-2xl bg-white/10 p-2.5 flex items-center justify-center shadow-inner shrink-0"
                  >
                    <img src={activeConfig.iconPath} alt="" className="w-full h-full object-contain shadow-2xl" />
                  </motion.div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="text-lg font-bold text-white leading-tight truncate">
                      {activeName}
                    </h3>
                    <p className="text-xs text-white/40 font-medium truncate">
                      {activeDesc}
                    </p>
                  </div>
                </div>

                {/* Right: More Apps Switcher */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-black text-white/20 tracking-widest uppercase mb-1">
                    {t.moreAppsTitle}
                  </span>
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
                          <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-105 transition-all">
                            <img src={cfg.iconPath} alt="" className="w-7 h-7 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="text-[9px] font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase">
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
    </div>
  );
};
