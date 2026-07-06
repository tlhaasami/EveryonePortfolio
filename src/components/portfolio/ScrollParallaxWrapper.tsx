"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Y-axis parallax offset range in pixels (default: [-30, 30]) */
  offsetY?: [number, number];
  /** Rotation entrance in degrees (default: [3, 0]) */
  rotateX?: [number, number];
  /** Opacity range (default: [0.3, 1]) */
  opacityRange?: [number, number];
  /** Scale range (default: [0.97, 1]) */
  scaleRange?: [number, number];
}

export default function ScrollParallaxWrapper({
  children,
  className = "",
  offsetY = [-30, 30],
  rotateX = [3, 0],
  opacityRange = [0.3, 1],
  scaleRange = [0.97, 1],
}: ScrollParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], offsetY);
  const rotate = useTransform(scrollYProgress, [0, 0.4], rotateX);
  const opacity = useTransform(scrollYProgress, [0, 0.3], opacityRange);
  const scale = useTransform(scrollYProgress, [0, 0.3], scaleRange);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotateX: rotate, opacity, scale, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
