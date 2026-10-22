import { motion } from "motion/react";

export function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full border-y border-neutral-900 flex flex-col items-center justify-center text-center my-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <svg className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-12 text-neutral-800" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <blockquote className="font-display text-2xl md:text-5xl leading-tight font-medium tracking-tight text-balance mb-12 uppercase">
          "Lumina transformed our digital presence. They don't just build websites; they architect masterpieces that truly resonate with our premium audience."
        </blockquote>
        <div className="flex flex-col items-center gap-2">
          <span className="uppercase tracking-widest text-sm font-medium">Elena Rostova</span>
          <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider">CMO, Aura Fragrances</span>
        </div>
      </motion.div>
    </section>
  );
}
