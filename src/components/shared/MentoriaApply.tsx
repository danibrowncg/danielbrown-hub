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

interface Opcion {
  label: string;
  /** Aclaración bajo la etiqueta, para las opciones que no se explican solas. */
  desc?: string;
}

const TIPOS: Opcion[] = [
  { label: "Página web" },
  { label: "Software" },
  { label: "Sistema" },
  { label: "Aplicación" },
  {
    label: "Mentoría personalizada",
    desc: "Algo 100% a mi medida, sin un proyecto cerrado todavía",
  },
  { label: "Otro" },
];
const NIVELES: Opcion[] = [
  { label: "Ninguno" },
  { label: "Básico" },
  { label: "Intermedio" },
  { label: "Avanzado" },
];

/**
 * La opción a medida cambia la pregunta abierta: quien la elige no viene con un
 * proyecto definido, así que pedirle "cuéntame tu idea" no encaja y se queda en
 * blanco justo en el último paso.
 */
const A_MEDIDA = "Mentoría personalizada";

const ApplyContext = createContext<{ openApply: () => void }>({ openApply: () => {} });
export const useMentoriaApply = () => useContext(ApplyContext);

/** Mensaje con negritas de WhatsApp (asteriscos) listo para enviar. */
function buildMessage(d: { nombre: string; tipo: string; idea: string; nivel: string }) {
  const aMedida = d.tipo === A_MEDIDA;
  return [
    "¡Hola Daniel! Quiero aplicar a la *Mentoría MVP* 🚀",
    "",
    `*Nombre:* ${d.nombre}`,
    `*Qué busco:* ${aMedida ? "Una mentoría 100% a mi medida" : d.tipo}`,
    `${aMedida ? "*Qué quiero lograr:*" : "*Mi idea:*"} ${d.idea}`,
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

  const aMedida = tipo === A_MEDIDA;
  const preguntas = [
    { titulo: "¿Cómo te llamas?", ayuda: "Para saber cómo dirigirme a ti." },
    { titulo: "¿Qué quieres construir?", ayuda: "Elige lo que más se acerque." },
    aMedida
      ? {
          titulo: "¿Qué quieres lograr?",
          ayuda: "Aunque todavía no sea un proyecto concreto.",
        }
      : { titulo: "Cuéntame tu idea", ayuda: "En una o dos frases, sin tecnicismos." },
    { titulo: "¿Tu nivel técnico?", ayuda: "No hay respuesta mala: adapto el ritmo." },
  ];

  return (
    <Dialog open={open} onOpenChange={cerrar}>
      <DialogContent className="max-h-[92dvh] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-3xl border-ink/10 bg-card p-0 text-ink sm:max-w-lg">
        <div className="brand-grad h-1.5 w-full" />
        <div className="p-6 sm:p-8">
          <DialogHeader className="text-left">
            <DialogTitle className="font-display text-2xl uppercase tracking-wide text-ink">
              Aplicar a la Mentoría MVP
            </DialogTitle>
            <DialogDescription className="text-sm text-ink/55">
              4 preguntas rápidas. Al terminar te abro WhatsApp con todo escrito.
            </DialogDescription>
          </DialogHeader>

          {/* Progreso */}
          <div className="mt-5 flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                <motion.span
                  className="brand-grad block h-full rounded-full"
                  style={{ originX: 0 }}
                  initial={false}
                  animate={{ scaleX: i <= paso ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                />
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink/60">
            Pregunta {Math.min(paso + 1, total)} de {total}
          </p>

          <div className="relative mt-6 min-h-[15rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={paso} {...slide}>
                <h3 className="font-display text-xl uppercase tracking-wide text-ink sm:text-2xl">
                  {preguntas[paso].titulo}
                </h3>
                <p className="mt-1 text-sm text-ink/55">{preguntas[paso].ayuda}</p>

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
                        className="w-full rounded-xl border border-ink/12 bg-ink/[0.02] px-4 py-3.5 text-base text-ink placeholder:text-ink/35 focus:border-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-neon/30"
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
                        placeholder={
                          aMedida
                            ? "Ej: quiero automatizar la gestión de mi negocio con IA y no sé por dónde empezar"
                            : "Ej: una web para mi barbería donde la gente reserve turno"
                        }
                        aria-label={aMedida ? "Qué quieres lograr" : "Tu idea"}
                        className="w-full resize-none rounded-xl border border-ink/12 bg-ink/[0.02] px-4 py-3.5 text-base text-ink placeholder:text-ink/35 focus:border-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-neon/30"
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
              className="mt-2 inline-flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
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
          ? "cursor-not-allowed bg-neon/40 text-ink/70"
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
  items: Opcion[];
  value: string;
  onPick: (v: string) => void;
  final?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2" role="radiogroup">
      {items.map((it) => {
        const activo = value === it.label;
        return (
          <button
            key={it.label}
            type="button"
            role="radio"
            aria-checked={activo}
            onClick={() => onPick(it.label)}
            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
              activo
                ? "border-ink bg-ink text-white shadow-[0_10px_26px_-14px_rgba(13,0,38,0.6)]"
                : "border-ink/12 bg-ink/[0.02] text-ink/75 hover:border-ink/30 hover:bg-ink/[0.04]"
            }`}
          >
            <span className="min-w-0">
              <span className="block leading-tight">{it.label}</span>
              {it.desc ? (
                <span
                  className={`mt-0.5 block text-[12px] leading-snug ${
                    activo ? "text-white/55" : "text-ink/60"
                  }`}
                >
                  {it.desc}
                </span>
              ) : null}
            </span>
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${
                activo ? "border-neon bg-neon" : "border-ink/25"
              }`}
            >
              {activo ? <Check className="h-3 w-3 text-ink" strokeWidth={3} /> : null}
            </span>
          </button>
        );
      })}
      {final ? (
        <p className="mt-1 text-center text-xs text-ink/60">
          Al elegir te abro WhatsApp con tu mensaje listo.
        </p>
      ) : null}
    </div>
  );
}
