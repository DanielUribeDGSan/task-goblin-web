import {
  LayoutDashboard,
  Bath,
  Armchair,
  Bed,
  Microwave,
  Users,
  Home,
  X,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLayout } from "../../contexts/LayoutContext";
import { createPortal } from "react-dom";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const icons = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "bath", icon: Bath },
  { id: "living", icon: Armchair },
  { id: "bedroom", icon: Bed },
  { id: "kitchen", icon: Microwave },
  { id: "courtyard", icon: Users },
  { id: "home", icon: Home },
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
      {icons.map(({ id, icon: Icon }) => (
        <button
          key={id}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300",
            activeId === id
              ? "bg-brand-cyan text-black shadow-[0_0_15px_rgba(20,241,217,0.3)]"
              : "text-white/20 hover:text-white/60 hover:bg-white/5",
          )}
        >
          <Icon size={20} strokeWidth={2.5} />
        </button>
      ))}
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
