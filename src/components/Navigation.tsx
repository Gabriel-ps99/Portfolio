import { motion } from "motion/react";

export function Navigation() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white md:px-12 md:py-8"
    >
      <div className="font-display text-xl font-bold tracking-tighter uppercase">
        Lumina
      </div>
      
      <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
        <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
        <a href="#projects" className="hover:opacity-60 transition-opacity">Projects</a>
        <a href="#process" className="hover:opacity-60 transition-opacity">Process</a>
      </nav>

      <button className="text-sm font-medium uppercase tracking-widest border border-white/20 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
        Let's Talk
      </button>
    </motion.header>
  );
}
