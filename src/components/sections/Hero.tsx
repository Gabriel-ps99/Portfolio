import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-24 overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-neutral-900/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-neutral-900/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start">
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-sm md:text-base tracking-[0.2em] uppercase text-neutral-400 font-medium"
          >
            Award-Winning Digital Studio
          </motion.div>
        </div>

        <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] font-bold tracking-tighter text-balance mb-12 uppercase">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block"
            >
              Crafting
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="block text-neutral-500"
            >
              Digital
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="block"
            >
              Legacies.
            </motion.span>
          </span>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full mt-auto gap-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="max-w-md text-neutral-400 text-lg md:text-xl leading-relaxed"
          >
            We blend strategy, design, and technology to build platforms that define the future of premium brands.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-neutral-800 flex items-center justify-center relative hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer group"
          >
            <span className="font-medium tracking-wider uppercase text-sm group-hover:scale-95 transition-transform duration-500">
              Explore
            </span>
            <div className="absolute inset-0 rounded-full border border-neutral-700 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
