import { useState, type CSSProperties } from "react";
import { GridPattern } from "@/components/primitives/GridPattern";
import { DIA, diasTranscurridos, tiempoRestante } from "@/lib/countdown";

interface CountdownProps {
  /** Instante actual, en ms. Lo marca la página: todo lee el mismo reloj. */
  ahora: number;
  /** Instante del estreno, en ms. */
  objetivo: number;
  /** Medianoche del día del anuncio, en ms. Ahí empieza la tira de días. */
  inicio: number;
  /** "2 de noviembre" */
  fechaLarga: string;
  /** "2 nov" */
  fechaCorta: string;
}

/**
 * Una cifra que gira al cambiar.
 *
 * Cada dígito vive en una celda de ancho fijo: Anton no trae cifras tabulares,
 * así que sin la celda el "1" es más estrecho que el "8" y todo el bloque
 * temblaría cada segundo.
 *
 * El giro son dos animaciones CSS (`digit-in` / `digit-out`) que arrancan al
 * montar el `<span>`; cambiar la `key` lo remonta y la animación corre sola en
 * el compositor. La primera vez no anima: las cifras que llegan pintadas del
 * servidor se quedan quietas y solo se mueven cuando de verdad cambian.
 */
function Digito({ valor }: { valor: string }) {
  const [actual, setActual] = useState(valor);
  const [previo, setPrevio] = useState<string | null>(null);

  if (valor !== actual) {
    setPrevio(actual);
    setActual(valor);
  }

  return (
    <span className="relative inline-block w-[0.54em] text-center">
      {previo !== null ? (
        <span key={`${previo}-${actual}`} className="digit-out absolute inset-0">
          {previo}
        </span>
      ) : null}
      {/* Al terminar el giro se retira la cifra saliente: si se quedara en el
          DOM (invisible), acabaría en lo que se copia o se traduce. Se espera
          a la entrante, que es la que más dura, para no cortarle la animación. */}
      <span
        key={actual}
        className={previo !== null ? "digit-in block" : "block"}
        onAnimationEnd={() => setPrevio(null)}
      >
        {actual}
      </span>
    </span>
  );
}

function Cifra({ valor }: { valor: string }) {
  const digitos = [...valor];
  return (
    <span className="inline-flex">
      {/* Las celdas se cuentan desde la derecha: al pasar de 10 a 9 la unidad
          conserva la suya y gira, en vez de desmontarse. */}
      {digitos.map((d, i) => (
        <Digito key={digitos.length - i} valor={d} />
      ))}
    </span>
  );
}

const dosCifras = (n: number) => String(n).padStart(2, "0");

/**
 * Pieza central de la página de la masterclass.
 *
 * Los días van en grande porque son la respuesta a la única pregunta de quien
 * llega ("¿cuánto falta?"); horas, minutos y segundos van debajo, más pequeños,
 * para que el bloque se sienta vivo sin competir con el número que importa.
 * El último día, cuando ya no quedan días, las horas pasan a ser el número
 * grande (y en la última hora, los minutos): nunca se queda un "0" gigante.
 *
 * La tira inferior dibuja los días uno por uno, del anuncio al estreno: los que
 * ya pasaron se apagan, el de hoy sobresale y la etiqueta en neón marca la
 * meta. Dice lo mismo que el número, pero se entiende de un vistazo.
 */
