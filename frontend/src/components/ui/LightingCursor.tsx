import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const LightingCursor: React.FC = () => {
  const cursorX = useMotionValue(-300);
  const cursorY = useMotionValue(-300);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 280 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 280 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 150);
      cursorY.set(e.clientY - 150);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-30 opacity-40 mix-blend-screen"
      style={{
        translateX: springX,
        translateY: springY,
        background: "radial-gradient(circle, rgba(237, 28, 36, 0.22) 0%, rgba(56, 189, 248, 0.12) 40%, transparent 70%)",
        filter: "blur(60px)",
      }}
    />
  );
};
export default LightingCursor;
