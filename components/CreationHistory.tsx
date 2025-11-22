/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import { CpuChipIcon, GlobeAltIcon, CircleStackIcon, BoltIcon, CommandLineIcon } from '@heroicons/react/24/outline';

const SKILLS = {
  Frontend: {
    icon: GlobeAltIcon,
    items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  Backend: {
    icon: CircleStackIcon,
    items: ["Node.js", "Express.js", "MongoDB", "SQL", "REST APIs", "Auth (JWT/OAuth)"]
  },
  AI_ML: {
    icon: CpuChipIcon,
    items: ["Python", "Machine Learning", "Deep Learning", "Generative AI", "NLP", "Vision Models"]
  },
  Tools: {
    icon: CommandLineIcon,
    items: ["Git & GitHub", "Docker", "Linux", "Postman", "Figma", "VS Code"]
  }
};

export const SkillsSection: React.FC = React.memo(() => {
  return (
    <div className="h-full overflow-y-auto px-4 pt-8 pb-12 md:pt-0 md:pb-0 md:flex md:items-center md:justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12 mt-4 md:mt-0"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">The Skill Nexus</h2>
          <div className="h-1 w-24 bg-violet-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-zinc-400 font-mono text-xs md:text-sm">Loading technical competencies...</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-8">
          {Object.entries(SKILLS).map(([category, data], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/50 rounded-xl p-5 md:p-6 backdrop-blur-sm group transition-colors duration-300"
            >
              <div className="flex items-center space-x-3 mb-4 md:mb-6">
                <div className="p-2 bg-zinc-800 rounded-lg text-violet-400 group-hover:text-violet-300 group-hover:bg-violet-900/20 transition-colors">
                  <data.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="font-bold text-base md:text-lg text-zinc-200">{category}</h3>
              </div>
              
              <div className="space-y-1.5 md:space-y-2">
                {data.items.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2 text-xs md:text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    <BoltIcon className="w-3 h-3 text-violet-500" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});