export function Countdown({ ahora, objetivo, inicio, fechaLarga, fechaCorta }: CountdownProps) {
  const t = tiempoRestante(objetivo, ahora);
  const lanzada = t.total === 0;

  const unidades = [
    { id: "dias", valor: t.dias, uno: "día", varios: "días" },
    { id: "horas", valor: t.horas, uno: "hora", varios: "horas" },
    { id: "minutos", valor: t.minutos, uno: "minuto", varios: "minutos" },
    { id: "segundos", valor: t.segundos, uno: "segundo", varios: "segundos" },
  ];
  const CORTAS: Record<string, string> = { minutos: "min", segundos: "seg" };

  // La protagonista es la primera unidad que no está en cero. Como mucho los
  // minutos, para que los segundos sigan siempre corriendo debajo.
  const primera = unidades.findIndex((u) => u.valor > 0);
  const iPrincipal = Math.min(primera === -1 ? 2 : primera, 2);
  const principal = unidades[iPrincipal];
  const resto = unidades.slice(iPrincipal + 1);

  const totalDias = Math.round((objetivo - inicio) / DIA);
  const pasados = Math.min(totalDias, diasTranscurridos(inicio, ahora));
  // Con demasiados días las barras quedarían ilegibles: mejor no dibujarlas.
  const conTira = totalDias >= 2 && totalDias <= 45;

  // Lo que oye un lector de pantalla: la unidad protagonista y la siguiente,
  // igual que se ve. Sin segundos, porque un texto que cambia cada segundo es
  // ruido. (Antes siempre decía días y horas, y el último día salía "Faltan 0
  // días y 0 horas".)
  const decir = (u: (typeof unidades)[number]) => `${u.valor} ${u.valor === 1 ? u.uno : u.varios}`;
  const siguiente = resto.find((u) => u.id !== "segundos" && u.valor > 0);
  const cuanto =
    principal.valor === 0
      ? "menos de un minuto"
      : siguiente
        ? `${decir(principal)} y ${decir(siguiente)}`
        : decir(principal);
  const falta = principal.valor === 1 && !siguiente ? "Falta" : "Faltan";
  const resumen = lanzada
    ? `La masterclass se estrenó el ${fechaLarga}. El enlace está en la comunidad.`
    : `${principal.valor === 0 ? "Falta" : falta} ${cuanto} para el ${fechaLarga}.`;

  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-ink p-5 text-white short:py-4 shadow-[0_28px_50px_-30px_rgba(13,0,38,0.65)] sm:p-6">
      <GridPattern />
      <span aria-hidden="true" className="brand-grad absolute inset-x-0 top-0 h-[2px]" />
      <p className="sr-only">{resumen}</p>

      <div aria-hidden="true" className="relative">
        {lanzada ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neon">
              {fechaLarga}
            </p>
            <p className="mt-2 font-display text-5xl uppercase leading-[0.95]">Llegó el día</p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              El enlace está en la comunidad.
            </p>
          </>
        ) : (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neon">
              Faltan
            </p>
            <p className="mt-3 flex items-baseline gap-3 font-display uppercase short:mt-2">
              <span className="text-[6rem] leading-[0.8] short:text-[5.25rem]">
                <Cifra valor={String(principal.valor)} />
              </span>
              <span className="text-5xl leading-none text-white/55 short:text-[2.6rem]">
                {principal.valor === 1 ? principal.uno : principal.varios}
              </span>
            </p>

            <div className="mt-4 grid grid-cols-3 border-t border-white/10 pt-4 short:pt-3">
              {resto.map((u, i) => (
                <div key={u.id} className={i > 0 ? "border-l border-white/10 pl-4" : ""}>
                  <p className="font-display text-[2rem] leading-none">
                    <Cifra valor={dosCifras(u.valor)} />
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                    {CORTAS[u.id] ?? (u.valor === 1 ? u.uno : u.varios)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {conTira ? (
          <div className="mt-4 flex items-center gap-2.5">
            <div className="flex h-6 flex-1 items-end justify-between">
              {Array.from({ length: totalDias }, (_, i) => (
                <span
                  key={i}
                  style={{ "--i": i } as CSSProperties}
                  className={`day-bar w-[3px] rounded-full ${
                    i < pasados
                      ? "h-1/2 bg-white/15"
                      : i === pasados
                        ? "h-full bg-white"
                        : "h-1/2 bg-white/50"
                  }`}
                />
              ))}
            </div>
            {/* Llega cuando la última barra empieza a subir (480ms + 14ms por
                barra, ver `day-bar`): las barras corren hacia la fecha y la
                fecha cierra el gesto. */}
            <span
              style={{ animationDelay: `${480 + (totalDias - 1) * 14}ms` }}
              className="rise-in shrink-0 rounded-full bg-neon px-2.5 py-1 text-[11px] font-bold uppercase leading-none tracking-wider text-ink"
            >
              {fechaCorta}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
