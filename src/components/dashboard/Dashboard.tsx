import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { RoomCard } from "./RoomCard";
import { BottomBar } from "./BottomBar";
import { useDashboardState } from "../../hooks/useDashboardState.ts";
import { useState } from "react";
import { createPortal } from "react-dom";
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

const APP_PERMISSIONS = [
  {
    id: "accessibility" as const,
    label: "Accessibility",
    purpose:
      'Required for the "Move Mouse" feature to simulate physical mouse movement.',
    icon: MousePointer2,
  },
  {
    id: "contacts" as const,
    label: "Contacts",
    purpose:
      "Used to fetch your contact list so you can easily select a recipient for WhatsApp messages.",
    icon: Users,
  },
  {
    id: "screenRecording" as const,
    label: "Screen Recording",
    purpose:
      'Necessary for the "Screenshot to Text" feature to capture screen content for OCR.',
    icon: Monitor,
  },
  {
    id: "notifications" as const,
    label: "Notifications",
    purpose:
      "Used to confirm actions like scheduled messages or successful text captures.",
    icon: Bell,
  },
  {
    id: "automationWhatsApp" as const,
    label: "Automation (WhatsApp)",
    purpose:
      "Allows the app to control WhatsApp to automatically type and send scheduled messages.",
    icon: MessageCircle,
  },
];

const FEATURES_LIST = [
  "Movimiento automático del mouse",
  "Programar mensajes de WhatsApp",
  "Screenshot to Text",
  "Cierre rápido de todas las aplicaciones",
  "Apagado programado",
  "Conversión de PDF a Word",
  "Extractor de colores (HEX, RGB, HSL)",
  "Dibujo y anotaciones en pantalla",
  "Conversión y compresión de imágenes",
];

const INFO_MODAL_FEATURES = [
  {
    icon: "/icon/move.gif",
    title: "Movimiento automático del mouse",
    description:
      "Mantén tu estado activo en aplicaciones como Microsoft Teams moviendo el mouse de forma automática cuando no estás usando la computadora.",
  },
  {
    icon: "/icon/chat.gif",
    title: "Programar mensajes de WhatsApp por fecha y hora",
    description:
      "Envía mensajes de WhatsApp de forma programada indicando fecha y hora exacta, ideal para recordatorios, avisos o mensajes repetitivos sin tener que enviarlos manualmente.",
  },
  {
    icon: "/icon/copy.gif",
    title: "Screenshot to Text",
    description:
      "Obtén texto de cualquier imagen, video o parte de tu pantalla. Convierte cualquier texto visible en tu pantalla en texto editable y copiable. Selecciona el área que quieras y TaskGoblin extrae el contenido automáticamente.\n\n¿Cómo funciona?\n\n• Activa Screenshot to Text.\n• Selecciona con el mouse el área de la pantalla que contiene el texto.\n• TaskGoblin reconoce el contenido y lo copia automáticamente al portapapeles.",
  },
  {
    icon: "/icon/close.gif",
    title: "Cerrar todas las aplicaciones",
    description:
      "Cierra todas las apps abiertas con un solo clic para apagar tu computadora más rápido, sin hacerlo una por una.",
  },
  {
    icon: "/icon/off.gif",
    title: "Programar apagado",
    description:
      "Programa el apagado automático de tu computadora después de un tiempo determinado. Ideal para dejar procesos corriendo sin preocuparte.",
  },
  {
    icon: "/icon/note.gif",
    title: "Convertir PDF a Word",
    description:
      "Convierte archivos PDF a Word fácilmente para editarlos sin complicaciones.",
  },
  {
    icon: "/icon/palette.gif",
    title: "Extractor de color",
    description:
      "Obtén los colores de cualquier imagen y cópialos en HEX, RGB o HSL, perfecto para diseño y desarrollo.",
  },
  {
    icon: "/icon/paint.gif",
    title: "Dibujar y resaltar en pantalla",
    description:
      "Dibuja, escribe texto, resalta zonas y agrega figuras directamente sobre la pantalla. Ideal para explicar ideas, grabar videos o dar soporte.",
  },
  {
    icon: "/icon/camera.gif",
    title: "Conversión y compresión de imágenes",
    description:
      "Convierte imágenes a múltiples formatos y reduce su peso sin perder calidad.",
  },
];

/** Descripción por id de card (mismo texto que el modal, tamaño text-sm como la primera card). */
const CARD_DESCRIPTIONS: Record<string, string> = {
  "move-mouse":
    "Mantén tu estado activo en aplicaciones como Microsoft Teams moviendo el mouse de forma automática cuando no estás usando la computadora.",
  "whatsapp-msg":
    "Envía mensajes de WhatsApp de forma programada indicando fecha y hora exacta, ideal para recordatorios, avisos o mensajes repetitivos sin tener que enviarlos manualmente.",
  "screenshot-to-text":
    "Obtén texto de cualquier imagen, video o parte de tu pantalla. Convierte cualquier texto visible en tu pantalla en texto editable y copiable. Selecciona el área que quieras y TaskGoblin extrae el contenido automáticamente.",
  "close-all-apps":
    "Cierra todas las apps abiertas con un solo clic para apagar tu computadora más rápido, sin hacerlo una por una.",
  "schedule-shutdown":
    "Programa el apagado automático de tu computadora después de un tiempo determinado. Ideal para dejar procesos corriendo sin preocuparte.",
  "convert-pdf-to-word":
    "Convierte archivos PDF a Word fácilmente para editarlos sin complicaciones.",
  "color-extractor":
    "Obtén los colores de cualquier imagen y cópialos en HEX, RGB o HSL, perfecto para diseño y desarrollo.",
  paint:
    "Dibuja, escribe texto, resalta zonas y agrega figuras directamente sobre la pantalla. Ideal para explicar ideas, grabar videos o dar soporte.",
  "image-converter":
    "Convierte imágenes a múltiples formatos y reduce su peso sin perder calidad.",
};

