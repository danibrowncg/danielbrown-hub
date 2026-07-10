import { useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { User, Store, Target, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WA_PHONE_RAW } from "@/lib/constants";
import danielImg from "@/assets/daniel.webp";

export type LeadVariant = "web" | "sistema";

interface WhatsAppLeadDialogProps {
  variant: LeadVariant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const phone = WA_PHONE_RAW.replace(/\D/g, "");
const EASE = [0.23, 1, 0.32, 1] as const;
const WA_GREEN = "#25D366";

/** Construye el mensaje-plantilla profesional (con emojis) para wa.me. */
function buildMessage(
  variant: LeadVariant,
  data: { nombre: string; negocio: string; objetivo: string },
) {
  const origen = variant === "web" ? "*Diseño Web* 🚀" : "*Sistemas con IA* 🤖";
  const linea3 =
    variant === "web"
      ? "🎯 *Quiero mi página web para:*"
      : "🎯 *Quiero mi sistema para:*";
  const cierre =
    variant === "web"
      ? "¿Me ayudas a cotizar mi proyecto? 💛"
      : "¿Me ayudas con más información? 💛";

  return [
    `¡Hola Daniel! 👋 Vengo desde tu web de ${origen}`,
    "",
    `👤 *Nombre:* ${data.nombre}`,
    `🏢 *Tipo de negocio:* ${data.negocio}`,
    `${linea3} ${data.objetivo}`,
    "",
    cierre,
  ].join("\n");
}

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.12 + i * 0.08, ease: EASE },
  }),
};

function LeadForm({ variant, onDone }: { variant: LeadVariant; onDone: () => void }) {
  const reduce = useReducedMotion();
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [objetivo, setObjetivo] = useState("");

  const values = [nombre, negocio, objetivo];
  const filledCount = values.filter((v) => v.trim() !== "").length;
  const complete = filledCount === 3;

  const objetivoLabel =
    variant === "web"
      ? "¿Para qué quieres tu página web?"
      : "¿Para qué quieres el sistema o software?";
  const objetivoPlaceholder =
    variant === "web"
      ? "Vender online, captar clientes, mostrar mi portafolio…"
      : "Automatizar pedidos, un chatbot con IA, analizar datos…";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!complete) return;
    const message = buildMessage(variant, {
      nombre: nombre.trim(),
      negocio: negocio.trim(),
      objetivo: objetivo.trim(),
    });
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    // Debe ir en el mismo gesto para no ser bloqueado por el popup blocker.
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    onDone();
  };

  const anim = (i: number) =>
    reduce ? {} : { custom: i, variants: fieldVariants, initial: "hidden", animate: "show" };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
      {/* Progreso: 3 segmentos que se llenan al completar cada campo */}
      <motion.div {...anim(0)} className="flex items-center gap-1.5">
        {values.map((v, i) => (
          <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.span
              className="block h-full rounded-full bg-neon"
              style={{ originX: 0 }}
              initial={false}
              animate={{ scaleX: v.trim() ? 1 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </span>
        ))}
      </motion.div>

      <motion.div {...anim(1)}>
        <Field
          icon={<User className="h-5 w-5" strokeWidth={1.75} />}
          htmlFor="lead-nombre"
          label="Tu nombre"
          filled={nombre.trim() !== ""}
          reduce={!!reduce}
        >
          <input
            id="lead-nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Daniel Brown"
            className={inputClass}
          />
        </Field>
      </motion.div>

      <motion.div {...anim(2)}>
        <Field
          icon={<Store className="h-5 w-5" strokeWidth={1.75} />}
          htmlFor="lead-negocio"
          label="¿Qué tipo de negocio tienes?"
          filled={negocio.trim() !== ""}
          reduce={!!reduce}
        >
          <input
            id="lead-negocio"
            name="negocio"
            type="text"
            required
            value={negocio}
            onChange={(e) => setNegocio(e.target.value)}
            placeholder="Ej: restaurante, tienda de ropa, agencia…"
            className={inputClass}
          />
        </Field>
      </motion.div>

      <motion.div {...anim(3)}>
        <Field
          icon={<Target className="h-5 w-5" strokeWidth={1.75} />}
          htmlFor="lead-objetivo"
          label={objetivoLabel}
          filled={objetivo.trim() !== ""}
          reduce={!!reduce}
          alignTop
        >
          <textarea
            id="lead-objetivo"
            name="objetivo"
            required
            rows={2}
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            placeholder={objetivoPlaceholder}
            className={`${inputClass} resize-none`}
          />
        </Field>
      </motion.div>

      <motion.button
        {...anim(4)}
        type="submit"
        disabled={!complete}
        whileHover={complete && !reduce ? { scale: 1.02 } : undefined}
        whileTap={complete && !reduce ? { scale: 0.97 } : undefined}
        className={`group relative mt-1 inline-flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 text-base font-bold uppercase tracking-wider transition-[background-color,box-shadow,color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
          complete
            ? "bg-neon text-ink shadow-[0_12px_38px_-12px_rgba(231,255,0,0.8)]"
            : "cursor-not-allowed bg-neon/25 text-ink/50 shadow-none"
        }`}
      >
        {/* Barrido de brillo en hover (solo cuando ya se puede enviar) */}
        {complete ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
          />
        ) : null}
        <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.3-.2-.6-.4z" />
        </svg>
        <span className="relative">Ir a WhatsApp</span>
      </motion.button>
      <p className="text-center text-xs text-white/40">
        Se abrirá WhatsApp con tu mensaje ya redactado, listo para enviar.
      </p>
    </form>
  );
}

