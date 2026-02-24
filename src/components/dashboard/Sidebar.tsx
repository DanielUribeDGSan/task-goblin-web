import {
  LayoutDashboard,
  Bath,
  Armchair,
  Bed,
  Microwave,
  Users,
  Home,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const Sidebar = ({ activeId = "dashboard" }: { activeId?: string }) => {
  return (
    <div className="w-16 h-full flex flex-col items-center py-6 gap-6 bg-black/20 border-r border-white/5">
      <div className="flex-1 flex flex-col gap-3">
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
    </div>
  );
};
