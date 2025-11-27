import React from 'react';

const technologies = [
  "FastAPI", "React", "Python", "OpenAI", "LangChain", "TensorFlow", "Docker", "PostgreSQL", "TailwindCSS", "Redis"
];

const LogoTicker: React.FC = () => {
  return (
    <section className="py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="relative flex w-full">
        {/* Gradients for smooth fade out at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-brand-darker to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-brand-darker to-transparent" />
        
        <div className="flex items-center gap-16 animate-[scroll_30s_linear_infinite] w-max px-16">
          {[...technologies, ...technologies, ...technologies].map((tech, i) => (
            <div key={`${tech}-${i}`} className="text-xl md:text-2xl font-display font-semibold text-gray-600 hover:text-white transition-colors duration-300 cursor-default select-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent/20"></span>
              {tech}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
};

export default LogoTicker;