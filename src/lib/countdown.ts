/**
 * Cálculo de la cuenta regresiva. Funciones puras: no leen el reloj ni la zona
 * horaria del dispositivo, así el servidor y el navegador llegan siempre al
 * mismo resultado para el mismo instante.
 */

const SEGUNDO = 1000;
const MINUTO = 60 * SEGUNDO;
const HORA = 60 * MINUTO;
export const DIA = 24 * HORA;

export interface TiempoRestante {
  /** Milisegundos que faltan. Nunca negativo. */
  total: number;
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export function tiempoRestante(objetivo: number, ahora: number): TiempoRestante {
  const total = Math.max(0, objetivo - ahora);
  return {
    total,
    dias: Math.floor(total / DIA),
    horas: Math.floor((total % DIA) / HORA),
    minutos: Math.floor((total % HORA) / MINUTO),
    segundos: Math.floor((total % MINUTO) / SEGUNDO),
  };
}

/** Días completos que ya pasaron desde `inicio`. Nunca negativo. */
export function diasTranscurridos(inicio: number, ahora: number): number {
  return Math.max(0, Math.floor((ahora - inicio) / DIA));
}

const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export interface FechaLegible {
  /** "2 de noviembre" */
  larga: string;
  /** "2 nov" */
  corta: string;
  /** "2026-11-02", para el atributo `dateTime`. */
  iso: string;
}

/**
 * Lee el día y el mes directamente del texto ISO ("2026-11-02T00:00:00-04:00").
 *
 * No pasa por `Date` ni por `Intl` a propósito: esos formatean según la zona
 * horaria y la versión de ICU de quien los ejecute, así que el servidor podía
 * escribir "2 nov" y el teléfono "2 nov." o incluso "1 nov". Leyendo el texto,
 * la fecha es la que se escribió en la constante, en cualquier parte.
 */
export function fechaLegible(iso: string): FechaLegible {
  const [, mes, dia] = iso.slice(0, 10).split("-").map(Number);
  const nombre = MESES[mes - 1];
  return {
    larga: `${dia} de ${nombre}`,
    corta: `${dia} ${nombre.slice(0, 3)}`,
    iso: iso.slice(0, 10),
  };
}
