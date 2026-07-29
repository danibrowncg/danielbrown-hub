interface MarqueeProps {
  /** Textos que recorren la banda. */
  items: string[];
  /** Segundos que tarda un ciclo completo. Más alto = más lento. */
  duration?: number;
}

/**
 * Banda infinita de capacidades.
 *
 * Implementada en CSS puro a propósito: es movimiento CONSTANTE, así que la
 * animación corre fuera del hilo principal y no compite con el scroll (una
 * versión en JS con requestAnimationFrame reintroduciría el jank que ya se
 * corrigió en este sitio). Cero dependencias nuevas.
 *
 * La lista se duplica y el recorrido es de -50%, así que el bucle es perfecto.
 * La copia duplicada va oculta para lectores de pantalla.
 */
export function Marquee({ items, duration = 38 }: MarqueeProps) {
  const Track = ({ aria }: { aria: boolean }) => (
    <ul
      className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
      aria-hidden={aria ? undefined : "true"}
    >
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center gap-8 sm:gap-12">
          <span className="font-display text-lg uppercase tracking-wider text-white/85 sm:text-xl">
            {item}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className="relative overflow-hidden bg-ink py-5 sm:py-6"
      aria-label="Capacidades"
    >
      {/* Bordes desvanecidos para que la banda no "corte" en seco */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--ink), transparent 12%, transparent 88%, var(--ink))",
        }}
      />
      <div
        className="flex w-max"
        style={{ animation: `marquee-x ${duration}s linear infinite` }}
      >
        <Track aria />
        <Track aria={false} />
      </div>
    </section>
  );
}
