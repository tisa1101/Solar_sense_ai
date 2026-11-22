import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, ChevronRight, Sun, Globe, UserCheck, Shield, ExternalLink, Zap, Flame } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          scrolled
            ? 'bg-[#060812]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-[#060812]/80 backdrop-blur-md border-b border-white/5'
        }`}
      >
        {/* Vice City Metro Utility Bar */}
        <div className="bg-[#04050B] border-b border-white/5 text-[11px] text-slate-400 py-1.5 px-4 sm:px-6 lg:px-8 font-mono">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#FF2E93] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93] animate-ping" />
                <span>LEONIDA POWER GRID // 78°F CLEAR</span>
              </span>
              <span className="hidden sm:inline text-slate-700">|</span>
              <span className="hidden sm:inline hover:text-white cursor-pointer transition-colors">
                Vice City Metro Clean Energy
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span
                onClick={() => handleNavClick('#solution-matrix')}
                className="hover:text-white cursor-pointer transition-colors hidden sm:inline"
              >
                SafeDC™ Architecture
              </span>
              <span
                onClick={() => navigate('/portal')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                20-Yr Warranty Vault
              </span>

              {/* Login Portal Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLoginMenuOpen(!loginMenuOpen)}
                  className="flex items-center gap-1.5 text-slate-300 hover:text-[#FF2E93] font-bold cursor-pointer py-0.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#FF7A00]" />
                  <span>Portal Gateways</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {loginMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 ti-dropdown p-1 z-50 text-xs text-slate-200" style={{ borderRadius: 0 }}>
                    <button
                      onClick={() => {
                        setLoginMenuOpen(false);
                        navigate('/portal');
                      }}
                      className="w-full text-left p-3 hover:bg-[#002A57] hover:text-[#F69125] transition-colors flex items-center justify-between group border-b border-white/10"
                    >
                      <div>
                        <div className="font-bold text-white group-hover:text-[#F69125] transition-colors font-['Space_Mono',monospace] text-xs flex items-center gap-2">
                          <span className="text-[#F69125]">01 //</span>
                          <span>CUSTOMER VAULT</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-['Work_Sans',sans-serif]">
                          Real-time yield, 4K film & billing
                        </div>
                      </div>
                      <span className="text-[#F69125] font-['Space_Mono',monospace] text-xs">↗</span>
                    </button>

                    <button
                      onClick={() => {
                        setLoginMenuOpen(false);
                        navigate('/dashboard');
                      }}
                      className="w-full text-left p-3 hover:bg-[#002A57] hover:text-[#315AF7] transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-bold text-white group-hover:text-[#315AF7] transition-colors font-['Space_Mono',monospace] text-xs flex items-center gap-2">
                          <span className="text-[#315AF7]">02 //</span>
                          <span>INSTALLER ERP</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-['Work_Sans',sans-serif]">
                          6 Scenes, warehouse & dispatch
                        </div>
                      </div>
                      <span className="text-[#315AF7] font-['Space_Mono',monospace] text-xs">↗</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Vice City Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo (Vice City Aesthetic) */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Vice City Angled Emblem */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div
                className="w-full h-full rounded-xl transition-transform group-hover:rotate-6 duration-300 shadow-[0_0_20px_rgba(255,46,147,0.5)] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF2E93 0%, #FF7A00 100%)',
                }}
              >
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                  SOLAR<span className="text-vice-gradient">SENSE</span>
                </span>
                <span className="text-[9px] font-mono font-black tracking-widest text-black bg-[#FF2E93] px-1.5 py-0.5 rounded uppercase">
                  VICE CITY
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 mt-0.5">
                LEONIDA CLEAN POWER ECOSYSTEM
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300">
            <button
              onClick={() => handleNavClick('#solution-matrix')}
              className="hover:text-white transition-colors py-2 relative group"
            >
              <span>Residential</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF2E93] to-[#FF7A00] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#commercial-showcase')}
              className="hover:text-white transition-colors py-2 relative group"
            >
              <span>Commercial</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF2E93] to-[#FF7A00] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#cutaway')}
              className="hover:text-white transition-colors py-2 relative group"
            >
              <span>3D Architecture</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF2E93] to-[#FF7A00] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#financing')}
              className="hover:text-white transition-colors py-2 relative group"
            >
              <span>Financing</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF2E93] to-[#FF7A00] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="hover:text-[#00F0FF] transition-colors py-2 relative group"
            >
              <span>Installer ERP</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00F0FF] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => navigate('/portal')}
              className="vice-btn-outline py-2.5 px-5 text-xs"
            >
              <Sun className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Customer Portal</span>
            </button>

            <button
              onClick={() => navigate('/portal')}
              className="vice-btn-primary py-2.5 px-6 text-xs"
            >
              <span>Get a Quote</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0A0E1A] border-b border-white/10 px-6 py-6 space-y-4"
            >
              <button
                onClick={() => handleNavClick('#solution-matrix')}
                className="block w-full text-left py-2 font-bold text-sm text-slate-300 hover:text-white"
              >
                Residential Solar
              </button>
              <button
                onClick={() => handleNavClick('#commercial-showcase')}
                className="block w-full text-left py-2 font-bold text-sm text-slate-300 hover:text-white"
              >
                Commercial Megawatt
              </button>
              <button
                onClick={() => handleNavClick('#cutaway')}
                className="block w-full text-left py-2 font-bold text-sm text-slate-300 hover:text-white"
              >
                3D Architecture
              </button>
              <button
                onClick={() => handleNavClick('#financing')}
                className="block w-full text-left py-2 font-bold text-sm text-slate-300 hover:text-white"
              >
                Financing & Subsidy
              </button>
              <button
                onClick={() => navigate('/portal')}
                className="block w-full text-left py-2 font-bold text-sm text-[#FF2E93]"
              >
                Customer Solar Vault
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="block w-full text-left py-2 font-bold text-sm text-[#00F0FF]"
              >
                Installer ERP Command Center
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
export default LandingNavbar;
