"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function HolographicCard({
  children,
  className,
  glowColor = "#00e357",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -12);
    setRotateY((x - 0.5) * 12);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        className={cn(
          "relative preserve-3d backface-hidden rounded-xl overflow-hidden",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Holographic border */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `conic-gradient(from 0deg, transparent, ${glowColor}33, transparent, ${glowColor}33, transparent)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Sheen overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${glowColor}15 45%, ${glowColor}25 50%, ${glowColor}15 55%, transparent 60%)`,
            backgroundSize: "200% 100%",
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Corner brackets */}
        {isHovered && (
          <>
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-malachite z-30" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-malachite z-30" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-malachite z-30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-malachite z-30" />
          </>
        )}

        {children}
      </motion.div>
    </div>
  );
}
