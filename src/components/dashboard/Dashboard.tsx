import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { RoomCard } from "./RoomCard";
import { DeviceControl } from "./DeviceControl";
import { BottomBar } from "./BottomBar";
import { useDashboardState } from "../../hooks/useDashboardState.ts";
import { Camera, Zap, Wind } from "lucide-react";
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
      children: ((
        devices: ReturnType<typeof useDashboardState>["devices"],
        toggle: ReturnType<typeof useDashboardState>["toggleDevice"],
      ) => React.ReactNode) | null;
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
];

export const Dashboard = () => {
  const { devices, toggleDevice } = useDashboardState();

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
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <DeviceControl
                      icon={<Camera size={18} />}
                      label="Camera CCTV"
                      statusText="82%"
                      percentage={82}
                      active={devices.livingRoomCamera}
                      onToggle={() => toggleDevice("livingRoomCamera")}
                    />
                    <DeviceControl
                      icon={<Zap size={18} />}
                      label="Lightning"
                      sublabel="Chandelier, Dimmers"
                      active={devices.livingRoomLighting}
                      onToggle={() => toggleDevice("livingRoomLighting")}
                    />
                    <DeviceControl
                      icon={<Wind size={18} />}
                      label="Vacuum Cleaner"
                      statusText="58%"
                      percentage={58}
                      active={devices.livingRoomVacuum}
                      onToggle={() => toggleDevice("livingRoomVacuum")}
                    />
                  </div>
                </RoomCard>
              </div>

              {RIGHT_COLUMN_ROOMS.map((room) => (
                <div key={room.id} className="break-inside-avoid mb-3">
                  <RoomCard
                    title={room.title}
                    distance={room.distance}
                    icon={room.icon}
                    image={"image" in room ? room.image : undefined}
                    mediaItems={"mediaItems" in room ? room.mediaItems : undefined}
                    aspectRatio={room.aspectRatio}
                    className="w-full overflow-visible"
                  >
                    {"image" in room && room.children
                      ? room.children(devices, toggleDevice)
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
                  />
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
