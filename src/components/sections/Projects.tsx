import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

export function Projects() {
  const { t } = useLanguage();
  const { projects } = t;

  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl tracking-tighter uppercase w-full md:w-1/2"
        >
          {projects.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-lg md:text-xl w-full md:w-1/2 leading-relaxed text-balance"
        >
          {projects.intro}
        </motion.p>
      </div>

      <div className="flex flex-col gap-32">
        {projects.items.map((project, index) => (
          <div
            key={project.name}
            className={`flex flex-col ${index % 2 !== 0 ? "md:items-end" : ""}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full md:w-[80%] relative overflow-hidden group bg-neutral-900"
            >
              <div className="aspect-[4/3] md:aspect-[16/10] w-full overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}${project.image}`}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                />
              </div>
            </motion.div>

            <div className="mt-8 flex flex-col gap-4 md:w-[80%]">
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl md:text-4xl tracking-tight uppercase">
                  {project.name}
                </h3>
                <p className="text-neutral-500 font-mono text-sm uppercase tracking-wider">
                  {project.category}
                </p>
              </div>

              <p className="text-neutral-400 leading-relaxed max-w-2xl">{project.desc}</p>

              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li
                    key={s}
                    className="text-xs border border-neutral-800 rounded-full px-3 py-1 text-neutral-300"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <div className="flex gap-6 text-sm uppercase tracking-widest">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors"
                  >
                    {projects.visit} <ArrowUpRight size={16} />
                  </a>
                )}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 border-b border-neutral-600 pb-1 text-neutral-400 hover:text-white hover:border-white transition-colors"
                >
                  {projects.code} <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
