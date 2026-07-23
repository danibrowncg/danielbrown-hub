import { StaggerGroup, StaggerItem, Reveal } from "@/components/primitives/Reveal";
import { SpotlightOverlay } from "@/components/primitives/SpotlightOverlay";

const features = [
  "Software inteligente con IA integrada",
  "Automatización de procesos empresariales",
  "Custom solutions personalizadas",
  "Análisis de datos en tiempo real",
  "Infraestructura segura y escalable",
  "Integración con APIs y plataformas externas",
  "Dominio + hosting 1 año incluido",
  "Interfaz intuitiva y profesional",
  "Desarrollo rápido (1-2 semanas)",
  "Garantía de satisfacción",
  "Dashboards y reportes inteligentes",
  "Documentación y training incluido",
];

export function Features() {
  return (
    <section className="relative overflow-hidden px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet">Por qué</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.95] text-ink sm:text-5xl lg:text-6xl">
            POR QUÉ ELEGIR ESTE <span className="text-violet">SISTEMA</span>.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {features.map((f, i) => (
            <StaggerItem
              key={f}
              direction={i % 2 === 0 ? "left" : "right"}
              className="group relative flex items-start gap-3 overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.02] p-4 transition-all hover:border-ink/20 hover:bg-ink/[0.04]"
            >
              <SpotlightOverlay size={200} intensity={0.1} />
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-neon transition-all group-hover:scale-110 group-hover:bg-neon group-hover:text-ink">
                <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                  <path d="m5 12 5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="relative text-sm leading-snug text-ink/75 sm:text-base">{f}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
