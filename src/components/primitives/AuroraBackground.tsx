/**
 * Fondo dinámico tipo aurora: capa fija detrás de todo el contenido con blobs
 * de color de marca que derivan lentamente. Sutil y de bajo costo (solo
 * transform/opacity). Se congela con prefers-reduced-motion (regla global).
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute -left-[15%] -top-[10%] h-[60vh] w-[60vh] rounded-full blur-[120px]"
        style={{
          opacity: 0.3,
          background: "radial-gradient(circle, var(--teal), transparent 70%)",
          animation: "aurora-a 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[12%] top-[16%] h-[65vh] w-[65vh] rounded-full blur-[130px]"
        style={{
          opacity: 0.28,
          background: "radial-gradient(circle, var(--violet), transparent 70%)",
          animation: "aurora-b 30s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-[18%] left-[22%] h-[50vh] w-[50vh] rounded-full blur-[120px]"
        style={{
          opacity: 0.16,
          background: "radial-gradient(circle, var(--neon), transparent 72%)",
          animation: "aurora-c 34s ease-in-out infinite",
        }}
      />
    </div>
  );
}
