import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, BrainCircuit, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;

interface NavbarProps {
  onNavigateToDemo: () => void;
  onNavigateToHome: () => void;
  isDemoMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigateToDemo, onNavigateToHome, isDemoMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Tech Stack', href: '#tech-stack' },
  ];

  return (
    <>
      {/* Decorative Blur/Glow behind the navbar area */}
      <div className="fixed top-0 inset-x-0 h-24 z-40 pointer-events-none select-none">
          {/* Top fade gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020502] via-[#020502]/80 to-transparent" />
          {/* Central diffuse glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-16 bg-brand-accent/5 blur-[50px] rounded-full" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 md:px-6">
        <nav className={`
            w-full max-w-7xl transition-all duration-300 relative
            ${scrolled ? 'bg-[#0A0F0A]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-[#0A0F0A]/50 backdrop-blur-lg border-white/5 shadow-none'}
            border rounded-full px-6 py-3 flex items-center justify-between
        `}>
          {/* Subtle inner glow for depth */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none opacity-50" />

          {/* Logo Section */}
          <div onClick={onNavigateToHome} className="flex items-center gap-3 cursor-pointer group relative z-10">
            <div className="text-white group-hover:text-brand-accent transition-colors duration-300">
               <BrainCircuit size={24} />
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-white uppercase">
              Eval<span className="text-gray-400 group-hover:text-white transition-colors">Genius</span>
            </span>
            {isDemoMode && (
              <span className="hidden sm:flex items-center justify-center px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white/10 text-gray-400 border border-white/5 ml-2 tracking-widest">
                DEMO
              </span>
            )}
          </div>

          {/* Desktop Navigation - Centered */}
          {!isDemoMode && (
            <div className="hidden md:flex items-center gap-8 relative z-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}

          {/* Right Action Button */}
          <div className="hidden md:block relative z-10">
            {isDemoMode ? (
              <button
                onClick={onNavigateToHome}
                className="text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2 transition-colors px-4 py-2"
              >
                <ChevronLeft size={16} /> Exit Demo
              </button>
            ) : (
              <button
                onClick={onNavigateToDemo}
                className="bg-gradient-to-r from-brand-accent to-white text-brand-darker px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_25px_rgba(74,222,128,0.5)] hover:scale-105"
              >
                Start Grading
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-brand-accent transition-colors relative z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 left-4 right-4 z-40 bg-[#0A0F0A] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6">
              {!isDemoMode && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white text-lg font-medium flex justify-between items-center group"
                >
                  {link.name}
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              ))}
              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => {
                    if (isDemoMode) onNavigateToHome();
                    else onNavigateToDemo();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-[1.02] ${
                      isDemoMode 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-gradient-to-r from-brand-accent to-white text-brand-darker shadow-[0_0_15px_rgba(74,222,128,0.2)]'
                  }`}
                >
                  {isDemoMode ? 'Exit Demo' : 'Start Grading'}
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;