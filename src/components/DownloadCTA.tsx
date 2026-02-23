import AppleIcon from '@mui/icons-material/Apple';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';

export default function DownloadCTA() {
  return (
    <section id="download" className="py-16 px-4">
      <div
        className="max-w-xl mx-auto rounded-2xl p-8 md:p-10 text-center transition-colors"
        style={{ backgroundColor: 'var(--tg-surface)' }}
      >
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: 'var(--tg-text)' }}
        >
          Empieza ya
        </h3>
        <p
          className="mb-8"
          style={{ color: 'var(--tg-text-muted)' }}
        >
          Disponible para macOS y Windows. Descarga gratis y pruébalo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium text-white transition opacity-90 hover:opacity-100"
            style={{ backgroundColor: 'var(--tg-accent)' }}
          >
            <AppleIcon />
            Descargar para Mac
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition border-2"
            style={{
              borderColor: 'var(--tg-accent)',
              color: 'var(--tg-accent)',
            }}
          >
            <DesktopWindowsIcon />
            Descargar para Windows
          </a>
        </div>
      </div>
    </section>
  );
}
