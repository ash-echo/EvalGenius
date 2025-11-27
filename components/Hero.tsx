
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Brain, Terminal, ScanSearch, Code2 } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;
const MotionPath = motion.path as any;

interface HeroProps {
  onNavigateToDemo: () => void;
}

// --- Animation Components ---

const BlurReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, filter: "blur(16px)", y: 20 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{ duration: 1.0, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

const Typewriter = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
          if (prev < text.length) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 70); // Typing speed
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {text.substring(0, visibleChars)}
    </span>
  );
};

// Synchronized typing component for the terminal
const TypingLogItem = ({ text, delay, color = "text-gray-400" }: { text: string; delay: number; color?: string }) => {
  const TOTAL_CYCLE = 12; // Total loop duration in seconds

  // Calculate keyframe timings (0 to 1)
  const start = delay / TOTAL_CYCLE;
  const endTyping = (delay + 0.8) / TOTAL_CYCLE; // ~0.8s to type
  const startFade = 0.95; // Fade out at 95%
  const end = 1;

  // Ensure strictly increasing or equal times for framer-motion
  const times = [0, start, endTyping, startFade, end].sort((a, b) => a - b);

  // Corresponding values for width and opacity
  const widthValues = ["0%", "0%", "100%", "100%", "0%"];
  const opacityValues = [0, 1, 1, 0, 0];
  const borderValues = ["transparent", "rgba(74,222,128,0.5)", "rgba(74,222,128,0.5)", "transparent", "transparent"];

  return (
    <div className={`flex items-center gap-2 ${color} font-mono text-xs md:text-sm h-6`}>
      <span className="text-brand-accent/50 shrink-0">{'>'}</span>
      <MotionSpan
        className="overflow-hidden whitespace-nowrap border-r-2 pr-1"
        initial={{ width: "0%", opacity: 0 }}
        animate={{
          width: widthValues,
          opacity: opacityValues,
          borderRightColor: borderValues
        }}
        transition={{
          duration: TOTAL_CYCLE,
          ease: "linear",
          times: times,
          repeat: Infinity,
          repeatDelay: 0
        }}
        style={{
          borderRightStyle: 'solid',
          display: 'inline-block',
          verticalAlign: 'bottom',
          maxWidth: '100%'
        }}
      >
        {text}
      </MotionSpan>
    </div>
  );
};

