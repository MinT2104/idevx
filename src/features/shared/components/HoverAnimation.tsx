"use client";

import { motion, TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";

interface HoverAnimationProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  duration?: number;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
}

export default function HoverAnimation({
  children,
  className = "",
  scale = 1.05,
  rotate = 0,
  duration = 0.2,
  whileHover,
  whileTap,
}: HoverAnimationProps) {
  const defaultHover = {
    scale,
    rotate,
    transition: { duration },
  };

  const defaultTap = {
    scale: 0.95,
    transition: { duration: 0.1 },
  };

  return (
    <motion.div
      className={className}
      whileHover={whileHover || defaultHover}
      whileTap={whileTap || defaultTap}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

// Specialized hover components
export function CardHover({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <HoverAnimation
      className={className}
      scale={1.02}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)" as any,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </HoverAnimation>
  );
}

export function ButtonHover({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <HoverAnimation
      className={className}
      scale={1.05}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.95,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </HoverAnimation>
  );
}

export function ImageHover({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <HoverAnimation
      className={className}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </HoverAnimation>
  );
}

// Floating animation
export function FloatingAnimation({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation
export function PulseAnimation({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
