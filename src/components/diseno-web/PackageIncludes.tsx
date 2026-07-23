import { Globe, Sparkles, Settings, BarChart3, type LucideIcon } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/Reveal";
import { SpotlightOverlay } from "@/components/primitives/SpotlightOverlay";

const cards: { Icon: LucideIcon; title: string; items: string[] }[] = [
  {
    Icon: Globe,
    title: "Dominio + Hosting",
    items: ["Dominio personalizado (12 meses)", "Hosting de alta velocidad", "Certificado SSL (HTTPS)"],
  },
  {
    Icon: Sparkles,
    title: "Diseño Premium",
    items: ["100% responsive mobile-first", "Animaciones modernas incluidas", "Interfaz exclusiva, sin plantillas"],
  },
  {
    Icon: Settings,
    title: "Soporte + SEO",
    items: ["Soporte técnico 12 meses", "SEO básico para Google", "Optimización de velocidad"],
  },
  {
    Icon: BarChart3,
    title: "Extras incluidos",
    items: ["Google Analytics configurado", "Integración redes sociales", "Formulario de contacto + backup"],
  },
];

export function PackageIncludes() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink">Qué incluye</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            TODO LO QUE <span className="text-brand-grad">RECIBES</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-xl text-base text-ink/65 sm:text-lg">
            Un paquete completo. Llave en mano. Sin sorpresas ni costos ocultos.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {cards.map((c) => (
            <StaggerItem
              key={c.title}
              direction="up"
              className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 shadow-[0_2px_20px_-14px_rgba(13,0,38,0.3)] transition-all duration-300 hover:-translate-y-2 hover:border-ink/20 hover:shadow-[0_30px_60px_-30px_rgba(13,0,38,0.35)]"
            >
              <SpotlightOverlay />
              <div className="relative">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-neon shadow-[0_10px_24px_-12px_rgba(13,0,38,0.5)] transition-transform group-hover:scale-105">
                  <c.Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-display text-xl uppercase tracking-wide text-ink">{c.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-ink/70">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
