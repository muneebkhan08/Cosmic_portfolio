
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeSection } from './components/Hero';
import { SkillsSection } from './components/CreationHistory';
import { ProjectsSection } from './components/InputArea';
import { ContactSection, AIChatInterface, ChatButton } from './components/LivePreview';
import { HomeIcon, WrenchScrewdriverIcon, RocketLaunchIcon, SignalIcon } from '@heroicons/react/24/solid';

type Section = 'home' | 'skills' | 'projects' | 'contact';

// --- Starfield Background Logic ---
const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    
    // Mouse state for interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    init();

    // Dynamic star count based on screen area
    const getStarCount = () => Math.floor((width * height) / 3000); 
    
    let stars: { 
        x: number; 
        y: number; 
        size: number; 
        baseSize: number;
        speed: number; 
        opacity: number;
        baseOpacity: number;
    }[] = [];

    const createStars = (count: number) => {
      return Array.from({ length: count }).map(() => {
        const size = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: size,
          baseSize: size,
          speed: Math.random() * 0.3 + 0.05, // Varied speeds (depth)
          opacity: opacity,
          baseOpacity: opacity
        };
      });
    };

    stars = createStars(getStarCount());

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Calculate target parallax offset based on mouse distance from center
      // The 0.02 factor controls the intensity of the shift
      targetParallaxX = (e.clientX - width / 2) * 0.02;
      targetParallaxY = (e.clientY - height / 2) * 0.02;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height); // Clear for transparent background
      
      // Smoothly interpolate current parallax towards target
      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.05;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.05;

      stars.forEach(star => {
        // Move star naturally downwards
        star.y += star.speed;
        
        // Wrap around
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width; // Respawn randomly on X
        }

        // Apply Parallax Shift
        // Faster/larger stars (closer) shift more than slower/smaller stars (distant)
        const pX = currentParallaxX * star.speed * 15;
        const pY = currentParallaxY * star.speed * 15;
        
        const drawX = star.x - pX;
        const drawY = star.y - pY;

        // Interactive Glow: Check distance to mouse
        const dx = mouseX - drawX;
        const dy = mouseY - drawY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const hoverThreshold = 120; // Radius of influence

        if (dist < hoverThreshold) {
            const influence = (hoverThreshold - dist) / hoverThreshold; // 0 to 1
            // Increase size and opacity based on proximity
            star.size = star.baseSize + (influence * 1.5);
            star.opacity = Math.min(1, star.baseOpacity + (influence * 0.6));
        } else {
            // Return to base state
            star.size = star.baseSize;
            star.opacity = star.baseOpacity;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
      // Re-initialize stars to cover new dimensions immediately
      stars = createStars(getStarCount());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- Navigation Planets ---
const NavPlanet = ({ 
  icon: Icon, 
  label, 
  active, 
  color, 
  onClick 
}: { 
  icon: React.ElementType, 
  label: string, 
  active: boolean, 
  color: string, 
  onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className="group flex flex-col items-center justify-center space-y-1 md:space-y-2 focus:outline-none flex-1 md:flex-none relative"
  >
    <motion.div 
      // Reduced sizes slightly for better desktop fit (md:w-12 instead of w-14)
      className="relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center z-10"
      animate={{
        backgroundColor: active ? '#18181b' : '#09090b',
        borderColor: active ? color : '#27272a',
        boxShadow: active 
          ? `0 0 20px ${color}60, inset 0 0 10px ${color}30` 
          : '0 0 0px rgba(0,0,0,0)',
      }}
      whileHover={{ 
        scale: 1.15,
        boxShadow: `0 0 30px ${color}80, inset 0 0 20px ${color}40`,
        borderColor: color
      }}
      whileTap={{ scale: 0.9 }}
      style={{
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      {/* Rotating Orbital Ring */}
      <motion.div
        className="absolute inset-[-4px] md:inset-[-6px] rounded-full border border-dashed opacity-40"
        style={{ borderColor: color }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: active ? 4 : 20, // Spin faster when active
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* Icon */}
      <Icon className={`w-4 h-4 md:w-6 md:h-6 transition-colors duration-300 relative z-20 ${active ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
      
      {/* Inner Glow for Active State */}
      {active && (
         <motion.div 
            layoutId="activePlanetGlow"
            className="absolute inset-0 rounded-full opacity-40 blur-sm z-0"
            style={{ backgroundColor: color }}
         />
      )}
    </motion.div>
    
    <span className={`text-[9px] md:text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 mt-2 ${active ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
      {label}
    </span>
  </button>
);

const App: React.FC = () => {
  const [section, setSection] = useState<Section>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderSection = () => {
    switch (section) {
      case 'home': return <HomeSection onNavigate={setSection} />;
      case 'skills': return <SkillsSection />;
      case 'projects': return <ProjectsSection />;
      case 'contact': return <ContactSection />;
      default: return <HomeSection onNavigate={setSection} />;
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col">
      <StarfieldCanvas />
      
      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ 
              duration: 0.5, 
              ease: [0.43, 0.13, 0.23, 0.96] // Cinematic easing
            }}
            className="w-full h-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Dock - Reduced height (h-24) for better content visibility */}
      <nav className="relative z-20 h-16 md:h-24 flex items-center justify-center border-t border-zinc-800 bg-black/80 backdrop-blur-md shrink-0">
        <div className="flex w-full max-w-md md:max-w-2xl justify-evenly md:space-x-16 px-2">
          <NavPlanet 
            icon={HomeIcon} 
            label="Home" 
            active={section === 'home'} 
            color="#06b6d4" 
            onClick={() => setSection('home')} 
          />
          <NavPlanet 
            icon={WrenchScrewdriverIcon} 
            label="Skills" 
            active={section === 'skills'} 
            color="#8b5cf6" 
            onClick={() => setSection('skills')} 
          />
          <NavPlanet 
            icon={RocketLaunchIcon} 
            label="Projects" 
            active={section === 'projects'} 
            color="#f59e0b" 
            onClick={() => setSection('projects')} 
          />
          <NavPlanet 
            icon={SignalIcon} 
            label="Contact" 
            active={section === 'contact'} 
            color="#10b981" 
            onClick={() => setSection('contact')} 
          />
        </div>
      </nav>

      {/* AI Assistant Fab */}
      <ChatButton onClick={() => setIsChatOpen(true)} />
      <AIChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
