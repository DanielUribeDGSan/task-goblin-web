import { c as createAstro, d as createComponent, r as renderTemplate, u as unescapeHTML, j as renderComponent, i as renderHead, f as addAttribute } from '../chunks/astro/server_Dxp9Hdrt.mjs';
import 'piccolore';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { X, LayoutDashboard, PanelLeft, Languages, Armchair, Thermometer, Droplets, Smile, ChevronRight, Maximize2, ChevronLeft, CreditCard, Mail, CheckCircle, AlertCircle, Tag, ChevronUp, Smartphone, Apple, ChevronDown, Unlock, Lock, Search, MousePointer2, Users, Monitor, Bell, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React, { createContext, useState, useEffect, useCallback, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import { u as useLanguage, L as LanguageProvider } from '../chunks/LanguageContext_Nzj8teUG.mjs';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const MOBILE_BREAKPOINT = 768;
const LayoutContext = createContext(null);
function LayoutProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bottomBarOpen, setBottomBarOpen] = useState(false);
  useEffect(() => {
    const mql = globalThis.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);
  const toggleBottomBar = useCallback(() => {
    setBottomBarOpen((prev) => !prev);
  }, []);
  return /* @__PURE__ */ jsx(
    LayoutContext.Provider,
    {
      value: {
        isMobile,
        sidebarOpen,
        setSidebarOpen,
        bottomBarOpen,
        setBottomBarOpen,
        toggleSidebar,
        toggleBottomBar
      },
      children
    }
  );
}
function useLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return ctx;
}

function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}
const icons = [
  { id: "dashboard", icon: LayoutDashboard }
  // { id: "bath", icon: Bath },
  // { id: "living", icon: Armchair },
  // { id: "bedroom", icon: Bed },
  // { id: "kitchen", icon: Microwave },
  // { id: "courtyard", icon: Users },
  // { id: "home", icon: Home },
];
const SidebarContent = ({
  activeId = "dashboard",
  onClose,
  isOverlay
}) => /* @__PURE__ */ jsxs(Fragment, { children: [
  isOverlay && onClose && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end p-4", children: /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: onClose,
      className: "w-10 h-10 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors",
      "aria-label": "Cerrar menú",
      children: /* @__PURE__ */ jsx(X, { size: 22 })
    }
  ) }),
  /* @__PURE__ */ jsx("div", { className: cn$1("flex-1 flex flex-col gap-3", isOverlay && "p-4"), children: icons.map(({ id, icon: Icon }) => /* @__PURE__ */ jsx(
    "button",
    {
      className: cn$1(
        "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300",
        activeId === id ? "bg-brand-cyan text-black shadow-[0_0_15px_rgba(20,241,217,0.3)]" : "text-white/20 hover:text-white/60 hover:bg-white/5"
      ),
      children: /* @__PURE__ */ jsx(Icon, { size: 20, strokeWidth: 2.5 })
    },
    id
  )) })
] });
const Sidebar = ({ activeId = "dashboard" }) => {
  const { isMobile, sidebarOpen, setSidebarOpen } = useLayout();
  if (isMobile) {
    return /* @__PURE__ */ jsx(Fragment, { children: sidebarOpen && createPortal(
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "fixed inset-0 z-[100] flex",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": "Menú",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
                onClick: () => setSidebarOpen(false),
                "aria-label": "Cerrar menú"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative w-64 h-full flex flex-col bg-[#0f0f0f] shadow-xl", children: /* @__PURE__ */ jsx(
              SidebarContent,
              {
                activeId,
                onClose: () => setSidebarOpen(false),
                isOverlay: true
              }
            ) })
          ]
        }
      ),
      document.body
    ) });
  }
  return /* @__PURE__ */ jsx("div", { className: "w-16 h-full flex flex-col items-center py-6 gap-6 bg-black/20 border-r border-white/5", children: /* @__PURE__ */ jsx(SidebarContent, { activeId }) });
};

