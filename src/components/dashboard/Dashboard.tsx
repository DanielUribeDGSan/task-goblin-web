import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { RoomCard } from "./RoomCard";
import { BottomBar } from "./BottomBar";
import { useDashboardState } from "../../hooks/useDashboardState.ts";
import { LanguageProvider, useLanguage } from "../../contexts/LanguageContext";
import { LayoutProvider } from "../../contexts/LayoutContext";
import { useState } from "react";
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
import type { MediaSlide, RoomCardAspectRatio } from "./RoomCard";

type RightColumnRoom =
  | {
      id: string;
      title: string;
      distance: string;
      icon: string;
      mediaItems: MediaSlide[];
      aspectRatio: RoomCardAspectRatio;
      children: null;
    }
  | {
      id: string;
      title: string;
      distance: string;
      icon: string;
      image: string;
      aspectRatio: RoomCardAspectRatio;
      children:
        | ((
            devices: ReturnType<typeof useDashboardState>["devices"],
            toggle: ReturnType<typeof useDashboardState>["toggleDevice"],
          ) => React.ReactNode)
        | null;
    };

/** Habitaciones de la columna derecha en masonry. */
const RIGHT_COLUMN_ROOMS: RightColumnRoom[] = [
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
        poster: "/mouse/image-1.png",
      },
      { type: "image", src: "/mouse/image-1.png" },
    ],
    children: null,
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
        poster: "/whatsaap/image-1.png",
      },
      { type: "image", src: "/whatsaap/image-1.png" },
      { type: "image", src: "/whatsaap/image-2.png" },
    ],
    children: null,
  },
];

/** Tarjetas de la fila inferior en masonry: video + imagen(es) por carpeta. */
const BOTTOM_ROW_ROOMS: {
  id: string;
  title: string;
  distance: string;
  icon: string;
  mediaItems: MediaSlide[];
  aspectRatio: RoomCardAspectRatio;
}[] = [
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
        poster: "/capture-text/image-1.png",
      },
      { type: "image", src: "/capture-text/image-1.png" },
    ],
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
        poster: "/closed-apss/image-1.png",
      },
      { type: "image", src: "/closed-apss/image-1.png" },
    ],
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
        poster: "/shutdown/image-1.png",
      },
      { type: "image", src: "/shutdown/image-1.png" },
    ],
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
        poster: "/pdf-word/image-1.png",
      },
      { type: "image", src: "/pdf-word/image-1.png" },
    ],
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
        poster: "/color-extractor/image-1.png",
      },
      { type: "image", src: "/color-extractor/image-1.png" },
    ],
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
        poster: "/paint/image-1.png",
      },
      { type: "image", src: "/paint/image-1.png" },
    ],
  },
  {
    id: "image-converter",
    title: "Image Converter",
    distance: "",
    icon: "/icon/camera.gif",
    aspectRatio: "4/3",
    mediaItems: [
      {
        type: "video",
        src: "/image-convert/video.mp4",
        poster: "/image-convert/image-1.png",
      },
      { type: "image", src: "/image-convert/image-1.png" },
      { type: "image", src: "/image-convert/image-2.png" },
    ],
  },
];

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

export const Dashboard = () => {
  return (
    <LanguageProvider>
      <LayoutProvider>
        <DashboardContent />
      </LayoutProvider>
    </LanguageProvider>
  );
};

function DashboardContent() {
  const { t } = useLanguage();
  const { devices, toggleDevice } = useDashboardState();
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  return (
    <div className="flex bg-[#020202] text-white h-screen overflow-hidden p-2 lg:p-4">
      <div className="flex w-full h-full glass rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 pt-2 scrollbar-hide min-h-0">
            {/* Masonry: 1 col móvil, 2 tablet, 3 escritorio */}
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 gap-x-3 max-w-[1600px] mx-auto"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.05 },
                },
              }}
            >
              {/* Cada ítem no se parte entre columnas; margen abajo para separación vertical */}
              <motion.div
                className="break-inside-avoid mb-3 overflow-visible"
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 380, damping: 30 },
                  },
                }}
              >
                <RoomCard
                  title={t.videoCardTitle}
                  distance=""
                  icon="/icon/bot.gif"
                  aspectRatio="video"
                  mediaItems={[
                    {
                      type: "video",
                      src: "/home/video.mp4",
                      poster: "/home/image-1.png",
                    },
                    { type: "image", src: "/home/image-1.png" },
                    { type: "image", src: "/home/image-2.png" },
                  ]}
                  className="w-full"
                >
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
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 mb-4">
                      <Sparkles size={18} className="shrink-0 text-brand-cyan" />
                      <p className="text-sm text-sh-text-muted">
                        {t.permissionsCard.moreOptionsComing}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInfoModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 py-2.5 text-sm font-semibold text-white hover:bg-brand-cyan/30 transition-colors cursor-pointer"
                    >
                      {t.permissionsCard.getMoreInfo}
                      <ChevronRight size={18} />
                    </button>
                  </div>

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
                              {t.modalPermissions.permissions.map(
                                (perm, i) => {
                                  const Icon =
                                    APP_PERMISSION_ICONS[i];
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
                                },
                              )}
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
                </RoomCard>
              </motion.div>

              {RIGHT_COLUMN_ROOMS.map((room) => (
                <motion.div
                  key={room.id}
                  className="break-inside-avoid mb-3 overflow-visible"
                  variants={{
                    hidden: { opacity: 0, y: 18, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 380, damping: 30 },
                    },
                  }}
                >
                  <RoomCard
                    title={t.cardTitles[room.id as keyof typeof t.cardTitles] ?? room.title}
                    distance={room.distance}
                    icon={room.icon}
                    image={"image" in room ? room.image : undefined}
                    mediaItems={
                      "mediaItems" in room ? room.mediaItems : undefined
                    }
                    aspectRatio={room.aspectRatio}
                    className="w-full overflow-visible"
                  >
                    {"image" in room && room.children
                      ? room.children(devices, toggleDevice)
                      : t.cardDescriptions[room.id as keyof typeof t.cardDescriptions]
                        ? (
                            <p className="text-sm text-sh-text-muted leading-relaxed break-words pt-2">
                              {t.cardDescriptions[room.id as keyof typeof t.cardDescriptions]}
                            </p>
                          )
                        : null}
                  </RoomCard>
                </motion.div>
              ))}

              {BOTTOM_ROW_ROOMS.map((room) => (
                <motion.div
                  key={room.id}
                  className="break-inside-avoid mb-3 overflow-visible"
                  variants={{
                    hidden: { opacity: 0, y: 18, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 380, damping: 30 },
                    },
                  }}
                >
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
              ))}
            </motion.div>
          </div>

          <BottomBar />
        </div>
      </div>
    </div>
  );
};
