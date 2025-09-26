"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  distance?: number;
  once?: boolean;
}

const directionVariants = {
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
  left: { x: 50, opacity: 0 },
  right: { x: -50, opacity: 0 },
  fade: { opacity: 0 },
};

export default function ScrollAnimation({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 50,
  once = true,
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  const variants = {
    hidden: {
      ...directionVariants[direction],
      [direction === "up" || direction === "down" ? "y" : "x"]:
        direction === "up"
          ? distance
          : direction === "down"
            ? -distance
            : direction === "left"
              ? distance
              : direction === "right"
                ? -distance
                : 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for common use cases
export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollAnimation direction="fade" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function SlideUp({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollAnimation direction="up" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function SlideLeft({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollAnimation direction="left" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

export function SlideRight({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <ScrollAnimation direction="right" delay={delay} className={className}>
      {children}
    </ScrollAnimation>
  );
}

// Stagger animation for lists
export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut" as const,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