const Hero: React.FC<HeroProps> = ({ onNavigateToDemo }) => {
  return (
    <section className="relative pt-24 md:pt-36 pb-12 md:pb-24 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Text Content */}
        <div className="z-20 relative">
          <h1 className="font-display text-4xl md:text-6xl lg:text-8xl font-medium leading-[1.05] mb-10 text-white">
            <BlurReveal delay={0.1} className="block drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Handwritten
            </BlurReveal>
            <BlurReveal delay={0.3} className="block text-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Notes Evaluated
            </BlurReveal>

            <div className="flex items-center gap-2 md:gap-3 h-[1.1em] py-2">
              <Typewriter
                text="Instantly"
                delay={0.8}
                className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-white font-bold drop-shadow-[0_0_35px_rgba(74,222,128,0.6)]"
              />
              {/* Blinking Cursor */}
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="w-4 h-14 md:h-20 bg-brand-accent rounded-sm shadow-[0_0_15px_#4ade80]"
              />
            </div>
          </h1>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-gray-400 text-xl lg:text-2xl max-w-2xl mb-10 leading-relaxed">
              Upload answer keys and handwritten PDFs. Our Agentic AI, powered by Gemini 2.5, scans, comprehends, and scores student work with human-level precision.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button
                onClick={onNavigateToDemo}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-accent to-white text-brand-darker px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(74,222,128,0.4)] hover:scale-105 flex items-center justify-center gap-3 group"
              >
                Evaluate Demo
                <Play size={20} className="fill-current group-hover:translate-x-1 transition-transform" />
              </button>

              <a href="#how-it-works" className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-4 px-9 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-accent/50 transition-all duration-300 group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-accent/10 rounded-full text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition-colors">
                  <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform duration-300" />
                </div>
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-base font-bold text-white group-hover:text-brand-accent transition-colors">How it Works</span>
                  <span className="text-xs text-gray-400">Process Workflow</span>
                </div>
              </a>
            </div>

            {/* Tech Badge */}
            <div className="mt-14 flex items-center gap-4 text-sm font-mono text-gray-500 border-t border-white/5 pt-8 max-w-lg">
              <span>Powered by:</span>
              <div className="flex gap-4 text-brand-accent/80">
                <span>Gemini 2.5</span>
                <span>•</span>
                <span>LangChain</span>
                <span>•</span>
                <span>OCR Vision</span>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Visual Content - Connected System */}
        <div className="relative z-10 flex justify-center lg:justify-end mt-16 lg:mt-0 perspective-1000">

          {/* Main Wrapper for layout - Increased Size */}
          <div className="relative w-full max-w-2xl">

            {/* BACKGROUND SVG LINES - Connecting components */}
            <svg className="absolute -left-24 -top-24 w-[150%] h-[150%] z-0 pointer-events-none overflow-visible hidden md:block">
              {/* Line to Confidence Score */}
              <MotionPath
                d="M 160 220 C 100 220, 60 140, 50 100"
                fill="none"
                stroke="rgba(74,222,128,0.3)"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
              {/* Line to Code Snippet */}
              <MotionPath
                d="M 160 400 C 80 400, 60 480, 40 520"
                fill="none"
                stroke="rgba(74,222,128,0.2)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              />
            </svg>

            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-accent/5 blur-[100px] rounded-full pointer-events-none" />

            {/* 1. Confidence Score Badge - Anchored Top Left */}
            <MotionDiv
              className="absolute -left-4 md:-left-16 -top-12 md:top-16 z-30 scale-75 md:scale-100 origin-bottom-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className="bg-[#050a05]/90 backdrop-blur-md border border-brand-accent/30 rounded-2xl p-5 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center gap-4 relative">
                {/* Connector Dot */}
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-brand-accent rounded-full shadow-[0_0_15px_#4ade80]" />

                <div className="w-14 h-14 rounded-full bg-brand-accent/10 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-accent/20 animate-ping rounded-full" />
                  <Brain size={28} className="text-brand-accent relative z-10" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Confidence Score</p>
                  <div className="flex items-baseline gap-1">
                    <p className="text-3xl text-white font-bold leading-none">98.5%</p>
                    <span className="text-brand-accent text-lg">↑</span>
                  </div>
                </div>
              </div>
            </MotionDiv>

            {/* 2. Code Snippet - Anchored Bottom Left */}
            <MotionDiv
              className="absolute -left-4 md:-left-20 -bottom-16 md:bottom-24 z-30 scale-75 md:scale-100 origin-top-left"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <div className="bg-[#0A0F0A]/95 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative">
                {/* Connector Dot */}
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white/20 rounded-full" />

                <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                  <Code2 size={16} className="text-brand-accent" />
                  <span className="text-xs text-gray-500 font-mono">agent_core.py</span>
                </div>
                <div className="font-mono text-xs text-gray-400 space-y-1.5">
                  <p><span className="text-purple-400">async def</span> <span className="text-blue-400">grade_paper</span>(pdf):</p>
                  <p className="pl-4 text-gray-600"># Extract handwritten text</p>
                  <p className="pl-4">content = <span className="text-purple-400">await</span> gemini.process(pdf)</p>
                  <p className="pl-4">grade = agent.evaluate(content)</p>
                  <p className="pl-4"><span className="text-purple-400">return</span> grade</p>
                </div>
              </div>
            </MotionDiv>

            {/* Main Interface Window */}
            <MotionDiv
              className="relative w-full aspect-[3.5/3]"
              initial={{ rotateY: -5, rotateX: 2 }}
              animate={{
                rotateY: [-5, 5, -5],
                rotateX: [2, -2, 2],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-[#0A0F0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                {/* Window Header */}
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-5 gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                  <div className="ml-auto flex items-center gap-2 text-xs text-gray-500 font-mono">
                    <Terminal size={12} />
                    eval_agent_v1.py
                  </div>
                </div>

                {/* Window Body */}
                <div className="flex-1 relative p-4 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8">
                  {/* Left: Input (Handwritten Paper) */}
                  <div className="w-full md:w-1/2 bg-white/5 rounded-xl border border-white/5 p-4 md:p-6 relative overflow-hidden group">
                    <div className="absolute top-3 left-3 text-xs text-gray-500 uppercase font-bold tracking-wider flex items-center gap-2 z-10">
                      <ScanSearch size={14} /> Source
                    </div>

                    {/* Fake Handwritten Text */}
                    <div className="mt-8 space-y-4 opacity-70 font-serif italic text-gray-300 text-sm leading-relaxed transform -rotate-1 origin-top-left mb-16">
                      <p>The mitochondria is the power house of the cell.</p>
                      <p>It generates most of the chemical energy.</p>
                      <div className="h-24 w-full border border-dashed border-white/20 rounded-lg flex items-center justify-center mt-3 relative">
                        <span className="text-xs not-italic font-sans text-gray-600">Diagram: Cell Structure</span>
                        <MotionDiv
                          className="absolute inset-0 border-2 border-brand-accent/30 rounded-lg"
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
                          transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 5 }}
                        />
                      </div>
                      <p>ATP is produced via cellular respiration.</p>
                    </div>

                    {/* Scanning Line */}
                    <MotionDiv
                      className="absolute top-0 left-0 w-full h-1.5 bg-brand-accent/50 shadow-[0_0_20px_#4ade80] z-10"
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <MotionDiv
                      className="absolute inset-0 bg-brand-accent/5 z-0"
                      animate={{ opacity: [0, 0.2, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Right: Output (Evaluation) */}
                  <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="flex-1 bg-[#050a05] rounded-xl border border-brand-accent/10 p-4 relative overflow-hidden flex flex-col shadow-inner">
                      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                        <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Analysis Log</span>
                        <div className="flex gap-2 items-center">
                          <span className="text-[10px] text-brand-accent font-bold">LIVE</span>
                          <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                        </div>
                      </div>

                      <div className="space-y-1.5 pl-1">
                        <TypingLogItem text="Initializing OCR module..." delay={0} />
                        <TypingLogItem text="Reading student_01.pdf..." delay={1.5} />
                        <TypingLogItem text="Target: 'mitochondria' [MATCH]" delay={3.5} color="text-brand-accent" />
                        <TypingLogItem text="Diagram check: LABELED" delay={5.5} color="text-brand-accent" />
                        <TypingLogItem text="Score calculated: 15/15" delay={7.5} />
                      </div>
                    </div>

                    {/* Score Card */}
                    <MotionDiv
                      className="h-32 bg-gradient-to-br from-brand-accent to-brand-green rounded-xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(74,222,128,0.3)] relative overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                      <span className="text-brand-darker text-sm font-bold uppercase tracking-widest relative z-10">Final Grade</span>
                      <MotionSpan
                        className="text-brand-darker text-7xl font-display font-bold relative z-10"
                        initial={{ scale: 0.8, filter: "blur(10px)", opacity: 0 }}
                        animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        A+
                      </MotionSpan>
                    </MotionDiv>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
