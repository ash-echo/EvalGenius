import React from 'react';
import Card from './ui/Card';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, ScanText, BrainCircuit, Sparkles, Layers } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const MotionDiv = motion.div as any;

const data = [
   { name: 'Q1', val: 90 },
   { name: 'Q2', val: 45 },
   { name: 'Q3', val: 75 },
   { name: 'Q4', val: 100 },
   { name: 'Q5', val: 60 },
];

const BentoGrid: React.FC = () => {
   return (
      <section className="py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
         <div className="mb-16 text-center">
            <span className="text-brand-accent text-sm font-semibold tracking-wider uppercase mb-3 block">What the Demo Does</span>
            <h2 className="text-3xl md:text-5xl font-display text-white max-w-3xl mx-auto leading-tight">
               Real-Time Agentic Grading
            </h2>
            <p className="text-gray-400 mt-4 text-sm max-w-2xl mx-auto">
               Experience how our Multi-Pass AI reads, comprehends, and grades complex student work right in your browser.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

            {/* Card 1: Handwriting OCR */}
            <Card title="Vision-First OCR" className="md:col-span-3 lg:col-span-4 row-span-2 min-h-[400px]" delay={0.1}>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  The demo uses Gemini's Vision capabilities to read raw pixels. It works on messy cursive, diagrams, and even rotated pages without external OCR tools.
               </p>

               <div className="flex-1 flex flex-col justify-center gap-4 mt-4 relative bg-black/20 rounded-xl p-4 border border-white/5">
                  <div className="text-xs text-gray-500 font-mono mb-2">LIVE ANALYSIS</div>
                  <div className="space-y-3">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col gap-1">
                           <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden relative">
                              <MotionDiv
                                 className="h-full bg-brand-accent"
                                 initial={{ width: "0%" }}
                                 whileInView={{ width: "100%" }}
                                 transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, repeatDelay: 3 }}
                              />
                           </div>
                           <MotionDiv
                              className="text-[10px] text-brand-accent"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ delay: (i * 0.5) + 0.5, repeat: Infinity, repeatDelay: 4 }}
                           >
                              Identifying text...
                           </MotionDiv>
                        </div>
                     ))}
                  </div>
                  <div className="mt-auto flex justify-center">
                     <ScanText className="text-brand-accent animate-pulse" size={32} />
                  </div>
               </div>
            </Card>

            {/* Card 2: Multi-Page Logic */}
            <Card title="Multi-Page Context Stitching" className="md:col-span-3 lg:col-span-8 row-span-1 min-h-[300px] relative overflow-hidden" delay={0.2}>
               <div className="absolute right-0 top-0 w-3/5 h-full z-0 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-l from-brand-accent/10 to-transparent blur-xl" />
                  {/* Stacked Pages Animation */}
                  {[...Array(3)].map((_, i) => (
                     <MotionDiv
                        key={i}
                        className="absolute bg-white/5 border border-white/10 rounded w-32 h-40 flex items-center justify-center backdrop-blur-sm"
                        initial={{ x: 100, y: 0, rotate: 0 }}
                        whileInView={{
                           x: 50 + (i * 20),
                           y: 20 + (i * 10),
                           rotate: i * 5
                        }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        style={{ right: '10%' }}
                     >
                        <div className="w-20 h-1 bg-white/20 rounded-sm mb-2" />
                        <div className="w-16 h-1 bg-white/20 rounded-sm" />
                     </MotionDiv>
                  ))}
               </div>

               <div className="relative z-10 max-w-sm mt-auto">
                  <div className="flex items-center gap-2 mb-3 text-brand-accent">
                     <Layers size={20} />
                     <span className="font-bold text-sm">PDF Processing</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                     The demo automatically rasterizes multi-page PDFs. The AI then "stitches" answers together even if a student starts an answer on Page 1 and finishes on Page 2.
                  </p>
               </div>
            </Card>

            {/* Card 3: Semantic Logic */}
            <Card title="Semantic Understanding" className="md:col-span-3 lg:col-span-4 row-span-1 min-h-[250px]" delay={0.3}>
               <div className="flex-1 relative flex flex-col justify-end">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-accent/10 to-transparent" />

                  <div className="flex items-center gap-2 mb-2">
                     <BrainCircuit className="text-brand-accent" size={24} />
                     <span className="text-white font-mono text-xs">Vector Matching</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">
                     We don't use simple keyword matching. The demo evaluates whether the <em>meaning</em> of the student's answer matches the rubric, allowing for phrasing variations.
                  </p>
               </div>
            </Card>

            {/* Card 4: Detailed Feedback */}
            <Card title="Actionable Feedback" className="md:col-span-3 lg:col-span-4 row-span-1 min-h-[250px]" delay={0.4}>
               <div className="flex justify-between items-start mb-4">
                  <div className="bg-brand-accent/20 p-2 rounded-lg">
                     <Sparkles className="text-brand-accent" size={20} />
                  </div>
                  <ArrowUpRight className="text-gray-600" size={24} />
               </div>
               <p className="text-gray-400 text-sm mt-auto">
                  For every question, the demo generates specific advice on why points were deducted and how the student can improve next time.
               </p>
            </Card>

            {/* Card 5: Question Breakdown Chart */}
            <Card className="md:col-span-3 lg:col-span-8 row-span-1 min-h-[250px]" delay={0.5}>
               <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3 flex flex-col justify-end mb-4 md:mb-0 pr-4">
                     <h3 className="text-2xl font-display text-gray-200 mb-2">Granular Breakdown</h3>
                     <p className="text-gray-400 text-xs">The demo output provides a question-by-question performance graph, identifying exactly which topics the student struggled with.</p>
                  </div>
                  <div className="md:w-2/3 h-[200px] relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                           <defs>
                              <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                                 <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="val" stroke="#4ade80" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </div>
            </Card>

            {/* Card 6: Rubric Adherence */}
            <Card title="Rubric-Strict Precision" className="md:col-span-3 lg:col-span-4 row-span-1 min-h-[250px]" delay={0.6}>
               <p className="text-gray-500 text-xs mb-6">Enforced via System Prompting</p>

               <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
                  <div className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                        <Check size={10} className="text-green-500" />
                     </div>
                     <div className="text-[10px] text-gray-300">Parse Rubric Table</div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                        <Check size={10} className="text-green-500" />
                     </div>
                     <div className="text-[10px] text-gray-300">Extract Max Marks</div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                        <Check size={10} className="text-green-500" />
                     </div>
                     <div className="text-[10px] text-gray-300">Compare Logic</div>
                  </div>

                  <MotionDiv
                     className="absolute top-0 left-0 right-0 h-[1px] bg-brand-accent shadow-[0_0_10px_#4ade80]"
                     animate={{ top: ["0%", "100%", "0%"] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
               </div>
            </Card>

         </div>
      </section>
   );
};

export default BentoGrid;