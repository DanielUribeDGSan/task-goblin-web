import {
  X,
} from "lucide-react";
import { APP_CONFIGS } from "../../constants/app_data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLayout } from "../../contexts/LayoutContext";
import { createPortal } from "react-dom";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const icons: { id: string; icon: string | any; path: string }[] = [
  { id: "task-goblin", icon: "/icon/TaskGoblin.png", path: "/task-goblin-app" },
  { id: "nexo", icon: "/icon/computer.png", path: "/nexo-app" },
];

const SidebarContent = ({
  activeId = "dashboard",
  onClose,
  isOverlay,
}: {
  activeId?: string;
  onClose?: () => void;
  isOverlay?: boolean;
}) => (
  <>
    {isOverlay && onClose && (
      <div className="flex items-center justify-end p-4">
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Cerrar menú"
        >
          <X size={22} />
        </button>
      </div>
    )}
    <div className={cn("flex-1 flex flex-col gap-3", isOverlay && "p-4")}>
      {icons.map(({ id, icon: Icon, path }) => {
        const config = APP_CONFIGS[id as keyof typeof APP_CONFIGS];
        const accentColor = config?.accentColor || "#AA7915";
        const isActive = activeId === id;

        return (
          <a
            key={id}
            href={path}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-300",
              !isActive && "text-white/20 hover:text-white/60 hover:bg-white/5",
            )}
            style={isActive ? {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: `1px solid ${accentColor}40`,
              boxShadow: `0 0 20px ${accentColor}20`
            } : {}}
          >
            {typeof Icon === "string" ? (
              <img src={Icon} alt={id} className="w-7 h-7 object-contain" />
            ) : (
              <Icon size={24} strokeWidth={2} />
            )}
          </a>
        );
      })}
    </div>
  </>
);

export const Sidebar = ({ activeId = "dashboard" }: { activeId?: string }) => {
  const { isMobile, sidebarOpen, setSidebarOpen } = useLayout();

  if (isMobile) {
    return (
      <>
        {sidebarOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-[100] flex"
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
                aria-label="Cerrar menú"
              />
              <div className="relative w-64 h-full flex flex-col bg-[#0f0f0f] shadow-xl">
                <SidebarContent
                  activeId={activeId}
                  onClose={() => setSidebarOpen(false)}
                  isOverlay
                />
              </div>
            </div>,
            document.body,
          )}
      </>
    );
  }

  return (
    <div className="w-16 h-full flex flex-col items-center py-6 gap-6 bg-black/20 border-r border-white/5">
      <SidebarContent activeId={activeId} />
    </div>
  );
};
