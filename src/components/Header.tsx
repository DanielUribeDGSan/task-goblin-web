import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const { mode, toggleTheme } = useTheme();

  return (
    <header
      className="flex items-center justify-between px-5 md:px-6 py-4 transition-colors"
      style={{ backgroundColor: 'var(--tg-panel)' }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white"
          style={{ backgroundColor: 'var(--tg-accent)' }}
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="currentColor" />
            <path d="M5 16L7 20L5 22L3 20L5 16Z" fill="currentColor" opacity={0.8} />
            <path d="M19 16L21 20L19 22L17 20L19 16Z" fill="currentColor" opacity={0.8} />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--tg-text)' }}>
            TaskGoblin
          </h1>
          <p className="text-xs" style={{ color: 'var(--tg-text-muted)' }}>
            by Daniel Uribe
          </p>
        </div>
      </div>
      <IconButton
        onClick={toggleTheme}
        aria-label={mode === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        sx={{ color: 'var(--tg-text-muted)' }}
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </header>
  );
}
