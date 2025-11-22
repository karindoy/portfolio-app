"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import React from "react";

// ----------------------------
// Animation variants
// ----------------------------

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

// ----------------------------
// Reusable animated components
// ----------------------------

export type AnimatedProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  variant?: Variants;
  className?: string;
} & HTMLMotionProps<"div">;

// ----------------------------
// AnimatedDiv
// ----------------------------
export const AnimatedDiv: React.FC<AnimatedProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.2,
  variant = fadeInUp,
  ...props
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variant}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ----------------------------
// AnimatedList
// ----------------------------
export const AnimatedList: React.FC<AnimatedProps> = ({
  children,
  className,
  variant = containerVariants,
  ...props
}) => {
  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// ----------------------------
// AnimatedListItem
// ----------------------------
export const AnimatedListItem: React.FC<AnimatedProps> = ({
  children,
  className,
  delay = 0,
  variant = itemVariants,
  ...props
}) => {
  return (
    <motion.div
      variants={variant}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
