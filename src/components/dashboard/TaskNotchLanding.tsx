import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Apple,
  Terminal,
  Inbox,
  ScanText,
  Sparkles,
  Languages,
  Video,
  FileText,
  Eraser,
  Palette,
  RefreshCw,
  Play,
  Pause,
  Download,
  Globe,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Home,
  CheckCircle,
  Pin,
  Briefcase,
  Power,
  Brain,
  Pipette,
  Plus,
  Settings,
  VolumeX,
  Volume2,
} from "lucide-react";
import { LanguageProvider, useLanguage } from "../../contexts/LanguageContext";
import { LayoutProvider } from "../../contexts/LayoutContext";
import { triggerSecureDownload } from "../../utils/download";
import { PaymentModal } from "../PaymentModal";
import { DownloadModal, type Platform as DownloadPlatform } from "../DownloadModal";

interface NotchOption {
  id: string;
  nameEs: string;
  nameEn: string;
  video: string;
  icon: React.ComponentType<any>;
  descEs: string;
  descEn: string;
  badgeEs?: string;
  badgeEn?: string;
}

const NOTCH_OPTIONS: NotchOption[] = [
  {
    id: "nook",
    nameEs: "Nook",
    nameEn: "Nook",
    video: "/task-notch/home.mp4",
    icon: Pin,
    descEs: "Un espacio flotante siempre a mano en tu notch para pinear notas, links y recordatorios rápidos.",
    descEn: "A floating space always at hand in your notch to pin quick notes, links, and reminders.",
  },
  {
    id: "tray",
    nameEs: "Tray",
    nameEn: "Tray",
    video: "/task-notch/tray.mp4",
    icon: Briefcase,
    descEs: "Una bandeja temporal para arrastrar, soltar e intercambiar archivos entre tus aplicaciones al instante.",
    descEn: "A temporary tray to drag, drop, and exchange files between your applications instantly.",
  },
  {
    id: "capturar-texto",
    nameEs: "Capturar texto",
    nameEn: "Capture text",
    video: "/task-notch/capturar-texto.mp4",
    icon: ScanText,
    descEs: "Extrae y copia texto de cualquier imagen, PDF o video en tu pantalla con un solo click.",
    descEn: "Extract and copy text from any image, PDF, or video on your screen with a single click.",
  },
  {
    id: "responder-preguntas",
    nameEs: "Resolver pregunta",
    nameEn: "Solve question",
    video: "/task-notch/responder-preguntas.mp4",
    icon: Brain,
    descEs: "Captura una pregunta o examen de tu pantalla y deja que la IA te dé la respuesta y explicación en segundos.",
    descEn: "Capture a question or exam from your screen and let AI give you the answer and explanation in seconds.",
  },
  {
    id: "traducir-texto",
    nameEs: "Traductor inteligente",
    nameEn: "Smart Translator",
    video: "/task-notch/traducir-texto.mp4",
    icon: Languages,
    descEs: "Traduce cualquier fragmento de texto o imagen en tu pantalla a cualquier idioma de forma inmediata.",
    descEn: "Translate any snippet of text or image on your screen to any language immediately.",
  },
  {
    id: "reducir-tamaño",
    nameEs: "Video IA",
    nameEn: "Video AI",
    video: "/task-notch/reducir-tamaño.mp4",
    icon: Video,
    descEs: "Comprime, optimiza y procesa tus videos de alta resolución de manera ultra rápida.",
    descEn: "Compress, optimize, and process your high-resolution videos ultra fast.",
  },
  {
    id: "apagar",
    nameEs: "Apagar",
    nameEn: "Shutdown",
    video: "/task-notch/apagar.mp4",
    icon: Power,
    descEs: "Programa el apagado, reinicio o suspensión de tu Mac de forma inteligente y automatizada.",
    descEn: "Schedule your Mac's shutdown, restart, or sleep intelligently and automatically.",
  },
  {
    id: "pdf-ia",
    nameEs: "PDF IA",
    nameEn: "PDF AI",
    video: "/task-notch/pdf-ia.mp4",
    icon: FileText,
    descEs: "Visualiza, edita, firma y resume tus archivos PDF localmente con potentes herramientas de inteligencia artificial.",
    descEn: "View, edit, sign, and summarize your PDF files locally with powerful artificial intelligence tools.",
  },
  {
    id: "color",
    nameEs: "Color",
    nameEn: "Color",
    video: "/task-notch/color.mp4",
    icon: Pipette,
    descEs: "Extrae cualquier color de tu pantalla en múltiples formatos (HEX, RGB) con una lupa de alta precisión.",
    descEn: "Extract any color from your screen in multiple formats (HEX, RGB) with a high-precision magnifying glass.",
  },
  {
    id: "borrador-magico",
    nameEs: "Borrador mágico",
    nameEn: "Magic Eraser",
    video: "/task-notch/borrador-magico.mp4",
    icon: Eraser,
    descEs: "Elimina elementos, personas o imperfecciones no deseadas de tus fotos en segundos usando IA.",
    descEn: "Remove unwanted elements, people, or imperfections from your photos in seconds using AI.",
  },
  {
    id: "convertidor",
    nameEs: "Convertidor",
    nameEn: "Converter",
    video: "/task-notch/convertidor.mp4",
    icon: RefreshCw,
    descEs: "Convierte imágenes a WebP, comprime archivos y optimiza formatos en segundos directamente desde tu barra.",
    descEn: "Convert images to WebP, compress files, and optimize formats in seconds directly from your bar.",
  },
  {
    id: "comandos",
    nameEs: "Comandos",
    nameEn: "Commands",
    video: "/task-notch/comandos.mp4",
    icon: Terminal,
    descEs: "Accede a una potente terminal integrada en tu notch para ejecutar comandos de forma inmediata.",
    descEn: "Access a powerful terminal integrated into your notch to execute commands immediately.",
  },
];

