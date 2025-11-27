
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoTicker from './components/LogoTicker';
import HowItWorks from './components/HowItWorks';
import BentoGrid from './components/BentoGrid';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import DemoPage from './components/DemoPage';
import LegalPage from './components/LegalPage';

type PageState = 'landing' | 'demo' | 'privacy' | 'terms' | 'cookies';

const App: React.FC = () => {
  // Initialize from localStorage or default to 'landing'
  const [currentPage, setCurrentPage] = useState<PageState>(() => {
    const saved = localStorage.getItem('evalgenius_page');
    return (saved as PageState) || 'landing';
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('evalgenius_page', currentPage);
  }, [currentPage]);

  const navigateToDemo = () => {
    setCurrentPage('demo');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('landing');
    window.scrollTo(0, 0);
    // Clear URL hash without reloading
    window.history.pushState(null, '', window.location.pathname);
  };

  const navigateToLegal = (page: 'privacy' | 'terms' | 'cookies') => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Handles navigation from Footer to specific sections like "How it Works"
  const navigateToSection = (sectionId: string) => {
    // If not on landing page, go there first
    if (currentPage !== 'landing') {
      setCurrentPage('landing');
      // Slight delay to allow DOM to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Already on landing, just scroll
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-brand-darker text-white selection:bg-brand-accent selection:text-brand-darker font-sans">
      <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      {/* Background Ambience */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-glow/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <Navbar
        onNavigateToDemo={navigateToDemo}
        onNavigateToHome={navigateToHome}
        isDemoMode={currentPage === 'demo'}
      />

      <main className="relative z-10">
        {currentPage === 'landing' && (
          <>
            <Hero onNavigateToDemo={navigateToDemo} />
            <LogoTicker />
            <HowItWorks />
            {/* Features Section Wrapper */}
            <section id="features">
              <BentoGrid />
            </section>
            <TechStack />
          </>
        )}

        {currentPage === 'demo' && <DemoPage />}

        {(currentPage === 'privacy' || currentPage === 'terms' || currentPage === 'cookies') && (
          <LegalPage type={currentPage} onBack={navigateToHome} />
        )}
      </main>

      <Footer
        onNavigateToSection={navigateToSection}
        onNavigateToLegal={navigateToLegal}
      />
    </div>
  );
};

export default App;
