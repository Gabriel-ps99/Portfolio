import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Aura Fragrances",
    category: "E-Commerce / 3D WebGL",
    img: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 2,
    title: "Nexus Fintech",
    category: "Brand Identity / Platform",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000",
  },
  {
    id: 3,
    title: "Symmetry Architecture",
    category: "Corporate / Portfolio",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="projects" ref={containerRef} className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8"
      >
        <h2 className="font-display text-4xl md:text-6xl tracking-tighter uppercase">Selected<br/>Works</h2>
        <button className="text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-neutral-400 hover:border-neutral-400 transition-colors">
          View All Projects
        </button>
      </motion.div>

      <div className="flex flex-col gap-32">
        {projects.map((project, index) => {
          // Create a slight parallax effect for each image
          const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
          
          return (
            <div key={project.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:items-end' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-[80%] relative overflow-hidden group cursor-pointer"
              >
                {/* Image Container with hidden overflow for parallax inner image */}
                <div className="aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                  <motion.img 
                    style={{ y, scale: 1.1 }}
                    src={project.img} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.15] transition-transform duration-1000 ease-[0.16,1,0.3,1]"
                  />
                </div>

                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>

              <div className="mt-8 flex flex-col gap-2">
                <h3 className="font-display text-2xl md:text-4xl tracking-tight uppercase">
                  {project.title}
                </h3>
                <p className="text-neutral-400 font-mono text-sm uppercase tracking-wider">
                  {project.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
