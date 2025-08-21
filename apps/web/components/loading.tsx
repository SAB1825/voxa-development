"use client";

import { motion } from "framer-motion";

const letters = ["V", "O", "X", "A"];

export const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="flex space-x-2 text-6xl font-bold text-primary tracking-widest">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.3, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.6,
              delay: i * 0.2,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      
    </div>
  );
};
