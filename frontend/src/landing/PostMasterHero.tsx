import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Search,
  PhoneCall,
  ChevronDown,
  Layers,
  Sun,
  Shield,
  Zap,
  BatteryCharging,
  Settings,
  Calendar,
  BarChart3,
  CheckCircle2,
  Bell,
  Home,
  Compass,
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';

export const PostMasterHero: React.FC = () => {
  const navigate = useNavigate();

  // Interactive state inside the studio mockup
  const [activeTab, setActiveTab] = useState<'create' | 'analysis' | 'roof' | 'schedule' | 'grid' | 'analytics' | 'settings'>('create');
  const [systemType, setSystemType] = useState('hybrid-10kwh');
  const [promptText, setPromptText] = useState(
    'Captivating Efficiency: Sizing an ultra-efficient 8.4 kW rooftop array with SolarEdge SafeDC™ touch-safe architecture, DC-coupled 10 kWh battery backup, and zero grid export curtailment.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationCount, setGenerationCount] = useState(1);

  // System type details
  const systemOptions = [
    { id: 'hybrid-10kwh', label: 'Hybrid Solar + 10 kWh Battery', kw: '8.4 kW', eff: '99.2%', battery: '10 kWh LiFePO4', savings: '₹14,200/mo' },
    { id: 'ongrid-5kw', label: 'On-Grid String Array (5.0 kW)', kw: '5.0 kW', eff: '98.6%', battery: 'Grid-Tied (0 kWh)', savings: '₹8,400/mo' },
    { id: 'offgrid-15kwh', label: 'Off-Grid Zero-Curfew (12 kW)', kw: '12.0 kW', eff: '99.4%', battery: '20 kWh Dual-Bank', savings: '₹22,800/mo' },
    { id: 'commercial-25kw', label: 'Commercial BIPV Rooftop (25 kW)', kw: '25.0 kW', eff: '99.5%', battery: '40 kWh Commercial', savings: '₹46,000/mo' }
  ];

  const currentSystem = systemOptions.find((s) => s.id === systemType) || systemOptions[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationCount((c) => c + 1);
    }, 700);
  };

  const handleAutoDerive = () => {
    setPromptText(
      `AI Auto-Optimized: Calibrated for ${currentSystem.kw} yield with real-time shadow mitigation, 1V touch-safe DC rapid shutdown, and dynamic DISCOM time-of-day tariff arbitrage.`
    );
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#06040C] text-white">
      {/* =========================================================
          GTA VI / VICE CITY CINEMATIC ATMOSPHERE & SUNSET HORIZON
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Hot Pink Sunset Radial Flare (Top-Center) */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[650px] rounded-full blur-[180px] opacity-35"
          style={{ background: 'radial-gradient(circle, #FF2E93 0%, #FF7A00 45%, rgba(121,40,202,0.3) 70%, transparent 85%)' }}
        />
        {/* Miami Orange / Golden Hour Ambient Light (Right Side) */}
        <div
          className="absolute top-1/4 -right-40 w-[700px] h-[700px] rounded-full blur-[190px] opacity-25"
          style={{ background: 'radial-gradient(circle, #FF7A00 0%, #FF2E93 40%, transparent 75%)' }}
        />
        {/* Deep Vice Purple / Cyan Nightlife Depth (Left Side) */}
        <div
          className="absolute top-1/3 -left-40 w-[750px] h-[750px] rounded-full blur-[180px] opacity-25"
          style={{ background: 'radial-gradient(circle, #7928CA 0%, #00F0FF 30%, transparent 75%)' }}
        />
        {/* Subtle Horizontal Sunset Horizon Band */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2E93]/25 to-transparent" />

        {/* Tropical Palm Tree Silhouette Accents */}
        <div className="absolute bottom-0 left-0 w-80 h-96 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,#FF2E93_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,#FF7A00_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Header & Headline Area */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          {/* Rockstar-Style Cinematic Eyebrow Tag */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#FF2E93]/40 bg-[#FF2E93]/10 text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_30px_rgba(255,46,147,0.35)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF2E93] animate-ping" />
            <span className="text-[#FF2E93]">LEONIDA POWER INITIATIVE</span>
            <span className="text-white/30">•</span>
            <span className="text-[#FF7A00]">VICE CITY 2026</span>
            <span className="text-white/30">•</span>
            <span className="text-[#00F0FF]">AI NEURAL GRID</span>
          </motion.div>

          {/* Bold Cinematic Display Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 font-['Plus_Jakarta_Sans',sans-serif] uppercase"
          >
            UNLIMITED POWER.{' '}
            <br />
            <span className="bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(255,46,147,0.4)]">
              ZERO GRID DEPENDENCY.
            </span>
          </motion.h1>

          {/* Subtitle Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#D5CEE0] leading-relaxed max-w-2xl mx-auto mb-9 font-normal font-sans"
          >
            Harness peak tropical irradiance with DC-optimized bifacial modules, whole-estate 10 kWh battery storage, and Keras deep neural vision engineered for complete energy freedom.
          </motion.p>

          {/* GTA VI Sunset Gradient CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={() => navigate('/portal')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-bold text-sm tracking-wide uppercase hover:brightness-110 transition-all shadow-[0_4px_30px_rgba(255,46,147,0.45)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#three-steps');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all hover:border-[#FF2E93]/50 cursor-pointer"
            >
              Explore Architecture
            </button>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#A79FB6] font-mono"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93]" />
              Zero credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
              PM Surya Ghar ₹78,000 Subsidy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              SafeDC™ 1V Touch-Safe Certified
            </span>
          </motion.div>
        </div>

        {/* =========================================================
            CENTER STUDIO CARD MOCKUP (POST MASTER + VICE CITY THEME)
            ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative max-w-5xl mx-auto rounded-3xl border border-white/15 bg-[#100A1C]/90 backdrop-blur-2xl shadow-[0_25px_90px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Top Window Navigation Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0C0716]/90">
            {/* Logo / Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF2E93] to-[#FF7A00] flex items-center justify-center shadow-[0_0_20px_rgba(255,46,147,0.45)]">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider uppercase text-white font-mono">
                  SOLARSENSE STUDIO
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] text-[#00F0FF] font-mono bg-[#00F0FF]/10 px-1.5 py-0.5 rounded border border-[#00F0FF]/20">
                  v2.6 LIVE
                </span>
              </div>
            </div>

            {/* Central Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 w-80 text-xs text-[#A79FB6]">
              <Search className="w-3.5 h-3.5 text-[#A79FB6]" />
              <span>Search anything you want ...</span>
              <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60 font-mono">⌘K</span>
            </div>

            {/* Right Quick Support & Profile */}
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => navigate('/portal')}
                className="hidden sm:flex items-center gap-1.5 text-[#D5CEE0] hover:text-[#FF7A00] transition-colors cursor-pointer font-medium"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FF2E93]" />
                <span>Call 24/7 Support</span>
              </button>

              <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7928CA] via-[#FF2E93] to-[#FF7A00] flex items-center justify-center text-[11px] font-bold text-white shadow-inner">
                  EV
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-[11px] font-bold text-white leading-tight">Elena Vance</div>
                  <div className="text-[9px] text-[#FF2E93] font-mono">Lead Architect</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Studio Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[530px]">
            {/* Left Sidebar Menu */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-[#0A0614]/60">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#7E758D] px-3 mb-3 font-mono">
                TELEMETRY SUITE
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'create', label: 'Create System', icon: Sparkles },
                  { id: 'analysis', label: 'Solar Analysis', icon: Zap },
                  { id: 'roof', label: 'Roof Vision AI', icon: Layers },
                  { id: 'schedule', label: 'Schedule Audit', icon: Calendar },
                  { id: 'grid', label: 'Grid Net-Metering', icon: BatteryCharging },
                  { id: 'analytics', label: 'Financial Analytics', icon: BarChart3 },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FF2E93]/20 via-[#FF7A00]/10 to-transparent text-white border border-[#FF2E93]/30 shadow-[0_2px_15px_rgba(255,46,147,0.2)]'
                          : 'text-[#A79FB6] hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF2E93]' : 'text-[#7E758D]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-4 border-t border-white/10 px-3">
                <div className="text-[10px] text-[#7E758D] uppercase tracking-wider mb-2 font-mono">
                  ACTIVE DISCOM
                </div>
                <div className="flex items-center justify-between text-xs text-white">
                  <span>Tata Power Delhi</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-[#00F0FF] mt-0.5 font-mono">Bi-directional Net Meter</div>
              </div>
            </div>

            {/* Middle Column: Generate System Formulation */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#120B1F]/70">
              <div>
                <div className="mb-5">
                  <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wide font-mono">
                    Generate Solar Architecture
                  </h3>
                  <p className="text-xs text-[#A79FB6] leading-relaxed">
                    Specify capacity, roof type, and storage. Our neural engine synthesizes real-time DISCOM optimization.
                  </p>
                </div>

                {/* System Type Dropdown */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-[#D5CEE0] mb-1.5 uppercase font-mono tracking-wider">
                    System type
                  </label>
                  <div className="relative">
                    <select
                      value={systemType}
                      onChange={(e) => setSystemType(e.target.value)}
                      className="ti-select w-full text-xs text-white bg-[#140D24]/90 border border-white/15 rounded-xl py-2.5 px-3.5 focus:border-[#FF2E93] focus:outline-none focus:ring-1 focus:ring-[#FF2E93]/40 transition-all cursor-pointer"
                    >
                      {systemOptions.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-[#0C0716] text-white">
                          {opt.label} ({opt.kw})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Prompt Textarea */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#D5CEE0] uppercase font-mono tracking-wider">
                      Architecture Prompt
                    </label>
                    <button
                      onClick={handleAutoDerive}
                      type="button"
                      className="text-[11px] text-[#FF2E93] hover:text-[#FF7A00] flex items-center gap-1 font-bold transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Auto-derive with AI ✦</span>
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="ti-input w-full text-xs text-white/90 bg-[#140D24]/70 border border-white/15 rounded-xl p-3 focus:border-[#FF2E93] focus:outline-none focus:ring-1 focus:ring-[#FF2E93]/40 leading-relaxed resize-none"
                  />
                </div>

                {/* Quick specs chips */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-center">
                    <div className="text-[10px] text-[#7E758D] font-mono">PEAK POWER</div>
                    <div className="text-xs font-bold text-white mt-0.5">{currentSystem.kw}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-center">
                    <div className="text-[10px] text-[#7E758D] font-mono">CEC EFFICIENCY</div>
                    <div className="text-xs font-bold text-[#FF2E93] mt-0.5">{currentSystem.eff}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-center">
                    <div className="text-[10px] text-[#7E758D] font-mono">EST. SAVINGS</div>
                    <div className="text-xs font-bold text-[#FF7A00] mt-0.5">{currentSystem.savings}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,46,147,0.35)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGenerating ? 'Synthesizing Neural Architecture...' : 'Generate System Spec ✦'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: iPhone 15 Pro Smartphone Mockup */}
            <div className="lg:col-span-4 p-6 bg-[#0B0616]/80 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-white uppercase font-mono tracking-wider">PREVIEW SYSTEM</span>
                <span className="text-[10px] text-[#FF2E93] bg-[#FF2E93]/10 px-2 py-0.5 rounded-lg border border-[#FF2E93]/20 font-mono">
                  iPhone 15 Pro
                </span>
              </div>

              {/* Smartphone Frame */}
              <div className="relative w-[230px] rounded-[38px] p-2.5 bg-gradient-to-b from-[#3A244D] via-[#1E112A] to-[#100A18] shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20">
                {/* Outer Bezel Screen */}
                <div className="rounded-[30px] bg-[#0A0514] overflow-hidden p-3 relative min-h-[385px] flex flex-col justify-between">
                  {/* Dynamic Island / Status Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[9px] text-white/80 px-1 mb-2 font-mono">
                      <span>9:41</span>
                      <div className="w-12 h-3.5 bg-black rounded-full mx-auto" />
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-1.5 border border-white/70 rounded-sm" />
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF2E93] to-[#FF7A00] flex items-center justify-center text-[10px] text-white font-bold">
                        EV
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FF2E93]/15 border border-[#FF2E93]/30 text-[9px] text-[#FF2E93] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Array</span>
                      </div>
                      <Bell className="w-3.5 h-3.5 text-[#D5CEE0]" />
                    </div>

                    {/* Pill Filter Tabs */}
                    <div className="flex items-center gap-1.5 mb-3 bg-white/[0.04] p-1 rounded-full border border-white/10">
                      <button className="flex-1 py-1 rounded-full bg-[#FF2E93]/20 border border-[#FF2E93]/40 text-[9px] font-bold text-white shadow-sm text-center">
                        My Array
                      </button>
                      <button className="flex-1 py-1 rounded-full text-[9px] text-[#A79FB6] text-center font-medium">
                        Yield
                      </button>
                    </div>

                    {/* Hero Card: "AI Solar Harvest" */}
                    <div className="relative rounded-2xl p-3 mb-2.5 overflow-hidden border border-[#FF2E93]/30 bg-gradient-to-b from-[#FF2E93]/20 via-[#2E1538]/50 to-[#12091A] shadow-inner">
                      {/* Radial Sunset Glow inside card */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#FF7A00]/40 blur-xl pointer-events-none" />

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex -space-x-1.5">
                          <div className="w-4 h-4 rounded-full bg-[#FF2E93] text-[7px] font-bold text-white flex items-center justify-center">
                            +1k
                          </div>
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                          Active
                        </span>
                      </div>

                      <div className="text-xs font-bold text-white mb-0.5 font-['Plus_Jakarta_Sans',sans-serif]">
                        {currentSystem.label.split('(')[0]}
                      </div>

                      <div className="text-[9px] text-[#D5CEE0] mb-2 flex items-center gap-2 font-mono">
                        <span>⚡ {currentSystem.kw}</span>
                        <span>★ {currentSystem.eff}</span>
                      </div>

                      <div className="flex items-center justify-between text-[8px] text-[#FF2E93] font-bold pt-1.5 border-t border-white/10">
                        <span>Generation #{generationCount}</span>
                        <span className="flex items-center gap-0.5 hover:underline cursor-pointer">
                          Inspect <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>

                    {/* Daily Progress Ring Card */}
                    <div className="rounded-xl p-2 bg-white/[0.03] border border-white/10 mb-2">
                      <div className="flex items-center justify-between text-[8px] text-[#A79FB6] mb-1 font-mono">
                        <span>DAILY GENERATION</span>
                        <span className="text-emerald-400 font-bold">94%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] h-1.5 rounded-full w-[94%]" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Frosted Bottom Dock */}
                  <div className="flex items-center justify-around py-1.5 px-3 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[#A79FB6]">
                    <Home className="w-3 h-3 text-white" />
                    <Compass className="w-3 h-3 hover:text-white" />
                    <Zap className="w-3 h-3 text-[#FF2E93]" />
                    <Settings className="w-3 h-3 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Enterprise Logos */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-widest text-[#7E758D] font-mono mb-8 font-bold">
            THESE INDUSTRY LEADERS RELY ON SOLARSENSE FOR CLEAN ENERGY INTELLIGENCE
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 hover:opacity-100 transition-opacity">
            <span className="text-sm font-bold tracking-widest text-white/90 font-mono">SOLAREDGE</span>
            <span className="text-sm font-bold tracking-widest text-white/90 font-mono">ENPHASE</span>
            <span className="text-sm font-bold tracking-widest text-[#FF2E93] font-mono">TATA POWER</span>
            <span className="text-sm font-bold tracking-widest text-white/90 font-mono">SCHNEIDER</span>
            <span className="text-sm font-bold tracking-widest text-[#FF7A00] font-mono">TESLA ENERGY</span>
            <span className="text-sm font-bold tracking-widest text-[#00F0FF] font-mono">SIEMENS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
