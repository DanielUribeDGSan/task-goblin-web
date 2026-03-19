
export type MediaSlide = 
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

export type RoomCardAspectRatio = "video" | "square" | "4/3" | "3/4" | "2/3";

export interface RoomConfig {
  id: string;
  title: string;
  distance: string;
  icon: string;
  aspectRatio: RoomCardAspectRatio;
  mediaItems: MediaSlide[];
  children?: any;
}

export const TASK_GOBLIN_ROOMS: { right: RoomConfig[]; bottom: RoomConfig[] } = {
  right: [
    {
      id: "move-mouse",
      title: "Move Mouse",
      distance: "",
      icon: "/icon/move.gif",
      aspectRatio: "4/3",
      mediaItems: [
        { type: "video", src: "/mouse/video.mp4", poster: "/mouse/image-1.png" },
        { type: "image", src: "/mouse/image-1.png" },
      ],
    },
    {
      id: "whatsapp-msg",
      title: "WhatsApp Msg",
      distance: "",
      icon: "/icon/chat.gif",
      aspectRatio: "square",
      mediaItems: [
        { type: "video", src: "/whatsaap/video.mp4", poster: "/whatsaap/image-1.png" },
        { type: "image", src: "/whatsaap/image-1.png" },
        { type: "image", src: "/whatsaap/image-2.png" },
      ],
    },
  ],
  bottom: [
    {
      id: "screenshot-to-text",
      title: "Screenshot to Text",
      distance: "",
      icon: "/icon/copy.gif",
      aspectRatio: "4/3",
      mediaItems: [
        { type: "video", src: "/capture-text/video.mp4", poster: "/capture-text/image-1.png" },
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
        { type: "video", src: "/closed-apss/video.mp4", poster: "/closed-apss/image-1.png" },
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
        { type: "video", src: "/shutdown/video.mp4", poster: "/shutdown/image-1.png" },
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
        { type: "video", src: "/pdf-word/video.mp4", poster: "/pdf-word/image-1.png" },
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
        { type: "video", src: "/color-extractor/video.mp4", poster: "/color-extractor/image-1.png" },
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
        { type: "video", src: "/paint/video.mp4", poster: "/paint/image-1.png" },
        { type: "image", src: "/paint/image-1.png" },
      ],
    },
    {
      id: "image-converter",
      title: "Image & PDF Converter",
      distance: "",
      icon: "/icon/camera.gif",
      aspectRatio: "4/3",
      mediaItems: [
        { type: "video", src: "/image-convert/video.mp4", poster: "/image-convert/image-1.png" },
        { type: "image", src: "/image-convert/image-1.png" },
        { type: "image", src: "/image-convert/image-2.png" },
      ],
    },
  ]
};

export const NEXO_ROOMS: { right: RoomConfig[]; bottom: RoomConfig[] } = {
  right: [
    {
      id: "nexo-proyectos",
      title: "nexo-proyectos",
      distance: "",
      icon: "/icon/computer.png",
      aspectRatio: "video",
      mediaItems: [
        { type: "video", src: "/nexo/videos/proyectos.mp4", poster: "/nexo/images/proyectos.png" },
        { type: "image", src: "/nexo/images/proyectos.png" },
      ],
    },
    {
      id: "nexo-puertos",
      title: "nexo-puertos",
      distance: "",
      icon: "/icon/move.gif",
      aspectRatio: "video",
      mediaItems: [
        { type: "video", src: "/nexo/videos/puertosycompartir.mp4", poster: "/nexo/images/puertos.png" },
        { type: "image", src: "/nexo/images/puertos.png" },
      ],
    },
    {
      id: "nexo-compartir",
      title: "nexo-compartir",
      distance: "",
      icon: "/icon/camera.gif",
      aspectRatio: "video",
      mediaItems: [
        { type: "image", src: "/nexo/images/compartir-proyecto.png" },
      ],
    },
  ],
  bottom: [
    {
      id: "nexo-env",
      title: "nexo-env",
      distance: "",
      icon: "/icon/bot.gif",
      aspectRatio: "video",
      mediaItems: [
        { type: "video", src: "/nexo/videos/env.mp4", poster: "/nexo/images/env.png" },
        { type: "image", src: "/nexo/images/env.png" },
      ],
    },
    {
      id: "nexo-urls",
      title: "nexo-urls",
      distance: "",
      icon: "/icon/chat.gif",
      aspectRatio: "video",
      mediaItems: [
        { type: "video", src: "/nexo/videos/urls.mp4", poster: "/nexo/images/urls.png" },
        { type: "image", src: "/nexo/images/urls.png" },
      ],
    },
    {
      id: "nexo-snippets",
      title: "nexo-snippets",
      distance: "",
      icon: "/icon/note.gif",
      aspectRatio: "video",
      mediaItems: [
        { type: "video", src: "/nexo/videos/snippets.mp4", poster: "/nexo/images/snippets.png" },
        { type: "image", src: "/nexo/images/snippets.png" },
      ],
    },
  ]
};

export const APP_CONFIGS = {
  "task-goblin": {
    name: "TaskGoblin",
    iconPath: "/icon/TaskGoblin.png",
    accentColor: "#AA7915",
    secondaryColor: "#1a1a2e",
    rooms: TASK_GOBLIN_ROOMS,
    heroIcon: "/icon/bot.gif",
    heroVideo: "/home/video.mp4",
    heroPoster: "/task-goblin/images/task-goblin-general.png",
    heroImages: ["/task-goblin/images/task-goblin-general.png", "/home/image-1.png", "/home/image-2.png"],
    path: "/task-goblin-app",
  },
  "nexo": {
    name: "Nexo",
    iconPath: "/icon/computer.png",
    accentColor: "#AA7915",
    secondaryColor: "#09090b",
    rooms: NEXO_ROOMS,
    heroIcon: "/icon/computer.png",
    heroVideo: "/nexo/videos/proyectos.mp4",
    heroPoster: "/nexo/images/nexo-general.png",
    heroImages: [
      "/nexo/images/nexo-general.png", 
      "/nexo/images/proyectos.png", 
      "/nexo/images/puertos.png",
      "/nexo/images/env.png",
      "/nexo/images/urls.png",
      "/nexo/images/snippets.png"
    ],
    path: "/nexo-app",
  }
} as const;
 
export const TASK_GOBLIN_URLS = [
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV9hYXJjaDY0LmRtZw==",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV94NjQuZG1n",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV94NjQtc2V0dXAuZXhl",
];

export const NEXO_URLS = [
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi1OZXhvL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9uZXhvXzAuMS4wX2FhcmNoNjQuZG1n",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi1OZXhvL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9uZXhvXzAuMS4wX3g2NC5kbWc=",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi1OZXhvL3JlbGVhc2VzL2Rvd25sb2FkL2xhdGVzdC9uZXhvXzAuMS4wX3g2NC1zZXR1cC5leGU=",
];
