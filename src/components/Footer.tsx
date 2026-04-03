export default function Footer() {
  return (
    <footer
      className="py-6 px-4 text-center text-sm transition-colors"
      style={{ color: 'var(--tg-text-muted)' }}
    >
      <p className="mb-3">TaskGoblin © {new Date().getFullYear()} - Daniel Uribe</p>
      <div className="flex justify-center gap-6 text-xs font-medium">
        <a href="/privacy-policy" className="hover:text-purple-400 transition-colors">Privacidad</a>
        <a href="/user-agreement" className="hover:text-purple-400 transition-colors">Términos</a>
      </div>
    </footer>
  );
}
