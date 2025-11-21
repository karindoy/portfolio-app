"use client";

import { motion } from "framer-motion";

// Animation variants for different types of elements
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Reusable animated components
type AnimatedProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const AnimatedDiv = ({ 
  children, 
  className, 
  delay = 0,
  duration = 0.5,
  ...props 
}: AnimatedProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      transition={{ duration, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedList = ({ 
  children, 
  className, 
  ...props 
}: AnimatedProps) => {
  return (
    <motion.div
      variants={containerVariants}
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

export const AnimatedListItem = ({ 
  children, 
  className, 
  delay = 0,
  ...props 
}: AnimatedProps) => {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};