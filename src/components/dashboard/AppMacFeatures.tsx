import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_CONFIGS, type RoomConfig, type AppType } from '../../constants/app_data';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  X,
  Plus,
  Menu,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX
} from 'lucide-react';
import { VideoLoader } from '../VideoLoader';

interface AppMacFeaturesProps {
  appType: AppType;
  setPermissionsModalOpen: (v: boolean) => void;
  setInfoModalOpen: (v: boolean) => void;
  setPaymentModalOpen: (v: boolean) => void;
}

export const AppMacFeatures = ({
  appType,
  setPermissionsModalOpen,
  setInfoModalOpen,
  setPaymentModalOpen,
}: AppMacFeaturesProps) => {
  const { t } = useLanguage();
  const config = APP_CONFIGS[appType];
  const allRooms = [...config.rooms.right, ...config.rooms.bottom];

  // Map app names for hero title
  const appNames = {
    'task-goblin': t.appName,
    'nexo': t.nexoAppName,
    'floaty': t.floatyAppName
  };

  // We will add a "hero" room as the first option to represent the general video/poster
  const heroRoom: RoomConfig = {
    id: 'general-intro',
    title: (appType === 'task-goblin' ? t.videoCardTitle : appType === 'nexo' ? t.nexoVideoCardTitle : t.floatyVideoCardTitle) || appNames[appType],
    distance: '',
    icon: config.heroIcon,
    aspectRatio: 'video',
    mediaItems: [
      { type: 'video', src: config.heroVideo, poster: config.heroPoster },
      ...config.heroImages.map((src: string) => ({ type: 'image' as const, src }))
    ]
  };

  const features = [heroRoom, ...allRooms];
  const [activeId, setActiveId] = useState<string | null>('general-intro');

  const activeFeature = activeId ? features.find(f => f.id === activeId) : null;
  const activeMedia = activeFeature ? activeFeature.mediaItems[0] : { type: 'image' as const, src: config.heroPoster };

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (activeMedia.type === 'video' && videoRef.current) {
      videoRef.current.load();
      setIsMuted(true);
      videoRef.current.muted = true;
      videoRef.current.currentTime = 2;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      setIsPlaying(false);
    }

    if (activeId && activeId !== 'general-intro') {
      setTimeout(() => {
        const el = document.getElementById(`feature-${activeId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [activeId, activeMedia.type]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
      }
    }
  };

  const accordionRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const [laptopHeight, setLaptopHeight] = useState<number | 'auto'>('auto');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      setTimeout(() => {
        if (laptopRef.current) {
          setLaptopHeight(laptopRef.current.offsetHeight);
        }
      }, 50);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className="w-full min-h-full max-w-[1400px] mx-auto py-8 lg:py-12 px-4 sm:px-8 flex flex-col">

      <div className="my-auto flex flex-col lg:flex-row-reverse gap-8 lg:gap-16 items-start">

        {/* Left Side: Laptop Frame */}
        <div ref={laptopRef} className="w-full lg:w-[60%] shrink-0 relative">
          <div className="relative mx-auto max-w-[800px]">
            <div className="relative w-full pb-[60.67%] bg-[#1A1A1A] rounded-[4%_4%_0_0] border-[4px] border-[#333] shadow-2xl overflow-hidden z-10">
              <div className="absolute inset-x-[2%] top-[3%] bottom-[5%] bg-black rounded-[2%] overflow-hidden flex items-center justify-center">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/20"
                  >
                    {activeMedia.type === 'video' ? (
                      <div className="relative group/video w-full h-full">
                        {!isVideoLoaded && (
                          <div className="absolute inset-0 z-30">
                            <VideoLoader size="medium" />
                          </div>
                        )}
                        <video
                          ref={videoRef}
                          key={activeMedia.src}
                          src={activeMedia.src}
                          autoPlay
                          muted={isMuted}
                          loop
                          playsInline
                          className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                          onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
                          onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                          onCanPlayThrough={() => setIsVideoLoaded(true)}
                          onLoadedData={() => setIsVideoLoaded(true)}
                          onLoadStart={() => setIsVideoLoaded(false)}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        >
                          <track kind="captions" />
                        </video>

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent transition-opacity duration-300">
                          <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer relative group/progress"
                            onClick={(e) => {
                              if (!videoRef.current) return;
                              const rect = e.currentTarget.getBoundingClientRect();
                              const pos = (e.clientX - rect.left) / rect.width;
                              videoRef.current.currentTime = pos * duration;
                            }}>
                            <div
                              className="absolute top-0 left-0 h-full bg-sh-accent"
                              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                            />
                            <div
                              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg"
                              style={{ left: `${(currentTime / (duration || 1)) * 100}%`, marginLeft: '-6px' }}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button
                                onClick={togglePlay}
                                className="text-white hover:text-sh-accent transition-colors cursor-pointer"
                              >
                                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                              </button>

                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
                                  }}
                                  className="text-white/70 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                                  title="-10s"
                                >
                                  <RotateCcw size={16} />
                                  <span className="text-[10px] font-bold">10</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (videoRef.current) videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
                                  }}
                                  className="text-white/70 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                                  title="+10s"
                                >
                                  <span className="text-[10px] font-bold">10</span>
                                  <RotateCw size={16} />
                                </button>
                              </div>

                              <button
                                onClick={() => {
                                  if (videoRef.current) {
                                    const newMute = !isMuted;
                                    videoRef.current.muted = newMute;
                                    setIsMuted(newMute);
                                  }
                                }}
                                className="text-white/70 hover:text-white transition-colors cursor-pointer ml-1"
                                title={isMuted ? "Unmute" : "Mute"}
                              >
                                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                              </button>
                            </div>

                            <div className="text-[10px] font-mono text-white/50 tracking-wider">
                              {Math.floor(currentTime / 60)}:{(Math.floor(currentTime % 60)).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{(Math.floor(duration % 60)).toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={activeMedia.src}
                        className="w-full h-full object-cover"
                        alt={activeFeature?.title || appNames[appType]}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

              </div>

              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black/50 z-20"></div>
            </div>

            <div className="relative w-[110%] -left-[5%] h-4 sm:h-6 bg-gradient-to-b from-[#444] to-[#222] rounded-b-xl shadow-2xl z-20 flex items-start justify-center">
              <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-[#111] rounded-b-lg mt-0 mx-auto"></div>
            </div>
            <div className="absolute -bottom-6 w-full h-6 bg-black/30 blur-xl"></div>

            <div className="lg:hidden mt-10 sm:mt-0 relative sm:absolute sm:-bottom-10 sm:left-4 sm:right-auto w-full sm:w-[320px] bg-[#1A1A1A] sm:bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-40 flex flex-col mb-8 sm:mb-0">
              <div className="flex justify-between items-start mb-2 shrink-0">
                <div className="flex items-center gap-3 leading-tight">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-white/5 flex items-center justify-center p-2">
                    <img src={activeFeature?.icon || config.iconPath} alt="" className="w-full h-full object-contain opacity-80" />
                  </div>
                  <span className="text-white font-bold text-base pr-2 line-clamp-1">
                    {activeId === 'general-intro'
                      ? heroRoom.title
                      : (activeId
                        ? (t.cardTitles[activeId as keyof typeof t.cardTitles] || activeFeature?.title)
                        : 'Select a feature')}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors shrink-0"
                >
                  <Menu size={18} className="text-white" />
                </button>
              </div>
              <div className="overflow-y-auto custom-scrollbar max-h-[350px] pr-2 pb-2">
                <p className="text-sm text-[#A1A1A6] leading-relaxed">
                  {activeId === 'general-intro'
                    ? (appType === 'task-goblin' ? t.permissionsCard.featuresTitle : (appType === 'nexo' ? t.nexoIntro : t.floatyIntro))
                    : (activeId
                      ? t.cardDescriptions[activeId as keyof typeof t.cardDescriptions]
                      : 'Tap the menu button on the right to view and select the features you want to explore.')}
                </p>

                {appType === 'task-goblin' && activeId === 'general-intro' && (
                  <div className="flex flex-col gap-3 mt-4">
                    <ul className="list-disc list-inside text-[13px] text-[#A1A1A6] space-y-1 mb-2">
                      {t.featuresList.slice(0, 4).map((item) => (
                        <li key={'m-' + item} className="break-words">
                          {item}
                        </li>
                      ))}
                      <li className="text-white/50 list-none ml-2">...</li>
                    </ul>

                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setPermissionsModalOpen(true); }}
                      className="w-full flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <ShieldCheck size={20} className="text-white shrink-0" />
                        <span className="text-sm font-bold text-white line-clamp-1">
                          {t.permissionsCard.title}
                        </span>
                      </div>
                      <ChevronRight size={18} className="text-[#86868B] shrink-0" />
                    </button>

                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setPaymentModalOpen(true); }}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#9782ff] border border-white/20 px-3 py-2.5 hover:opacity-90 transition-all cursor-pointer shadow-[0_0_20px_rgba(151,130,255,0.4)]"
                      >
                        <Sparkles size={16} className="shrink-0 text-black" />
                        <span className="text-sm font-bold text-black">
                          {t.permissionsCard.getTaskGoblinPro}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setInfoModalOpen(true); }}
                        className="w-full flex items-center justify-center gap-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        {t.permissionsCard.getMoreInfo}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Features Accordion (Desktop Only) */}
        <div
          ref={accordionRef}
          style={{ maxHeight: typeof laptopHeight === 'number' ? `${laptopHeight}px` : 'auto' }}
          className="hidden lg:flex w-[40%] flex-col gap-3 py-0 justify-start overflow-y-auto pr-2 custom-scrollbar"
        >
          {features.map((feature) => {
            const isActive = activeId === feature.id;
            const titleStr = feature.id === 'general-intro'
              ? feature.title
              : t.cardTitles[feature.id as keyof typeof t.cardTitles] ?? feature.title;

            const descStr = feature.id === 'general-intro'
              ? (appType === 'task-goblin' ? t.permissionsCard.featuresTitle : (appType === 'nexo' ? t.nexoIntro : t.floatyIntro))
              : t.cardDescriptions[feature.id as keyof typeof t.cardDescriptions];

            return (
              <div
                id={`feature-${feature.id}`}
                key={feature.id}
                className={`shrink-0 transition-all duration-300 rounded-3xl overflow-hidden ${isActive ? 'bg-[#1C1C1E]' : 'bg-transparent hover:bg-[#1C1C1E]/50'
                  }`}
              >
                <button
                  onClick={() => setActiveId(activeId === feature.id ? null : feature.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center p-2">
                      <img src={feature.icon || config.iconPath} alt="" className="w-full h-full object-contain filter group-hover:brightness-110 transition-all opacity-80" />
                    </div>
                    <span className={`text-[17px] font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#86868B] group-hover:text-white'}`}>
                      {titleStr}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#86868B]"
                    >
                      {isActive ? <X size={20} /> : <Plus size={20} />}
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 pt-0 ml-14">
                        <p className="text-[15px] leading-relaxed text-[#A1A1A6] mb-4 whitespace-pre-line">
                          {descStr}
                        </p>

                        {appType === 'task-goblin' && feature.id === 'general-intro' && (
                          <div className="flex flex-col gap-3 mt-4">
                            <ul className="list-disc list-inside text-sm text-[#A1A1A6] space-y-1.5 mb-2">
                              {t.featuresList.slice(0, 4).map((item) => (
                                <li key={item} className="break-words">
                                  {item}
                                </li>
                              ))}
                              <li className="text-white/50 list-none ml-2">...</li>
                            </ul>

                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); setPermissionsModalOpen(true); }}
                              className="w-full flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <ShieldCheck size={20} className="text-white" />
                                <span className="text-sm font-bold text-white">
                                  {t.permissionsCard.title}
                                </span>
                              </div>
                              <ChevronRight size={18} className="text-[#86868B] group-hover:text-white" />
                            </button>

                            <div className="flex flex-col xl:flex-row items-stretch gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setPaymentModalOpen(true); }}
                                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#9782ff] border border-white/20 px-3 py-2.5 hover:opacity-90 transition-all cursor-pointer shadow-[0_0_20px_rgba(151,130,255,0.4)]"
                                >
                                  <Sparkles size={16} className="shrink-0 text-black" />
                                  <span className="text-sm font-bold text-black text-center">
                                    {t.permissionsCard.getTaskGoblinPro}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); setInfoModalOpen(true); }}
                                  className="flex-1 flex items-center justify-center gap-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                                >
                                  <span className="text-center">{t.permissionsCard.getMoreInfo}</span>
                                </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[999999] bg-[#0E0E0E] flex flex-col pt-32 pb-6 px-4 lg:hidden"
          >
            <div className="flex justify-between items-center mb-6 px-2 mt-4">
              <h2 className="text-2xl font-bold text-white">Opciones</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 pb-10">
              {features.map((feature) => {
                const isActive = activeId === feature.id;
                const titleStr = feature.id === 'general-intro'
                  ? heroRoom.title
                  : t.cardTitles[feature.id as keyof typeof t.cardTitles] ?? feature.title;
                return (
                  <button
                    key={'mobile-' + feature.id}
                    onClick={() => {
                      setActiveId(feature.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-colors text-left ${isActive ? 'bg-[#1C1C1E]' : 'bg-transparent hover:bg-white/5'
                      }`}
                  >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-white/5 flex items-center justify-center p-2">
                      <img src={feature.icon || config.iconPath} alt="" className="w-full h-full object-contain filter opacity-80" />
                    </div>
                    <span className={`text-[17px] font-semibold ${isActive ? 'text-white' : 'text-[#86868B]'}`}>
                      {titleStr}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
