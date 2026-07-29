/**
 * Fondo global del sitio: BLANCO PURO + malla de puntos.
 *
 * Antes tenía tres manchas de color difuminadas (teal/violeta) y un foco que
 * seguía al cursor. Se eliminaron a propósito: teñían el blanco (la página
 * nunca se veía realmente blanca) y competían con el contenido. El degradado
 * de marca ahora vive solo en detalles mínimos y deliberados, no en el fondo.
 *
 * Sin JS: es puramente CSS, así que no hay listeners de pointermove ni springs
 * corriendo de fondo. Cero coste en el hilo principal.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background"
    >
      {/* Malla de puntos: el único adorno. La máscara la desvanece hacia los
          bordes para que no corte en seco contra el blanco. */}
      <div className="dot-grid absolute inset-0" />
    </div>
  );
}
