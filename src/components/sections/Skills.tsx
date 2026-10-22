import { motion } from "motion/react";
import { useLanguage } from "../../i18n/LanguageContext";

export function Skills() {
  const { t } = useLanguage();
  const { skills } = t;

  return (
    <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl tracking-tighter uppercase w-full md:w-1/2"
        >
          {skills.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-lg md:text-xl w-full md:w-1/2 leading-relaxed text-balance"
        >
          {skills.intro}
        </motion.p>
      </div>

      <div className="border-t border-neutral-900">
        {skills.groups.map((group, index) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group border-b border-neutral-900 py-10 md:py-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-neutral-900/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] -z-10" />

            <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
              <span className="font-mono text-sm text-neutral-500 group-hover:text-white transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                {group.name}
              </h3>
            </div>

            <ul className="flex flex-wrap gap-2 md:justify-end max-w-md">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm border border-neutral-800 rounded-full px-4 py-1.5 text-neutral-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
