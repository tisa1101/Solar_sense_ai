import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Sun, Shield, UserCheck, ArrowRight, Sparkles } from 'lucide-react';

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
          ? 'bg-[#07040E]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#07040E]/60 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo (Post Master clean style) */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF7A59] via-[#FF5C8A] to-[#E284B3] flex items-center justify-center shadow-[0_0_18px_rgba(255,122,89,0.35)] group-hover:scale-105 transition-transform">
              <Sun className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-white">SolarSense</span>
              <span className="text-sm text-[#FF9E79]">✦</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#9A91AB]">
            <button
              onClick={() => handleNavClick('#three-steps')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => navigate('/portal')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[#E284B3]"
            >
              <Sparkles className="w-3 h-3" />
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-[#B5AEC6] hover:text-white bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
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
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#120D1D] border border-white/15 p-2 shadow-2xl backdrop-blur-2xl z-50"
                  >
                    <button
                      onClick={() => {
                        setPortalMenuOpen(false);
                        navigate('/portal');
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-left hover:bg-white/[0.06] text-white transition-colors cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#FF7A59]/15 border border-[#FF7A59]/30 flex items-center justify-center text-[#FF7A59]">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Customer Portal</div>
                        <div className="text-[10px] text-[#8B839E]">AI Recommendations & OCR</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setPortalMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl text-xs text-left hover:bg-white/[0.06] text-white transition-colors cursor-pointer mt-1"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#9B51E0]/15 border border-[#9B51E0]/30 flex items-center justify-center text-[#E284B3]">
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Admin Operations</div>
                        <div className="text-[10px] text-[#8B839E]">Fleet Telemetry & Dispatch</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Primary Get Started Free CTA */}
            <button
              onClick={() => navigate('/portal')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF7A59] via-[#FF5C8A] to-[#E284B3] text-white font-medium text-xs hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(255,122,89,0.3)] cursor-pointer"
            >
              Get started for free
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-white"
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
            className="md:hidden border-b border-white/10 bg-[#0E0A17] px-4 py-6 space-y-4 text-xs font-medium"
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
              className="block w-full text-left py-2 text-[#E284B3]"
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
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FF7A59] to-[#E284B3] text-white font-medium text-xs text-center"
            >
              Get started for free
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
