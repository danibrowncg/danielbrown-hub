import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export interface TerminalLine {
  /** `prompt` = línea que escribe el usuario. `out` = respuesta del sistema. */
  kind: "prompt" | "out" | "ok";
  text: string;
}

interface TerminalWindowProps {
  lines: TerminalLine[];
  /** ms por carácter al teclear las líneas de tipo `prompt`. */
  speed?: number;
  /** Segundos de pausa antes de repetir la secuencia. 0 = no repetir. */
  loopDelay?: number;
  className?: string;
}

/**
 * Elemento firma de la landing de mentoría: una terminal que se escribe sola,
 * del prompt al producto desplegado.
 *
 * Existe para anclar la página en el mundo real de Daniel (Claude Code,
 * construir productos) en lugar del recurso por defecto de cualquier landing de
 * mentoría de IA: una tarjeta con cifras grandes. Aquí lo que impresiona no es
 * un número inventado, sino ver el proceso.
 *
 * La animación teclea solo las líneas del usuario; las respuestas aparecen de
 * golpe, como en una terminal real. Con `prefers-reduced-motion` se muestra el
 * estado final completo sin teclear.
 */
export function TerminalWindow({ lines, speed = 28, loopDelay = 3, className = "" }: TerminalWindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  // Cuántas líneas se han revelado y cuántos caracteres de la línea en curso.
  const [shown, setShown] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(lines.length);
      setChars(Infinity);
      return;
    }
    // Terminada la secuencia: pausa y vuelve a empezar, para que el bloque
    // nunca quede estático. Con reduced-motion se queda en el estado final.
    if (shown >= lines.length) {
      if (!loopDelay || reduce) return;
      const t = setTimeout(() => {
        setShown(0);
        setChars(0);
      }, loopDelay * 1000);
      return () => clearTimeout(t);
    }

    const line = lines[shown];
    // Las respuestas del sistema no se teclean: aparecen completas tras una pausa.
    if (line.kind !== "prompt") {
      const t = setTimeout(() => setShown((s) => s + 1), 340);
      return () => clearTimeout(t);
    }
    if (chars < line.text.length) {
      const t = setTimeout(() => setChars((c) => c + 1), speed);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShown((s) => s + 1);
      setChars(0);
    }, 420);
    return () => clearTimeout(t);
  }, [inView, reduce, shown, chars, lines, speed, loopDelay]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-[0_30px_80px_-40px_rgba(13,0,38,0.6)] ${className}`}
    >
      {/* Filete de marca en el canto: el mismo recurso que la tarjeta de
          precio y la llamada abierta, para que el degradado se lea como
          sistema y no como un color suelto. */}
      <span aria-hidden="true" className="brand-grad absolute inset-x-0 top-0 z-10 h-[2px]" />

      {/* Barra de título: los tres puntos hacen que se lea como terminal al instante */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-white/20" />
        <span className="h-3 w-3 rounded-full bg-white/20" />
        <span className="h-3 w-3 rounded-full bg-white/20" />
        <span className="ml-2 font-mono text-[11px] text-white/40">tu-proyecto — claude code</span>
      </div>

      <div className="min-h-[13rem] px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:min-h-[15rem] sm:px-5 sm:text-sm">
        {lines.slice(0, shown + 1).map((l, i) => {
          const activa = i === shown;
          const texto =
            activa && l.kind === "prompt" && chars !== Infinity
              ? l.text.slice(0, chars)
              : l.text;
          if (activa && shown >= lines.length) return null;

          return (
            <p
              key={i}
              className={`whitespace-pre-wrap break-words ${
                l.kind === "prompt"
                  ? "text-white"
                  : l.kind === "ok"
                    ? "text-neon"
                    : "text-white/50"
              }`}
            >
              {l.kind === "prompt" ? <span className="text-neon">❯ </span> : null}
              {texto}
              {activa && l.kind === "prompt" ? (
                <span className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[0.18em] animate-pulse bg-neon" />
              ) : null}
            </p>
          );
        })}
      </div>
    </div>
  );
}
