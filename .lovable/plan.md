# Plan: Adaptar landing a "Software Inteligente con IA"

## 1. Importar el proyecto base
- Extraer `vibrant-visual-veneer-main.zip` (excluyendo `.git`, `node_modules`, `bun.lock` si genera conflicto).
- Copiar al proyecto actual con `rsync --exclude='.git'`:
  - `src/components/landing/*`
  - `src/components/ui/*` (merge con existentes)
  - `src/assets/*` (fotos Daniel, testimonios; las imágenes de proyectos se reemplazarán)
  - `src/routes/__root.tsx`, `src/routes/index.tsx`
  - `src/styles.css`, `src/hooks/*`, `src/lib/*` necesarios
- Instalar dependencias extras que use el zip (revisar su `package.json` vs el actual y `bun add` lo que falte).
- Mantener `src/router.tsx`, `src/server.ts`, `src/start.ts`, `routeTree.gen.ts` actuales (TanStack bootstrap).

## 2. Adaptar contenido (texto) en cada componente landing
Mantener estructura, animaciones, clases, tipografía y colores. Solo reemplazar copy:

- **Hero.tsx**: título → "SOFTWARE INTELIGENTE CON IA INTEGRADA"; subtítulo → "Automatización Inteligente y Soluciones Custom con AI para tu Empresa"; descripción de transformación; badge → "Desarrollo en 1-2 Semanas - Soluciones Custom".
- **AboutDaniel.tsx**: bio enfocada en software con IA / automatización (sin mencionar WordPress, Elementor, Framer, Claude). 3 specs: "Automatización Inteligente", "Soluciones Custom con IA", "Desarrollo en 1-2 Semanas".
- **PackageIncludes.tsx**: 4 cards reescritas (Hosting+Dominio, Software Inteligente, Características Avanzadas, Deployment y Mantenimiento) con los bullets indicados.
- **FastDelivery.tsx**: "1-2 Semanas" + descripción ágil.
- **Features.tsx**: 10–12 ventajas adaptadas (IA integrada, automatización, custom, análisis tiempo real, escalable, APIs, hosting+dominio 1 año, interfaz pro, 1-2 semanas, garantía, dashboards, training).
- **Testimonials.tsx**: 3 testimonios reescritos (Marketing Agency, Startup, Logística) con métricas de automatización/productividad.
- **PaymentMethod.tsx**: mantener 50/50; ajustar textos a "Reserva desarrollo" / "Sistema terminado y aprobado".
- **Faq.tsx**: 7 preguntas adaptadas (tiempo 1-2 semanas, hosting+dominio, escalabilidad, training, IA real, tecnologías "modernas y robustas", próximo paso por WhatsApp).
- **FinalCta.tsx**: título "¿LISTO PARA TRANSFORMAR TU NEGOCIO CON IA?", subtítulo y descripción nuevos, botón "CREAR MI SISTEMA CON IA".
- **SiteFooter.tsx**: tagline → "Software Inteligente con IA".
- **ProjectsCarousel.tsx**: cambiar etiquetas de cada proyecto a tipo de sistema (Chatbot IA, Automatización, Análisis de Datos, Gestión Empresarial, Procesamiento Inteligente, Sistema Recomendador) y apuntar a las nuevas imágenes.

## 3. Generar 6 imágenes nuevas de proyectos (ULTRA PREMIUM)
Con `imagegen--generate_image` (premium) en `src/assets/`, mockups de laptop 3/4 mostrando dashboards modernos, cada uno con paleta única (sin #E7FF00):
1. `project-chatbot-ai.jpg` — Chatbot/Asistente IA (azul profundo).
2. `project-automation.jpg` — Workflow/automatización (violeta).
3. `project-data-analytics.jpg` — Dashboard analítico predictivo (verde teal).
4. `project-erp.jpg` — Gestión empresarial / KPIs (naranja/dark).
5. `project-doc-processing.jpg` — Procesamiento de documentos con IA (magenta).
6. `project-recommender.jpg` — Sistema recomendador ML (rojo/dark).

Reemplazar referencias en `ProjectsCarousel.tsx`. Eliminar/dejar sin usar las imágenes antiguas de `project-*.jpg`.

## 4. Meta / SEO
- `__root.tsx` y `routes/index.tsx`: title "Daniel Brown | Software con IA Integrada", description sobre sistemas automáticos con IA, og:title/description acordes. Mantener mecanismo `head()` actual.

## 5. Mantener intacto
- Colores (#E7FF00, #008080→#4910bc, #0D0026), tipografías (Anton, Poppins), texturas granuladas, animaciones, responsive, links WhatsApp y +58 422-6385173, redes (IG/TikTok/WA), foto de Daniel.

## 6. Verificación
- `bun run build` y revisión de la preview (hero, carrusel, FAQ, CTA, footer) en viewport móvil y desktop.

## Notas técnicas
- El proyecto actual ya está en TanStack Start; la importación reusa el mismo stack (el zip parece ser el mismo template), por lo que no hay cambio de framework.
- Si algún componente del zip importa desde rutas que no existan, ajustaré los imports al copiarlo.
- No se tocará lógica de backend; solo presentación y contenido.
