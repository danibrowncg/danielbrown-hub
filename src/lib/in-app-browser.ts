/**
 * ¿La página se está viendo dentro del visor integrado de TikTok?
 *
 * Desde ese visor fallan los enlaces a otras apps, entre ellos el de la
 * comunidad de WhatsApp. `/tk` muestra siempre el aviso de "abrir en el
 * navegador" porque esa ruta solo se usa en la biografía de TikTok; las demás
 * páginas no saben de dónde viene la visita, así que lo detectan por la firma
 * que TikTok deja en el user agent, tanto en iPhone como en Android.
 */
export function esVisorDeTikTok(userAgent: string): boolean {
  return /musical_ly|trill_|BytedanceWebview|TikTok/i.test(userAgent);
}
