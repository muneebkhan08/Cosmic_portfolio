
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon, MapPinIcon, EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { askGalaxyAI } from '../services/gemini';

// --- Contact Form Component ---
export const ContactSection: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'transmitting' | 'transmitted'>('idle');

    const handleTransmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;

        // Immediate visual feedback
        setStatus('transmitting');

        const subject = `[Cosmic Portfolio] Transmission from ${formState.name}`;
        const body = `Source Identity: ${formState.name}\nReturn Signal: ${formState.email}\n\nTransmission Payload:\n${formState.message}`;
        
        const mailtoLink = `mailto:muneebkhanf23@nutech.edu.pk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Use a temporary anchor tag to trigger the mailto. 
        // This is often more reliable than window.location.href in preventing page unloads or blocks.
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.target = '_blank'; // Optional: tries to keep the app open
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Update UI to "Sent" state
        setStatus('transmitted');
        setFormState({ name: '', email: '', message: '' });
        
        // Reset button state after a few seconds
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <div className="h-full overflow-y-auto px-4 pb-4 pt-4 flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Info Panel */}
                <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
                    <div>
                        <h2 className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4">Contact<br className="hidden md:block"/>Relay</h2>
                        <p className="text-zinc-400 text-sm md:text-lg">CONTACT URGENTLY!</p>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center space-x-4 p-3 md:p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                            <EnvelopeIcon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 shrink-0" />
                            <div className="text-left overflow-hidden">
                                <div className="text-[10px] md:text-xs text-zinc-500 uppercase font-bold">Frequency</div>
                                <div className="text-zinc-200 text-sm md:text-base truncate">muneebkhanf23@nutech.edu.pk</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-3 md:p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                            <MapPinIcon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 shrink-0" />
                            <div className="text-left">
                                <div className="text-[10px] md:text-xs text-zinc-500 uppercase font-bold">Coordinates</div>
                                <div className="text-zinc-200 text-sm md:text-base">Islamabad, Pakistan</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form className="bg-zinc-900/30 p-6 md:p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm w-full" onSubmit={handleTransmit}>
                    <div className="space-y-4 md:space-y-6">
                        <div className="space-y-1 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-mono text-cyan-500 uppercase">Identify Yourself</label>
                            <input 
                                type="text" 
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 md:p-3 text-sm md:text-base text-zinc-200 focus:border-cyan-500 focus:outline-none transition-colors disabled:opacity-50" 
                                placeholder="Name / Organization" 
                                disabled={status !== 'idle'}
                            />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-mono text-cyan-500 uppercase">Return Signal</label>
                            <input 
                                type="email" 
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 md:p-3 text-sm md:text-base text-zinc-200 focus:border-cyan-500 focus:outline-none transition-colors disabled:opacity-50" 
                                placeholder="email@sector.com" 
                                disabled={status !== 'idle'}
                            />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-mono text-cyan-500 uppercase">Transmission</label>
                            <textarea 
                                rows={3} 
                                required
                                value={formState.message}
                                onChange={(e) => setFormState({...formState, message: e.target.value})}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 md:p-3 text-sm md:text-base text-zinc-200 focus:border-cyan-500 focus:outline-none transition-colors resize-none disabled:opacity-50" 
                                placeholder="Message content..."
                                disabled={status !== 'idle'}
                            ></textarea>
                        </div>
                        <button 
                            type="submit"
                            disabled={status !== 'idle'}
                            className={`w-full py-2.5 md:py-3 font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm md:text-base
                                ${status === 'idle' ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : ''}
                                ${status === 'transmitting' ? 'bg-cyan-900 text-cyan-200 cursor-wait' : ''}
                                ${status === 'transmitted' ? 'bg-green-600 text-white' : ''}
                            `}
                        >
                            {status === 'idle' && <><PaperAirplaneIcon className="w-4 h-4 md:w-5 md:h-5" /><span>TRANSMIT</span></>}
                            {status === 'transmitting' && <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /><span>ENCRYPTING...</span></>}
                            {status === 'transmitted' && <><CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5" /><span>SENT (CHECK MAIL APP)</span></>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Galaxy AI Chat Interface ---
export const AIChatInterface: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
        { role: 'ai', text: "Greetings. I am Galaxy, Muneeb's AI interface. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;
        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        const response = await askGalaxyAI(userMsg);
        setMessages(prev => [...prev, { role: 'ai', text: response }]);
        setLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    className="fixed bottom-24 md:bottom-36 right-4 md:right-8 w-[calc(100vw-2rem)] md:w-96 h-[450px] md:h-[500px] bg-[#0A0A0C] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-3 md:p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-mono text-xs font-bold text-zinc-300">GALAXY AI :: ONLINE</span>
                        </div>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white">
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 bg-grid-pattern">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-2.5 md:p-3 rounded-lg text-xs md:text-sm ${msg.role === 'user' ? 'bg-cyan-900/30 text-cyan-100 border border-cyan-800' : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700 flex space-x-1">
                                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 md:p-4 bg-zinc-900 border-t border-zinc-800">
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about Muneeb..."
                                className="flex-1 bg-black border border-zinc-700 rounded-md px-3 py-2 text-xs md:text-sm text-white focus:border-cyan-500 focus:outline-none"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={loading}
                                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-md text-cyan-400 transition-colors"
                            >
                                <PaperAirplaneIcon className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const ChatButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="fixed bottom-24 right-4 md:bottom-36 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 bg-cyan-600 hover:bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30 transition-colors"
    >
        <ChatBubbleLeftRightIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
    </motion.button>
);