const TopBar = () => {
  const { lang, setLang, t } = useLanguage();
  const { isMobile, toggleSidebar } = useLayout();
  if (isMobile) {
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full gap-3 p-4 items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 w-auto", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: toggleSidebar,
            className: "w-10 h-10 shrink-0 rounded-xl glass flex items-center justify-center text-white hover:bg-white/10 transition-colors",
            "aria-label": "Abrir menú",
            children: /* @__PURE__ */ jsx(PanelLeft, { size: 22 })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl overflow-hidden glass shrink-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/icon/TaskGoblin.png",
              alt: "Task Goblin logo",
              className: "w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold text-white leading-none ml-2 truncate", children: t.appName })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 w-auto", children: [
        /* @__PURE__ */ jsx(Languages, { size: 18, className: "text-sh-text-muted shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex rounded-lg overflow-hidden border border-white/10 bg-white/5", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setLang("es"),
              className: `px-3 py-2 text-sm font-medium transition-colors ${lang === "es" ? "bg-brand-cyan text-black" : "text-sh-text-muted hover:text-white"}`,
              children: "ES"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setLang("en"),
              className: `px-3 py-2 text-sm font-medium transition-colors ${lang === "en" ? "bg-brand-cyan text-black" : "text-sh-text-muted hover:text-white"}`,
              children: "EN"
            }
          )
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl overflow-hidden glass", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/icon/TaskGoblin.png",
          alt: "Task Goblin logo",
          className: "w-full h-full object-cover"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-white leading-none", children: t.appName }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Languages, { size: 20, className: "text-sh-text-muted shrink-0" }),
      /* @__PURE__ */ jsxs("div", { className: "flex rounded-lg overflow-hidden border border-white/10 bg-white/5", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setLang("es"),
            className: `px-3 py-1.5 text-sm font-medium transition-colors ${lang === "es" ? "bg-brand-cyan text-black" : "text-sh-text-muted hover:text-white"}`,
            children: "ES"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setLang("en"),
            className: `px-3 py-1.5 text-sm font-medium transition-colors ${lang === "en" ? "bg-brand-cyan text-black" : "text-sh-text-muted hover:text-white"}`,
            children: "EN"
          }
        )
      ] })
    ] })
  ] });
};

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ASPECT_CLASS = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "2/3": "aspect-[2/3]"
};
const RoomCard = ({
  title,
  distance,
  icon: iconSrc,
  image,
  mediaItems,
  aspectRatio = "video",
  stats,
  children,
  className
}) => {
  const aspectClass = ASPECT_CLASS[aspectRatio];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenControls, setShowFullscreenControls] = useState(true);
  const videoRef = useRef(null);
  const mediaContainerRef = useRef(null);
  const hideControlsTimeoutRef = useRef(null);
  const FULLSCREEN_HIDE_DELAY_MS = 2e3;
  const items = mediaItems ?? [];
  const hasCarousel = items.length > 0;
  const displayImage = !hasCarousel ? image : void 0;
  const current = items[currentIndex];
  const isVideoSlide = current?.type === "video";
  const goTo = useCallback(
    (index) => {
      setCurrentIndex((prev) => {
        const next = Math.max(0, Math.min(index, items.length - 1));
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setIsPlaying(false);
        return next;
      });
    },
    [items.length]
  );
  const goPrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo]
  );
  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo]
  );
  const togglePlayPause = useCallback(() => {
    if (!videoRef.current || !isVideoSlide) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
      });
      setIsPlaying(true);
    }
  }, [isVideoSlide, isPlaying]);
  const toggleFullscreen = useCallback(() => {
    const el = mediaContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {
      });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {
      });
    }
  }, []);
  useEffect(() => {
    const el = mediaContainerRef.current;
    if (!el) return;
    const onFullscreenChange = () => {
      const full = !!document.fullscreenElement;
      setIsFullscreen(full);
      if (full) setShowFullscreenControls(true);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
  useEffect(() => {
    if (!isFullscreen) return;
    const el = mediaContainerRef.current;
    if (!el) return;
    const scheduleHide = () => {
      if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
      setShowFullscreenControls(true);
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowFullscreenControls(false);
        hideControlsTimeoutRef.current = null;
      }, FULLSCREEN_HIDE_DELAY_MS);
    };
    const onMouseMove = () => scheduleHide();
    el.addEventListener("mousemove", onMouseMove);
    scheduleHide();
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      if (hideControlsTimeoutRef.current) clearTimeout(hideControlsTimeoutRef.current);
    };
  }, [isFullscreen]);
  useEffect(() => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const onEnd = () => setIsPlaying(false);
    const onPause = () => setIsPlaying(false);
    const onPlay = () => setIsPlaying(true);
    v.addEventListener("ended", onEnd);
    v.addEventListener("pause", onPause);
    v.addEventListener("play", onPlay);
    return () => {
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("play", onPlay);
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: cn(
        "glass rounded-[2rem] p-5 flex flex-col gap-4 group transition-colors duration-300 hover:bg-white/[0.08] origin-center",
        className
      ),
      whileHover: {
        scale: 1.02,
        zIndex: 10,
        transition: { type: "spring", stiffness: 400, damping: 28 }
      },
      transition: { type: "spring", stiffness: 400, damping: 28 },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl glass flex items-center justify-center text-sh-accent overflow-hidden", children: iconSrc ? /* @__PURE__ */ jsx("img", { src: iconSrc, alt: "", className: "w-5 h-5 object-contain" }) : /* @__PURE__ */ jsx(Armchair, { size: 18 }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white leading-tight", children: title }),
              distance && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-sh-text-muted font-medium", children: distance })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            stats && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Thermometer, { size: 14, className: "text-sh-text-muted" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-white", children: stats.temp })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 border-l border-white/10 pl-3", children: [
                /* @__PURE__ */ jsx(Droplets, { size: 14, className: "text-sh-text-muted" }),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-white", children: stats.humidity })
              ] }),
              /* @__PURE__ */ jsx(Smile, { size: 14, className: "text-sh-text-muted ml-1" })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "text-sh-text-muted hover:text-white transition-colors", children: /* @__PURE__ */ jsx(ChevronRight, { size: 18 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          hasCarousel && /* @__PURE__ */ jsxs(
            "div",
            {
              ref: mediaContainerRef,
              className: cn(
                "group/video relative overflow-hidden shadow-2xl bg-black/20",
                "rounded-[1.5rem]",
                aspectClass,
                isFullscreen && "!aspect-auto !rounded-none w-screen h-screen flex items-center justify-center"
              ),
              children: [
                current?.type === "video" && /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "video",
                    {
                      ref: videoRef,
                      src: current.src,
                      poster: current.poster,
                      className: "w-full h-full object-contain",
                      playsInline: true,
                      muted: true,
                      onClick: togglePlayPause
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: togglePlayPause,
                      className: cn(
                        "absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all [&:hover_.play-pause-circle]:bg-white/30",
                        isFullscreen ? showFullscreenControls ? "opacity-100" : "opacity-0 pointer-events-none" : "opacity-0 group-hover/video:opacity-100"
                      ),
                      "aria-label": isPlaying ? "Pausar" : "Reproducir",
                      children: /* @__PURE__ */ jsx("span", { className: "play-pause-circle w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors", children: isPlaying ? /* @__PURE__ */ jsx(PauseIcon, { sx: { fontSize: 40 } }) : /* @__PURE__ */ jsx(PlayArrowIcon, { sx: { fontSize: 48 } }) })
                    }
                  )
                ] }),
                current?.type === "image" && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: current.src,
                    alt: title,
                    className: "w-full h-full object-contain"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ring-4 ring-red-500/20" }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-white uppercase tracking-wider" })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: toggleFullscreen,
                    className: "absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 transform transition-all group-hover:scale-110",
                    "aria-label": isFullscreen ? "Salir de pantalla completa" : "Pantalla completa",
                    children: /* @__PURE__ */ jsx(Maximize2, { size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-4 right-4 flex justify-between items-center text-white/90 text-[10px] font-bold uppercase tracking-wider", children: [
                  /* @__PURE__ */ jsx("span", { className: "bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm", children: items.length }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: goPrev,
                        disabled: currentIndex === 0,
                        className: "opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity p-0.5",
                        "aria-label": "Anterior",
                        children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16, className: "text-white" })
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: items.map((_, i) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => goTo(i),
                        className: cn(
                          "w-2 h-2 rounded-full transition-all",
                          i === currentIndex ? "bg-white scale-110" : "bg-white/30 hover:bg-white/50"
                        ),
                        "aria-label": `Ir a slide ${i + 1}`
                      },
                      i
                    )) }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: goNext,
                        disabled: currentIndex === items.length - 1,
                        className: "opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity p-0.5",
                        "aria-label": "Siguiente",
                        children: /* @__PURE__ */ jsx(ChevronRight, { size: 16, className: "text-white" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm", children: [
                    currentIndex + 1,
                    " / ",
                    items.length
                  ] })
                ] })
              ]
            }
          ),
          displayImage && /* @__PURE__ */ jsxs("div", { className: cn("relative rounded-[1.5rem] overflow-hidden shadow-2xl", aspectClass), children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: displayImage,
                alt: title,
                className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ring-4 ring-red-500/20" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-white uppercase tracking-wider" })
            ] }),
            /* @__PURE__ */ jsx("button", { className: "absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 transform transition-all group-hover:scale-110", children: /* @__PURE__ */ jsx(Maximize2, { size: 14 }) }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-3 left-4 right-4 flex justify-between items-center text-white/90 text-[10px] font-bold uppercase tracking-wider", children: [
              /* @__PURE__ */ jsx("span", { className: "bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm", children: "1" }),
              /* @__PURE__ */ jsx("span", { className: "bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm", children: "1 / 1" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3", children })
        ] })
      ]
    }
  );
};

const PaymentModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [errorMessage, setErrorMessage] = useState("");
  const LEMON_VARIANT_ID = "1382179";
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.lemonsqueezy.com/js/lemon.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStep("processing");
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          variantId: LEMON_VARIANT_ID
        })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || t.paymentModal.errorMessage);
      }
      const checkoutData = await response.json();
      const checkoutUrl = checkoutData.url;
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Url.Open(checkoutUrl);
        window.LemonSqueezy.Setup({
          eventHandler: (event) => {
            if (event.event === "Checkout.Success") {
              setStep("success");
            }
          }
        });
      } else {
        window.open(checkoutUrl, "_blank");
        setStep("email");
        alert("Se ha abierto el pago en una nueva pestaña. Por favor completa la compra y revisa tu correo.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || t.paymentModal.errorMessage);
      setStep("error");
    }
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 20 },
        className: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[10000]",
        children: /* @__PURE__ */ jsxs("div", { className: "glass rounded-3xl overflow-hidden border border-white/10 p-6 md:p-8 relative", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors",
              "aria-label": t.paymentModal.closeButton,
              children: /* @__PURE__ */ jsx(X, { size: 18 })
            }
          ),
          step === "email" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl glass flex items-center justify-center text-brand-cyan mx-auto mb-4", children: /* @__PURE__ */ jsx(CreditCard, { size: 24 }) }),
              /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: t.paymentModal.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sh-text-muted text-sm px-4", children: t.paymentModal.description })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleCheckout, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-white/80", children: t.paymentModal.emailLabel }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 text-white/40", size: 18 }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "email",
                      type: "email",
                      required: true,
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: t.paymentModal.emailPlaceholder,
                      className: "w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:border-brand-cyan transition-all"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: !email.includes("@"),
                  className: "w-full bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold rounded-xl py-3.5 px-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]",
                  children: t.paymentModal.checkoutButton
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-white/40 mt-4", children: "Secured by Lemon Squeezy integration" })
            ] })
          ] }),
          step === "processing" && /* @__PURE__ */ jsxs("div", { className: "py-12 flex flex-col items-center justify-center space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 border-4 border-white/10 border-t-brand-cyan rounded-full animate-spin" }),
            /* @__PURE__ */ jsx("p", { className: "text-white/70 font-medium", children: t.paymentModal.processing })
          ] }),
          step === "success" && /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4 py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full glass flex items-center justify-center text-green-400 mx-auto mb-6", children: /* @__PURE__ */ jsx(CheckCircle, { size: 32 }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-white", children: t.paymentModal.successTitle }),
            /* @__PURE__ */ jsx("div", { className: "glass bg-green-500/10 border-green-500/20 text-green-400 p-4 rounded-xl text-sm leading-relaxed", children: t.paymentModal.successMessage }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-sh-text-muted mt-6", children: [
              "Hemos enviado tu licencia a ",
              /* @__PURE__ */ jsx("strong", { className: "text-white", children: email }),
              "."
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: onClose,
                className: "mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors",
                children: t.paymentModal.closeButton
              }
            )
          ] }),
          step === "error" && /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4 py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full glass flex items-center justify-center text-red-400 mx-auto mb-6", children: /* @__PURE__ */ jsx(AlertCircle, { size: 32 }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white", children: "Error" }),
            /* @__PURE__ */ jsx("p", { className: "text-red-400 text-sm glass bg-red-500/10 border-red-500/20 p-4 rounded-xl", children: errorMessage }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setStep("email"),
                className: "mt-6 w-full glass hover:bg-white/10 text-white font-medium rounded-xl py-3 transition-colors",
                children: "Volver a intentar"
              }
            )
          ] })
        ] })
      }
    )
  ] }) });
};

