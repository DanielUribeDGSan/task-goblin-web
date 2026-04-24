"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ArrowRight, Languages } from "lucide-react";
import { APP_CONFIGS } from "../constants/app_data";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import { LayoutProvider } from "../contexts/LayoutContext";
import { VideoLoader } from "./VideoLoader";
import { Sparkles } from "lucide-react";
import { PaymentModal } from "./PaymentModal";

const APPS = Object.entries(APP_CONFIGS).map(([id, config]) => ({
  id,
  ...config,
}));

export const MultiProductCarousel = () => {
  return (
    <LanguageProvider>
      <LayoutProvider>
        <CarouselContent />
      </LayoutProvider>
    </LanguageProvider>
  );
};

const CarouselContent = () => {
  const { lang, setLang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const activeApp = APPS[activeIndex] as any;
  const { accentColor, secondaryColor, backgroundColor } = activeApp;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % APPS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + APPS.length) % APPS.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(handleNext, 15000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused]);

  // Safety timeout for video loading
  useEffect(() => {
    if (!isVideoLoaded) {
      const timer = setTimeout(() => {
        setIsVideoLoaded(true);
      }, 10000); // 10 seconds timeout for the hero video
      return () => clearTimeout(timer);
    }
  }, [activeApp.id, isVideoLoaded]);

  // Update global CSS variables based on active app colors
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--sh-accent', accentColor);
    root.style.setProperty('--tg-accent', accentColor);
    root.style.setProperty('--sh-accent-muted', `${accentColor}33`);
    root.style.setProperty('--sh-panel-border', `${accentColor}14`);

    if (backgroundColor) {
      root.style.setProperty('--sh-background', backgroundColor);
      document.body.style.backgroundColor = backgroundColor;
    }
  }, [activeApp, accentColor, backgroundColor]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col sm:flex-row justify-center">
      <div className="absolute top-14 sm:top-2 left-1/2 -translate-x-1/2 z-[110]">
        <motion.a
          href={`${activeApp.path}?buy=true`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 text-black font-bold py-3 px-6 rounded-full shadow-2xl transition-all border border-white/20 whitespace-nowrap no-underline"
          style={{ 
            backgroundColor: accentColor,
            boxShadow: `0 10px 30px -5px ${accentColor}4D`
          }}
        >
          <Sparkles size={20} className="animate-pulse" />
          <span className="text-sm uppercase tracking-wider">{t.bottomBar.buyLicense}</span>
        </motion.a>
      </div>

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        appType={activeApp.id}
      />
      {/* Language Switcher */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 sm:left-auto sm:right-8 sm:top-8 z-[100] flex items-center gap-2">
        <Languages size={18} className="text-white/40" />
        <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
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
      {/* Glow Background */}
      <div
        className="absolute inset-0 opacity-40 transition-colors duration-1000 blur-[120px]"
        style={{
          background: `radial-gradient(circle at 20% 30%, ${accentColor}, transparent 50%), 
                       radial-gradient(circle at 80% 70%, ${secondaryColor}, transparent 50%)`
        }}
      />

      {/* Left Section: App Preview */}
      <div className="relative flex-none sm:flex-1 flex items-center justify-center p-4 sm:p-16 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeApp.id}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="relative w-full max-w-4xl"
          >
            {/* Monitor/UI Container */}
            <a href={activeApp.path} className="relative group block no-underline cursor-pointer">
              <div
                className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"
                style={{ backgroundColor: accentColor }}
              />
              <div
                className="relative rounded-3xl sm:rounded-4xl border border-white/10 overflow-hidden shadow-2xl aspect-16/10 transition-colors duration-500"
                style={{ backgroundColor: (activeApp as any).backgroundColor || '#0a0a0a' }}
              >
                {/* Window Controls */}
                <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2 z-20">
                  <div className="w-2 h-2 rounded-full bg-red-500/40" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                  <div className="w-2 h-2 rounded-full bg-green-500/40" />
                  <div className="ml-2 h-4 w-24 sm:w-32 bg-white/5 rounded-md" />
                </div>
                {/* Preview Media */}
                <div className="w-full h-full relative">
                  {/* Forzamos imagen en el carrusel principal como se solicitó anteriormente */}
                  {false && (activeApp as any).heroVideo ? (
                    <>
                      {!isVideoLoaded && (
                        <div className="absolute inset-0 z-30">
                          <VideoLoader icon={activeApp.iconPath} size="medium" />
                        </div>
                      )}
                      <video
                        key={(activeApp as any).heroVideo}
                        src={(activeApp as any).heroVideo + "#t=2"}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onCanPlay={() => setIsVideoLoaded(true)}
                        onCanPlayThrough={() => setIsVideoLoaded(true)}
                        onLoadedData={() => setIsVideoLoaded(true)}
                        onLoadedMetadata={() => setIsVideoLoaded(true)}
                        onPlaying={() => setIsVideoLoaded(true)}
                        onLoadStart={() => setIsVideoLoaded(false)}
                        onError={() => setIsVideoLoaded(true)}
                        className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                      />
                    </>
                  ) : (
                    <img
                      src={(activeApp as any).heroPoster}
                      alt={(activeApp as any).name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
 
                {/* Overlay with info */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 bg-gradient-to-t from-black via-black/80 via-black/40 to-transparent z-20">
                  <motion.h1
                    className="text-2xl sm:text-6xl font-bold text-white mb-1 sm:mb-2 truncate drop-shadow-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {(activeApp as any).name}
                  </motion.h1>
                  <motion.p
                    className="text-white/70 text-sm sm:text-lg max-w-xl mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-none drop-shadow-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {activeApp.id === 'task-goblin'
                      ? t.taskGoblinMarketing
                      : activeApp.id === 'nexo'
                        ? t.nexoMarketing
                        : t.floatyMarketing}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-black text-sm sm:text-base font-bold rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform"
                    style={{ 
                      viewTransitionName: 'page-transition-button',
                      backgroundColor: 'white'
                    }}
                  >
                    {lang === 'es' ? 'Entrar' : 'Enter'}
                    <ArrowRight size={18} />
                  </motion.div>
                </div>
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Section: Vertical Carousel / Switcher */}
      <div className="w-full sm:w-[350px] lg:w-[400px] border-t sm:border-t-0 sm:border-l border-white/5 bg-white/[0.02] backdrop-blur-3xl p-4 sm:p-12 flex flex-col justify-center gap-6 sm:gap-8 z-20">
        <div className="flex flex-col gap-4 sm:gap-6 relative">
          {/* Nav Buttons - Hidden or minimized on mobile to save space */}
          <div className="hidden sm:flex absolute -top-12 left-1/2 -translate-x-1/2 flex-col gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white/40 hover:text-white transition-all"
            >
              <ChevronUp size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-4 overflow-visible pb-0">
            {APPS.map((app, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={app.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="text-left group outline-none shrink-0"
                >
                  <div className={`
                    relative p-4 sm:p-6 rounded-3xl sm:rounded-4xl border transition-all duration-500
                    ${isActive
                      ? 'bg-white/10 border-white/20 shadow-xl scale-100'
                      : 'bg-transparent border-transparent opacity-40 hover:opacity-100 scale-95'}
                  `}>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center bg-white/5 border border-white/10"
                        style={{
                          color: isActive ? app.accentColor : 'white',
                          viewTransitionName: isActive ? `app-icon-${app.id}` : 'none'
                        }}
                      >
                        <img src={app.iconPath} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                      </div>
                      <div>
                        <h3
                          className={`text-base sm:text-xl font-bold transition-colors text-white`}
                          style={{ viewTransitionName: isActive ? `app-title-${app.id}` : 'none' }}
                        >
                          {app.name}
                        </h3>

                      </div>
                    </div>

                    {/* Progress Indicator Card */}
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full overflow-hidden bg-white/5 mt-4"
                      >
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: app.accentColor }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 15, ease: "linear" }}
                        />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col gap-2 scale-75 lg:scale-100">
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-white/10 hover:bg-white/5 text-white/40 hover:text-white transition-all"
            >
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
