import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Hide the native cursor only where the follower is actually shown
    // (same breakpoint as `md:block` below, and only for real mouse input).
    const query = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");
    const syncCursor = () => {
      document.documentElement.classList.toggle("custom-cursor", query.matches);
    };
    syncCursor();
    query.addEventListener("change", syncCursor);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      query.removeEventListener("change", syncCursor);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-white rounded-full mix-blend-difference pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 3 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 750,
          damping: 40,
          mass: 0.5,
        }}
      />
    </>
  );
}