const TaskNotchLandingContent = () => {
  const { lang, setLang, t } = useLanguage();
  const isEn = lang === "en";

  const [activeOption, setActiveOption] = useState<NotchOption>(NOTCH_OPTIONS[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [pendingDownloadPlatform, setPendingDownloadPlatform] = useState<DownloadPlatform>("mac-silicon");

  const videoRef = useRef<HTMLVideoElement>(null);
  const menuScrollRef = useRef<HTMLDivElement>(null);
  const menuScrollRefMobile = useRef<HTMLDivElement>(null);

  // Elegant mounting morph expansion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Sync video play/pause on src change
  useEffect(() => {
    setIsVideoLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [activeOption.video]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDownloadClick = (platform: DownloadPlatform) => {
    setPendingDownloadPlatform(platform);
    setDownloadModalOpen(true);
  };

  const confirmDownload = () => {
    const index = pendingDownloadPlatform === "mac-silicon" ? 0 : pendingDownloadPlatform === "mac-intel" ? 1 : 2;
    triggerSecureDownload(index, "task-notch");
    setDownloadModalOpen(false);
  };

  const scrollMenu = (direction: "left" | "right") => {
    const scrollAmount = 220;
    if (menuScrollRef.current) {
      menuScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
    if (menuScrollRefMobile.current) {
      menuScrollRefMobile.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-[#202020] text-white p-0 font-sans flex flex-col items-center relative select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow-horizontal {
          background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          background-size: 200% auto;
          animation: rainbow 4s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pulse-webcam {
          animation: webcam-pulse 2s infinite ease-in-out;
        }
        @keyframes webcam-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
      `}} />
      {/* Background ambient glows wrapped to prevent overflow scroll height */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3b82f6]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8b5cf6]/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Container simulating an expanded macOS notch card */}
      <motion.div
        initial={{ width: 320, height: 48, borderRadius: 24, marginTop: 40 }}
        animate={
          isExpanded
            ? { width: "100%", height: "auto", borderRadius: "44px 44px 40px 40px", marginTop: 0 }
            : { width: 320, height: 48, borderRadius: 24, marginTop: 40 }
        }
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        className="w-full max-w-[1550px] bg-[#000000] border-b border-x border-white/[0.08] flex flex-col relative shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden z-20"
      >
        <AnimatePresence>
          {!isExpanded ? (
            /* COMPACT CLOSED CAMERA NOTCH */
            <motion.div
              key="closed-notch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-between px-6 bg-black rounded-full cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e2025] flex items-center justify-center relative">
                  <div className="w-1 h-1 rounded-full bg-[#3b82f6]/60" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#05c46b] shadow-[0_0_8px_#05c46b] pulse-webcam" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 pl-2">
                TASKNOTCH
              </span>
              <div className="w-6 h-1 bg-white/20 rounded-full" />
            </motion.div>
          ) : (
            /* FULLY EXPANDED DYNAMIC NOTCH ISLAND PREVIEW */
            <motion.div
              key="expanded-notch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              className="flex flex-col w-full"
            >
              {/* ── TOP BAR WITH REVERSE-NOTCH TABS ─────────────────────────────────── */}
              <div className="relative w-full h-[80px] flex items-center justify-between shrink-0 z-30 border-b border-white/[0.04]">
                
                {/* MOBILE/TABLET SIMPLE FLAT HEADER */}
                <div className="flex min-[1000px]:hidden items-center justify-between w-full h-full px-6 bg-[#0c0d0f]">
                  {/* Logo */}
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="/task-notch/logo.jpeg" 
                      className="w-8 h-8 object-contain rounded-lg shadow-[0_0_12px_rgba(59,130,246,0.3)] border border-white/10" 
                      alt="TaskNotch Logo" 
                    />
                    <span className="text-base font-black tracking-wider text-white">
                      TASKNOTCH
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pointer-events-auto">
                    {/* Language Switcher */}
                    <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden p-0.5">
                      <button
                        onClick={() => setLang("es")}
                        className={`px-2 py-0.5 text-[9px] font-black rounded-[7px] transition-all cursor-pointer ${
                          !isEn ? "bg-white text-black shadow-md font-bold" : "text-white/50 hover:text-white"
                        }`}
                      >
                        ES
                      </button>
                      <button
                        onClick={() => setLang("en")}
                        className={`px-2.5 py-0.5 text-[9px] font-black rounded-[7px] transition-all cursor-pointer ${
                          isEn ? "bg-white text-black shadow-md font-bold" : "text-white/50 hover:text-white"
                        }`}
                      >
                        EN
                      </button>
                    </div>

                    {/* Download button */}
                    <button
                      onClick={() => handleDownloadClick("mac-silicon")}
                      className="flex items-center gap-1.5 bg-[#0084ff] hover:brightness-110 active:scale-[0.98] transition-all px-3 py-1.5 rounded-xl text-[9px] font-black text-white shadow-[0_4px_12px_rgba(0,132,255,0.25)] min-[900px]:px-3.5 min-[900px]:py-2 min-[900px]:text-[10px] cursor-pointer shrink-0"
                    >
                      <Apple className="shrink-0 animate-bounce-slow w-[11px] h-[11px] min-[900px]:w-[12px] min-[900px]:h-[12px]" />
                      <span className="inline min-[900px]:hidden">
                        {isEn ? "FREE" : "GRATIS"}
                      </span>
                      <span className="hidden min-[900px]:inline">
                        {isEn ? "FREE DOWNLOAD" : "DESCARGAR GRATIS"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* LEFT OVERLAY TAB (LOGO) */}
                <div className="hidden min-[1000px]:block absolute top-[-2px] left-[-2px] w-[274px] h-[84px] select-none z-10 pointer-events-none">
                  <svg className="absolute inset-0 w-full h-full text-[#202020] fill-current" viewBox="0 0 270 80" preserveAspectRatio="none">
                    <path d="M 0 0 L 0 80 L 216 80 A 24 24 0 0 0 240 56 L 240 24 A 24 24 0 0 1 264 0 Z" />
                  </svg>
                  <div className="absolute top-[2px] left-[2px] w-[240px] h-[80px] flex items-center pl-8 pointer-events-auto">
                    <div className="flex items-center gap-3">
                      {/* Glowing Squircle Logo */}
                      <img 
                        src="/task-notch/logo.jpeg" 
                        className="w-10 h-10 object-contain rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/10" 
                        alt="TaskNotch Logo" 
                      />
                      <span className="text-lg font-black tracking-wider bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        TASKNOTCH
                      </span>
                    </div>
                  </div>
                </div>

                {/* CENTER AREA: CATEGORIES MENU */}
                <div className="hidden min-[1000px]:flex flex-1 h-full mx-[260px] mr-[340px] items-center justify-center z-20 pointer-events-auto">
                  <div className="flex items-center bg-[#131418]/90 border border-white/[0.06] rounded-full p-1 shadow-lg max-w-full">
                    <button
                      onClick={() => scrollMenu("left")}
                      className="p-1.5 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer mr-1"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <div
                      ref={menuScrollRef}
                      className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[320px] min-[1100px]:max-w-[420px] min-[1200px]:max-w-[550px] scroll-smooth"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {NOTCH_OPTIONS.map((option) => {
                        const IconComponent = option.icon;
                        const isActive = activeOption.id === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              setActiveOption(option);
                              setTimeout(() => {
                                btn.scrollIntoView({
                                  behavior: "smooth",
                                  block: "nearest",
                                  inline: "center",
                                });
                              }, 60);
                            }}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors duration-300 relative group cursor-pointer ${
                              isActive ? "text-white font-bold" : "text-white/50 hover:text-white"
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTabDesktop"
                                className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-sm z-0"
                                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-1.5">
                              <IconComponent
                                size={12}
                                className={isActive ? "text-[#3b82f6]" : "text-white/50 group-hover:text-white"}
                              />
                              <span>{isEn ? option.nameEn : option.nameEs}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => scrollMenu("right")}
                      className="p-1.5 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer ml-1"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* RIGHT OVERLAY TAB (LANGUAGE & CTAS) */}
                <div className="hidden min-[1000px]:block absolute top-[-2px] right-[-2px] w-[354px] h-[84px] select-none z-10 pointer-events-none">
                  <svg className="absolute inset-0 w-full h-full text-[#202020] fill-current" viewBox="0 0 330 80" preserveAspectRatio="none">
                    <path d="M 330 0 L 330 80 L 54 80 A 24 24 0 0 1 30 56 L 30 24 A 24 24 0 0 0 6 0 Z" />
                  </svg>
                  <div className="absolute top-[2px] right-[2px] w-[320px] h-[80px] flex items-center justify-end pr-8 gap-4 pointer-events-auto">
                    {/* Language Switcher */}
                    <div className="flex bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden p-0.5 animate-fade-in">
                      <button
                        onClick={() => setLang("es")}
                        className={`px-2.5 py-1 text-[10px] font-black rounded-[7px] transition-all cursor-pointer ${
                          !isEn ? "bg-white text-black shadow-md font-bold" : "text-white/50 hover:text-white"
                        }`}
                      >
                        ES
                      </button>
                      <button
                        onClick={() => setLang("en")}
                        className={`px-2.5 py-1 text-[10px] font-black rounded-[7px] transition-all cursor-pointer ${
                          isEn ? "bg-white text-black shadow-md font-bold" : "text-white/50 hover:text-white"
                        }`}
                      >
                        EN
                      </button>
                    </div>

                    {/* Download button */}
                    <button
                      onClick={() => handleDownloadClick("mac-silicon")}
                      className="flex items-center gap-1.5 bg-[#0084ff] hover:brightness-110 active:scale-[0.98] transition-all px-3.5 py-2 rounded-xl text-[10px] font-black text-white shadow-[0_4px_12px_rgba(0,132,255,0.25)] cursor-pointer shrink-0"
                    >
                      <Apple size={12} className="shrink-0 animate-bounce-slow" />
                      <span>{isEn ? "FREE DOWNLOAD" : "DESCARGAR GRATIS"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ── SECTION 1: VIDEOS IMMEDIATELY BELOW THE MENU ─────────────────────────────────── */}
              <div className="w-full flex flex-col items-center justify-center px-6 sm:px-12 pt-8 sm:pt-14">
                
                {/* RESPONSIVE MENU FOR TABLET/MOBILE (ONLY VISIBLE BELOW 1000PX) */}
                <div className="flex min-[1000px]:hidden w-full max-w-[620px] items-center justify-center mb-8 z-20 pointer-events-auto">
                  <div className="flex items-center bg-[#131418]/95 border border-white/[0.08] rounded-full p-1.5 shadow-2xl w-full">
                    <button
                      onClick={() => scrollMenu("left")}
                      className="p-1.5 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer mr-1"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <div
                      ref={menuScrollRefMobile}
                      className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-1 scroll-smooth"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {NOTCH_OPTIONS.map((option) => {
                        const IconComponent = option.icon;
                        const isActive = activeOption.id === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={(e) => {
                              const btn = e.currentTarget;
                              setActiveOption(option);
                              setTimeout(() => {
                                btn.scrollIntoView({
                                  behavior: "smooth",
                                  block: "nearest",
                                  inline: "center",
                                });
                              }, 60);
                            }}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-300 relative group cursor-pointer ${
                              isActive ? "text-white" : "text-white/50 hover:text-white"
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTabMobile"
                                className="absolute inset-0 bg-[#0084ff] rounded-full shadow-[0_2px_8px_rgba(0,132,255,0.4)] z-0"
                                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center gap-1.5">
                              <IconComponent
                                size={12}
                                className={isActive ? "text-white" : "text-white/50 group-hover:text-white"}
                              />
                              <span>{isEn ? option.nameEn : option.nameEs}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => scrollMenu("right")}
                      className="p-1.5 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer ml-1"
                      aria-label="Scroll right"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                <div className="w-full max-w-[960px] flex items-center justify-center relative mt-2 sm:mt-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeOption.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className={`w-full relative bg-transparent overflow-hidden rounded-[24px] shadow-2xl border border-white/[0.06] ${
                        isVideoLoading ? "min-h-[220px] sm:min-h-[320px]" : "h-auto"
                      }`}
                    >
                      <video
                        ref={videoRef}
                        key={activeOption.id}
                        src={activeOption.video}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        onLoadedData={() => setIsVideoLoading(false)}
                        className="w-full h-auto block bg-transparent"
                      />

                      {isVideoLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0d0f]/90 backdrop-blur-sm z-20 transition-all duration-300">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-white/5 border-t-[#0084ff] animate-spin shadow-[0_0_15px_rgba(0,132,255,0.2)]" />
                            <span className="text-[10px] tracking-[0.2em] font-black text-white/40 uppercase animate-pulse">
                              {isEn ? "LOADING PREVIEW..." : "CARGANDO VISTA PREVIA..."}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Video action overlays */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
                        <button
                          onClick={handlePlayPause}
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                        >
                          {isPlaying ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" className="ml-0.5" />}
                        </button>
                        <button
                          onClick={handleMuteToggle}
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                        >
                          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* ── SECTION 2: MARKETING LANDING TEXT BELOW VIDEOS ─────────────────────────────────── */}
              <div className="pt-8 px-6 sm:px-12 pb-14 flex flex-col items-center justify-start text-center max-w-[1000px] mx-auto w-full gap-8 z-10">
                
                {/* TEXT INFO CONTAINER */}
                <div className="flex flex-col items-center space-y-5 max-w-[850px] select-text">
                  {/* Pill Intro Badge */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] shadow-inner">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-ping" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/70">
                      {isEn ? "Designed for macOS Sequoia & Sonoma" : "Diseñado para macOS Sequoia y Sonoma"}
                    </span>
                  </div>

                  {/* High-impact Bold Headline */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
                    Tu Mac, <br />
                    <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
                      Ahora con Superpoderes.
                    </span>
                  </h1>

                  {/* Dynamic feature description */}
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-[650px] whitespace-pre-line">
                    {isEn ? activeOption.descEn : activeOption.descEs}
                  </p>

                  {/* Highlights Horizontal Row */}
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 text-white/80">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-[#3b82f6] shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {isEn ? "Instant OCR" : "OCR de pantalla"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-[#3b82f6] shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {isEn ? "AI Magic Eraser" : "Borrador mágico"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-[#3b82f6] shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {isEn ? "Dynamic Island" : "Notch interactivo"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle size={12} className="text-[#3b82f6] shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {isEn ? "Get answers to your online exams" : "Obtén respuestas a tus exámenes en línea"}
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2.5">
                    <button
                      onClick={() => setIsPaymentModalOpen(true)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 active:scale-[0.98] transition-all px-5 py-3 rounded-xl text-xs font-bold text-white flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <Sparkles size={14} className="text-yellow-400" />
                      <span>{isEn ? "Unlock Pro Version" : "Desbloquear Versión Pro"}</span>
                    </button>

                    <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
                      {isEn ? "Free version + 1-week trial of Pro features" : "Versión gratuita + prueba de funciones Pro por una semana"}
                    </span>
                  </div>

                  {/* Other Apps Section */}
                  <div className="w-full flex flex-col items-center gap-4 pt-2">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.18em]">
                      {isEn ? "Try my other apps" : "Prueba mis otras aplicaciones"}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                      {/* Task Goblin */}
                      <a
                        href="/task-goblin-app"
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_4px_20px_rgba(151,130,255,0.2)] group-hover:shadow-[0_4px_24px_rgba(151,130,255,0.4)] group-hover:border-[#9782ff]/40 transition-all duration-300 group-hover:scale-110">
                          <img
                            src="/icon/TaskGoblin.png"
                            className="w-full h-full object-cover"
                            alt="Task Goblin"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white/50 group-hover:text-white/80 transition-colors duration-200 uppercase tracking-wider">
                          Task Goblin
                        </span>
                      </a>

                      {/* Floaty */}
                      <a
                        href="/floaty-app"
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                      >
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_4px_20px_rgba(43,228,106,0.15)] group-hover:shadow-[0_4px_24px_rgba(43,228,106,0.35)] group-hover:border-[#2BE46A]/40 transition-all duration-300 group-hover:scale-110">
                          <img
                            src="/icon/floaty.png"
                            className="w-full h-full object-cover"
                            alt="Floaty"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white/50 group-hover:text-white/80 transition-colors duration-200 uppercase tracking-wider">
                          Floaty
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* ── BOTTOM TRAY AREA: OS Info ─────────────────────────────────────── */}
              <div className="relative w-full h-[60px] flex items-center justify-center shrink-0 px-8 select-none z-20 border-t border-white/[0.04] bg-[#000000]/50 backdrop-blur-xs rounded-b-[35px] sm:rounded-b-[43px]">
                {/* OS Badge */}
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Apple size={14} />
                  <span>macOS Sonoma & Sequoia • {isEn ? "Universal App" : "Aplicación Universal"}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer copyright */}
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-6 mb-6 select-none z-10">
        © {new Date().getFullYear()} TASKNOTCH. ALL RIGHTS RESERVED.
      </div>

      {/* MODALS */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        appType="task-notch"
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <DownloadModal
        isOpen={downloadModalOpen}
        platform={pendingDownloadPlatform}
        appType="task-notch"
        onClose={() => setDownloadModalOpen(false)}
        onConfirm={confirmDownload}
      />
    </div>
  );
};

export const TaskNotchLanding = () => {
  return (
    <LanguageProvider>
      <LayoutProvider>
        <TaskNotchLandingContent />
      </LayoutProvider>
    </LanguageProvider>
  );
};
