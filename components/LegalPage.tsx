
import React from 'react';
import { ArrowLeft, Shield, FileText, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies';
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
  const getContent = () => {
    switch(type) {
      case 'privacy': 
        return { 
            title: "Privacy Policy", 
            icon: Shield,
            content: (
                <>
                    <p>At EvalGenius, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website.</p>
                    <h3>1. Collection of Data</h3>
                    <p>We collect personal data that you voluntarily provide to us when you register for the demo, express interest in obtaining information about us or our products, or otherwise contact us.</p>
                    <h3>2. Use of AI Models</h3>
                    <p>Uploaded documents for grading are processed transiently by our AI models (Gemini 2.5). We do not use your submitted student data to train our models without explicit enterprise agreements.</p>
                    <h3>3. Data Security</h3>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.</p>
                </>
            )
        };
      case 'terms': 
        return { 
            title: "Terms of Service", 
            icon: FileText,
            content: (
                <>
                    <p>These Terms of Service ("Terms") govern your access to and use of the EvalGenius website and services.</p>
                    <h3>1. Acceptance of Terms</h3>
                    <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
                    <h3>2. Demo Usage</h3>
                    <p>The demo provided on this website is for evaluation purposes only. It is not intended for production-grade academic grading without a licensed enterprise agreement.</p>
                    <h3>3. Intellectual Property</h3>
                    <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of EvalGenius and its licensors.</p>
                </>
            )
        };
      case 'cookies': 
        return { 
            title: "Cookie Policy", 
            icon: Cookie,
            content: (
                <>
                    <p>This Cookie Policy explains what cookies are and how we use them. You should read this policy so you can understand what type of cookies we use, or the information we collect using cookies and how that information is used.</p>
                    <h3>1. What are cookies?</h3>
                    <p>Cookies are small text files that are sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you.</p>
                    <h3>2. How EvalGenius uses cookies</h3>
                    <p>We use cookies for the following purposes: to enable certain functions of the Service, to provide analytics, to store your preferences, and to enable advertisements delivery, including behavioral advertising.</p>
                </>
            )
        };
      default: return { title: "", icon: FileText, content: "" };
    }
  };

  const { title, icon: Icon, content } = getContent();

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen text-gray-300">
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <button 
                onClick={onBack} 
                className="group flex items-center gap-2 text-gray-400 hover:text-brand-accent mb-12 transition-colors"
            >
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-brand-accent/20 transition-colors">
                    <ArrowLeft size={16} />
                </div>
                Back to Home
            </button>
            
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                    <Icon size={32} className="text-brand-accent" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-medium text-white">{title}</h1>
            </div>

            <div className="prose prose-invert prose-lg max-w-none bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12">
                <div className="text-sm text-gray-500 mb-8 font-mono">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                {content}
            </div>
        </motion.div>
    </div>
  );
};

export default LegalPage;
