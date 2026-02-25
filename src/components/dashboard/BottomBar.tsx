import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Apple, Lock, Unlock, ChevronDown, Tag, Smartphone, ChevronUp } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";

const MOBILE_BREAKPOINT = 768;

// URLs resueltas solo en runtime para no exponer el destino en el DOM
const b = (s: string) => (typeof atob !== "undefined" ? atob(s) : "");
const _ = [
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV9hYXJjaDY0LmRtZw==",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV94NjQuZG1n",
  "aHR0cHM6Ly9naXRodWIuY29tL0RhbmllbFVyaWJlREdTYW4vVGFza0dvYmxpbi9yZWxlYXNlcy9kb3dubG9hZC9sYXRlc3QvVGFza0dvYmxpbl8wLjEuMV94NjQtc2V0dXAuZXhl",
];
const url = (i: number) => b(_[i]);

const triggerDownload = (index: number) => {
  const u = url(index);
  const a = document.createElement("a");
  a.href = u;
  a.download = "";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const PRICE_MXN = 249;
const PRICE_ORIGINAL_MXN = 299;
const PRICE_USD = 13; // equivalente aprox. de 249 MXN
const PRICE_ORIGINAL_USD = 16; // equivalente aprox. de 299 MXN

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
  const { t, lang } = useLanguage();
  const { isMobile, bottomBarOpen, toggleBottomBar } = useLayout();
  const [macMenuOpen, setMacMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const macButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number } | null>(null);
  const showUsd = lang === "en";

  useEffect(() => {
    if (!macMenuOpen || !macButtonRef.current) return;
    const rect = macButtonRef.current.getBoundingClientRect();
    setDropdownRect({ top: rect.top - 8, left: rect.left });
  }, [macMenuOpen]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current && !menuRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setMacMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  if (isMobile && !bottomBarOpen) {
    return (
      <div className="flex justify-end p-4">
        <motion.button
          type="button"
          onClick={toggleBottomBar}
          className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-white shadow-lg hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          aria-label={t.bottomBar.promotion}
        >
          <Tag size={24} />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end p-4 sm:p-6 gap-4 sm:gap-6 w-full max-w-full overflow-hidden">
      {isMobile && (
        <div className="flex items-center gap-2 w-full sm:hidden">
          <motion.div
            className="flex flex-1 items-center justify-center sm:justify-start gap-3 glass rounded-xl sm:rounded-[1.5rem] px-3 sm:px-4 py-2 sm:py-2.5 min-w-0 shrink-0"
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
          >
            <Tag size={18} className="shrink-0 text-sh-text-muted" aria-hidden />
            <div className="flex items-center gap-2">
              {showUsd ? (
                <p className="text-sm font-bold text-white whitespace-nowrap">
                  <span className="line-through text-sh-text-muted font-normal mr-1">
                    ${PRICE_ORIGINAL_USD}
                  </span>{" "}
                  ${PRICE_USD}{" "}
                  <span className="text-sh-text-muted font-normal text-xs">USD</span>
                  <span className="ml-1 text-[10px] font-semibold text-brand-cyan uppercase">
                    {t.bottomBar.promotion}
                  </span>
                </p>
              ) : (
                <p className="text-sm font-bold text-white whitespace-nowrap">
                  <span className="line-through text-sh-text-muted font-normal mr-1">
                    ${PRICE_ORIGINAL_MXN}
                  </span>{" "}
                  ${PRICE_MXN}{" "}
                  <span className="text-sh-text-muted font-normal text-xs">MXN</span>
                  <span className="ml-1 text-[10px] font-semibold text-brand-cyan uppercase">
                    {t.bottomBar.promotion}
                  </span>
                </p>
              )}
            </div>
          </motion.div>
          <button
            type="button"
            onClick={toggleBottomBar}
            className="w-10 h-10 shrink-0 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white"
            aria-label="Cerrar"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      )}
      {!isMobile && (
      <motion.div
        className="flex items-center justify-center sm:justify-start gap-3 glass rounded-xl sm:rounded-[1.5rem] px-3 sm:px-4 py-2 sm:py-2.5 min-w-0 shrink-0"
        whileHover={{
          scale: 1.04,
          transition: { type: "spring", stiffness: 400, damping: 25 },
        }}
      >
        <Tag size={18} className="shrink-0 text-sh-text-muted" aria-hidden />
        <div className="flex items-center gap-2">
          {showUsd ? (
            <p className="text-sm font-bold text-white whitespace-nowrap">
              <span className="line-through text-sh-text-muted font-normal mr-1">
                ${PRICE_ORIGINAL_USD}
              </span>{" "}
              ${PRICE_USD}{" "}
              <span className="text-sh-text-muted font-normal text-xs">USD</span>
              <span className="ml-1 text-[10px] font-semibold text-brand-cyan uppercase">
                {t.bottomBar.promotion}
              </span>
            </p>
          ) : (
            <p className="text-sm font-bold text-white whitespace-nowrap">
              <span className="line-through text-sh-text-muted font-normal mr-1">
                ${PRICE_ORIGINAL_MXN}
              </span>{" "}
              ${PRICE_MXN}{" "}
              <span className="text-sh-text-muted font-normal text-xs">MXN</span>
              <span className="ml-1 text-[10px] font-semibold text-brand-cyan uppercase">
                {t.bottomBar.promotion}
              </span>
            </p>
          )}
        </div>
      </motion.div>
      )}

      {isMobile ? (
        <div className="flex items-center gap-3 glass rounded-xl sm:rounded-[1.5rem] px-4 py-3 text-center">
          <Smartphone size={20} className="shrink-0 text-brand-cyan" />
          <p className="text-xs sm:text-sm text-sh-text-muted">
            {t.bottomBar.mobileDownloadNotice}
          </p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12">
          <motion.div
            className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 glass rounded-xl sm:rounded-[1.5rem] px-4 sm:px-6 py-3 min-w-0"
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }}
          >
            <div className="relative" ref={menuRef}>
            <button
              ref={macButtonRef}
              type="button"
            onClick={() => setMacMenuOpen((o) => !o)}
            className="flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors"
            aria-label={t.bottomBar.downloadMac}
            aria-expanded={macMenuOpen}
            aria-haspopup="true"
          >
            <span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white">
              <Apple size={22} />
            </span>
            <span className="text-sm font-semibold">{t.bottomBar.mac}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${macMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {macMenuOpen && dropdownRect &&
              createPortal(
                <div
                  ref={dropdownRef}
                  role="menu"
                  className="fixed min-w-[200px] rounded-xl py-2 shadow-2xl z-[9997] border border-white/10 bg-[#1c1c1c]"
                  style={{
                    top: dropdownRect.top,
                    left: dropdownRect.left,
                    transform: "translateY(-100%)",
                  }}
                >
                  <button
                    type="button"
                    role="menuitem"
                    className="block w-full text-left px-4 py-2.5 text-sm text-sh-text-muted hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => {
                      triggerDownload(0);
                      setMacMenuOpen(false);
                    }}
                  >
                    {t.bottomBar.appleSilicon}
                  </button>
                  <button
                    type="button"
                    role="menuitem"
                    className="block w-full text-left px-4 py-2.5 text-sm text-sh-text-muted hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => {
                      triggerDownload(1);
                      setMacMenuOpen(false);
                    }}
                  >
                    {t.bottomBar.intel}
                  </button>
                </div>,
                document.body,
              )}
          </div>
          <button
            type="button"
            onClick={() => triggerDownload(2)}
            className="flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors"
            aria-label={t.bottomBar.downloadWindows}
          >
            <span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white">
              <WindowsIcon size={20} />
            </span>
            <span className="text-sm font-semibold">{t.bottomBar.windows}</span>
          </button>
          </motion.div>

          <div className="flex flex-col items-center gap-1">
            <button className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted hover:text-sh-accent transition-all group">
              <Unlock size={20} className="group-hover:hidden" />
              <Lock size={20} className="hidden group-hover:block" />
            </button>
            <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-widest">
              {t.bottomBar.obtainLicense}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
