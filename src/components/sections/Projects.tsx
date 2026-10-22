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
        {projects.items.map((project, index) =>
          project.image ? (
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
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 border-b border-neutral-600 pb-1 text-neutral-400 hover:text-white hover:border-white transition-colors"
                    >
                      {projects.code} <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Internal systems have no public screenshot, so the case is a text-first card.
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900/70 to-neutral-950 p-8 md:p-14"
            >
              <div className="md:col-span-3 flex flex-col gap-8">
                {"logo" in project && (
                  // Light chip keeps the dark-grey wordmark legible on the dark card.
                  <span className="self-start rounded-xl bg-white px-5 py-3">
                    <img
                      src={`${import.meta.env.BASE_URL}${project.logo}`}
                      alt={project.stack[0]}
                      loading="lazy"
                      className="h-7 md:h-9 w-auto"
                    />
                  </span>
                )}

                <div className="flex flex-col gap-3">
                  <p className="text-neutral-500 font-mono text-sm uppercase tracking-wider">
                    {project.category}
                  </p>
                  <h3 className="font-display text-3xl md:text-5xl tracking-tight uppercase">
                    {project.name}
                  </h3>
                </div>

                <p className="text-neutral-400 text-lg leading-relaxed">{project.desc}</p>

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
              </div>

              {"areas" in project && project.areas.length > 0 && (
                <div className="md:col-span-2 flex flex-col gap-4 border-t border-neutral-800 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-12">
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                    {projects.areasLabel}
                  </span>
                  <ul>
                    {project.areas.map((area, i) => (
                      <li
                        key={area}
                        className="flex gap-4 border-b border-neutral-900 py-3 text-neutral-300"
                      >
                        <span className="font-mono text-xs text-neutral-600 pt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.article>
          ),
        )}
      </div>
    </section>
  );
}
