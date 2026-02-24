import { Apple, Lock, Unlock } from "lucide-react";

/** Icono tipo logo de Windows (4 cuadrantes) */
const WindowsIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M3 3h8.5v8.5H3V3zm0 9.5H11.5V21H3v-8.5zM12.5 3H21v8.5H12.5V3zm0 9.5H21V21h-8.5v-8.5z" />
  </svg>
);

export const BottomBar = () => {
  return (
    <div className="flex items-center justify-end p-6">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-6 glass rounded-[1.5rem] px-6 py-3">
          <a
            href="#download-mac"
            className="flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors"
            aria-label="Descargar para Mac"
          >
            <span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white">
              <Apple size={22} />
            </span>
            <span className="text-sm font-semibold">Mac</span>
          </a>
          <a
            href="#download-windows"
            className="flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors"
            aria-label="Descargar para Windows"
          >
            <span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white">
              <WindowsIcon size={20} />
            </span>
            <span className="text-sm font-semibold">Windows</span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted hover:text-sh-accent transition-all group">
            <Unlock size={20} className="group-hover:hidden" />
            <Lock size={20} className="hidden group-hover:block" />
          </button>
          <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-widest">
            Obtain license
          </span>
        </div>
      </div>
    </div>
  );
};
