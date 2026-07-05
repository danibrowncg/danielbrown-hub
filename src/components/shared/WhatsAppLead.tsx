import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { WhatsAppLeadDialog, type LeadVariant } from "./WhatsAppLeadDialog";

const LeadContext = createContext<{ openLead: () => void }>({
  openLead: () => {},
});

/** Abre el formulario breve que precede a la redirección a WhatsApp. */
export const useWhatsAppLead = () => useContext(LeadContext);

/**
 * Envuelve una landing y captura un lead mínimo (nombre, negocio, objetivo)
 * antes de mandar al usuario a WhatsApp con un mensaje-plantilla ya escrito.
 */
export function WhatsAppLeadProvider({
  variant,
  children,
}: {
  variant: LeadVariant;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const openLead = useCallback(() => setOpen(true), []);

  return (
    <LeadContext.Provider value={{ openLead }}>
      {children}
      <WhatsAppLeadDialog variant={variant} open={open} onOpenChange={setOpen} />
    </LeadContext.Provider>
  );
}