const b = (s) => typeof atob !== "undefined" ? atob(s) : "";
const _ = [
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV9hYXJjaDY0LmRtZw==",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV94NjQuZG1n",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV94NjQtc2V0dXAuZXhl"
];
const url = (i) => b(_[i]);
const triggerDownload = (index) => {
  const u = url(index);
  const a = document.createElement("a");
  a.href = u;
  a.download = "";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
};
const PRICE_MXN = 249;
const PRICE_ORIGINAL_MXN = 299;
const PRICE_USD = 13;
const PRICE_ORIGINAL_USD = 16;
const WindowsIcon = ({ size = 24 }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
    children: /* @__PURE__ */ jsx("path", { d: "M3 3h8.5v8.5H3V3zm0 9.5H11.5V21H3v-8.5zM12.5 3H21v8.5H12.5V3zm0 9.5H21V21h-8.5v-8.5z" })
  }
);
const BottomBar = () => {
  const { t, lang } = useLanguage();
  const { isMobile, bottomBarOpen, toggleBottomBar } = useLayout();
  const [macMenuOpen, setMacMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const macButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownRect, setDropdownRect] = useState(null);
  const showUsd = lang === "en";
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  useEffect(() => {
    if (!macMenuOpen || !macButtonRef.current) return;
    const rect = macButtonRef.current.getBoundingClientRect();
    setDropdownRect({ top: rect.top - 8, left: rect.left });
  }, [macMenuOpen]);
  useEffect(() => {
    const close = (e) => {
      const target = e.target;
      if (menuRef.current && !menuRef.current.contains(target) && dropdownRef.current && !dropdownRef.current.contains(target)) {
        setMacMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  if (isMobile && !bottomBarOpen) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-end p-4", children: /* @__PURE__ */ jsx(
      motion.button,
      {
        type: "button",
        onClick: toggleBottomBar,
        className: "w-14 h-14 rounded-2xl glass flex items-center justify-center text-white shadow-lg hover:bg-white/10 transition-colors",
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.98 },
        "aria-label": t.bottomBar.promotion,
        children: /* @__PURE__ */ jsx(Tag, { size: 24 })
      }
    ) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-end p-4 sm:p-6 gap-4 sm:gap-6 w-full max-w-full overflow-hidden", children: [
    isMobile && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 w-full sm:hidden", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "flex flex-1 items-center justify-center sm:justify-start gap-3 glass rounded-xl sm:rounded-[1.5rem] px-3 sm:px-4 py-2 sm:py-2.5 min-w-0 shrink-0",
          whileHover: {
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          },
          children: [
            /* @__PURE__ */ jsx(Tag, { size: 18, className: "shrink-0 text-sh-text-muted", "aria-hidden": true }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: showUsd ? /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-white whitespace-nowrap", children: [
              /* @__PURE__ */ jsxs("span", { className: "line-through text-sh-text-muted font-normal mr-1", children: [
                "$",
                PRICE_ORIGINAL_USD
              ] }),
              " ",
              "$",
              PRICE_USD,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-sh-text-muted font-normal text-xs", children: "USD" }),
              /* @__PURE__ */ jsx("span", { className: "ml-1 text-[10px] font-semibold text-brand-cyan uppercase", children: t.bottomBar.promotion })
            ] }) : /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-white whitespace-nowrap", children: [
              /* @__PURE__ */ jsxs("span", { className: "line-through text-sh-text-muted font-normal mr-1", children: [
                "$",
                PRICE_ORIGINAL_MXN
              ] }),
              " ",
              "$",
              PRICE_MXN,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-sh-text-muted font-normal text-xs", children: "MXN" }),
              /* @__PURE__ */ jsx("span", { className: "ml-1 text-[10px] font-semibold text-brand-cyan uppercase", children: t.bottomBar.promotion })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: toggleBottomBar,
          className: "w-10 h-10 shrink-0 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white",
          "aria-label": "Cerrar",
          children: /* @__PURE__ */ jsx(ChevronUp, { size: 20 })
        }
      )
    ] }),
    !isMobile && /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "flex items-center justify-center sm:justify-start gap-3 glass rounded-xl sm:rounded-[1.5rem] px-3 sm:px-4 py-2 sm:py-2.5 min-w-0 shrink-0",
        whileHover: {
          scale: 1.04,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        },
        children: [
          /* @__PURE__ */ jsx(Tag, { size: 18, className: "shrink-0 text-sh-text-muted", "aria-hidden": true }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: showUsd ? /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-white whitespace-nowrap", children: [
            /* @__PURE__ */ jsxs("span", { className: "line-through text-sh-text-muted font-normal mr-1", children: [
              "$",
              PRICE_ORIGINAL_USD
            ] }),
            " ",
            "$",
            PRICE_USD,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-sh-text-muted font-normal text-xs", children: "USD" }),
            /* @__PURE__ */ jsx("span", { className: "ml-1 text-[10px] font-semibold text-brand-cyan uppercase", children: t.bottomBar.promotion })
          ] }) : /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-white whitespace-nowrap", children: [
            /* @__PURE__ */ jsxs("span", { className: "line-through text-sh-text-muted font-normal mr-1", children: [
              "$",
              PRICE_ORIGINAL_MXN
            ] }),
            " ",
            "$",
            PRICE_MXN,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-sh-text-muted font-normal text-xs", children: "MXN" }),
            /* @__PURE__ */ jsx("span", { className: "ml-1 text-[10px] font-semibold text-brand-cyan uppercase", children: t.bottomBar.promotion })
          ] }) })
        ]
      }
    ),
    isMobile ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 glass rounded-xl sm:rounded-[1.5rem] px-4 py-3 text-center", children: [
      /* @__PURE__ */ jsx(Smartphone, { size: 20, className: "shrink-0 text-brand-cyan" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-sh-text-muted", children: t.bottomBar.mobileDownloadNotice })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 sm:gap-12", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "flex items-center justify-center sm:justify-start gap-4 sm:gap-6 glass rounded-xl sm:rounded-[1.5rem] px-4 sm:px-6 py-3 min-w-0",
          whileHover: {
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", ref: menuRef, children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  ref: macButtonRef,
                  type: "button",
                  onClick: () => setMacMenuOpen((o) => !o),
                  className: "flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors cursor-pointer",
                  "aria-label": t.bottomBar.downloadMac,
                  "aria-expanded": macMenuOpen,
                  "aria-haspopup": "true",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "w-10 h-10 rounded-xl glass flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Apple, { size: 22 }) }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: t.bottomBar.mac }),
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        size: 16,
                        className: `transition-transform ${macMenuOpen ? "rotate-180" : ""}`
                      }
                    )
                  ]
                }
              ),
              macMenuOpen && dropdownRect && createPortal(
                /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      "aria-hidden": true,
                      tabIndex: -1,
                      className: "fixed inset-0 z-[99998] cursor-default",
                      style: { background: "transparent" },
                      onClick: () => setMacMenuOpen(false)
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      ref: dropdownRef,
                      role: "menu",
                      className: "fixed min-w-[200px] rounded-xl py-2 shadow-2xl z-[99999] border border-white/10 bg-[#1c1c1c]",
                      style: {
                        top: dropdownRect.top,
                        left: dropdownRect.left,
                        transform: "translate3d(0, -100%, 0)",
                        isolation: "isolate"
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            role: "menuitem",
                            className: "block w-full text-left px-4 py-2.5 text-sm text-sh-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer",
                            onClick: () => {
                              triggerDownload(0);
                              setMacMenuOpen(false);
                            },
                            children: t.bottomBar.appleSilicon
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            type: "button",
                            role: "menuitem",
                            className: "block w-full text-left px-4 py-2.5 text-sm text-sh-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer",
                            onClick: () => {
                              triggerDownload(1);
                              setMacMenuOpen(false);
                            },
                            children: t.bottomBar.intel
                          }
                        )
                      ]
                    }
                  )
                ] }),
                document.body
              )
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => triggerDownload(2),
                className: "flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors cursor-pointer",
                "aria-label": t.bottomBar.downloadWindows,
                children: [
                  /* @__PURE__ */ jsx("span", { className: "w-10 h-10 rounded-xl glass flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(WindowsIcon, { size: 20 }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: t.bottomBar.windows })
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setIsPaymentModalOpen(true),
          className: "flex flex-col items-center gap-1 group cursor-pointer focus:outline-none",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted group-hover:text-sh-accent transition-all font-bold", children: [
              /* @__PURE__ */ jsx(Unlock, { size: 20, className: "group-hover:hidden" }),
              /* @__PURE__ */ jsx(Lock, { size: 20, className: "hidden group-hover:block" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-sh-text-muted uppercase tracking-widest", children: t.bottomBar.obtainLicense })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/license",
          className: "flex flex-col items-center gap-1 group cursor-pointer focus:outline-none no-underline",
          children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted group-hover:text-brand-cyan transition-all", children: /* @__PURE__ */ jsx(Search, { size: 20 }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-sh-text-muted uppercase tracking-widest", children: t.bottomBar.checkLicense })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      PaymentModal,
      {
        isOpen: isPaymentModalOpen,
        onClose: () => setIsPaymentModalOpen(false)
      }
    )
  ] });
};

