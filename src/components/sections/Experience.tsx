import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";

export function Experience() {
  const { t } = useLanguage();
  const { experience } = t;

  return (
    <section id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-24"
      >
        <h2 className="font-display text-4xl md:text-6xl tracking-tighter uppercase mb-6">
          {experience.title}
        </h2>
        <div className="w-full h-[1px] bg-neutral-900" />
      </motion.div>

      <div className="flex flex-col">
        {experience.jobs.map((job, index) => (
          <motion.div
            key={`${job.company}-${job.period}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 py-12 border-b border-neutral-900"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                {job.period}
              </span>
              <h3 className="font-display text-2xl font-medium uppercase">{job.role}</h3>
              <p className="text-neutral-400 text-sm">{job.company}</p>
            </div>

            <ul className="md:col-span-2 flex flex-col gap-3 text-neutral-400 leading-relaxed">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="text-neutral-600 select-none">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
