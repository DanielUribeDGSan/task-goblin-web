import { useState } from 'react';
import MouseIcon from '@mui/icons-material/SmartToy';
import PetsIcon from '@mui/icons-material/Pets';
import ChatIcon from '@mui/icons-material/Chat';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PaletteIcon from '@mui/icons-material/Palette';
import AppleIcon from '@mui/icons-material/Apple';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import ExtensionIcon from '@mui/icons-material/Extension';
import DevicesIcon from '@mui/icons-material/Devices';
import type { ReactNode } from 'react';

const actions: { icon: ReactNode; label: string; beta?: boolean }[] = [
  { icon: <MouseIcon fontSize="small" />, label: 'Move Mouse' },
  { icon: <PetsIcon fontSize="small" />, label: 'Pet Cat', beta: true },
  { icon: <ChatIcon fontSize="small" />, label: 'WhatsApp Msg' },
  { icon: <ImageIcon fontSize="small" />, label: 'Screenshot to Text' },
  { icon: <CloseIcon fontSize="small" />, label: 'Close All Apps' },
  { icon: <ScheduleIcon fontSize="small" />, label: 'Schedule Shutdown' },
  { icon: <PictureAsPdfIcon fontSize="small" />, label: 'Convert PDF to Word' },
  { icon: <PaletteIcon fontSize="small" />, label: 'Color Extractor' },
];

export default function HeroPanel() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col md:flex-row flex-1 min-h-0">
      {/* Panel izquierdo: título + imagen + tarjetas */}
      <div className="md:w-1/2 flex flex-col p-5 md:p-6 border-b md:border-b-0 md:border-r border-[var(--tg-panel-border)]">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-white"
            style={{ backgroundColor: 'var(--tg-accent)' }}
            aria-hidden
          >
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <button
            type="button"
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'var(--tg-hover)' }}
            aria-label="Menú"
          >
            <span className="flex flex-col gap-1">
              <span className="w-4 h-0.5 rounded-full bg-current" style={{ color: 'var(--tg-text)' }} />
              <span className="w-4 h-0.5 rounded-full bg-current" style={{ color: 'var(--tg-text)' }} />
              <span className="w-4 h-0.5 rounded-full bg-current" style={{ color: 'var(--tg-text)' }} />
            </span>
          </button>
          <span className="text-sm font-medium ml-1" style={{ color: 'var(--tg-text)' }}>
            TaskGoblin en acción
          </span>
        </div>

        <div
          className="flex-1 min-h-[200px] rounded-xl flex items-center justify-center overflow-hidden mb-4"
          style={{
            background: 'linear-gradient(180deg, var(--tg-accent-soft) 0%, var(--tg-surface) 100%)',
            border: '1px solid var(--tg-border)',
          }}
        >
          {!imgError ? (
            <img
              src="/hero-app.png"
              alt="TaskGoblin en acción"
              className="w-full h-full object-cover object-top"
              onError={() => setImgError(true)}
            />
          ) : (
            <img
              src="/hero-placeholder.svg"
              alt="TaskGoblin"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex gap-3 shrink-0">
          <div
            className="flex-1 rounded-xl px-4 py-3 flex items-center gap-2"
            style={{
              backgroundColor: 'var(--tg-surface)',
              color: 'var(--tg-text)',
              border: '1px solid var(--tg-border)',
            }}
          >
            <ExtensionIcon sx={{ fontSize: 20 }} style={{ color: 'var(--tg-text-muted)' }} />
            <div>
              <span className="font-bold text-lg leading-tight block">8+</span>
              <span className="text-xs" style={{ color: 'var(--tg-text-muted)' }}>Acciones</span>
            </div>
          </div>
          <div
            className="flex-1 rounded-xl px-4 py-3 flex items-center gap-2"
            style={{
              backgroundColor: 'var(--tg-surface)',
              color: 'var(--tg-text)',
              border: '1px solid var(--tg-border)',
            }}
          >
            <DevicesIcon sx={{ fontSize: 20 }} style={{ color: 'var(--tg-text-muted)' }} />
            <div>
              <span className="font-bold text-lg leading-tight block">2</span>
              <span className="text-xs" style={{ color: 'var(--tg-text-muted)' }}>Plataformas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho: TaskGoblin + acciones + botones */}
      <div className="md:w-1/2 flex flex-col p-5 md:p-6 min-h-0">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white"
            style={{ backgroundColor: 'var(--tg-accent)' }}
          >
            <span className="text-white font-bold">T</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: 'var(--tg-text)' }}>
            TaskGoblin
          </h2>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--tg-text-muted)' }}>
          Acciones de la app
        </p>

        <ul
          className="actions-list flex-1 overflow-y-auto overflow-x-hidden space-y-0.5 pr-1 min-h-0"
          style={{ scrollbarGutter: 'stable' }}
        >
          {actions.map(({ icon, label, beta }) => (
            <li key={label}>
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors"
                style={{ color: 'var(--tg-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--tg-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                  style={{ color: 'var(--tg-text-muted)' }}
                >
                  {icon}
                </span>
                <span className="font-medium text-sm">{label}</span>
                {beta && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--tg-accent)', color: 'white' }}
                  >
                    BETA
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="#"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-white text-sm transition opacity-95 hover:opacity-100"
            style={{ backgroundColor: 'var(--tg-accent-bright)' }}
          >
            <AppleIcon sx={{ fontSize: 20 }} />
            Descargar para Mac
          </a>
          <a
            href="#"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition border-2"
            style={{
              borderColor: 'var(--tg-accent)',
              color: 'var(--tg-text-muted)',
              backgroundColor: 'var(--tg-surface)',
            }}
          >
            <DesktopWindowsIcon sx={{ fontSize: 20 }} />
            Descargar para Windows
          </a>
        </div>
      </div>
    </div>
  );
}
