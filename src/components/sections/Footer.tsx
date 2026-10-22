import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";
import { WhatsAppButton } from "../WhatsAppButton";

export function Footer() {
  const { t } = useLanguage();
  const { footer } = t;

  return (
    <footer id="contact" className="bg-white text-black pt-32 pb-12 px-6 md:px-12 rounded-t-[3rem] md:rounded-t-[4rem] overflow-hidden relative mt-32">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24 w-full"
        >
          <span className="text-neutral-500 uppercase tracking-widest font-mono text-sm block mb-8">
            {footer.kicker}
          </span>
          <WhatsAppButton className="font-display text-[12vw] leading-none tracking-tighter uppercase font-bold hover:opacity-70 transition-opacity">
            {footer.cta}
          </WhatsAppButton>
        </motion.div>

        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-t border-neutral-200 pt-12">

          <div className="flex flex-col gap-6">
            <h3 className="font-display text-2xl uppercase tracking-tighter font-bold">Gabriel Silva</h3>
            <p className="text-neutral-500 text-sm max-w-xs">{footer.blurb}</p>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">{footer.links}</span>
              <a href="https://github.com/Gabriel-ps99" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-neutral-500 transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/gabriel-silva093a66113" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-neutral-500 transition-colors">LinkedIn</a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">{footer.contact}</span>
              <a href="mailto:gabriel11go@hotmail.com" className="text-sm font-medium hover:text-neutral-500 transition-colors">gabriel11go@hotmail.com</a>
              <span className="text-sm font-medium">{t.about.location}</span>
            </div>
          </div>

        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-24 text-xs text-neutral-400 font-mono uppercase tracking-widest">
          <span>&copy; {new Date().getFullYear()} Gabriel Pereira da Silva.</span>
          <span>{footer.rights}</span>
        </div>

      </div>
    </footer>
  );
}
