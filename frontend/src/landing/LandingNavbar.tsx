import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Sun, Shield, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { CompanyLogo } from '../components/CompanyLogo';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalMenuOpen, setPortalMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (selector: string) => {
    setMobileOpen(false);
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        scrolled
          ? 'bg-[#06040C]/95 backdrop-blur-2xl border-b border-[#FF2E93]/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
          : 'bg-[#06040C]/75 backdrop-blur-md border-b border-white/5'
      }`}
    >
      {/* Vice City Metro Telemetry Bar */}
      <div className="bg-[#05030A] border-b border-white/5 text-[11px] text-[#A79FB6] py-1.5 px-4 sm:px-6 lg:px-8 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#FF2E93] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93] animate-ping" />
              <span>LEONIDA POWER GRID // 78°F CLEAR</span>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-[#D5CEE0] hover:text-white cursor-pointer transition-colors">
              Vice City Clean Energy Network
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span
              onClick={() => handleNavClick('#solution-matrix')}
              className="hover:text-white cursor-pointer transition-colors hidden sm:inline"
            >
              Grid Architecture
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-[#00F0FF] font-bold">
              NET-METERING ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with GTA VI Sunset Flare */}
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            <CompanyLogo size="md" subtitle="LEONIDA 2026" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#A79FB6] font-mono">
            <button
              onClick={() => handleNavClick('#three-steps')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => navigate('/portal')}
              className="hover:text-[#FF2E93] transition-colors cursor-pointer flex items-center gap-1.5 text-[#FF2E93]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Intelligence</span>
            </button>
            <button
              onClick={() => handleNavClick('#roi-calculator')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ROI Calculator
            </button>
            <button
              onClick={() => handleNavClick('#solution-matrix')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Architecture
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Portal Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalMenuOpen(!portalMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#D5CEE0] hover:text-white bg-white/[0.04] border border-white/10 hover:border-[#FF2E93]/40 transition-all cursor-pointer font-mono"
              >
                <span>Portal Logins</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${portalMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {portalMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#120B1F] border border-white/15 p-2.5 shadow-2xl backdrop-blur-2xl z-50"
                  >
                    <button
                      onClick={() => {
                        setPortalMenuOpen(false);
                        navigate('/portal');
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-left hover:bg-white/[0.06] text-white transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FF2E93]/15 border border-[#FF2E93]/30 flex items-center justify-center text-[#FF2E93]">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">Customer Portal</div>
                        <div className="text-[10px] text-[#A79FB6]">AI Recommendations & OCR</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setPortalMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-left hover:bg-white/[0.06] text-white transition-colors cursor-pointer mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#7928CA]/20 border border-[#7928CA]/40 flex items-center justify-center text-[#FF7A00]">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">Admin Operations</div>
                        <div className="text-[10px] text-[#A79FB6]">Fleet Telemetry & Dispatch</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary Get Started Free CTA with Sunset Gradient */}
            <button
              onClick={() => navigate('/portal')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_4px_22px_rgba(255,46,147,0.35)] hover:scale-105 cursor-pointer"
            >
              Get started for free
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-white/10 bg-[#0E071A] px-5 py-6 space-y-4 text-xs font-bold uppercase tracking-wider font-mono"
          >
            <button
              onClick={() => handleNavClick('#three-steps')}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate('/portal');
              }}
              className="block w-full text-left py-2 text-[#FF2E93]"
            >
              AI Solar Intelligence
            </button>
            <button
              onClick={() => handleNavClick('#roi-calculator')}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              ROI Calculator
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate('/portal');
              }}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              Customer Portal
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate('/dashboard');
              }}
              className="block w-full text-left py-2 text-white/80 hover:text-white"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                navigate('/portal');
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-bold text-xs text-center uppercase tracking-wider"
            >
              Get started for free
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
