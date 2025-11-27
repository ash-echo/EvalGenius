import React from 'react';
import Card from './ui/Card';
import { Cpu, Code, FileCode, Zap, LayoutTemplate, Braces } from 'lucide-react';

const technologies = [
  {
    icon: Cpu,
    name: "Google Gemini 2.5 Flash",
    description: "The core intelligence. A multimodal model that processes vision (handwriting) and text with 1M+ token context.",
    tech: "Model Weights"
  },
  {
    icon: Code,
    name: "React 19 & TypeScript",
    description: "High-performance client-side application handling complex state and real-time UI updates.",
    tech: "Frontend Framework"
  },
  {
    icon: FileCode,
    name: "PDF.js & Canvas API",
    description: "Client-side PDF rasterization engine that converts multi-page booklets into high-res images for the AI.",
    tech: "Document Processing"
  },
  {
    icon: Zap,
    name: "Google GenAI SDK",
    description: "Direct integration layer enabling serverless, low-latency communication with Gemini API endpoints.",
    tech: "SDK / Transport"
  },
  {
    icon: Braces,
    name: "JSON Schema Validation",
    description: "Enforces strict output structures, ensuring the AI returns parseable grading data every single time.",
    tech: "Data Integrity"
  },
  {
    icon: LayoutTemplate,
    name: "Framer Motion",
    description: "Orchestrates the scanner animations and smooth layout transitions for a premium user experience.",
    tech: "Animation Library"
  }
];

const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className="py-24 bg-black/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
             <span className="text-brand-accent text-sm font-semibold tracking-wider uppercase">Under the Hood</span>
             <h2 className="text-3xl md:text-5xl font-display text-white mt-3">The Actual Demo Architecture</h2>
          </div>
          <p className="text-gray-400 max-w-md text-right md:text-right text-sm">
            No mockups. This is the exact technology stack powering the live evaluation demo you are about to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((item, idx) => (
            <Card key={idx} delay={idx * 0.1} className="min-h-[220px]">
              <div className="flex items-start justify-between mb-6">
                 <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 text-brand-accent">
                    <item.icon size={24} />
                 </div>
                 <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{item.tech}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;