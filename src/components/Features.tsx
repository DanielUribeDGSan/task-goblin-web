import MouseIcon from '@mui/icons-material/SmartToy';
import PetsIcon from '@mui/icons-material/Pets';
import ChatIcon from '@mui/icons-material/Chat';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PaletteIcon from '@mui/icons-material/Palette';
import type { ReactNode } from 'react';

const features: { icon: ReactNode; label: string; beta?: boolean }[] = [
  { icon: <MouseIcon fontSize="small" />, label: 'Move Mouse' },
  { icon: <PetsIcon fontSize="small" />, label: 'Pet Cat', beta: true },
  { icon: <ChatIcon fontSize="small" />, label: 'WhatsApp Msg' },
  { icon: <ImageIcon fontSize="small" />, label: 'Screenshot to Text' },
  { icon: <CloseIcon fontSize="small" />, label: 'Close All Apps' },
  { icon: <ScheduleIcon fontSize="small" />, label: 'Schedule Shutdown' },
  { icon: <PictureAsPdfIcon fontSize="small" />, label: 'Convert PDF to Word' },
  { icon: <PaletteIcon fontSize="small" />, label: 'Color Extractor' },
];

export default function Features() {
  return (
    <section className="py-12 px-4 max-w-lg mx-auto">
      <div
        className="rounded-2xl overflow-hidden transition-colors"
        style={{ backgroundColor: 'var(--tg-surface)' }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-wider px-5 pt-5 pb-2"
          style={{ color: 'var(--tg-text-muted)' }}
        >
          Main
        </p>
        <ul className="pb-4">
          {features.map(({ icon, label, beta }) => (
            <li key={label}>
              <div
                className="flex items-center gap-3 px-5 py-2.5 mx-2 rounded-xl transition-colors"
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
                <span className="font-medium">{label}</span>
                {beta && (
                  <span
                    className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: 'var(--tg-accent)',
                      color: 'white',
                    }}
                  >
                    BETA
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
