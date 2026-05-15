"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useSpring(0, { damping: 20, stiffness: 150 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] font-mono text-xl font-bold text-accent"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: isHovering ? "-40px" : "-20px",
          translateY: "-50%",
        }}
      >
        [
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] font-mono text-xl font-bold text-accent"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: isHovering ? "20px" : "0px",
          translateY: "-50%",
        }}
      >
        ]
      </motion.div>
    </>
  );
}
