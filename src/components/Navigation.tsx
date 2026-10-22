import { motion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { WhatsAppButton } from "./WhatsAppButton";

export function Navigation() {
  const { lang, t, toggle } = useLanguage();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white md:px-12 md:py-8"
    >
      <a href="#top" className="font-display text-xl font-bold tracking-tighter uppercase">
        Gabriel Silva
      </a>

      <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
        <a href="#about" className="hover:opacity-60 transition-opacity">{t.nav.about}</a>
        <a href="#skills" className="hover:opacity-60 transition-opacity">{t.nav.skills}</a>
        <a href="#projects" className="hover:opacity-60 transition-opacity">{t.nav.projects}</a>
        <a href="#experience" className="hover:opacity-60 transition-opacity">{t.nav.experience}</a>
      </nav>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={lang === "pt" ? "Switch to English" : "Mudar para português"}
          className="text-sm font-medium uppercase tracking-widest px-3 py-2.5 hover:opacity-60 transition-opacity"
        >
          <span className={lang === "pt" ? "" : "opacity-40"}>PT</span>
          <span className="opacity-40"> / </span>
          <span className={lang === "en" ? "" : "opacity-40"}>EN</span>
        </button>

        <WhatsAppButton className="text-sm font-medium uppercase tracking-widest border border-white/20 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
          {t.nav.whatsapp}
        </WhatsAppButton>
      </div>
    </motion.header>
  );
}
