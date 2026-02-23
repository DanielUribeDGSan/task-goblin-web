export default function Hero() {
  return (
    <section className="text-center py-16 px-4 max-w-2xl mx-auto">
      <h2
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        style={{ color: 'var(--tg-text)' }}
      >
        Automatiza tareas en Mac y Windows
      </h2>
      <p
        className="text-lg md:text-xl mb-8"
        style={{ color: 'var(--tg-text-muted)' }}
      >
        Mueve el ratón, envía mensajes, convierte PDFs, extrae colores y más. Todo desde un solo lugar.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="#download"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition opacity-90 hover:opacity-100"
          style={{ backgroundColor: 'var(--tg-accent)' }}
        >
          Descargar para Mac
        </a>
        <a
          href="#download"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition border-2"
          style={{
            borderColor: 'var(--tg-accent)',
            color: 'var(--tg-accent)',
          }}
        >
          Descargar para Windows
        </a>
      </div>
    </section>
  );
}