export const Dashboard = () => {
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
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-3 max-w-[1600px] mx-auto">
              {/* Cada ítem no se parte entre columnas; margen abajo para separación vertical */}
              <div className="break-inside-avoid mb-3">
                <RoomCard
                  title="Video of the application"
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
                        Permisos solicitados en la aplicación
                      </span>
                    </div>
                    <ChevronRight
                      size={20}
                      className="shrink-0 text-sh-text-muted group-hover:text-white transition-colors"
                    />
                  </button>

                  <div className="pt-2">
                    <p className="text-base font-bold text-white mb-3">
                      Todo lo que necesitas, en una sola app:
                    </p>
                    <ul className="list-disc list-inside text-sm text-sh-text-muted space-y-1.5 mb-3">
                      {FEATURES_LIST.map((item) => (
                        <li key={item} className="break-words">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 mb-4">
                      <Sparkles size={18} className="shrink-0 text-brand-cyan" />
                      <p className="text-sm text-sh-text-muted">
                        Se agregarán más opciones próximamente.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInfoModalOpen(true)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-cyan/20 border border-brand-cyan/40 py-2.5 text-sm font-semibold text-white hover:bg-brand-cyan/30 transition-colors cursor-pointer"
                    >
                      Obtener más información
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
                                Permisos solicitados en la aplicación
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
                              {APP_PERMISSIONS.map(
                                ({ id, label, purpose, icon: Icon }) => (
                                  <div
                                    key={id}
                                    className="flex flex-col gap-1.5 rounded-xl bg-white/5 border border-white/10 p-3 min-w-0"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <div className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                        <Icon size={18} />
                                      </div>
                                      <h4 className="text-sm font-bold text-white break-words">
                                        {label}
                                      </h4>
                                    </div>
                                    <p className="text-xs text-sh-text-muted leading-relaxed break-words">
                                      {purpose}
                                    </p>
                                  </div>
                                ),
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
                                TaskGoblin
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
                                  La app multitarea que automatiza las pequeñas
                                  tareas de tu día a día
                                </p>
                                <p className="text-sm text-sh-text-muted leading-relaxed break-words">
                                  TaskGoblin es una aplicación de productividad
                                  para macOS y Windows que reúne en un solo
                                  lugar herramientas útiles para automatizar
                                  tareas comunes, ahorrar tiempo y trabajar de
                                  forma más eficiente.
                                </p>
                              </div>

                              <div>
                                <h3 className="text-base font-bold text-white mb-3">
                                  🚀 Funciones principales
                                </h3>
                                <ul className="flex flex-col gap-3">
                                  {INFO_MODAL_FEATURES.map((f) => (
                                    <li
                                      key={f.title}
                                      className="rounded-xl bg-white/5 border border-white/10 p-3 flex gap-3"
                                    >
                                      <img
                                        src={f.icon}
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
                                  Se agregarán más opciones próximamente.
                                </p>
                              </div>

                              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                                <h3 className="text-base font-bold text-white mb-2">
                                  ✅ Compatible con
                                </h3>
                                <ul className="text-sm text-sh-text-muted space-y-1">
                                  <li>✔ macOS (Intel y Apple Silicon)</li>
                                  <li>✔ Windows</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>,
                      document.body,
                    )}
                </RoomCard>
              </div>

              {RIGHT_COLUMN_ROOMS.map((room) => (
                <div key={room.id} className="break-inside-avoid mb-3">
                  <RoomCard
                    title={room.title}
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
                      : CARD_DESCRIPTIONS[room.id]
                        ? (
                            <p className="text-sm text-sh-text-muted leading-relaxed break-words pt-2">
                              {CARD_DESCRIPTIONS[room.id]}
                            </p>
                          )
                        : null}
                  </RoomCard>
                </div>
              ))}

              {BOTTOM_ROW_ROOMS.map((room) => (
                <div key={room.id} className="break-inside-avoid mb-3">
                  <RoomCard
                    title={room.title}
                    distance={room.distance}
                    icon={room.icon}
                    mediaItems={room.mediaItems}
                    aspectRatio={room.aspectRatio}
                    className="w-full"
                  >
                    {CARD_DESCRIPTIONS[room.id] ? (
                      <p className="text-sm text-sh-text-muted leading-relaxed break-words pt-2">
                        {CARD_DESCRIPTIONS[room.id]}
                      </p>
                    ) : null}
                  </RoomCard>
                </div>
              ))}
            </div>
          </div>

          <BottomBar />
        </div>
      </div>
    </div>
  );
};
