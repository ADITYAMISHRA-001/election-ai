import React from 'react';
import { motion } from 'motion/react';

export const AdvancedLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative w-16 h-16 flex flex-col items-center justify-center">
        {/* Core glowing orb */}
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-slate-200 to-white shadow-[0_0_20px_rgba(0,0,0,0.1)] backdrop-blur-md"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Orbiting rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-black/10"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -inset-2 rounded-full border border-dashed border-black/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Particles */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-1.5 h-1.5 bg-black rounded-full absolute top-0 left-1/2 -ml-[3px]" />
        </motion.div>
      </div>
      
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-black/60 font-heading">
          Synthesizing Data
        </span>
        <motion.div className="flex space-x-1 mt-1">
          <motion.div className="w-1 h-1 bg-black/40 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
          <motion.div className="w-1 h-1 bg-black/40 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
          <motion.div className="w-1 h-1 bg-black/40 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
        </motion.div>
      </div>
    </div>
  );
};
