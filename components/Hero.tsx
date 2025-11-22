/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative z-10 px-4">
      
      {/* The Home World Planet Visualization */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-blue-600 via-cyan-500 to-zinc-900 mb-6 md:mb-8 planet-shadow relative"
      >
        <div className="absolute inset-0 rounded-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
        {/* Orbit Ring */}
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 md:-inset-8 border border-dashed border-cyan-500/30 rounded-full"
        ></motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md md:max-w-3xl"
      >
        <h2 className="text-cyan-400 font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-4 uppercase">Identity Confirmed</h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 tracking-tight">
          Muhammad <br className="md:hidden"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Muneeb Khan</span>
        </h1>
        <p className="text-zinc-400 max-w-xl md:max-w-2xl mx-auto text-base md:text-xl font-light mb-6 md:mb-8 leading-relaxed px-2">
          Full-Stack MERN Developer | AI Engineer
          <span className="hidden md:inline"> | Founder, EduAI</span>
          <br/>
          <span className="text-xs md:text-sm text-zinc-500 mt-2 block">Building AI-powered products that transform education and accelerate businesses.</span>
        </p>

        <button 
          onClick={() => onNavigate('contact')}
          className="group relative px-6 py-2.5 md:px-8 md:py-3 bg-transparent overflow-hidden rounded-full border border-cyan-500/50 hover:border-cyan-400 transition-colors"
        >
          <div className="absolute inset-0 w-0 bg-cyan-500/10 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative flex items-center space-x-2 text-cyan-400 font-mono text-xs md:text-sm tracking-wider group-hover:text-cyan-300">
             <span>INITIATE CONTACT</span>
             <ArrowRightIcon className="w-4 h-4" />
          </span>
        </button>
      </motion.div>
    </div>
  );
};