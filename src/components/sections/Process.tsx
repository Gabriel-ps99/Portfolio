import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We dive deep into your brand's DNA, market position, and core objectives to establish a solid foundation.",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Mapping out the user journey and structural flow to ensure a seamless, intuitive experience.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Crafting the visual language, typography, and motion that will set your brand apart.",
  },
  {
    num: "04",
    title: "Development",
    desc: "Writing clean, high-performance code to bring the design to life with fluid animations.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-24"
      >
        <h2 className="font-display text-4xl md:text-6xl tracking-tighter uppercase mb-6">Our Process</h2>
        <div className="w-full h-[1px] bg-neutral-900" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col relative"
          >
            <span className="font-mono text-xs text-neutral-500 mb-8 uppercase tracking-widest">
              Phase — {step.num}
            </span>
            <h3 className="font-display text-2xl font-medium mb-4 uppercase">
              {step.title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed text-balance">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
