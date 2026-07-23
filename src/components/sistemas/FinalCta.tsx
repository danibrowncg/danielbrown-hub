import { motion } from "motion/react";
import { toast } from "sonner";
import { GradientBlob } from "@/components/primitives/GradientBlob";
import { Magnetic } from "@/components/primitives/Magnetic";
import { useWhatsAppLead } from "@/components/shared/WhatsAppLead";
import { WA_PHONE } from "@/lib/constants";

export function FinalCta() {
  const { openLead } = useWhatsAppLead();
  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(WA_PHONE.replace(/\s/g, ""));
      toast.success("Número copiado", { description: WA_PHONE });
    } catch {
      toast.error("No se pudo copiar el número");
    }
  };

  return (
    <section className="relative isolate overflow-hidden px-5 py-24 sm:px-8 lg:px-16 lg:py-32">
      <GradientBlob className="left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-ink"
        >
          Listos para empezar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-4 font-display text-5xl uppercase leading-[0.95] text-ink sm:text-6xl lg:text-7xl"
        >
          ¿LISTO PARA TRANSFORMAR TU NEGOCIO CON <span className="text-brand-grad">IA</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-ink/75 sm:text-lg"
        >
          Escríbeme por WhatsApp y cuéntame tu idea. Sin compromiso, analizamos
          tu necesidad y creamos el software perfecto para tu empresa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 18 }}
          className="mt-9 flex flex-col items-center gap-4"
        >
          <Magnetic>
            <motion.button
              type="button"
              onClick={openLead}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-neon px-9 text-base font-bold uppercase tracking-wider text-ink sm:h-16 sm:px-12 sm:text-lg"
              style={{ animation: "pulse-neon 2s ease-in-out infinite" }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
              />
              <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6">
                <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4 0-.1-.3-.2-.6-.4z" />
              </svg>
              <span className="relative">Crear mi sistema con IA</span>
            </motion.button>
          </Magnetic>

          <button
            onClick={copyPhone}
            className="text-sm text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            {WA_PHONE} · toca para copiar
          </button>
        </motion.div>
      </div>
    </section>
  );
}
