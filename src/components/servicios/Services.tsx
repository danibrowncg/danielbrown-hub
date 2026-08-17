import { Globe, Bot, Smartphone, Workflow, type LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { SpotlightOverlay } from "@/components/primitives/SpotlightOverlay";
import { Highlight } from "@/components/primitives/Highlight";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { useWhatsAppLead } from "@/components/shared/WhatsAppLead";

interface Service {
  Icon: LucideIcon;
  title: string;
  desc: string;
  items: string[];
  /** Los dos que más se venden ocupan el doble de ancho y llevan distintivo. */
  destacado?: string;
}

const services: Service[] = [
  {
    Icon: Globe,
    title: "Páginas web",
    desc: "Tu negocio online, listo para vender 24/7. Diseño propio, sin plantillas.",
    items: ["Landing pages que convierten", "Webs corporativas", "Tiendas online", "Dominio + hosting incluidos"],
    destacado: "Lo más solicitado",
  },
  {
    Icon: Bot,
    title: "Chatbots con IA",
    desc: "Un asistente que atiende, responde y vende por ti mientras duermes.",
    items: ["Chatbot para WhatsApp", "Instagram y Messenger", "Asistente en tu web", "Califica y agenda clientes"],
    destacado: "Tendencia 2026",
  },
  {
    Icon: Smartphone,
    title: "Aplicaciones",
    desc: "Apps a medida para que tu equipo y tus clientes trabajen más fácil.",
    items: ["Apps de gestión interna", "Portales para clientes", "Reservas y pedidos"],
  },
  {
    Icon: Workflow,
    title: "Sistemas automatizados",
    desc: "Software que hace solo el trabajo repetitivo que hoy te consume horas.",
    items: ["Automatización de procesos", "Paneles y reportes", "Integración entre plataformas"],
  },
];

/**
 * Catálogo de servicios: el corazón de la landing unificada.
 *
 * Antes había dos webs separadas (diseño web / sistemas IA). Al unificarlas,
 * esta sección es la que ordena la oferta para que un visitante entienda de un
 * vistazo TODO lo que se hace, sin perder el foco comercial: los dos servicios
 * que más venden (webs y chatbots) ocupan el doble de ancho y llevan
 * distintivo, así el ojo entra por ahí.
 */
export function Services() {
  const { openLead } = useWhatsAppLead();

  return (
    <section id="servicios" className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>Qué hago</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            SOLUCIONES QUE HACEN <Highlight>CRECER</Highlight> TU NEGOCIO.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-ink/65 sm:text-lg">
            Desde tu página web hasta el sistema que automatiza tu operación. Todo hecho a
            medida, sin plantillas y explicado sin tecnicismos.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.09}>
          {services.map((s) => (
            <StaggerItem
              key={s.title}
              direction="up"
              className={s.destacado ? "sm:col-span-1" : ""}
            >
              <article className="group relative h-full overflow-hidden rounded-2xl border border-ink/10 bg-white p-6 shadow-[0_2px_20px_-14px_rgba(13,0,38,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_30px_60px_-30px_rgba(13,0,38,0.35)] sm:p-7">
                <SpotlightOverlay />

                <div className="relative flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ink text-neon shadow-[0_10px_24px_-12px_rgba(13,0,38,0.5)] transition-transform group-hover:scale-105">
                    <s.Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  {s.destacado ? (
                    <span className="brand-grad rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                      {s.destacado}
                    </span>
                  ) : null}
                </div>

                <h3 className="relative mt-5 font-display text-2xl uppercase tracking-wide text-ink">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {s.desc}
                </p>

                <ul className="relative mt-5 space-y-2 text-sm text-ink/70">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.2} className="mt-10 text-center">
          <button
            type="button"
            onClick={openLead}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-neon px-8 text-base font-bold uppercase tracking-wider text-ink shadow-[0_12px_38px_-12px_rgba(231,255,0,0.8)] transition-transform hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Cuéntame qué necesitas
            <span aria-hidden="true">→</span>
          </button>
          <p className="mt-3 text-sm text-ink/60">
            ¿No sabes cuál te conviene? Escríbeme y lo vemos juntos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
