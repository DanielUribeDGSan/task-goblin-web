import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Download, Apple, Monitor, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export type Platform = "mac-silicon" | "mac-intel" | "windows";

interface DownloadModalProps {
  isOpen: boolean;
  platform: Platform;
  appType?: "task-goblin" | "nexo" | "floaty";
  onClose: () => void;
  onConfirm: () => void;
}

const macRows = [
  { version: "High Sierra", number: "10.13", year: "2017", status: "warn" },
  { version: "Mojave", number: "10.14", year: "2018", status: "warn" },
  { version: "Catalina", number: "10.15", year: "2019", status: "partial" },
  { version: "Big Sur", number: "11", year: "2020", status: "ok" },
  { version: "Monterey", number: "12", year: "2021", status: "ok" },
  { version: "Ventura", number: "13", year: "2022", status: "ok" },
  { version: "Sonoma", number: "14", year: "2023", status: "ok" },
  { version: "Sequoia", number: "15", year: "2024", status: "ok" },
  { version: "Tahoe", number: "26", year: "2025", status: "ok" },
];

const winRows = [
  { version: "Windows 7 / 8", number: "≤ 8.1", year: "", status: "bad" },
  { version: "Windows 10", number: "10", year: "2015", status: "ok" },
  { version: "Windows 11", number: "11", year: "2021", status: "ok" },
];

