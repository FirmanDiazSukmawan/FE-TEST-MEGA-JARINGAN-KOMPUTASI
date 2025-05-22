'use client';
import { motion } from 'framer-motion';

const BackgroundElements = () => {
  return (
    <>
      <motion.div
        className="absolute top-20 left-20 w-16 h-16 bg-indigo-200 rounded-full opacity-70"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-70"
        animate={{
          y: [0, -20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default BackgroundElements;
