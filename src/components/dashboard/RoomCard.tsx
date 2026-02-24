"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Armchair,
  ChevronRight,
  Maximize2,
  Thermometer,
  Droplets,
  Smile,
  ChevronLeft,
} from "lucide-react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type MediaSlide =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string };

/** Relación de aspecto del media (masonry). Por defecto "video" (16/9). */
export type RoomCardAspectRatio = "video" | "square" | "4/3" | "3/4" | "2/3";

interface RoomCardProps {
  title: string;
  distance?: string;
  /** Ruta al icono (ej. /icon/move.gif). Si no se pasa, se usa el icono por defecto. */
  icon?: string;
  image?: string;
  /** Carrusel: video + imágenes. El primer ítem se muestra primero; el poster del video puede ser una imagen. */
  mediaItems?: MediaSlide[];
  /** Relación de aspecto para masonry (altura según formato). */
  aspectRatio?: RoomCardAspectRatio;
  stats?: {
    temp?: string;
    humidity?: string;
  };
  children?: React.ReactNode;
  className?: string;
}

const ASPECT_CLASS: Record<RoomCardAspectRatio, string> = {
  video: "aspect-video",
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "2/3": "aspect-[2/3]",
};

export const RoomCard = ({
  title,
  distance,
  icon: iconSrc,
  image,
  mediaItems,
  aspectRatio = "video",
  stats,
  children,
  className,
}: RoomCardProps) => {
  const aspectClass = ASPECT_CLASS[aspectRatio];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFullscreenControls, setShowFullscreenControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const FULLSCREEN_HIDE_DELAY_MS = 2000;
  const items = mediaItems ?? [];
  const hasCarousel = items.length > 0;
  const displayImage = !hasCarousel ? image : undefined;
  const current = items[currentIndex];
  const isVideoSlide = current?.type === "video";

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((prev) => {
        const next = Math.max(0, Math.min(index, items.length - 1));
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setIsPlaying(false);
        return next;
      });
    },
    [items.length],
  );

  const goPrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo],
  );
  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo],
  );

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current || !isVideoSlide) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isVideoSlide, isPlaying]);

  const toggleFullscreen = useCallback(() => {
    const el = mediaContainerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
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

  return (
    <div
      className={cn(
        "glass rounded-[2rem] p-5 flex flex-col gap-4 group transition-all duration-500 hover:bg-white/[0.08]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl glass flex items-center justify-center text-sh-accent overflow-hidden">
            {iconSrc ? (
              <img src={iconSrc} alt="" className="w-5 h-5 object-contain" />
            ) : (
              <Armchair size={18} />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              {title}
            </h2>
            {distance && (
              <p className="text-[10px] text-sh-text-muted font-medium">
                {distance}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {stats && (
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-1.5">
                <Thermometer size={14} className="text-sh-text-muted" />
                <span className="text-xs font-semibold text-white">
                  {stats.temp}
                </span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
                <Droplets size={14} className="text-sh-text-muted" />
                <span className="text-xs font-semibold text-white">
                  {stats.humidity}
                </span>
              </div>
              <Smile size={14} className="text-sh-text-muted ml-1" />
            </div>
          )}
          <button className="text-sh-text-muted hover:text-white transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative flex-1">
        {hasCarousel && (
          <div
            ref={mediaContainerRef}
            className={cn(
              "group/video relative overflow-hidden shadow-2xl bg-black/20",
              "rounded-[1.5rem]",
              aspectClass,
              isFullscreen && "!aspect-auto !rounded-none w-screen h-screen flex items-center justify-center",
            )}
          >
            {current?.type === "video" && (
              <>
                <video
                  ref={videoRef}
                  src={current.src}
                  poster={current.poster}
                  className="w-full h-full object-contain"
                  playsInline
                  muted
                  onClick={togglePlayPause}
                />
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all [&:hover_.play-pause-circle]:bg-white/30",
                    isFullscreen
                      ? showFullscreenControls
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                      : "opacity-0 group-hover/video:opacity-100",
                  )}
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                  <span className="play-pause-circle w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors">
                    {isPlaying ? (
                      <PauseIcon sx={{ fontSize: 40 }} />
                    ) : (
                      <PlayArrowIcon sx={{ fontSize: 48 }} />
                    )}
                  </span>
                </button>
              </>
            )}
            {current?.type === "image" && (
              <img
                src={current.src}
                alt={title}
                className="w-full h-full object-contain"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />

            <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ring-4 ring-red-500/20" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider" />
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 transform transition-all group-hover:scale-110"
              aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            >
              <Maximize2 size={14} />
            </button>

            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white/90 text-[10px] font-bold uppercase tracking-wider">
              <span className="bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {items.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity p-0.5"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <div className="flex items-center gap-1">
                  {items.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        i === currentIndex
                          ? "bg-white scale-110"
                          : "bg-white/30 hover:bg-white/50",
                      )}
                      aria-label={`Ir a slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={currentIndex === items.length - 1}
                  className="opacity-60 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity p-0.5"
                  aria-label="Siguiente"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
              <span className="bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                {currentIndex + 1} / {items.length}
              </span>
            </div>
          </div>
        )}
        {displayImage && (
          <div className={cn("relative rounded-[1.5rem] overflow-hidden shadow-2xl", aspectClass)}>
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

            <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse ring-4 ring-red-500/20" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider" />
            </div>

            <button className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 transform transition-all group-hover:scale-110">
              <Maximize2 size={14} />
            </button>

            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white/90 text-[10px] font-bold uppercase tracking-wider">
              <span className="bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                1
              </span>
              <span className="bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-sm">
                1 / 1
              </span>
            </div>
          </div>
        )}
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
};
