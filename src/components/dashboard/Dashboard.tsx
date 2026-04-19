import { TopBar } from "./TopBar";
import { RoomCard } from "./RoomCard";
import { BottomBar } from "./BottomBar";
import { AppMacFeatures } from "./AppMacFeatures";
import { useDashboardState } from "../../hooks/useDashboardState.ts";
import { LanguageProvider, useLanguage } from "../../contexts/LanguageContext";
import { LayoutProvider } from "../../contexts/LayoutContext";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  MousePointer2,
  Users,
  Monitor,
  Bell,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import { APP_CONFIGS, type MediaSlide, type RoomCardAspectRatio } from "../../constants/app_data";

type AppType = keyof typeof APP_CONFIGS;

type RightColumnRoom = {
  id: string;
  title: string;
  distance: string;
  icon: string;
  mediaItems: MediaSlide[];
  aspectRatio: RoomCardAspectRatio;
  children: null | ((devices: any, toggle: any) => React.ReactNode);
};

/** Habitaciones de la columna derecha en masonry. */
// Rooms are now loaded from APP_CONFIGS

const APP_PERMISSION_ICONS = [
  MousePointer2,
  Users,
  Monitor,
  Bell,
  MessageCircle,
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
  "/icon/camera.gif",
];

export const Dashboard = ({ appType = "task-goblin" }: { appType?: AppType }) => {
  return (
    <LanguageProvider>
      <LayoutProvider>
        <DashboardContent appType={appType} />
      </LayoutProvider>
    </LanguageProvider>
  );
};

// ─── MasonryLayout ────────────────────────────────────────────────────────────
// Construye el masonry con columnas flex en lugar de CSS `columns`,
// ya que Safari/WebKit tiene un bug conocido con columns + break-inside:avoid.
// Usamos un hook JS para detectar el número de columnas en lugar de clases
// hidden/flex de Tailwind, que tienen problemas de orden CSS en Tailwind 4.

type MasonryProps = {
  appType: AppType;
  devices: ReturnType<typeof useDashboardState>["devices"];
  toggleDevice: ReturnType<typeof useDashboardState>["toggleDevice"];
  t: ReturnType<typeof useLanguage>["t"];
  setPermissionsModalOpen: (v: boolean) => void;
  setInfoModalOpen: (v: boolean) => void;
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 30 },
  },
};

