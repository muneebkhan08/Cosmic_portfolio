
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

const QuantumOrbitCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Reduced desktop size to 400px to fit 100vh screens better
    const DESKTOP_SIZE = 400;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            // Set canvas size to match the CSS size (400x400) times device pixel ratio for sharpness
            const size = DESKTOP_SIZE;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            ctx.scale(dpr, dpr);
        };
        resize();

        const drawOrbit = (centerX: number, centerY: number, radiusX: number, radiusY: number, angle: number, color: string, particle: boolean = true) => {
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle);
            
            ctx.beginPath();
            ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            if (particle) {
                // Draw a particle moving along the orbit
                const pAngle = time * 1.5; 
                const px = radiusX * Math.cos(pAngle);
                const py = radiusY * Math.sin(pAngle);
                
                ctx.beginPath();
                ctx.arc(px, py, 3.5, 0, 2 * Math.PI); // Slightly smaller particle
                ctx.fillStyle = '#fff';
                ctx.shadowBlur = 10;
                ctx.shadowColor = color;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, DESKTOP_SIZE, DESKTOP_SIZE);
            const centerX = DESKTOP_SIZE / 2; // 200
            const centerY = DESKTOP_SIZE / 2; // 200

            time += 0.01;

            // Scaled down dimensions (approx 80% of previous 500px version)
            const coreRadius = 48; 
            const orbitX = 96;
            const orbitY = 32;
            const haloRadius = 144;

            // Core Glow
            const gradient = ctx.createRadialGradient(centerX, centerY, 8, centerX, centerY, coreRadius);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.2, '#06b6d4'); // Cyan
            gradient.addColorStop(0.6, '#8b5cf6'); // Violet
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreRadius, 0, 2 * Math.PI);
            ctx.fill();

            // Rotating Rings
            // Ring 1 - Cyan
            drawOrbit(centerX, centerY, orbitX, orbitY, time * 0.5, 'rgba(6, 182, 212, 0.6)', true);
            
            // Ring 2 - Violet (Offset angle)
            drawOrbit(centerX, centerY, orbitX, orbitY, (time * 0.5) + (Math.PI / 1.5), 'rgba(139, 92, 246, 0.6)', true);
            
            // Ring 3 - Mixed/White (Offset angle)
            drawOrbit(centerX, centerY, orbitX, orbitY, (time * 0.5) + (Math.PI * 1.33), 'rgba(255, 255, 255, 0.4)', true);

            // Outer Halo Ring
            ctx.beginPath();
            ctx.arc(centerX, centerY, haloRadius + Math.sin(time * 2) * 4, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            style={{ width: `${DESKTOP_SIZE}px`, height: `${DESKTOP_SIZE}px` }}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
        />
    );
};

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative z-10 px-4">
      
      {/* Custom Canvas Orbit Visualization - Scaled Down */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] mb-4 md:mb-2 relative flex items-center justify-center pointer-events-none"
      >
        <QuantumOrbitCanvas />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md md:max-w-4xl relative z-20 -mt-16 md:-mt-24" 
      >
        <div className="inline-block border border-blue-500/30 bg-black/50 backdrop-blur-sm px-3 py-1 mb-3 rounded-full">
            <h2 className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-glow">Identity Confirmed</h2>
        </div>
        
        {/* Typography scaled down for better fit */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 md:mb-4 tracking-tight">
          Muhammad <br className="md:hidden"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Muneeb Khan</span>
        </h1>
        
        {/* Gradient Line */}
        <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 mx-auto mb-4 md:mb-6 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>

        <p className="text-zinc-400 max-w-xl md:max-w-3xl mx-auto text-sm md:text-lg font-light mb-6 leading-relaxed px-2">
          Full-Stack MERN Developer | AI Engineer
          <span className="hidden md:inline"> | Founder, EduAI</span>
          <br/>
          <span className="text-xs md:text-sm text-zinc-500 mt-1 block">Building AI-powered products that transform education and accelerate businesses.</span>
        </p>

        <button 
          onClick={() => onNavigate('contact')}
          className="group relative px-6 py-2.5 md:px-8 md:py-2.5 bg-black/60 overflow-hidden rounded-full border border-cyan-500/50 hover:border-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.15)]"
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
