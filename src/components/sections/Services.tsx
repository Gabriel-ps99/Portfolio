import { motion } from "motion/react";

const services = [
  {
    num: "01",
    title: "Digital Strategy",
    desc: "Positioning brands for the modern era through deep research, architecture, and bold visionary roadmaps.",
  },
  {
    num: "02",
    title: "Experience Design",
    desc: "Crafting immersive, intuitive user interfaces that leave lasting impressions and drive conversion.",
  },
  {
    num: "03",
    title: "Creative Engineering",
    desc: "Building robust, high-performance platforms using cutting-edge tech stacks and fluid animations.",
  },
  {
    num: "04",
    title: "Brand Identity",
    desc: "Forging distinct visual languages, from typography to motion, that communicate true value.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl md:text-6xl tracking-tighter uppercase w-full md:w-1/2"
        >
          Expertise
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-400 text-lg md:text-xl w-full md:w-1/2 leading-relaxed text-balance"
        >
          We don't just build websites; we architect digital ecosystems designed to elevate your brand's perception and accelerate growth in a crowded market.
        </motion.p>
      </div>

      <div className="border-t border-neutral-900">
        {services.map((service, index) => (
          <motion.div
            key={service.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group border-b border-neutral-900 py-10 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden hover-trigger cursor-pointer"
          >
            {/* Hover Background Reveal */}
            <div className="absolute inset-0 bg-neutral-900/30 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] -z-10" />

            <div className="flex items-center gap-8 md:gap-16 w-full md:w-auto">
              <span className="font-mono text-sm text-neutral-500 group-hover:text-white transition-colors duration-300">
                {service.num}
              </span>
              <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                {service.title}
              </h3>
            </div>
            
            <p className="max-w-sm text-neutral-400 text-sm md:text-base leading-relaxed md:text-right group-hover:-translate-x-4 transition-transform duration-500 ease-[0.16,1,0.3,1]">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
