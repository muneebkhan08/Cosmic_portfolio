/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import { RocketLaunchIcon, CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';

const PROJECTS = [
  {
    name: "EduAI",
    role: "Founder & AI Engineer",
    desc: "AI-powered learning platform personalized for underserved communities. Built with GenAI & NLP.",
    tech: "React, Python, GenAI",
    featured: true
  },
  {
    name: "Galaxy AI Assistant",
    role: "AI Developer",
    desc: "Custom AI agent for interview prep and automated Q/A workflows.",
    tech: "Agentic AI, LLMs",
    featured: true
  },
  {
    name: "Ecommerce Platform",
    role: "Lead Developer",
    desc: "Scalable MERN stack e-commerce solution with real-time inventory.",
    tech: "MERN, Redux"
  },
  {
    name: "3D Portfolio",
    role: "Frontend Developer",
    desc: "Futuristic space-themed interactive portfolio.",
    tech: "Three.js, Next.js"
  },
  {
    name: "CRM System",
    role: "Full-Stack Developer",
    desc: "Business process automation and role management dashboard.",
    tech: "React, Node, SQL"
  }
];

export const ProjectsSection: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto px-4 pt-8 pb-12 md:pt-20 md:pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12">
            <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white">Project Cluster</h2>
                <p className="text-zinc-400 font-mono text-[10px] md:text-xs mt-2 tracking-wider">ORBITAL LOG: DISCOVERIES & DEPLOYMENTS</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-zinc-900/40 border border-zinc-800 overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${project.featured ? 'md:col-span-2 lg:col-span-2 border-cyan-900/30 bg-gradient-to-br from-zinc-900 to-zinc-900/50' : 'hover:border-zinc-600'}`}
            >
              {project.featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider rounded">
                      Flagship
                  </div>
              )}

              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="mb-4 p-2 md:p-3 bg-zinc-950 w-fit rounded-xl border border-zinc-800 group-hover:border-cyan-500/50 transition-colors">
                    <RocketLaunchIcon className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-cyan-400" />
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{project.name}</h3>
                <span className="text-[10px] md:text-xs font-mono text-cyan-500 mb-4 block">{project.role}</span>
                
                <p className="text-zinc-400 leading-relaxed mb-6 flex-1 text-sm md:text-base">{project.desc}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                    <span className="text-[10px] md:text-xs font-mono text-zinc-500 truncate mr-2">{project.tech}</span>
                    <div className="flex space-x-2 shrink-0">
                        <button className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                            <CodeBracketIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                            <EyeIcon className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};