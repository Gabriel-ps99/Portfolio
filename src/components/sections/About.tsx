import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export function About() {
  const { t } = useLanguage();
  const { about } = t;

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        <motion.h2
          {...reveal}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl tracking-tighter uppercase w-full md:w-1/2"
        >
          {about.title}
        </motion.h2>

        <div className="w-full md:w-1/2 flex flex-col gap-16">
          <motion.p
            {...reveal}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 text-lg md:text-xl leading-relaxed text-balance"
          >
            {about.text}
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-neutral-900 pt-10"
          >
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                {about.education}
              </span>
              {about.degrees.map((d) => (
                <div key={d.name}>
                  <p className="font-medium">{d.name}</p>
                  <p className="text-neutral-400 text-sm">{d.place}</p>
                  <p className="text-neutral-500 text-xs font-mono mt-1">{d.period}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                {about.languages}
              </span>
              {about.langList.map((l) => (
                <div key={l.name}>
                  <p className="font-medium">{l.name}</p>
                  <p className="text-neutral-400 text-sm">{l.level}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
