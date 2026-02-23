export default function Footer() {
  return (
    <footer
      className="py-6 px-4 text-center text-sm transition-colors"
      style={{ color: 'var(--tg-text-muted)' }}
    >
      <p>TaskGoblin © {new Date().getFullYear()} - by Daniel Uribe</p>
    </footer>
  );
}
