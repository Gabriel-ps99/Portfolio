import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageContext";

// The number is split and only assembled on click, so it never appears in the
// rendered HTML or in an href that scrapers could read.
const PARTS = ["55", "62", "99345", "2144"];

interface Props {
  className?: string;
  children: ReactNode;
}

export function WhatsAppButton({ className, children }: Props) {
  const { t } = useLanguage();

  const open = () => {
    const url = `https://wa.me/${PARTS.join("")}?text=${encodeURIComponent(t.footer.whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