const StatusBadge = ({ status, label }: { status: string; label: string }) => {
  const styles: Record<string, string> = {
    ok: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warn: "bg-amber-500/15  text-amber-400  border border-amber-500/30",
    partial: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
    bad: "bg-red-500/15    text-red-400    border border-red-500/30",
  };
  const icons: Record<string, string> = { ok: "✅", warn: "⚠️", partial: "🔵", bad: "❌" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {icons[status]} {label}
    </span>
  );
};

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  platform,
  appType = "task-goblin",
  onClose,
  onConfirm,
}) => {
  const { t } = useLanguage();
  const dm = t.downloadModal;
  const [showImage, setShowImage] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);

  const isWindows = platform === "windows";
  const rows = isWindows ? winRows : macRows;


  const getHeader = () => {
    if (platform === "mac-silicon") return dm.macSilicon;
    if (platform === "mac-intel") return dm.macIntel;
    return dm.windowsTitle;
  };

  const getArch = () => {
    if (platform === "mac-silicon") return "Apple Silicon (M1 / M2 / M3 / M4)";
    if (platform === "mac-intel") return "Intel (x86-64)";
    return "Windows (x64)";
  };

  const alertMsg = isWindows ? dm.securityAlertWin : dm.securityAlertMac;
  const PlatformIcon = isWindows ? Monitor : Apple;

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-lg z-[9999] max-h-[90vh] flex flex-col"
          >
            <div
              ref={scrollContainerRef}
              className="glass rounded-3xl overflow-y-auto border border-white/10 p-6 md:p-8 relative"
            >
              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
                aria-label={t.paymentModal.closeButton}
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-2xl glass flex items-center justify-center shrink-0"
                  style={{ color: 'var(--sh-accent)' }}
                >
                  <PlatformIcon size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {dm.downloadFor} {getHeader()}
                  </h2>
                  <p className="text-xs text-white/50">
                    {dm.compatibilityTitle}
                  </p>
                </div>
              </div>

              {/* ⚠️ Browser security alert */}
              <div className="glass bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex gap-3 mb-6">
                <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-white/75 leading-relaxed">
                  <span className="font-semibold text-amber-400">{t.paymentModal.emailWarning.split(":")[0]}: </span>
                  {dm.securityAlert} {alertMsg} {dm.safeFile}
                </p>
              </div>

              {/* 🍏 Mac App Store Alert */}
              {!isWindows && (
                <div className="glass bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col gap-3 mb-6">
                  <div className="flex gap-3">
                    <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-white/75 leading-relaxed">
                        <span className="font-semibold text-amber-400">{t.paymentModal.emailWarning.split(":")[0]}: </span>
                        {dm.macAppStoreInfo}
                      </p>
                      <a
                        href={dm.macAppStoreHelpUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors w-fit flex items-center gap-1.5 cursor-pointer no-underline"
                      >
                        <Monitor size={14} className="mr-0.5" />
                        {dm.macAppStoreAction}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* 🛡️ Windows SmartScreen Reassurance */}
              {isWindows && (
                <div className="glass bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 flex flex-col gap-3 mb-6">
                  <div className="flex gap-3">
                    <Monitor size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-white/75 leading-relaxed">
                        {/* @ts-ignore */}
                        {dm.windowsSmartScreenInfo}
                      </p>
                      <button
                        onClick={() => setShowImage(!showImage)}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors w-fit flex items-center gap-1.5 cursor-pointer"
                      >
                        {showImage ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        {/* @ts-ignore */}
                        {showImage ? dm.hideExampleImage : dm.showExampleImage}
                      </button>
                    </div>
                  </div>

                  {showImage && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative rounded-lg overflow-hidden border border-white/10 shadow-lg mt-2"
                    >
                      <img
                        src="/windows/screen-blue.png"
                        alt="Windows Protected your PC screenshot"
                        className="w-full h-auto opacity-90"
                      />
                    </motion.div>
                  )}
                </div>
              )}

              {/* 🍎 Mac Permissions Alert */}
              {!isWindows && appType !== "floaty" && (
                <div className="glass bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 flex flex-col gap-3 mb-6">
                  <div className="flex gap-3">
                    <Apple size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-white/75 leading-relaxed">
                        {/* @ts-ignore */}
                        {dm.macPermissionsInfo}
                      </p>
                      <button
                        onClick={() => setShowTutorial(true)}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors w-fit flex items-center gap-1.5 cursor-pointer"
                      >
                        <Monitor size={14} className="mr-0.5" />
                        {/* @ts-ignore */}
                        {dm.macPermissionsTutorial}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Compatibility table */}
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                {dm.compatibilityFor} {isWindows ? "Windows" : "macOS"}
              </p>
              <div className="rounded-2xl overflow-hidden border border-white/10 mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="text-left px-4 py-2.5 text-white/50 font-medium text-xs">{dm.tableSystem}</th>
                      <th className="text-left px-4 py-2.5 text-white/50 font-medium text-xs">{dm.tableVersion}</th>
                      <th className="text-left px-4 py-2.5 text-white/50 font-medium text-xs">{dm.tableStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr
                        key={row.version}
                        className={`border-t border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}
                      >
                        <td className="px-4 py-2.5 text-white font-medium">
                          {row.version}
                          {row.year && (
                            <span className="text-white/30 font-normal text-xs ml-1.5">({row.year})</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-white/50 font-mono text-xs">{row.number}</td>
                        <td className="px-4 py-2.5">
                          <StatusBadge
                            status={row.status}
                            label={
                              row.status === "ok" ? dm.statusOk : 
                              row.status === "warn" ? dm.statusWarn : 
                              row.status === "partial" ? dm.statusPartial : 
                              dm.statusBad
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions Footer - Sticky */}
              <div className="sticky -bottom-8 bg-linear-to-t from-[#151515] via-[#151515] to-[#151515]/0 backdrop-blur-md pt-6 pb-1 z-10 border-t border-white/5 mt-6 -mx-8 px-8 text-center">
                <button
                  ref={downloadButtonRef}
                  type="button"
                  onClick={onConfirm}
                  className="w-full text-black font-bold rounded-xl py-3.5 px-4 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: 'var(--sh-accent)' }}
                >
                  <Download size={18} />
                  {dm.downloadFor} {getArch()}
                </button>

                <p className="text-center text-xs text-white/30 mt-3">
                  {dm.acceptTerms}
                </p>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}

      {/* Permission Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[10000]"
              onClick={() => setShowTutorial(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[10001] glass rounded-[2.5rem] border border-white/10 p-6 md:p-8 overflow-y-auto max-h-[85vh] shadow-2xl"
            >
              <button
                onClick={() => setShowTutorial(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Monitor size={20} />
                </div>
                <h3 className="text-xl font-bold text-white pr-8">
                  {/* @ts-ignore */}
                  {dm.macPermissionsTutorial}
                </h3>
              </div>

              <div className="flex flex-col gap-10">
                {/* Step 1 */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-white flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold" style={{ backgroundColor: 'var(--sh-accent-muted)', color: 'var(--sh-accent)' }}>1</span>
                    {/* @ts-ignore */}
                    {dm.tutorialStep1}
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/40">
                    <img src="/task-goblin/images/permiso-1.png" alt="Step 1" className="w-full h-auto" />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-white flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs shrink-0 mt-0.5 font-bold">2</span>
                    {/* @ts-ignore */}
                    {dm.tutorialStep2}
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/40">
                    <img src="/task-goblin/images/permiso-2.png" alt="Step 2" className="w-full h-auto" />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-white flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs shrink-0 mt-0.5 font-bold">3</span>
                    {/* @ts-ignore */}
                    {dm.tutorialStep3}
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/40">
                    <img src="/task-goblin/images/permiso-3.png" alt="Step 3" className="w-full h-auto" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowTutorial(false)}
                className="w-full mt-10 font-bold py-4 rounded-2xl transition-all border cursor-pointer"
                style={{
                  backgroundColor: 'var(--sh-accent-muted)',
                  color: 'var(--sh-accent)',
                  borderColor: 'var(--sh-panel-border)'
                }}
              >
                {/* @ts-ignore */}
                {dm.closeTutorial}
              </button>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
