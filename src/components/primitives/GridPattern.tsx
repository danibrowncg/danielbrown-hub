interface GridPatternProps {
  /** Tamaño de la celda en px. */
  size?: number;
  /** Opacidad de las líneas (0-1). */
  opacity?: number;
  /** Segundos que tarda la deriva en recorrer una celda. */
  duration?: number;
}

/**
 * Rejilla técnica que deriva lentamente. Va SOLO en secciones oscuras.
 *
 * Por qué CSS y no canvas/WebGL: es movimiento constante y de fondo. En canvas
 * ocuparía el hilo principal permanentemente (justo el jank que ya se corrigió
 * en este sitio); aquí es un único elemento animado por `transform`, que corre
 * en el compositor. Deriva en diagonal una sola celda y reinicia: como la
 * rejilla es periódica, el bucle es invisible.
 *
 * La máscara radial la desvanece hacia los bordes para que no se vea el corte.
 */
export function GridPattern({
  size = 44,
  opacity = 0.07,
  duration = 14,
}: GridPatternProps) {
  const line = `rgba(255,255,255,${opacity})`;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
      }}
    >
      <div
        className="absolute"
        style={{
          // Sobredimensionado para que la deriva nunca deje ver un borde.
          inset: `-${size * 2}px`,
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          animation: `grid-drift ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}
