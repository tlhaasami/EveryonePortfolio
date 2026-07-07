"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, Variants } from "framer-motion";

// ─── Staggered Container ───
// Wraps children and staggers their entrance animations
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: (staggerDelay: number = 0.08) => ({
    transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
  }),
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function StaggerContainer({ children, className = "", staggerDelay = 0.08, once = true }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      custom={staggerDelay}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Fade In Up ───
interface FadeInUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export function FadeInUp({ children, className = "", delay = 0, duration = 0.6, distance = 30, once = true }: FadeInUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scale In ───
interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function ScaleIn({ children, className = "", delay = 0, once = true }: ScaleInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Slide In From Side ───
interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
  delay?: number;
  once?: boolean;
}

export function SlideIn({ children, className = "", direction = "left", delay = 0, once = true }: SlideInProps) {
  const x = direction === "left" ? -50 : 50;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ───
interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract numeric part and suffix (e.g., "50+" → 50, "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNum = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : value;

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { damping: 30, stiffness: 80 });
  const [displayVal, setDisplayVal] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionVal.set(targetNum);
    }
  }, [isInView, targetNum, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      setDisplayVal(Math.round(latest));
    });
    return unsubscribe;
  }, [springVal]);

  if (!numericMatch) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {displayVal}{suffix}
    </span>
  );
}

// ─── Text Reveal (Word by Word) ───
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const words = text.split(" ");
  return (
    <motion.span className={className}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + idx * 0.04, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Magnetic Hover (for buttons/icons) ───
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll Progress Bar ───
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-accent to-warm"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.05 }}
      />
    </div>
  );
}

// ─── Typewriter Effect ───
export function TypewriterEffect({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const letters = Array.from(text);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    }
  };
  const childVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline" }
  };
  return (
    <motion.span variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={className}>
      {letters.map((char, index) => (
        <motion.span key={index} variants={childVariants}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── Text Animation Wrapper ───
interface TextAnimationWrapperProps {
  children: React.ReactNode;
  style?: 'fade-in-up' | 'slide-in-left' | 'typewriter' | 'scale-up' | 'none';
  delay?: number;
  className?: string;
  distance?: number;
}

export function TextAnimationWrapper({ 
  children, 
  style = "fade-in-up", 
  delay = 0, 
  className = "", 
  distance = 30 
}: TextAnimationWrapperProps) {
  if (style === "none") {
    return <div className={className}>{children}</div>;
  }
  if (style === "slide-in-left") {
    return (
      <SlideIn direction="left" delay={delay} className={className}>
        {children}
      </SlideIn>
    );
  }
  if (style === "scale-up") {
    return (
      <ScaleIn delay={delay} className={className}>
        {children}
      </ScaleIn>
    );
  }
  if (style === "typewriter" && typeof children === "string") {
    return (
      <TypewriterEffect text={children} delay={delay} className={className} />
    );
  }
  // Default to fade-in-up
  return (
    <FadeInUp delay={delay} distance={distance} className={className}>
      {children}
    </FadeInUp>
  );
}
