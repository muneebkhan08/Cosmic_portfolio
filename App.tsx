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
    
    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    init();

    // Dynamic star count based on screen area
    const getStarCount = () => Math.floor((width * height) / 3000); 
    
    let stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const createStars = (count: number) => {
      return Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5, // Varied sizes
        speed: Math.random() * 0.3 + 0.05, // Varied speeds
        opacity: Math.random() * 0.8 + 0.2  // Varied opacity
      }));
    };

    stars = createStars(getStarCount());

    const animate = () => {
      ctx.clearRect(0, 0, width, height); // Clear for transparent background
      
      stars.forEach(star => {
        star.y += star.speed;
        
        // Wrap around
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width; // Respawn randomly on X
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
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
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
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
    className="group flex flex-col items-center justify-center space-y-1 md:space-y-2 transition-all duration-300 focus:outline-none flex-1 md:flex-none"
  >
    <div className={`relative w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 ${active ? 'scale-110 shadow-lg' : 'scale-100 hover:scale-105 opacity-50 hover:opacity-100'}`} style={{
      background: active ? `linear-gradient(135deg, ${color}, #18181b)` : '#18181b',
      boxShadow: active ? `0 0 20px ${color}40` : 'none',
      border: active ? `1px solid ${color}` : '1px solid #27272a'
    }}>
      <Icon className={`w-4 h-4 md:w-6 md:h-6 ${active ? 'text-white' : 'text-zinc-400'}`} />
    </div>
    <span className={`text-[9px] md:text-[10px] font-mono uppercase tracking-widest transition-colors ${active ? 'text-white' : 'text-zinc-500'}`}>
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
      <main className="flex-1 relative z-10 overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Dock */}
      <nav className="relative z-20 h-20 md:h-32 flex items-center justify-center border-t border-zinc-800 bg-black/80 backdrop-blur-md shrink-0">
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