const useDashboardState = () => {
  const [devices, setDevices] = useState({
    livingRoomCamera: true,
    livingRoomLighting: true,
    livingRoomVacuum: false,
    kitchenCamera: true,
    kitchenLighting: false,
    bedroomCamera: true,
    cinemaCamera: true,
    courtyardCamera: true
  });
  const [permissions, setPermissions] = useState({
    accessibility: false,
    contacts: false,
    screenRecording: false,
    notifications: false,
    automationWhatsApp: false
  });
  const toggleDevice = (id) => {
    setDevices((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const togglePermission = (id) => {
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return {
    devices,
    toggleDevice,
    permissions,
    togglePermission
  };
};

const RIGHT_COLUMN_ROOMS = [
  {
    id: "move-mouse",
    title: "Move Mouse",
    distance: "",
    icon: "/icon/move.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/mouse/video.mp4",
        poster: "/mouse/image-1.png"
      },
      { type: "image", src: "/mouse/image-1.png" }
    ],
    children: null
  },
  {
    id: "whatsapp-msg",
    title: "WhatsApp Msg",
    distance: "",
    icon: "/icon/chat.gif",
    aspectRatio: "square",
    mediaItems: [
      {
        type: "video",
        src: "/whatsaap/video.mp4",
        poster: "/whatsaap/image-1.png"
      },
      { type: "image", src: "/whatsaap/image-1.png" },
      { type: "image", src: "/whatsaap/image-2.png" }
    ],
    children: null
  }
];
const BOTTOM_ROW_ROOMS = [
  {
    id: "screenshot-to-text",
    title: "Screenshot to Text",
    distance: "",
    icon: "/icon/copy.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/capture-text/video.mp4",
        poster: "/capture-text/image-1.png"
      },
      { type: "image", src: "/capture-text/image-1.png" }
    ]
  },
  {
    id: "close-all-apps",
    title: "Close All Apps",
    distance: "",
    icon: "/icon/close.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/closed-apss/video.mp4",
        poster: "/closed-apss/image-1.png"
      },
      { type: "image", src: "/closed-apss/image-1.png" }
    ]
  },
  {
    id: "schedule-shutdown",
    title: "Schedule Shutdown",
    distance: "",
    icon: "/icon/off.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/shutdown/video.mp4",
        poster: "/shutdown/image-1.png"
      },
      { type: "image", src: "/shutdown/image-1.png" }
    ]
  },
  {
    id: "convert-pdf-to-word",
    title: "Convert PDF to Word",
    distance: "",
    icon: "/icon/note.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/pdf-word/video.mp4",
        poster: "/pdf-word/image-1.png"
      },
      { type: "image", src: "/pdf-word/image-1.png" }
    ]
  },
  {
    id: "color-extractor",
    title: "Color Extractor",
    distance: "",
    icon: "/icon/palette.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/color-extractor/video.mp4",
        poster: "/color-extractor/image-1.png"
      },
      { type: "image", src: "/color-extractor/image-1.png" }
    ]
  },
  {
    id: "paint",
    title: "Paint",
    distance: "",
    icon: "/icon/paint.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/paint/video.mp4",
        poster: "/paint/image-1.png"
      },
      { type: "image", src: "/paint/image-1.png" }
    ]
  },
  {
    id: "image-converter",
    title: "Image & PDF Converter",
    distance: "",
    icon: "/icon/camera.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/image-convert/video.mp4",
        poster: "/image-convert/image-1.png"
      },
      { type: "image", src: "/image-convert/image-1.png" },
      { type: "image", src: "/image-convert/image-2.png" }
    ]
  }
];
const APP_PERMISSION_ICONS = [
  MousePointer2,
  Users,
  Monitor,
  Bell,
  MessageCircle
];
const INFO_MODAL_ICONS = [
  "/icon/move.gif",
  "/icon/chat.gif",
  "/icon/copy.gif",
  "/icon/close.gif",
  "/icon/off.gif",
  "/icon/note.gif",
  "/icon/palette.gif",
  "/icon/paint.gif",
  "/icon/camera.gif"
];
const Dashboard = () => {
  return /* @__PURE__ */ jsx(LanguageProvider, { children: /* @__PURE__ */ jsx(LayoutProvider, { children: /* @__PURE__ */ jsx(DashboardContent, {}) }) });
};
const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 30 }
  }
};
function useMasonryCols(breakpoints = { sm: 640, lg: 1024 }) {
  const ref = useRef(null);
  const [cols, setCols] = useState(() => {
    if (typeof window === "undefined") return 3;
    return window.innerWidth >= breakpoints.lg ? 3 : window.innerWidth >= breakpoints.sm ? 2 : 1;
  });
  useEffect(() => {
    const el = ref.current ?? document.documentElement;
    const update = () => {
      const w = window.innerWidth;
      setCols(w >= breakpoints.lg ? 3 : w >= breakpoints.sm ? 2 : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [breakpoints.sm, breakpoints.lg]);
  return { ref, cols };
}
function MasonryLayout({
  devices,
  toggleDevice,
  t,
  setPermissionsModalOpen,
  setInfoModalOpen
}) {
  const { ref: containerRef, cols } = useMasonryCols();
  const allCards = [
    // Card 1: Hero (video de app + permisos + features)
    /* @__PURE__ */ jsx(motion.div, { className: "w-full mb-3", variants: itemVariants, children: /* @__PURE__ */ jsxs(
      RoomCard,
      {
        title: t.videoCardTitle,
        distance: "",
        icon: "/icon/bot.gif",
        aspectRatio: "video",
        mediaItems: [
          { type: "video", src: "/home/video.mp4", poster: "/home/image-1.png" },
          { type: "image", src: "/home/image-1.png" },
          { type: "image", src: "/home/image-2.png" }
        ],
        className: "w-full",
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setPermissionsModalOpen(true),
              className: "w-full flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group pt-2",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsx("span", { className: "w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(ShieldCheck, { size: 20 }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white", children: t.permissionsCard.title })
                ] }),
                /* @__PURE__ */ jsx(
                  ChevronRight,
                  {
                    size: 20,
                    className: "shrink-0 text-sh-text-muted group-hover:text-white transition-colors"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-base font-bold text-white mb-3", children: t.permissionsCard.featuresTitle }),
            /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside text-sm text-sh-text-muted space-y-1.5 mb-3", children: t.featuresList.map((item) => /* @__PURE__ */ jsx("li", { className: "break-words", children: item }, item)) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 mb-4", children: [
              /* @__PURE__ */ jsx(Sparkles, { size: 18, className: "shrink-0 text-brand-cyan" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-sh-text-muted", children: t.permissionsCard.moreOptionsComing })
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setInfoModalOpen(true),
                className: "w-full flex items-center justify-center gap-2 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 py-2.5 text-sm font-semibold text-white hover:bg-brand-cyan/30 transition-colors cursor-pointer",
                children: [
                  t.permissionsCard.getMoreInfo,
                  /* @__PURE__ */ jsx(ChevronRight, { size: 18 })
                ]
              }
            )
          ] })
        ]
      }
    ) }, "hero"),
    // Cards de RIGHT_COLUMN_ROOMS
    ...RIGHT_COLUMN_ROOMS.map((room) => /* @__PURE__ */ jsx(motion.div, { className: "w-full mb-3", variants: itemVariants, children: /* @__PURE__ */ jsx(
      RoomCard,
      {
        title: t.cardTitles[room.id] ?? room.title,
        distance: room.distance,
        icon: room.icon,
        image: "image" in room ? room.image : void 0,
        mediaItems: "mediaItems" in room ? room.mediaItems : void 0,
        aspectRatio: room.aspectRatio,
        className: "w-full",
        children: "image" in room && room.children ? room.children(devices, toggleDevice) : t.cardDescriptions[room.id] ? /* @__PURE__ */ jsx("p", { className: "text-sm text-sh-text-muted leading-relaxed break-words pt-2", children: t.cardDescriptions[room.id] }) : null
      }
    ) }, room.id)),
    // Cards de BOTTOM_ROW_ROOMS
    ...BOTTOM_ROW_ROOMS.map((room) => /* @__PURE__ */ jsx(motion.div, { className: "w-full mb-3", variants: itemVariants, children: /* @__PURE__ */ jsx(
      RoomCard,
      {
        title: t.cardTitles[room.id] ?? room.title,
        distance: room.distance,
        icon: room.icon,
        mediaItems: room.mediaItems,
        aspectRatio: room.aspectRatio,
        className: "w-full",
        children: t.cardDescriptions[room.id] ? /* @__PURE__ */ jsx("p", { className: "text-sm text-sh-text-muted leading-relaxed break-words pt-2", children: t.cardDescriptions[room.id] }) : null
      }
    ) }, room.id))
  ];
  const columns = Array.from(
    { length: cols },
    (_, colIdx) => allCards.filter((_2, i) => i % cols === colIdx)
  );
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: containerRef,
      className: "flex flex-row gap-3 max-w-[1600px] mx-auto items-start",
      initial: "hidden",
      animate: "visible",
      variants: { visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } },
      children: columns.map((colItems, colIdx) => /* @__PURE__ */ jsx("div", { className: "flex flex-col flex-1 min-w-0", children: colItems }, colIdx))
    }
  );
}
function DashboardContent() {
  const { t } = useLanguage();
  const { devices, toggleDevice } = useDashboardState();
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  return /* @__PURE__ */ jsx("div", { className: "flex bg-[#020202] text-white h-screen overflow-hidden p-2 lg:p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full h-full glass rounded-[2.5rem] overflow-hidden shadow-2xl relative", children: [
    /* @__PURE__ */ jsx(Sidebar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsx(TopBar, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative z-0 flex-1 overflow-y-auto overflow-x-hidden px-4 sm:px-6 pt-2 scrollbar-hide min-h-0 safari-flex-shrink pb-28 sm:pb-32", children: [
        /* @__PURE__ */ jsx(
          MasonryLayout,
          {
            devices,
            toggleDevice,
            t,
            setPermissionsModalOpen,
            setInfoModalOpen
          }
        ),
        permissionsModalOpen && createPortal(
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]",
                "aria-hidden": true,
                onClick: () => setPermissionsModalOpen(false)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "pointer-events-auto w-full max-w-lg max-h-[85vh] overflow-y-auto glass rounded-2xl shadow-2xl border border-white/10",
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "permissions-modal-title",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "sticky top-0 glass rounded-t-2xl border-b border-white/10 px-5 py-4 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        id: "permissions-modal-title",
                        className: "text-lg font-bold text-white",
                        children: t.modalPermissions.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setPermissionsModalOpen(false),
                        className: "p-2 rounded-xl text-sh-text-muted hover:text-white hover:bg-white/10 transition-colors",
                        "aria-label": "Cerrar",
                        children: /* @__PURE__ */ jsx(X, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "p-5 flex flex-col gap-4", children: t.modalPermissions.permissions.map((perm, i) => {
                    const Icon = APP_PERMISSION_ICONS[i];
                    return /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: "flex flex-col gap-1.5 rounded-xl bg-white/5 border border-white/10 p-3 min-w-0",
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-white", children: /* @__PURE__ */ jsx(Icon, { size: 18 }) }),
                            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-white break-words", children: perm.label })
                          ] }),
                          /* @__PURE__ */ jsx("p", { className: "text-xs text-sh-text-muted leading-relaxed break-words", children: perm.purpose })
                        ]
                      },
                      perm.label
                    );
                  }) })
                ]
              }
            ) })
          ] }),
          document.body
        ),
        infoModalOpen && createPortal(
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]",
                "aria-hidden": true,
                onClick: () => setInfoModalOpen(false)
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none", children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: "pointer-events-auto w-full max-w-lg max-h-[85vh] overflow-y-auto glass rounded-2xl shadow-2xl border border-white/10",
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "info-modal-title",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "sticky top-0 glass rounded-t-2xl border-b border-white/10 px-5 py-4 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        id: "info-modal-title",
                        className: "text-lg font-bold text-white",
                        children: t.modalInfo.title
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setInfoModalOpen(false),
                        className: "p-2 rounded-xl text-sh-text-muted hover:text-white hover:bg-white/10 transition-colors",
                        "aria-label": "Cerrar",
                        children: /* @__PURE__ */ jsx(X, { size: 20 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col gap-5", children: [
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-white mb-1", children: t.modalInfo.subtitle }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-sh-text-muted leading-relaxed break-words", children: t.modalInfo.intro })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white mb-3", children: t.modalInfo.featuresTitle }),
                      /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-3", children: t.modalInfo.features.map((f, i) => /* @__PURE__ */ jsxs(
                        "li",
                        {
                          className: "rounded-xl bg-white/5 border border-white/10 p-3 flex gap-3",
                          children: [
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: INFO_MODAL_ICONS[i],
                                alt: "",
                                className: "w-9 h-9 shrink-0 rounded-xl object-contain"
                              }
                            ),
                            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                              /* @__PURE__ */ jsx("h4", { className: "text-base font-bold text-white mb-1", children: f.title }),
                              /* @__PURE__ */ jsx("p", { className: "text-sm text-sh-text-muted leading-relaxed break-words whitespace-pre-line", children: f.description })
                            ] })
                          ]
                        },
                        f.title
                      )) }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-sh-text-muted mt-2 px-1", children: t.modalInfo.moreOptionsComing })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/5 border border-white/10 p-3", children: [
                      /* @__PURE__ */ jsx("h3", { className: "text-base font-bold text-white mb-2", children: t.modalInfo.compatibleWith }),
                      /* @__PURE__ */ jsx("ul", { className: "text-sm text-sh-text-muted space-y-1", children: t.modalInfo.compatibleItems.map((item) => /* @__PURE__ */ jsx("li", { children: item }, item)) })
                    ] })
                  ] })
                ]
              }
            ) })
          ] }),
          document.body
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative z-[500] shrink-0", children: /* @__PURE__ */ jsx(BottomBar, {}) })
    ] })
  ] }) });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://task-goblin.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const title = "Task Goblin \u2014 Automatiza tareas en Mac y Windows";
  const description = "Task Goblin es la app que automatiza tu d\xEDa a d\xEDa en Mac y Windows: mover el rat\xF3n (auto clicker), programar mensajes de WhatsApp, Screenshot to Text (OCR), apagado programado, cerrar todas las apps, convertir PDF a Word, extraer colores, y m\xE1s. Desc\xE1rgala ahora.";
  const ogImage = `${Astro2.site}/icon/TaskGoblin.png`;
  const canonical = new URL(Astro2.url.pathname, Astro2.site).toString();
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/icon/TaskGoblin.png"><link rel="icon" href="/icon/TaskGoblin.png"><meta name="viewport" content="width=device-width"><meta name="generator"', "><!-- SEO: Google, Bing (Edge), Safari --><title>", '</title><meta name="description"', '><meta name="keywords" content="Task Goblin, automatizaci\xF3n, Mac, Windows, app, mover rat\xF3n, WhatsApp programado, PDF a Word, extractor de colores, screenshot to text, utilidades, herramientas, auto clicker"><link rel="canonical" href="https://task-goblin.com/"><!-- Open Graph (Facebook, Safari, muchos buscadores) --><meta property="og:type" content="website"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:url"', '><meta property="og:site_name" content="Task Goblin"><meta property="og:locale" content="es_ES"><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><!-- Sitemap para buscadores --><link rel="sitemap" href="/sitemap-index.xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">', '</head> <body class="antialiased font-sans bg-black"> ', ' <!-- JSON-LD: ayuda a Google a mostrar la app en resultados (SoftwareApplication, WebSite, Organization) --> <script type="application/ld+json">', "<\/script> </body> </html>"])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), addAttribute(canonical, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderHead(), renderComponent($$result, "Dashboard", Dashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/components/dashboard/Dashboard", "client:component-export": "Dashboard" }), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://task-goblin.com/#website",
        url: "https://task-goblin.com/",
        name: "Task Goblin",
        description,
        publisher: {
          "@type": "Organization",
          name: "Task Goblin",
          logo: {
            "@type": "ImageObject",
            url: ogImage
          }
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://task-goblin.com/#software",
        name: "Task Goblin",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "macOS, Windows",
        description,
        image: ogImage,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Auto mouse mover",
          "WhatsApp scheduler",
          "Screenshot to Text OCR",
          "Schedule shutdown",
          "Close all apps",
          "PDF to Word",
          "Color extractor"
        ]
      }
    ]
  })));
}, "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/index.astro", void 0);

const $$file = "/Users/uribe/Documents/uribe-desarrollo/task-goblin-apps/task-goblin/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