/** Devuelve el número de columnas masonry basándose en el ancho del contenedor. */
function useMasonryCols(breakpoints = { sm: 640, lg: 1024 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(() => {
    if (typeof globalThis.window === "undefined") return 3;
    const w = globalThis.window.innerWidth;
    return w >= breakpoints.lg ? 3 : w >= breakpoints.sm ? 2 : 1;
  });

  useEffect(() => {
    const el = ref.current ?? document.documentElement;
    const update = () => {
      const w = globalThis.window.innerWidth;
      const nextCols = w >= breakpoints.lg ? 3 : w >= breakpoints.sm ? 2 : 1;
      setCols(nextCols);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [breakpoints.sm, breakpoints.lg]);

  return { ref, cols };
}

function MasonryLayout({
  appType,
  devices,
  toggleDevice,
  t,
  setPermissionsModalOpen,
  setInfoModalOpen,
}: MasonryProps) {
  let { ref: containerRef, cols } = useMasonryCols();
  if (appType === "floaty") {
    cols = 1;
  }
  const config = APP_CONFIGS[appType] as any;
  const { right: rightRooms, bottom: bottomRooms } = config.rooms;

  // Lista plana de datos de cards (sin JSX — se construye abajo para evitar duplicados)
  const allCards: React.ReactNode[] = [
    // Card 1: Hero (video de app + permisos + features)
    <motion.div key="hero" className="w-full mb-3" variants={itemVariants}>
      <RoomCard
        title={appType === "task-goblin" ? t.videoCardTitle : appType === "nexo" ? t.nexoVideoCardTitle : t.floatyVideoCardTitle}
        distance=""
        icon={config.heroIcon}
        aspectRatio="video"
        mediaItems={
          config.heroVideo
            ? [{ type: "video", src: config.heroVideo, poster: config.heroPoster }, ...config.heroImages.map((src: string) => ({ type: "image" as const, src }))]
            : config.heroImages.map((src: string) => ({ type: "image" as const, src }))
        }
        className="w-full"
        priority={true}
      >
        {appType === "task-goblin" ? (
          <>
            <button
              type="button"
              onClick={() => setPermissionsModalOpen(true)}
              className="w-full flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-white/[0.08] hover:border-white/20 transition-colors cursor-pointer group pt-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <ShieldCheck size={20} />
                </span>
                <span className="text-sm font-bold text-white">
                  {t.permissionsCard.title}
                </span>
              </div>
              <ChevronRight
                size={20}
                className="shrink-0 text-sh-text-muted group-hover:text-white transition-colors"
              />
            </button>

            <div className="pt-2">
              <p className="text-base font-bold text-white mb-3">
                {t.permissionsCard.featuresTitle}
              </p>
              <ul className="list-disc list-inside text-sm text-sh-text-muted space-y-1.5 mb-3">
                {t.featuresList.map((item) => (
                  <li key={item} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 mb-4 hover:bg-white/[0.08] hover:border-white/20 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2 group/btn">
                  <Sparkles size={18} className="shrink-0 transition-colors" style={{ color: config.accentColor }} />
                  <span className="text-white group-hover/btn:text-white transition-colors">
                    {t.permissionsCard.getTaskGoblinPro}
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setInfoModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 py-2.5 text-sm font-semibold text-white hover:bg-brand-cyan/30 transition-colors cursor-pointer"
              >
                {t.permissionsCard.getMoreInfo}
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="pt-2">
            <p className="text-sm text-sh-text-muted leading-relaxed mb-1 whitespace-pre-line">
              {appType === 'nexo' ? t.nexoIntro : t.floatyIntro}
            </p>
          </div>
        )}
      </RoomCard>
    </motion.div>,

    // Cards de rightRooms
    ...rightRooms.map((room: any) => (
      <motion.div key={room.id} className="w-full mb-3" variants={itemVariants}>
        <RoomCard
          title={t.cardTitles[room.id as keyof typeof t.cardTitles] ?? room.title}
          distance={room.distance}
          icon={room.icon}
          mediaItems={room.mediaItems}
          aspectRatio={room.aspectRatio}
          className="w-full"
        >
          {(() => {
            if (room.children) return room.children(devices, toggleDevice);
            const description = t.cardDescriptions[room.id as keyof typeof t.cardDescriptions];
            if (description) {
              return (
                <p className="text-sm text-sh-text-muted leading-relaxed break-words pt-2">
                  {description}
                </p>
              );
            }
            return null;
          })()}
        </RoomCard>
      </motion.div>
    )),

    // Cards de bottomRooms
    ...bottomRooms.map((room: any) => (
      <motion.div key={room.id} className="w-full mb-3" variants={itemVariants}>
        <RoomCard
          title={t.cardTitles[room.id as keyof typeof t.cardTitles] ?? room.title}
          distance={room.distance}
          icon={room.icon}
          mediaItems={room.mediaItems}
          aspectRatio={room.aspectRatio}
          className="w-full"
        >
          {t.cardDescriptions[room.id as keyof typeof t.cardDescriptions] ? (
            <p className="text-sm text-sh-text-muted leading-relaxed break-words pt-2">
              {t.cardDescriptions[room.id as keyof typeof t.cardDescriptions]}
            </p>
          ) : null}
        </RoomCard>
      </motion.div>
    )),
  ];

  // Construir columnas distribuyendo items: [0,1,2,3,...] → col0=[0,cols,2*cols,...], col1=[1,cols+1,...]
  const columns = Array.from({ length: cols }, (_, colIdx) =>
    allCards.filter((_, i) => i % cols === colIdx),
  );

  return (
    <motion.div
      ref={containerRef}
      className={`flex flex-row gap-3 mx-auto items-start ${appType === "floaty" ? "w-full sm:w-[50%] max-w-[1200px]" : "w-full max-w-[1600px]"}`}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
    >
      {columns.map((colItems, colIdx) => (
        <div key={`${colIdx}-${cols}`} className="flex flex-col flex-1 min-w-0">
          {colItems}
        </div>
      ))}
    </motion.div>
  );
}

function DashboardContent({ appType }: { appType: AppType }) {
  const { t } = useLanguage();
  const { devices, toggleDevice } = useDashboardState();
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const [showTopBar, setShowTopBar] = useState(true);
  const lastScrollY = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobileScroll = window.innerWidth < 1024;
    const target = isMobileScroll ? window : scrollContainerRef.current;
    if (!target) return;

    const handleScroll = () => {
      const currentScrollY = isMobileScroll ? window.scrollY : (target as HTMLElement).scrollTop;
      
      // Calculate max scroll to handle rubber-banding/elastic scroll on iOS
      const scrollHeight = isMobileScroll 
        ? document.documentElement.scrollHeight 
        : (target as HTMLElement).scrollHeight;
      const clientHeight = isMobileScroll 
        ? window.innerHeight 
        : (target as HTMLElement).clientHeight;
      const maxScroll = scrollHeight - clientHeight;

      // 1. Ignore elastic scroll values (bouncing at top or bottom)
      // This prevents the header from flickering when the user hits the scroll limits
      if (currentScrollY < 0 || (maxScroll > 0 && currentScrollY > maxScroll)) {
        return;
      }

      // Determine if we are scrolling up or down
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY.current);

      // 2. Show header if we are near the top (e.g. top 50px) regardless of scroll direction
      if (currentScrollY < 50) {
        setShowTopBar(true);
      }
      // 3. Prevent showing header if we are near the very bottom
      // This is an extra safety layer against bottom-bounce glitches
      else if (maxScroll > 0 && currentScrollY > maxScroll - 30) {
        // Stay in current state or force hide if scrolling down
        if (isScrollingDown) setShowTopBar(false);
      }
      // 4. Only toggle if we've scrolled more than a significant threshold (e.g. 25px)
      // This prevents "jitter" or "bouncing" from tiny movements
      else if (scrollDifference > 25) {
        if (isScrollingDown) {
          setShowTopBar(false);
        } else {
          setShowTopBar(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  // Update global CSS variables based on active app colors
  useEffect(() => {
    const root = document.documentElement;
    const config = APP_CONFIGS[appType] as any;
    const { accentColor, backgroundColor } = config;

    root.style.setProperty('--sh-accent', accentColor);
    root.style.setProperty('--tg-accent', accentColor);
    root.style.setProperty('--sh-accent-muted', `${accentColor}33`);
    root.style.setProperty('--sh-panel-border', `${accentColor}14`);

    // Set a static dark background for the dashboard pages
    root.style.setProperty('--sh-background', '#0a0a0a');
  }, [appType]);

  return (
    <div className="flex text-white min-h-[100dvh] lg:h-screen overflow-x-hidden lg:overflow-hidden p-0 lg:p-4 bg-[#0a0a0a]">
      <div className="flex w-full min-h-full lg:h-full rounded-2xl lg:rounded-[2.5rem] lg:overflow-hidden shadow-2xl relative bg-[#0a0a0a] flex-col">
        <TopBar isVisible={showTopBar} appType={appType} />

        <div
          ref={scrollContainerRef}
          className="relative z-0 flex-1 overflow-visible lg:overflow-y-auto overflow-x-hidden px-4 sm:px-6 pt-20 lg:pt-24 min-h-0 safari-flex-shrink pb-28 sm:pb-32"
        >
            <AppMacFeatures
              appType={appType}
              setPermissionsModalOpen={setPermissionsModalOpen}
              setInfoModalOpen={setInfoModalOpen}
            />

            {/* ── Modals (renderizados via createPortal en document.body) ── */}
            {permissionsModalOpen &&
              createPortal(
                <>
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                    aria-hidden
                    onClick={() => setPermissionsModalOpen(false)}
                  />
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                    <div
                      className="pointer-events-auto w-full max-w-lg max-h-[85vh] overflow-y-auto glass rounded-2xl shadow-2xl border border-white/10"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="permissions-modal-title"
                    >
                      <div className="sticky top-0 glass rounded-t-2xl border-b border-white/10 px-5 py-4 flex items-center justify-between">
                        <h2
                          id="permissions-modal-title"
                          className="text-lg font-bold text-white"
                        >
                          {t.modalPermissions.title}
                        </h2>
                        <button
                          type="button"
                          onClick={() => setPermissionsModalOpen(false)}
                          className="p-2 rounded-xl text-sh-text-muted hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Cerrar"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="p-5 flex flex-col gap-4">
                        {t.modalPermissions.permissions.map((perm, i) => {
                          const Icon = APP_PERMISSION_ICONS[i];
                          return (
                            <div
                              key={perm.label}
                              className="flex flex-col gap-1.5 rounded-xl bg-white/5 border border-white/10 p-3 min-w-0"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                  <Icon size={18} />
                                </div>
                                <h4 className="text-sm font-bold text-white break-words">
                                  {perm.label}
                                </h4>
                              </div>
                              <p className="text-xs text-sh-text-muted leading-relaxed break-words">
                                {perm.purpose}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>,
                document.body,
              )}

            {infoModalOpen &&
              createPortal(
                <>
                  <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                    aria-hidden
                    onClick={() => setInfoModalOpen(false)}
                  />
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                    <div
                      className="pointer-events-auto w-full max-w-lg max-h-[85vh] overflow-y-auto glass rounded-2xl shadow-2xl border border-white/10"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="info-modal-title"
                    >
                      <div className="sticky top-0 glass rounded-t-2xl border-b border-white/10 px-5 py-4 flex items-center justify-between">
                        <h2
                          id="info-modal-title"
                          className="text-lg font-bold text-white"
                        >
                          {t.modalInfo.title}
                        </h2>
                        <button
                          type="button"
                          onClick={() => setInfoModalOpen(false)}
                          className="p-2 rounded-xl text-sh-text-muted hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Cerrar"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="p-5 flex flex-col gap-5">
                        <div>
                          <p className="text-base font-semibold text-white mb-1">
                            {t.modalInfo.subtitle}
                          </p>
                          <p className="text-sm text-sh-text-muted leading-relaxed break-words">
                            {t.modalInfo.intro}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white mb-3">
                            {t.modalInfo.featuresTitle}
                          </h3>
                          <ul className="flex flex-col gap-3">
                            {t.modalInfo.features.map((f, i) => (
                              <li
                                key={f.title}
                                className="rounded-xl bg-white/5 border border-white/10 p-3 flex gap-3"
                              >
                                <img
                                  src={INFO_MODAL_ICONS[i]}
                                  alt=""
                                  className="w-9 h-9 shrink-0 rounded-xl object-contain"
                                />
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-base font-bold text-white mb-1">
                                    {f.title}
                                  </h4>
                                  <p className="text-sm text-sh-text-muted leading-relaxed break-words whitespace-pre-line">
                                    {f.description}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          <p className="text-sm text-sh-text-muted mt-2 px-1">
                            {t.modalInfo.moreOptionsComing}
                          </p>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                          <h3 className="text-base font-bold text-white mb-2">
                            {t.modalInfo.compatibleWith}
                          </h3>
                          <ul className="text-sm text-sh-text-muted space-y-1">
                            {t.modalInfo.compatibleItems.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>,
                document.body,
              )}
          </div>

          <div className="relative z-[500] shrink-0">
            <BottomBar appType={appType as "task-goblin" | "nexo" | "floaty"} />
          </div>
      </div>
    </div>
  );
};
