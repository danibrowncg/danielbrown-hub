import { useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { User, Store, Target, MessageSquareText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WA_PHONE_RAW } from "@/lib/constants";

export type LeadVariant = "web" | "sistema";

interface WhatsAppLeadDialogProps {
  variant: LeadVariant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const phone = WA_PHONE_RAW.replace(/\D/g, "");
const EASE = [0.23, 1, 0.32, 1] as const;

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
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.08 + i * 0.07, ease: EASE },
  }),
};

function LeadForm({
  variant,
  onDone,
}: {
  variant: LeadVariant;
  onDone: () => void;
}) {
  const reduce = useReducedMotion();
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [objetivo, setObjetivo] = useState("");

  const complete =
    nombre.trim() !== "" && negocio.trim() !== "" && objetivo.trim() !== "";

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
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    onDone();
  };

  const anim = (i: number) =>
    reduce
      ? {}
      : { custom: i, variants: fieldVariants, initial: "hidden", animate: "show" };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
      <motion.div {...anim(0)}>
        <Field icon={<User className="h-5 w-5" strokeWidth={1.75} />} htmlFor="lead-nombre" label="Tu nombre">
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

      <motion.div {...anim(1)}>
        <Field icon={<Store className="h-5 w-5" strokeWidth={1.75} />} htmlFor="lead-negocio" label="¿Qué tipo de negocio tienes?">
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

      <motion.div {...anim(2)}>
        <Field
          icon={<Target className="h-5 w-5" strokeWidth={1.75} />}
          htmlFor="lead-objetivo"
          label={objetivoLabel}
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
        {...anim(3)}
        type="submit"
        disabled={!complete}
        whileHover={complete && !reduce ? { scale: 1.02 } : undefined}
        whileTap={complete && !reduce ? { scale: 0.98 } : undefined}
        className="mt-1 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-neon px-6 text-base font-bold uppercase tracking-wider text-ink shadow-[0_10px_34px_-12px_rgba(231,255,0,0.65)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.3-.2-.6-.4z" />
        </svg>
        Ir a WhatsApp
      </motion.button>
      <p className="text-center text-xs text-white/40">
        Se abrirá WhatsApp con tu mensaje ya redactado, listo para enviar.
      </p>
    </form>
  );
}

const inputClass =
  "w-full bg-transparent py-3 pl-11 pr-4 text-base text-white placeholder:text-white/35 focus:outline-none";

function Field({
  icon,
  label,
  htmlFor,
  alignTop,
  children,
}: {
  icon: ReactNode;
  label: string;
  htmlFor: string;
  alignTop?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[13px] font-medium text-white/70">
        {label}
      </label>
      <div className="group relative flex rounded-xl border border-white/12 bg-white/[0.04] transition-all duration-200 focus-within:border-neon/70 focus-within:bg-white/[0.07] focus-within:ring-2 focus-within:ring-neon/20">
        <span
          className={`pointer-events-none absolute left-3.5 text-white/35 transition-colors duration-200 group-focus-within:text-neon ${
            alignTop ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        >
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

export function WhatsAppLeadDialog({
  variant,
  open,
  onOpenChange,
}: WhatsAppLeadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-[calc(100%-1.5rem)] gap-0 overflow-y-auto rounded-3xl border-white/10 bg-card p-0 text-white sm:max-w-md">
        {/* Acento superior de marca */}
        <div className="h-1.5 w-full brand-gradient" />
        <div className="p-6 sm:p-7">
          <DialogHeader className="text-left">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-neon/12 ring-1 ring-neon/25">
              <MessageSquareText className="h-6 w-6 text-neon" strokeWidth={1.75} />
            </div>
            <DialogTitle className="font-display text-2xl uppercase tracking-wide text-white">
              Cuéntame de tu proyecto
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Responde 3 datos rápidos y te preparo el mensaje listo para enviar.
            </DialogDescription>
          </DialogHeader>

          <LeadForm variant={variant} onDone={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
