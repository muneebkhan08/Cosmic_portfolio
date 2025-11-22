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

// --- Surface Code Lattice Animation (Canvas) ---
const LatticeCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Retina/High-DPI
    const updateSize = () => {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.offsetWidth * 2;
            canvas.height = parent.offsetHeight * 2;
            canvas.style.width = `${parent.offsetWidth}px`;
            canvas.style.height = `${parent.offsetHeight}px`;
            ctx.scale(2, 2);
        }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    
    // Configuration
    const rows = 8;
    const cols = 8;
    const spacing = 25;
    
    // Generate Grid Nodes
    const nodes: {x: number, y: number, baseX: number, baseY: number, color: string}[] = [];
    for(let i=0; i<rows; i++) {
        for(let j=0; j<cols; j++) {
            // Center the grid
            const x = (i - rows/2 + 0.5) * spacing;
            const y = (j - cols/2 + 0.5) * spacing;
            
            // Checkerboard pattern for "Data" vs "Ancilla" qubits
            const isDataQubit = (i + j) % 2 === 0;
            
            nodes.push({
                x: x, y: y,
                baseX: x, baseY: y,
                color: isDataQubit ? '#06b6d4' : '#fbbf24' // Cyan & Gold
            });
        }
    }

    let time = 0;
    let animationFrameId: number;

    const animate = () => {
        const width = canvas.width / 2;
        const height = canvas.height / 2;
        ctx.clearRect(0, 0, width, height);
        
        const centerX = width / 2;
        const centerY = height / 2;
        
        time += 0.015;
        const rotateX = Math.sin(time * 0.3) * 0.3 + 0.5; // Tilt
        const rotateY = time * 0.2; // Spin
        const breathe = Math.sin(time * 1.5) * 8; // Undulation amplitude

        // Project 3D points to 2D
        const projectedNodes = nodes.map(node => {
            // Surface Code "Breathing" - undulating Z-axis
            const dist = Math.sqrt(node.baseX**2 + node.baseY**2);
            const zOffset = Math.sin(time * 2 + dist * 0.1) * breathe;
            
            let x = node.baseX;
            let y = node.baseY;
            let z = zOffset;

            // Rotate Y
            let x1 = x * Math.cos(rotateY) - z * Math.sin(rotateY);
            let z1 = z * Math.cos(rotateY) + x * Math.sin(rotateY);
            
            // Rotate X
            let y2 = y * Math.cos(rotateX) - z1 * Math.sin(rotateX);
            let z2 = z1 * Math.cos(rotateX) + y * Math.sin(rotateX);
            
            // Simple Perspective Projection
            const fov = 400;
            const scale = fov / (fov + z2);
            
            return {
                x: centerX + x1 * scale,
                y: centerY + y2 * scale,
                z: z2,
                scale: scale,
                color: node.color,
                original: node
            };
        });

        // Draw Connections (Lattice Links)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < projectedNodes.length; i++) {
            const n1 = projectedNodes[i];
            // Connect to nearby nodes to form grid
            for (let j = i + 1; j < projectedNodes.length; j++) {
                const n2 = projectedNodes[j];
                const dx = n1.original.baseX - n2.original.baseX;
                const dy = n1.original.baseY - n2.original.baseY;
                // Check if they are neighbors in the grid
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < spacing * 1.1) { 
                    ctx.moveTo(n1.x, n1.y);
                    ctx.lineTo(n2.x, n2.y);
                }
            }
        }
        ctx.stroke();

        // Draw Nodes (Qubits)
        projectedNodes.sort((a,b) => b.z - a.z); // Draw back to front
        projectedNodes.forEach(p => {
            const size = Math.max(1, 3 * p.scale);
            ctx.beginPath();
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 8 * p.scale;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => {
        window.removeEventListener('resize', updateSize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative z-10 px-4">
      
      {/* Surface Code Lattice Container */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative mb-8"
      >
        {/* Frame */}
        <div className="w-64 h-64 md:w-80 md:h-80 border border-blue-500/30 relative flex items-center justify-center bg-zinc-950/30 backdrop-blur-sm">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-500"></div>
            <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-500"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-500"></div>

            {/* The Lattice Canvas */}
            <div className="absolute inset-4 rounded-full overflow-hidden bg-black/40 border border-white/5">
                 <LatticeCanvas />
            </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md md:max-w-3xl flex flex-col items-center"
      >
        <h2 className="text-cyan-400 font-mono text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] mb-2 uppercase">Identity Confirmed</h2>
        
        <div className="relative mb-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight relative z-10">
            Muhammad
            </h1>
            {/* Gradient Bar */}
            <div className="h-6 md:h-8 w-[105%] -ml-[2.5%] bg-gradient-to-r from-cyan-500 to-violet-600 mt-[-10px] md:mt-[-15px] relative z-0"></div>
        </div>

        <p className="text-zinc-400 max-w-xl md:max-w-2xl mx-auto text-sm md:text-lg font-light mb-8 leading-relaxed px-2">
          Full-Stack MERN Developer | AI Engineer
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
