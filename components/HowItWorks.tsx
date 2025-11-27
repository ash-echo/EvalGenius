
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ScanLine, Brain, FileCheck, ArrowUpRight, Zap, Search, Activity } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionH2 = motion.h2 as any;
const MotionP = motion.p as any;

const steps = [
  {
    id: 1,
    title: "Ingestion",
    subtitle: "Context Awareness",
    description: "Drag & drop handwritten notes, PDFs, or images. Our system instantly normalizes orientation and enhances contrast for maximum legibility.",
    icon: Upload,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-accent/5 blur-xl rounded-full" />
        <MotionDiv 
          className="w-16 h-20 border-2 border-dashed border-brand-accent/50 rounded-lg flex items-center justify-center relative bg-black/50 backdrop-blur-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
           <Upload className="text-brand-accent" size={24} />
           <MotionDiv 
             className="absolute -right-2 -top-2 w-6 h-6 bg-brand-accent text-brand-darker rounded-full flex items-center justify-center text-[10px] font-bold"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.5 }}
           >
             PDF
           </MotionDiv>
        </MotionDiv>
        
        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
           <MotionDiv
             key={i}
             className="absolute w-1 h-1 bg-white rounded-full"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: [0, 1, 0], y: -30 }}
             transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
             style={{ left: `${40 + i * 10}%` }}
           />
        ))}
      </div>
    )
  },
  {
    id: 2,
    title: "Vision Layer",
    subtitle: "Pixel-Perfect OCR",
    description: "Gemini 2.5 Vision deconstructs the document. It reads cursive, recognizes diagrams, and stitches multi-page answers together logically.",
    icon: ScanLine,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
         <div className="absolute inset-x-0 top-0 h-1 bg-brand-accent/80 shadow-[0_0_20px_#4ade80] z-10" />
         
         {/* Text Lines */}
         <div className="space-y-2 w-3/4 opacity-50">
            <MotionDiv className="h-2 bg-gray-500 rounded w-full" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <MotionDiv className="h-2 bg-gray-500 rounded w-5/6" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, delay: 0.2, repeat: Infinity }} />
            <MotionDiv className="h-2 bg-gray-500 rounded w-4/6" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity }} />
         </div>

         {/* Scanning Beam */}
         <MotionDiv 
           className="absolute inset-x-0 h-1 bg-brand-accent shadow-[0_0_25px_#4ade80]"
           animate={{ top: ["0%", "100%", "0%"] }}
           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
         />
         
         <div className="absolute bottom-2 right-2 flex gap-1">
            <Search size={12} className="text-brand-accent" />
            <span className="text-[8px] font-mono text-brand-accent">RECOGNIZED</span>
         </div>
      </div>
    )
  },
  {
    id: 3,
    title: "Reasoning",
    subtitle: "Semantic Evaluation",
    description: "The AI agent doesn't just match keywords. It understands the 'meaning' of the student's answer and compares it against the rubric's intent.",
    icon: Brain,
    visual: (
      <div className="relative w-full h-full flex items-center justify-center">
         <div className="w-20 h-20 rounded-full border border-brand-accent/20 flex items-center justify-center relative">
            <MotionDiv 
              className="absolute inset-0 rounded-full border border-brand-accent/40 border-t-transparent border-l-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <Brain className="text-brand-accent" size={32} />
         </div>
         
         {/* Connecting Nodes */}
         {[0, 120, 240].map((deg, i) => (
            <MotionDiv
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              style={{ transform: `rotate(${deg}deg) translate(50px)` }}
            />
         ))}
      </div>
    )
  },
  {
    id: 4,
    title: "Report",
    subtitle: "Actionable Feedback",
    description: "Generate a detailed JSON report card. Granular scoring, confidence metrics, and specific advice for every single question.",
    icon: FileCheck,
    visual: (
      <div className="relative w-full h-full flex flex-col justify-center px-6">
         <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-brand-accent" />
            <div className="text-[10px] font-mono text-brand-accent">STATUS: COMPLETE</div>
         </div>
         <div className="space-y-1.5 font-mono text-[8px] text-gray-400">
            <MotionDiv initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>{`{`}</MotionDiv>
            <MotionDiv initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="pl-2">"score": <span className="text-brand-accent">98.5</span>,</MotionDiv>
            <MotionDiv initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="pl-2">"grade": "A+",</MotionDiv>
            <MotionDiv initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="pl-2">"feedback": "Excellent work..."</MotionDiv>
            <MotionDiv initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>{`}`}</MotionDiv>
         </div>
         <div className="absolute top-2 right-2 text-brand-accent">
            <Activity size={16} />
         </div>
      </div>
    )
  }
];

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1);
    }, 3000); // 3 seconds per step

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="how-it-works" className="py-32 bg-[#020502] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <MotionDiv 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-brand-accent font-mono text-xs uppercase tracking-widest mb-4"
            >
              <Zap size={14} /> Intelligence Engine
            </MotionDiv>
            <MotionH2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-display font-medium text-white max-w-xl leading-tight"
            >
              The Agentic Workflow
            </MotionH2>
          </div>
          <MotionP 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-gray-400 max-w-sm text-sm leading-relaxed"
          >
             Hover over the modules below to pause and explore how EvalGenius deconstructs, analyzes, and grades complex documents in real-time.
          </MotionP>
        </div>

        {/* Accordion Container */}
        <div 
            className="flex flex-col lg:flex-row gap-2 lg:gap-4 h-auto lg:h-[500px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
           {steps.map((step) => (
             <MotionDiv
               key={step.id}
               className={`relative rounded-2xl overflow-hidden cursor-pointer border transition-colors duration-500
                  ${activeStep === step.id 
                    ? 'flex-[3] border-brand-accent/30 bg-[#0A0F0A]' 
                    : 'flex-1 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'
                  }
               `}
               onHoverStart={() => setActiveStep(step.id)}
               onClick={() => setActiveStep(step.id)} // For mobile tap
               layout
             >
                {/* Background Gradient for Active State */}
                <AnimatePresence>
                  {activeStep === step.id && (
                    <MotionDiv 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Content Container */}
                <div className="relative h-full flex flex-col p-6 lg:p-8">
                   
                   {/* Header: Icon & Number */}
                   <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${activeStep === step.id ? 'bg-brand-accent text-brand-darker' : 'bg-white/10 text-gray-400'}`}>
                         <step.icon size={24} />
                      </div>
                      <span className={`text-4xl font-display font-bold transition-colors duration-300 ${activeStep === step.id ? 'text-white/20' : 'text-white/5'}`}>
                         0{step.id}
                      </span>
                   </div>

                   {/* Middle: Visual (Only visible when active) */}
                   <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
                      <AnimatePresence mode="popLayout">
                         {activeStep === step.id && (
                            <MotionDiv
                               initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                               exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                               transition={{ duration: 0.4 }}
                               className="w-full h-full max-h-[200px]"
                            >
                               {step.visual}
                            </MotionDiv>
                         )}
                      </AnimatePresence>
                   </div>

                   {/* Footer: Text Content */}
                   <div className="mt-auto relative z-10">
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${activeStep === step.id ? 'text-white' : 'text-gray-400'}`}>
                         {step.title}
                      </h3>
                      
                      <AnimatePresence mode="popLayout">
                        {activeStep === step.id && (
                          <MotionDiv
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             exit={{ opacity: 0, height: 0 }}
                             className="overflow-hidden"
                          >
                             <div className="text-brand-accent text-xs font-mono uppercase tracking-wider mb-2">
                               {step.subtitle}
                             </div>
                             <p className="text-gray-400 text-sm leading-relaxed">
                               {step.description}
                             </p>
                          </MotionDiv>
                        )}
                      </AnimatePresence>
                   </div>

                   {/* Active Indicator Line */}
                   {activeStep === step.id && (
                      <MotionDiv 
                        layoutId="activeGlow"
                        className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent shadow-[0_0_20px_#4ade80]"
                      />
                   )}
                </div>
             </MotionDiv>
           ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
