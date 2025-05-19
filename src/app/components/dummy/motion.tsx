import React from 'react';
import { motion } from 'framer-motion';

export const MotionComp = ({
  children,
  duration = 0.6,
  delay = 0,
  y = 70,
  x = 0,
  rotate = 0,
  scale = 1,
  viewport = true,
  opacity = 0,
  className = '',
}: {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  y?: number;
  x?: number;
  rotate?: number;
  scale?: number;
  viewport?: boolean;
  opacity?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ x: x, y: y, scale: scale, opacity: opacity, rotate: rotate }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: duration, delay: delay }}
      viewport={{ once: viewport }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
