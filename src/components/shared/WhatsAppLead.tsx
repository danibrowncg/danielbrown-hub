import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { WhatsAppLeadDialog } from "./WhatsAppLeadDialog";

const LeadContext = createContext<{ openLead: () => void }>({
  openLead: () => {},
});

/** Abre el formulario breve que precede a la redirección a WhatsApp. */
export const useWhatsAppLead = () => useContext(LeadContext);

/**
 * Envuelve la landing y captura un lead mínimo (servicio, nombre, negocio,
 * objetivo) antes de mandar al usuario a WhatsApp con un mensaje ya escrito.
 *
 * Ya no recibe `variant`: al unificarse las dos landings en una sola, el tipo
 * de proyecto lo elige el propio visitante dentro del formulario.
 */
export function WhatsAppLeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openLead = useCallback(() => setOpen(true), []);

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      <WhatsAppLeadDialog open={open} onOpenChange={setOpen} />
    </LeadContext.Provider>
  );
}
