import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WA_PHONE_RAW } from "@/lib/constants";

const phone = WA_PHONE_RAW.replace(/\D/g, "");
const EASE = [0.23, 1, 0.32, 1] as const;

const TIPOS = ["Página web", "Software", "Sistema", "Aplicación", "Otro"];
const NIVELES = ["Ninguno", "Básico", "Intermedio", "Avanzado"];

const ApplyContext = createContext<{ openApply: () => void }>({ openApply: () => {} });
export const useMentoriaApply = () => useContext(ApplyContext);

/** Mensaje con negritas de WhatsApp (asteriscos) listo para enviar. */
function buildMessage(d: { nombre: string; tipo: string; idea: string; nivel: string }) {
  return [
    "¡Hola Daniel! Quiero aplicar a *Sprint MVP* 🚀",
    "",
    `*Nombre:* ${d.nombre}`,
    `*Qué quiero construir:* ${d.tipo}`,
    `*Mi idea:* ${d.idea}`,
    `*Nivel de experiencia:* ${d.nivel}`,
  ].join("\n");
}

/**
 * Formulario de aplicación, conversacional: una pregunta por pantalla.
 *
 * Va de a una porque son 4 preguntas y una de ellas es abierta: mostrarlas
 * todas juntas hace que el formulario se lea como "trabajo" y baja la
 * conversión justo en el paso final. De a una, cada pantalla se resuelve en un
 * toque y la barra muestra que falta poco.
 *
 * Las opciones avanzan solas al elegir (sin botón "siguiente"), que es lo que
 * hace que se sienta conversación y no formulario.
 */
export function MentoriaApplyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openApply = useCallback(() => setOpen(true), []);
  return (
    <ApplyContext.Provider value={{ openApply }}>
      {children}
      <ApplyDialog open={open} onOpenChange={setOpen} />
    </ApplyContext.Provider>
  );
}

function ApplyDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const reduce = useReducedMotion();
  const [paso, setPaso] = useState(0);
  const [dir, setDir] = useState(1);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [idea, setIdea] = useState("");
  const [nivel, setNivel] = useState("");

  const total = 4;
  const reset = () => {
    setPaso(0); setDir(1); setNombre(""); setTipo(""); setIdea(""); setNivel("");
  };
  const cerrar = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(reset, 250);
  };

  const avanzar = () => { setDir(1); setPaso((p) => p + 1); };
  const volver = () => { setDir(-1); setPaso((p) => Math.max(0, p - 1)); };

  const enviar = (nivelFinal: string) => {
    const msg = buildMessage({
      nombre: nombre.trim(),
      tipo,
      idea: idea.trim(),
      nivel: nivelFinal,
    });
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    // Debe ir en el mismo gesto del usuario para no ser bloqueado por el popup blocker.
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    cerrar(false);
  };

  // Entrada y SALIDA en direcciones opuestas: refuerza el sentido de avance.
  const slide = {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x: dir * 28 },
    animate: { opacity: 1, x: 0 },
    exit: reduce ? { opacity: 0 } : { opacity: 0, x: dir * -28 },
    transition: { duration: 0.28, ease: EASE },
  };

  const preguntas = [
    { titulo: "¿Cómo te llamas?", ayuda: "Para saber cómo dirigirme a ti." },
    { titulo: "¿Qué quieres construir?", ayuda: "Elige lo que más se acerque." },
    { titulo: "Cuéntame tu idea", ayuda: "En una o dos frases, sin tecnicismos." },
    { titulo: "¿Tu nivel técnico?", ayuda: "No hay respuesta mala: adapto el ritmo." },
  ];

  return (
    <Dialog open={open} onOpenChange={cerrar}>
      <DialogContent className="max-h-[92dvh] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-3xl border-white/10 bg-card p-0 text-white sm:max-w-lg">
        <div className="brand-grad h-1.5 w-full" />
        <div className="p-6 sm:p-8">
          <DialogHeader className="text-left">
            <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white">
              Aplicar a Sprint MVP
            </DialogTitle>
            <DialogDescription className="text-sm text-white/55">
              4 preguntas rápidas. Al terminar te abro WhatsApp con todo escrito.
            </DialogDescription>
          </DialogHeader>

          {/* Progreso */}
          <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full rounded-full bg-neon"
                  style={{ originX: 0 }}
                  initial={false}
                  animate={{ scaleX: i <= paso ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-white/40">
            Pregunta {Math.min(paso + 1, total)} de {total}
          </p>

          <div className="relative mt-6 min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={paso} {...slide}>
                <h3 className="font-display text-xl uppercase tracking-wide text-white sm:text-2xl">
                  {preguntas[paso].titulo}
                </h3>
                <p className="mt-1 text-sm text-white/50">{preguntas[paso].ayuda}</p>

                <div className="mt-5">
                  {paso === 0 ? (
                    <form
                      onSubmit={(e) => { e.preventDefault(); if (nombre.trim()) avanzar(); }}
                    >
                      <input
                        autoFocus
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Tu nombre"
                        aria-label="Tu nombre"
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-white/30 focus:border-neon/70 focus:outline-none focus:ring-2 focus:ring-neon/20"
                      />
                      <Siguiente disabled={!nombre.trim()} />
                    </form>
                  ) : null}

                  {paso === 1 ? (
                    <Opciones
                      items={TIPOS}
                      value={tipo}
                      onPick={(v) => { setTipo(v); setDir(1); setTimeout(avanzar, 130); }}
                    />
                  ) : null}

                  {paso === 2 ? (
                    <form
                      onSubmit={(e) => { e.preventDefault(); if (idea.trim()) avanzar(); }}
                    >
                      <textarea
                        autoFocus
                        rows={3}
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Ej: una web para mi barbería donde la gente reserve turno"
                        aria-label="Tu idea"
                        className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-white/30 focus:border-neon/70 focus:outline-none focus:ring-2 focus:ring-neon/20"
                      />
                      <Siguiente disabled={!idea.trim()} />
                    </form>
                  ) : null}

                  {paso === 3 ? (
                    <Opciones
                      items={NIVELES}
                      value={nivel}
                      onPick={(v) => { setNivel(v); setTimeout(() => enviar(v), 130); }}
                      final
                    />
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {paso > 0 ? (
            <button
              type="button"
              onClick={volver}
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/45 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon"
            >
              <ArrowLeft className="h-4 w-4" /> Atrás
            </button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Siguiente({ disabled }: { disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`mt-4 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
        disabled
          ? "cursor-not-allowed bg-neon/25 text-ink/50"
          : "bg-neon text-ink hover:brightness-105"
      }`}
    >
      Siguiente <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}

/** Opciones que avanzan solas: sin botón extra, se siente conversación. */
function Opciones({
  items,
  value,
  onPick,
  final,
}: {
  items: string[];
  value: string;
  onPick: (v: string) => void;
  final?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {items.map((it) => {
        const activo = value === it;
        return (
          <button
            key={it}
            type="button"
            role="radio"
            aria-checked={activo}
            onClick={() => onPick(it)}
            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon ${
              activo
                ? "border-neon bg-neon/10 text-white"
                : "border-white/12 bg-white/[0.04] text-white/75 hover:border-white/30 hover:bg-white/[0.07]"
            }`}
          >
            {it}
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                activo ? "border-neon bg-neon" : "border-white/25"
              }`}
            >
              {activo ? <Check className="h-3 w-3 text-ink" strokeWidth={3} /> : null}
            </span>
          </button>
        );
      })}
      {final ? (
        <p className="mt-1 text-center text-xs text-white/40">
          Al elegir te abro WhatsApp con tu mensaje listo.
        </p>
      ) : null}
    </div>
  );
}