const inputClass =
  "w-full bg-transparent py-3 pl-11 pr-11 text-base text-white placeholder:text-white/35 focus:outline-none";

function Field({
  icon,
  label,
  htmlFor,
  filled,
  reduce,
  alignTop,
  children,
}: {
  icon: ReactNode;
  label: string;
  htmlFor: string;
  filled: boolean;
  reduce: boolean;
  alignTop?: boolean;
  children: ReactNode;
}) {
  const sidePos = alignTop ? "top-3.5" : "top-1/2 -translate-y-1/2";
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-white/70">
        {label}
      </label>
      <div className="group relative flex rounded-xl border border-white/12 bg-white/[0.04] transition-all duration-200 focus-within:border-neon/70 focus-within:bg-white/[0.07] focus-within:ring-2 focus-within:ring-neon/20 focus-within:shadow-[0_0_0_4px_rgba(231,255,0,0.05)]">
        <span
          className={`pointer-events-none absolute left-3.5 text-white/35 transition-colors duration-200 group-focus-within:text-neon ${sidePos}`}
        >
          {icon}
        </span>
        {children}
        {/* Check verde al completar (feedback) */}
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ scale: filled ? 1 : 0, opacity: filled ? 1 : 0 }}
          transition={
            reduce
              ? { duration: 0.12 }
              : { type: "spring", duration: 0.4, bounce: 0.4 }
          }
          className={`pointer-events-none absolute right-3 grid h-5 w-5 place-items-center rounded-full ${sidePos}`}
          style={{ backgroundColor: WA_GREEN }}
        >
          <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} />
        </motion.span>
      </div>
    </div>
  );
}

export function WhatsAppLeadDialog({ variant, open, onOpenChange }: WhatsAppLeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92dvh] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-3xl border-white/10 bg-card p-0 text-white sm:max-w-md">
        {/* Acento superior de marca */}
        <div className="brand-gradient h-1.5 w-full" />
        <div className="p-6 sm:p-7">
          {/* Header estilo contacto de WhatsApp: refuerza que hablarás con Daniel */}
          <DialogHeader className="text-left">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={danielImg}
                  alt="Daniel Brown"
                  width={48}
                  height={48}
                  decoding="async"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white/15"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full ring-2 ring-card"
                  style={{ backgroundColor: WA_GREEN }}
                >
                  <span
                    className="h-2.5 w-2.5 animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: WA_GREEN }}
                  />
                </span>
              </div>
              <div className="min-w-0">
                <DialogTitle className="font-display text-xl tracking-wide text-white">
                  Daniel Brown
                </DialogTitle>
                <DialogDescription className="text-xs text-white/55">
                  En línea · responde en minutos
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Cuéntame de tu proyecto y te dejo un mensaje listo para enviarme por WhatsApp.
          </p>

          <LeadForm variant={variant} onDone={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
