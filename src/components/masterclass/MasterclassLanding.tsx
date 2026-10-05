import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Countdown } from "./Countdown";
import { LinkButton } from "@/components/hub/LinkButton";
import { WhatsAppIcon } from "@/components/hub/BrandIcons";
import { OpenInBrowserHint } from "@/components/hub/OpenInBrowserHint";
import { Highlight } from "@/components/primitives/Highlight";
import {
  COMMUNITY_WA_URL,
  MASTERCLASS_ANNOUNCED_ISO,
  MASTERCLASS_LAUNCH_ISO,
} from "@/lib/constants";
import { fechaLegible } from "@/lib/countdown";
import { esVisorDeTikTok } from "@/lib/in-app-browser";
import danielImg from "@/assets/daniel.webp";

const OBJETIVO = Date.parse(MASTERCLASS_LAUNCH_ISO);
const INICIO = Date.parse(MASTERCLASS_ANNOUNCED_ISO);
const FECHA = fechaLegible(MASTERCLASS_LAUNCH_ISO);

/** Posición en la entrada escalonada (ver `rise-in` en styles.css). */
const paso = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * El reloj de la página.
 *
 * Empieza en la hora con la que el servidor pintó el HTML, para que el contador
 * llegue ya con sus cifras (y para que servidor y navegador rendericen lo
 * mismo). En cuanto la página monta, pasa a la hora del dispositivo.
 *
 * Se reprograma justo en el cambio de segundo en lugar de usar `setInterval`:
 * un intervalo fijo deriva unos milisegundos por vuelta y cada tanto el
 * contador se salta un segundo a la vista.
 */
function useAhora(inicial: number) {
  const [ahora, setAhora] = useState(inicial);

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const tic = () => {
      setAhora(Date.now());
      id = setTimeout(tic, 1000 - (Date.now() % 1000));
    };
    tic();
    return () => clearTimeout(id);
  }, []);

  return ahora;
}

/**
 * Página de espera de la masterclass gratuita.
 *
 * Una sola idea por pantalla: cuándo se estrena y qué hay que hacer para no
 * perdérsela (entrar a la comunidad de WhatsApp, que es donde se publica el
 * enlace). Todo lo demás se dejó fuera a propósito.
 */
export function MasterclassLanding({ ahoraInicial }: { ahoraInicial: number }) {
  const ahora = useAhora(ahoraInicial);
  const lanzada = ahora >= OBJETIVO;

  // Dentro del visor de TikTok el enlace a WhatsApp falla: se avisa igual que
  // en /tk. Solo se sabe en el navegador, por eso arranca en falso.
  const [enTikTok, setEnTikTok] = useState(false);
  useEffect(() => {
    setEnTikTok(esVisorDeTikTok(navigator.userAgent));
  }, []);

  return (
    <>
      {enTikTok ? <OpenInBrowserHint /> : null}

      <main
        id="top"
        className="relative isolate z-10 flex min-h-[100dvh] flex-col items-center px-5 pb-8 pt-4 text-ink sm:pb-10 sm:pt-8"
      >
        <div className="flex w-full max-w-[26rem] flex-1 flex-col">
          <header className="rise-in flex items-center justify-between" style={paso(0)}>
            <Link
              to={enTikTok ? "/tk" : "/"}
              aria-label="Volver al inicio"
              className="group inline-flex min-h-11 items-center gap-1.5 font-display text-lg tracking-wider text-ink transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                strokeWidth={2.5}
              />
              Daniel Brown<span className="text-brand-grad">.</span>
            </Link>
            {/* El aviso de TikTok ocupa esta esquina: cuando sale, el avatar
                le cede el sitio en lugar de empujar toda la página hacia abajo. */}
            {enTikTok ? null : (
              <img
                src={danielImg}
                alt="Daniel Brown"
                width={40}
                height={40}
                decoding="async"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-ink/10"
              />
            )}
          </header>

          <div className={`my-auto pb-6 ${enTikTok ? "pt-14" : "pt-3"}`}>
            <h1 className="font-display text-[clamp(2.6rem,14.5vw,4rem)] uppercase leading-[0.92] tracking-tight text-ink short:text-[clamp(2.4rem,13vw,3.5rem)]">
              <span className="rise-in block" style={paso(1)}>
                Masterclass
              </span>
              <span className="rise-in block" style={paso(2)}>
                <Highlight delay={0.6}>Gratuita</Highlight>
              </span>
            </h1>

            <p className="rise-in mt-4 text-balance text-base leading-normal text-ink/70 short:mt-3" style={paso(3)}>
              {lanzada ? "Se estrenó el " : "Se estrena el "}
              <time dateTime={FECHA.iso} className="font-semibold text-ink">
                {FECHA.larga}
              </time>
              {lanzada
                ? ". El enlace está en mi comunidad gratuita de WhatsApp."
                : ". El enlace lo publico solo en mi comunidad gratuita de WhatsApp."}
            </p>

            <div className="rise-in mt-5 short:mt-4" style={paso(4)}>
              <Countdown
                ahora={ahora}
                objetivo={OBJETIVO}
                inicio={INICIO}
                fechaLarga={FECHA.larga}
                fechaCorta={FECHA.corta}
              />
            </div>

            <div className="rise-in mt-4" style={paso(5)}>
              <LinkButton
                href={COMMUNITY_WA_URL}
                title="Unirme a la comunidad"
                icon={<WhatsAppIcon className="h-5 w-5" />}
                pulse
              />
            </div>
          </div>

          <footer className="rise-in text-xs text-ink/60" style={paso(6)}>
            © {new Date(ahoraInicial).getUTCFullYear()} Daniel Brown · @danielbrown.ia
          </footer>
        </div>
      </main>
    </>
  );
}
