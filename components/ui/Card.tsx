import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, delay = 0 }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "0 10px 40px -10px rgba(74,222,128,0.1)" }}
      className={`glass-card rounded-3xl p-6 md:p-8 flex flex-col relative overflow-hidden group ${className}`}
    >
      {/* Subtle Grid Background inside card */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {title && (
          <h3 className="text-2xl md:text-3xl font-display font-light text-gray-200 mb-6 leading-tight">
            {title}
          </h3>
        )}
        {children}
      </div>

      {/* Hover corner glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-brand-accent/20 blur-[80px] rounded-full group-hover:bg-brand-accent/30 transition-all duration-500" />
    </MotionDiv>
  );
};

export default Card;