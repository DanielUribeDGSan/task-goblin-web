import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Apple, Lock, Unlock, ChevronDown, Tag, Smartphone, ChevronUp, Search } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useLayout } from "../../contexts/LayoutContext";
import { TASK_GOBLIN_URLS, NEXO_URLS, FLOATY_URLS } from "../../constants/app_data";
import { triggerSecureDownload } from "../../utils/download";
import { PaymentModal } from "../PaymentModal";
import { DownloadModal, type Platform as DownloadPlatform } from "../DownloadModal";

const MOBILE_BREAKPOINT = 768;

const b = (s: string) => (typeof atob !== "undefined" ? atob(s) : "");

const triggerDownload = (index: number, appType: "task-goblin" | "nexo" | "floaty" = "task-goblin") => {
  const urls = appType === "nexo" ? NEXO_URLS : appType === "floaty" ? FLOATY_URLS : TASK_GOBLIN_URLS;
  const u = b(urls[index]);
  if (!u) {
    alert("Próximamente disponible. / Coming soon.");
    return;
  }
  const a = document.createElement("a");
  a.href = u;
  a.download = "";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

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
  const { isMobile, bottomBarOpen, toggleBottomBar } = useLayout();
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
      mxn: 249,
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

  if (isMobile) {
    return null;
  }

  return (
    <div className="flex flex-col xl:flex-row items-stretch sm:items-end xl:items-center justify-end p-4 sm:p-6 gap-4 sm:gap-6 w-full max-w-full overflow-hidden">
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

      {isMobile ? (
        <div className="flex items-center gap-3 glass rounded-xl sm:rounded-[1.5rem] px-4 py-3 text-center">
          <Smartphone size={20} className="shrink-0" style={{ color: 'var(--sh-accent)' }} />
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

          <button
            type="button"
            onClick={() => setIsPaymentModalOpen(true)}
            className="flex flex-col items-center gap-1 group cursor-pointer focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted group-hover:text-sh-accent transition-all font-bold">
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
              className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-sh-text-muted transition-all"
              style={{ color: 'var(--sh-accent)' }}
            >
              <Search size={20} />
            </div>
            <span className="text-[10px] font-bold text-sh-text-muted uppercase tracking-widest">
              {t.bottomBar.checkLicense}
            </span>
          </a>
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
