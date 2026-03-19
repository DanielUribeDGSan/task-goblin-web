import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Download, Apple, Monitor } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export type Platform = "mac-silicon" | "mac-intel" | "windows";

interface DownloadModalProps {
  isOpen: boolean;
  platform: Platform;
  onClose: () => void;
  onConfirm: () => void;
}

const macRows = [
  { version: "High Sierra", number: "10.13", year: "2017", status: "warn" },
  { version: "Mojave",      number: "10.14", year: "2018", status: "warn" },
  { version: "Catalina",    number: "10.15", year: "2019", status: "ok"   },
  { version: "Big Sur",     number: "11",    year: "2020", status: "ok"   },
  { version: "Monterey",    number: "12",    year: "2021", status: "ok"   },
  { version: "Ventura",     number: "13",    year: "2022", status: "ok"   },
  { version: "Sonoma",      number: "14",    year: "2023", status: "ok"   },
  { version: "Sequoia",     number: "15",    year: "2024", status: "ok"   },
  { version: "Tahoe",       number: "26",    year: "2025", status: "ok"   },
];

const winRows = [
  { version: "Windows 7 / 8", number: "≤ 8.1", year: "",     status: "bad" },
  { version: "Windows 10",    number: "10",    year: "2015", status: "ok"  },
  { version: "Windows 11",    number: "11",    year: "2021", status: "ok"  },
];

const StatusBadge = ({ status, label }: { status: string; label: string }) => {
  const styles: Record<string, string> = {
    ok:   "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warn: "bg-amber-500/15  text-amber-400  border border-amber-500/30",
    bad:  "bg-red-500/15    text-red-400    border border-red-500/30",
  };
  const icons: Record<string, string> = { ok: "✅", warn: "⚠️", bad: "❌" };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {icons[status]} {label}
    </span>
  );
};

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  platform,
  onClose,
  onConfirm,
}) => {
  const { t } = useLanguage();
  const dm = t.downloadModal;

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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-lg z-[9999] max-h-[90vh] overflow-y-auto"
          >
            <div className="glass rounded-3xl overflow-hidden border border-white/10 p-6 md:p-8 relative">
              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label={t.paymentModal.closeButton}
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl glass flex items-center justify-center text-brand-cyan shrink-0">
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
                            label={row.status === "ok" ? dm.statusOk : row.status === "warn" ? dm.statusWarn : dm.statusBad} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <button
                type="button"
                onClick={onConfirm}
                className="w-full bg-brand-cyan hover:bg-brand-cyan/90 text-black font-bold rounded-xl py-3.5 px-4 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Download size={18} />
                {dm.downloadFor} {getArch()}
              </button>

              <p className="text-center text-xs text-white/30 mt-3">
                {dm.acceptTerms}
              </p>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};
