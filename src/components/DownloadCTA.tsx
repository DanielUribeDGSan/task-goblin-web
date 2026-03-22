import { useState } from "react";
import AppleIcon from "@mui/icons-material/Apple";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import { triggerSecureDownload } from "../utils/download";
import { DownloadModal, type Platform } from "./DownloadModal";
import { APP_CONFIGS } from "../constants/app_data";

export default function DownloadCTA({ appType = 'task-goblin' }: { appType?: 'task-goblin' | 'nexo' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("mac-silicon");

  const openModal = (p: Platform) => {
    setPlatform(p);
    setModalOpen(true);
  };

  const handleConfirm = () => {
    const index = platform === "windows" ? 2 : (platform === "mac-silicon" ? 0 : 1);
    triggerSecureDownload(index, appType);
    setModalOpen(false);
  };

  const config = APP_CONFIGS[appType as keyof typeof APP_CONFIGS];
  const name = config.name;
  const accentColor = config.accentColor;

  return (
    <>
      <section id="download" className="py-16 px-4">
        <div
          className="max-w-xl mx-auto rounded-2xl p-8 md:p-10 text-center transition-colors"
          style={{ backgroundColor: "var(--tg-surface)" }}
        >
          <h3
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--tg-text)" }}
          >
            Empieza ya
          </h3>
          <p className="mb-8" style={{ color: "var(--tg-text-muted)" }}>
            Disponible para macOS y Windows. Descarga gratis y pruébalo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Mac */}
            <button
              type="button"
              onClick={() => openModal("mac-silicon")}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-white transition opacity-90 hover:opacity-100 cursor-pointer"
              style={{ backgroundColor: "var(--tg-accent)" }}
            >
              <AppleIcon />
              Descargar para Mac
            </button>

            {/* Windows */}
            <button
              type="button"
              onClick={() => openModal("windows")}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition border-2 cursor-pointer"
              style={{
                borderColor: "var(--sh-accent)",
                color: "var(--sh-accent)",
              }}
            >
              <DesktopWindowsIcon />
              Descargar para Windows
            </button>
          </div>
        </div>
      </section>

      <DownloadModal
        isOpen={modalOpen}
        platform={platform}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
