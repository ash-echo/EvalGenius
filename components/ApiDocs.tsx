import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Terminal, Play } from 'lucide-react';

const codeSnippet = `
# Python Example
import requests

url = "https://api.evalgenius.ai/v1/evaluate"
payload = {
    "api_key": "sk_live_...",
    "student_id": "12345",
    "files": [
        ("answer_sheet", open("paper.pdf", "rb")),
        ("answer_key", open("key.pdf", "rb"))
    ]
}

response = requests.post(url, files=payload)
print(response.json())
`;

const jsonResponse = `
{
  "status": "success",
  "data": {
    "student_id": "12345",
    "score": 92.5,
    "breakdown": [
      {
        "q_id": 1,
        "marks_obtained": 5,
        "max_marks": 5,
        "feedback": "Perfect explanation of concepts."
      }
    ]
  }
}
`;

const ApiDocs: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api-docs" className="py-24 relative">
       {/* Background Noise for specific section */}
       <div className="absolute inset-0 bg-brand-darker/50" />
       
       <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             
             {/* Left Content */}
             <div>
                <span className="text-brand-accent text-sm font-semibold tracking-wider uppercase">Developers First</span>
                <h2 className="text-3xl md:text-5xl font-display text-white mt-3 mb-6">Integrate AI Grading into your LMS</h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                   EvalGenius isn't just a dashboard; it's a powerful API. Integrate our evaluation engine directly into Canvas, Blackboard, or your custom learning platform with just a few lines of code.
                </p>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                         <Check size={16} />
                      </div>
                      <span className="text-gray-300">RESTful API Architecture</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                         <Check size={16} />
                      </div>
                      <span className="text-gray-300">Webhooks for Async Processing</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                         <Check size={16} />
                      </div>
                      <span className="text-gray-300">99.99% Uptime SLA</span>
                   </div>
                </div>

                <button className="mt-10 border border-white/20 hover:border-brand-accent text-white hover:text-brand-accent px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2">
                   Read Full Documentation <ArrowRight size={16} />
                </button>
             </div>

             {/* Right Content - Terminal */}
             <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-blue-500 rounded-2xl blur opacity-20" />
                <div className="relative bg-[#0F1410] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                   {/* Terminal Header */}
                   <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-500/50" />
                         <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                         <div className="w-3 h-3 rounded-full bg-green-500/50" />
                      </div>
                      <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                         <Terminal size={12} /> bash — 80x24
                      </div>
                      <button onClick={handleCopy} className="text-gray-500 hover:text-white transition-colors">
                         {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                   </div>

                   {/* Terminal Body */}
                   <div className="p-6 font-mono text-xs md:text-sm overflow-x-auto">
                      <div className="text-gray-400 mb-2"># Request</div>
                      <pre className="text-purple-300 mb-6 whitespace-pre-wrap">{codeSnippet.trim()}</pre>
                      
                      <div className="text-gray-400 mb-2"># Response</div>
                      <pre className="text-brand-accent whitespace-pre-wrap">{jsonResponse.trim()}</pre>

                      <div className="mt-4 flex items-center gap-2">
                         <span className="text-green-500">➜</span>
                         <span className="text-blue-400">~</span>
                         <span className="w-2 h-4 bg-gray-500 animate-pulse" />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};

// Simple ArrowRight component for the button since it wasn't imported
const ArrowRight = ({ size }: { size: number }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
);

export default ApiDocs;