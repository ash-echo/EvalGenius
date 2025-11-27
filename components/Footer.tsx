
import React, { useState } from 'react';
import { BrainCircuit, Github, Linkedin, Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToLegal: (page: 'privacy' | 'terms' | 'cookies') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onNavigateToLegal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    // In a real app, this would trigger an API call
  };

  return (
    <footer className="bg-black relative pt-20 pb-10 overflow-hidden border-t border-white/5">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent shadow-[0_0_20px_#4ade80]" />
        
        {/* Background Ambience */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none" />

       <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
             
             {/* Brand Column */}
             <div className="md:col-span-5">
                <div className="flex items-center gap-2 mb-6 text-white">
                    <BrainCircuit size={28} className="text-brand-accent" />
                    <span className="font-display font-bold text-xl tracking-wider">Eval<span className="text-gray-500">Genius</span></span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                    Pioneering the future of educational assessment with Agentic AI. Precision, speed, and fairness in every grade.
                </p>
                <div className="flex gap-4">
                    <a 
                      href="https://discord.gg/ycpn5nRde8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#5865F2] hover:text-white transition-all"
                      aria-label="Discord"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.653 0 2.039 2.039 0 0 0-.417-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                        </svg>
                    </a>
                    <a 
                      href="https://github.com/ash-echo" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-accent hover:text-black transition-all"
                      aria-label="GitHub"
                    >
                        <Github size={16} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/ashwath-p-devloper/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all"
                      aria-label="LinkedIn"
                    >
                        <Linkedin size={16} />
                    </a>
                </div>
             </div>

             {/* Links Column */}
             <div className="md:col-span-3">
                <h4 className="font-bold text-white mb-6">Product</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                    <li>
                        <button onClick={() => onNavigateToSection('how-it-works')} className="hover:text-brand-accent transition-colors flex items-center gap-2 group">
                            How it works <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onNavigateToSection('features')} className="hover:text-brand-accent transition-colors flex items-center gap-2 group">
                            Features <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onNavigateToSection('tech-stack')} className="hover:text-brand-accent transition-colors flex items-center gap-2 group">
                            Tech Stack <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </button>
                    </li>
                </ul>
             </div>

             {/* Newsletter Column */}
             <div className="md:col-span-4">
                <h4 className="font-bold text-white mb-6">Stay Updated</h4>
                
                {!subscribed ? (
                    <>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest AI grading updates.</p>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-accent/50 w-full transition-colors"
                            />
                            <button 
                                onClick={handleSubscribe}
                                className="bg-brand-accent text-black p-2 rounded-lg hover:bg-brand-glow transition-all hover:scale-105 active:scale-95"
                            >
                                <Mail size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0">
                             <CheckCircle className="text-brand-accent" size={20} />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Thank you for subscribing!</p>
                            <p className="text-gray-400 text-xs mt-0.5">We've added {email} to our list.</p>
                        </div>
                    </div>
                )}
             </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-gray-500 text-xs">
                © {new Date().getFullYear()} EvalGenius AI. All rights reserved.
             </div>
             <div className="flex gap-6 text-xs text-gray-500">
                <button onClick={() => onNavigateToLegal('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => onNavigateToLegal('terms')} className="hover:text-white transition-colors">Terms of Service</button>
                <button onClick={() => onNavigateToLegal('cookies')} className="hover:text-white transition-colors">Cookie Policy</button>
             </div>
          </div>
       </div>
    </footer>
  );
};

export default Footer;
