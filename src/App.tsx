import { useEffect } from "react";
import Lenis from "lenis";
import { MouseFollower } from "./components/MouseFollower";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Projects } from "./components/sections/Projects";
import { Process } from "./components/sections/Process";
import { Testimonials } from "./components/sections/Testimonials";
import { Footer } from "./components/sections/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#030303] min-h-screen text-[#F5F5F5] selection:bg-white selection:text-black">
      <MouseFollower />
      <Navigation />
      
      <main>
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}
