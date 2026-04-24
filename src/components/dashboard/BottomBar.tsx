import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Apple, Lock, Unlock, ChevronDown, Tag, Smartphone, ChevronUp, Search } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";
import { triggerSecureDownload } from "../../utils/download";
import { PaymentModal } from "../PaymentModal";
import { DownloadModal, type Platform as DownloadPlatform } from "../DownloadModal";

const MOBILE_BREAKPOINT = 768;


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

export const BottomBar = ({ appType = "task-goblin" }: { appType?: "task-goblin" | "nexo" | "floaty" }) => {
  const { t, lang } = useLanguage();
  const { isMobile, toggleBottomBar } = useLayout();
  const [macMenuOpen, setMacMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const macButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownRect, setDropdownRect] = useState<{ top: number; left: number } | null>(null);
  const showUsd = lang === "en";
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  // Download modal state
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{ index: number; platform: DownloadPlatform } | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setMacMenuOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setMacMenuOpen(false);
    }, 300);
  };

  const isNexo = appType === "nexo";
  const isFloaty = appType === "floaty";

  // Pricing configuration
  const prices = isNexo ? {
    mxn: 149,
    originalMxn: 199,
    usd: 8,
    originalUsd: 11
  } : isFloaty ? {
    mxn: 99,
    originalMxn: 149,
    usd: 5,
    originalUsd: 8
  } : {
    mxn: 199,
    originalMxn: 299,
    usd: 13,
    originalUsd: 16
  };

  const openDownloadModal = (index: number) => {
    setMacMenuOpen(false);
    const platform: DownloadPlatform = index === 0 ? "mac-silicon" : index === 1 ? "mac-intel" : "windows";
    setPendingDownload({ index, platform });
    setDownloadModalOpen(true);
  };

  const handleDownloadConfirm = () => {
    if (pendingDownload !== null) triggerSecureDownload(pendingDownload.index, appType);
    setDownloadModalOpen(false);
    setPendingDownload(null);
  };

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


  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center lg:justify-start xl:justify-center p-4 sm:p-6 gap-6 w-full max-w-full overflow-hidden">
      {isMobile && (
        <div className="flex items-center gap-2 w-full sm:hidden">
          <motion.div
            className="flex flex-1 items-center justify-center sm:justify-start gap-3 glass rounded-xl sm:rounded-[1.5rem] px-2 sm:px-4 py-1.5 sm:py-2.5 min-w-0 shrink-0"
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
                    ${prices.originalUsd}
                  </span>{" "}
                  ${prices.usd}{" "}
                  <span className="text-sh-text-muted font-normal text-xs">USD</span>
                  <span className="ml-1 text-[10px] font-semibold text-brand-cyan uppercase">
                    {t.bottomBar.promotion}
                  </span>
                </p>
              ) : (
                <p className="text-sm font-bold text-white whitespace-nowrap">
                  <span className="line-through text-sh-text-muted font-normal mr-1">
                    ${prices.originalMxn}
                  </span>{" "}
                  ${prices.mxn}{" "}
                  <span className="text-sh-text-muted font-normal text-xs">MXN</span>
                  <span className="ml-1 text-[10px] font-semibold uppercase" style={{ color: 'var(--sh-accent)' }}>
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



      {isMobile ? (
        <div className="flex flex-col items-center gap-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10"
            style={{ 
                background: "rgba(255, 255, 255, 0.05)",
                color: "var(--sh-accent)",
                backdropFilter: "blur(4px)"
            }}
          >
            {t.bottomBar.freeTrialTag}
          </motion.div>
          <div className="flex items-center gap-3 glass rounded-xl px-3 py-2 text-center">
            <Smartphone size={20} className="shrink-0" style={{ color: 'var(--sh-accent)' }} />
            <p className="text-xs text-sh-text-muted">
              {t.bottomBar.mobileDownloadNotice}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          {/* Columna 1: Precio y Descarga */}
          <div className="flex flex-col xl:flex-row items-center lg:items-start xl:items-center gap-4 order-2 lg:order-1">
            {!isMobile && (
              <motion.div
                className="flex items-center justify-center sm:justify-start gap-3 glass rounded-xl sm:rounded-[1.5rem] px-3 sm:px-4 py-2 sm:py-2.5 min-w-0 shrink-0 border border-white/5"
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
                        ${prices.originalUsd}
                      </span>{" "}
                      ${prices.usd}{" "}
                      <span className="text-sh-text-muted font-normal text-xs">USD</span>
                      <span className="ml-1 text-[10px] font-semibold uppercase" style={{ color: 'var(--sh-accent)' }}>
                        {t.bottomBar.promotion}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm font-bold text-white whitespace-nowrap">
                      <span className="line-through text-sh-text-muted font-normal mr-1">
                        ${prices.originalMxn}
                      </span>{" "}
                      ${prices.mxn}{" "}
                      <span className="text-sh-text-muted font-normal text-xs">MXN</span>
                      <span className="ml-1 text-[10px] font-semibold uppercase" style={{ color: 'var(--sh-accent)' }}>
                        {t.bottomBar.promotion}
                      </span>
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex flex-col items-center gap-1">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10"
                style={{ 
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "var(--sh-accent)",
                    backdropFilter: "blur(4px)"
                }}
              >
                {t.bottomBar.freeTrialTag}
              </motion.div>
              <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-[0.2em] mb-1">
                {t.bottomBar.downloadApp}
              </span>
              <motion.div
                className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6 glass rounded-xl sm:rounded-[2rem] px-4 sm:px-8 py-3 min-w-0 border border-white/5"
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <div 
                  className="relative" 
                  ref={menuRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    ref={macButtonRef}
                    type="button"
                    onClick={() => setMacMenuOpen((o) => !o)}
                    className="flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors cursor-pointer"
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
                      <>
                        <button
                          type="button"
                          aria-hidden
                          tabIndex={-1}
                          className="fixed inset-0 z-[99998] cursor-default"
                          style={{ background: "transparent" }}
                          onClick={() => setMacMenuOpen(false)}
                        />
                        <div
                          ref={dropdownRef}
                          role="menu"
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          className="fixed min-w-[200px] rounded-xl py-2 shadow-2xl z-[99999] border border-white/10 bg-[#1c1c1c]"
                          style={{
                            top: dropdownRect.top,
                            left: dropdownRect.left,
                            transform: "translate3d(0, -100%, 0)",
                            isolation: "isolate",
                          }}
                        >
                          <button
                            type="button"
                            role="menuitem"
                            className="block w-full text-left px-4 py-2.5 text-sm text-sh-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                            onClick={() => openDownloadModal(0)}
                          >
                            {t.bottomBar.appleSilicon}
                          </button>
                          <button
                            type="button"
                            role="menuitem"
                            className="block w-full text-left px-4 py-2.5 text-sm text-sh-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                            onClick={() => openDownloadModal(1)}
                          >
                            {t.bottomBar.intel}
                          </button>
                        </div>
                      </>,
                      document.body,
                    )}
                </div>
                <div className="w-px h-6 bg-white/10" />
                <button
                  type="button"
                  onClick={() => openDownloadModal(2)}
                  className="flex items-center gap-3 text-sh-text-muted hover:text-white transition-colors cursor-pointer"
                  aria-label={t.bottomBar.downloadWindows}
                >
                  <span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white">
                    <WindowsIcon size={20} />
                  </span>
                  <span className="text-sm font-semibold">{t.bottomBar.windows}</span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Columna 2: Botones de Acción */}
          <div className="flex items-center gap-6 lg:gap-8 order-1 lg:order-2">
            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(true)}
              className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted group-hover:text-sh-accent transition-all font-bold mb-2">
                <Unlock size={20} className="group-hover:hidden" />
                <Lock size={20} className="hidden group-hover:block" />
              </div>
              <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-widest">
                {t.bottomBar.obtainLicense}
              </span>
            </button>

            <a
              href="/license"
              className="group flex flex-col items-center gap-1.5 transition-colors focus:outline-none no-underline"
              style={{ viewTransitionName: 'license-card' }}
            >
              <div
                className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted transition-all mb-2"
                style={{ color: 'var(--sh-accent)' }}
              >
                <Search size={20} />
              </div>
              <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-widest">
                {t.bottomBar.checkLicense}
              </span>
            </a>
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        appType={appType}
        onClose={() => setIsPaymentModalOpen(false)}
      />

      <DownloadModal
        isOpen={downloadModalOpen}
        platform={pendingDownload?.platform || "windows"}
        appType={appType}
        onClose={() => setDownloadModalOpen(false)}
        onConfirm={handleDownloadConfirm}
      />
    </div>
  );
};
