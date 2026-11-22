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
  Sliders,
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
    <section className="relative min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#07040E] text-white">
      {/* Planetary Atmosphere & Glowing Orbs (Exact Reference: Image 3) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Peach / Coral Ambient Sphere (Top Center / Right) */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/4 w-[520px] h-[520px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #FF9E79 0%, #FF5C8A 45%, transparent 75%)' }}
        />
        {/* Deep Mauve / Purple Radial Glow (Left Center) */}
        <div
          className="absolute top-1/3 -left-32 w-[600px] h-[600px] rounded-full blur-[170px] opacity-20"
          style={{ background: 'radial-gradient(circle, #9B51E0 0%, #682CD6 40%, transparent 75%)' }}
        />
        {/* Soft Celestial Glow behind the Studio Mockup */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full blur-[160px] opacity-15"
          style={{ background: 'radial-gradient(ellipse, #E284B3 0%, #7928CA 50%, transparent 80%)' }}
        />
        {/* Floating Ring / Sphere Graphic Accents */}
        <div className="absolute top-44 left-16 w-16 h-16 rounded-full border border-white/10 opacity-40 blur-[0.5px]" />
        <div className="absolute top-64 right-24 w-24 h-24 rounded-full border border-white/10 opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hero Header & Headline Area */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          {/* Eyebrow Sparkle Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="text-xl sm:text-2xl text-[#E284B3] font-light tracking-wide">
              where AI meets clean energy management.
            </span>
            <span className="text-xl sm:text-2xl text-[#FF9E79]">✦</span>
          </motion.div>

          {/* Subtitle Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-base sm:text-lg text-[#B5AEC6] leading-relaxed max-w-2xl mx-auto mb-9 font-normal"
          >
            Discover the Future of Solar Energy with SolarSense's Neural AI Integration. Your Gateway to Effortless AI-Driven Clean Energy Optimization.
          </motion.p>

          {/* CTA Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <button
              onClick={() => navigate('/portal')}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF7A59] via-[#FF5C8A] to-[#E284B3] text-white font-medium text-sm hover:brightness-110 transition-all shadow-[0_4px_25px_rgba(255,122,89,0.35)] cursor-pointer"
            >
              Get started for free
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#three-steps');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/90 font-medium text-sm border border-white/12 backdrop-blur-md transition-all cursor-pointer"
            >
              Learn more
            </button>
          </motion.div>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center justify-center gap-6 text-xs text-[#8B839E]"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E284B3]" />
              14-day energy guarantee
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9B51E0]" />
              Instant DISCOM simulation
            </span>
          </motion.div>
        </div>

        {/* Center Studio Card Mockup (Exact Centerpiece from Image 3 & Image 2) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-white/12 bg-[#120D1D]/90 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Top Window Navigation Bar (from Image 3) */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0A17]/80">
            {/* Logo / Title */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FF7A59] to-[#E284B3] flex items-center justify-center shadow-[0_0_15px_rgba(255,122,89,0.4)]">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm tracking-wide text-white">SolarSense Studio</span>
            </div>

            {/* Central Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 w-80 text-xs text-[#8B839E]">
              <Search className="w-3.5 h-3.5 text-[#8B839E]" />
              <span>Search anything you want ...</span>
              <span className="ml-auto text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/60">⌘K</span>
            </div>

            {/* Right Quick Support & Profile */}
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => navigate('/portal')}
                className="hidden sm:flex items-center gap-1.5 text-[#B5AEC6] hover:text-white transition-colors cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#FF7A59]" />
                <span>Call 24/7 Support</span>
              </button>

              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9B51E0] to-[#FF5C8A] flex items-center justify-center text-[11px] font-bold text-white shadow-inner">
                  EV
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-[11px] font-medium text-white leading-tight">Elena Vance</div>
                  <div className="text-[9px] text-[#8B839E]">Lead Architect</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Studio Body (from Image 3 & Image 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
            {/* Left Sidebar Menu */}
            <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-[#0F0A19]/50">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#7B738D] px-3 mb-3">
                MAIN
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
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-white/10 to-white/[0.04] text-white border border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.3)]'
                          : 'text-[#9A91AB] hover:text-white hover:bg-white/[0.03]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF9E79]' : 'text-[#7B738D]'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-4 border-t border-white/10 px-3">
                <div className="text-[10px] text-[#7B738D] uppercase tracking-wider mb-2 font-mono">
                  ACTIVE DISCOM
                </div>
                <div className="flex items-center justify-between text-xs text-white">
                  <span>Tata Power Delhi</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-[#B5AEC6] mt-0.5">Bi-directional Net Meter</div>
              </div>
            </div>

            {/* Middle Column: Generate System Formulation (from Image 3) */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#120D1D]/70">
              <div>
                <div className="mb-5">
                  <h3 className="text-base font-semibold text-white mb-1">Generate Solar Architecture</h3>
                  <p className="text-xs text-[#9A91AB] leading-relaxed">
                    specify the desired capacity, roof type, and storage. Once you provide that information, AI will optimize the array accordingly.
                  </p>
                </div>

                {/* System Type Dropdown (Exact match to clean dropdown from Image 3) */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-[#B5AEC6] mb-1.5">
                    System type
                  </label>
                  <div className="relative">
                    <select
                      value={systemType}
                      onChange={(e) => setSystemType(e.target.value)}
                      className="ti-select w-full text-xs text-white bg-[#130E20]/90 border border-white/15 rounded-xl py-2.5 px-3.5 focus:border-[#E284B3] focus:outline-none focus:ring-1 focus:ring-[#E284B3]/30 transition-all cursor-pointer"
                    >
                      {systemOptions.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-[#0E0A18] text-white">
                          {opt.label} ({opt.kw})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Prompt Textarea with "Generate with AI" action link (from Image 3) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-medium text-[#B5AEC6]">
                      Architecture prompt
                    </label>
                    <button
                      onClick={handleAutoDerive}
                      type="button"
                      className="text-[11px] text-[#E284B3] hover:text-[#FF9E79] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Generate with AI</span>
                    </button>
                  </div>

                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    className="ti-input w-full text-xs text-white/90 bg-[#120D1E]/70 border border-white/15 rounded-xl p-3 focus:border-[#E284B3] focus:outline-none focus:ring-1 focus:ring-[#E284B3]/30 leading-relaxed resize-none"
                  />
                </div>

                {/* Quick specs chips */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2 text-center">
                    <div className="text-[10px] text-[#8B839E]">Peak Power</div>
                    <div className="text-xs font-bold text-white mt-0.5">{currentSystem.kw}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2 text-center">
                    <div className="text-[10px] text-[#8B839E]">CEC Eff.</div>
                    <div className="text-xs font-bold text-[#E284B3] mt-0.5">{currentSystem.eff}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2 text-center">
                    <div className="text-[10px] text-[#8B839E]">Est. Savings</div>
                    <div className="text-xs font-bold text-[#FF7A59] mt-0.5">{currentSystem.savings}</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7A59] via-[#FF5C8A] to-[#E284B3] hover:brightness-110 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(255,122,89,0.3)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGenerating ? 'Synthesizing Neural Architecture...' : 'Generate System Spec ✦'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Preview Post / Smartphone Mockup (Exact Reference: Image 3 + Image 2) */}
            <div className="lg:col-span-4 p-6 bg-[#0E0A17]/70 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-white">Preview System</span>
                <span className="text-[11px] text-[#8B839E] bg-white/[0.04] px-2 py-0.5 rounded-lg border border-white/10">
                  iPhone 15 Pro
                </span>
              </div>

              {/* Smartphone Frame (Recreated from Image 2 & Image 3) */}
              <div className="relative w-[230px] rounded-[36px] p-2.5 bg-gradient-to-b from-[#2B233C] via-[#1A1424] to-[#120D1D] shadow-[0_15px_40px_rgba(0,0,0,0.8)] border border-white/15">
                {/* Outer bezel line */}
                <div className="rounded-[30px] bg-[#0E0A17] overflow-hidden p-3 relative min-h-[380px] flex flex-col justify-between">
                  {/* Dynamic Island / Status Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[9px] text-white/80 px-1 mb-2 font-mono">
                      <span>9:41</span>
                      <div className="w-12 h-3 bg-black rounded-full mx-auto" />
                      <div className="flex items-center gap-1">
                        <span className="w-2.5 h-1.5 border border-white/70 rounded-sm" />
                      </div>
                    </div>

                    {/* App Header (Image 2 Style) */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF7A59] to-[#E284B3] flex items-center justify-center text-[10px] text-white font-bold">
                        EV
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 text-[9px] text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live Array</span>
                      </div>
                      <Bell className="w-3.5 h-3.5 text-[#B5AEC6]" />
                    </div>

                    {/* Pill Filter Tabs (from Image 2: "My Courses / Progress") */}
                    <div className="flex items-center gap-1.5 mb-3 bg-white/[0.04] p-1 rounded-full border border-white/10">
                      <button className="flex-1 py-1 rounded-full bg-white/10 text-[9px] font-medium text-white shadow-sm text-center">
                        My Array
                      </button>
                      <button className="flex-1 py-1 rounded-full text-[9px] text-[#8B839E] text-center">
                        Yield
                      </button>
                    </div>

                    {/* Hero Card: "AI for Solar Harvest" (Recreated from Image 2) */}
                    <div className="relative rounded-2xl p-3 mb-2.5 overflow-hidden border border-white/15 bg-gradient-to-b from-[#E284B3]/20 via-[#2A1733]/40 to-[#150D20] shadow-inner">
                      {/* Radial Sunset Glow inside card */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#FF7A59]/30 blur-xl pointer-events-none" />

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex -space-x-1.5">
                          <div className="w-4 h-4 rounded-full bg-[#FF7A59] text-[7px] font-bold text-white flex items-center justify-center">
                            +1k
                          </div>
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                          Active
                        </span>
                      </div>

                      <div className="text-xs font-bold text-white mb-0.5">
                        {currentSystem.label.split('(')[0]}
                      </div>

                      <div className="text-[9px] text-[#B5AEC6] mb-2 flex items-center gap-2">
                        <span>⚡ {currentSystem.kw}</span>
                        <span>★ {currentSystem.eff}</span>
                      </div>

                      <div className="flex items-center justify-between text-[8px] text-[#E284B3] font-medium pt-1.5 border-t border-white/10">
                        <span>Generation #{generationCount}</span>
                        <span className="flex items-center gap-0.5 hover:underline cursor-pointer">
                          Inspect <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>

                    {/* Daily Progress Ring Card (from Image 2 - right screen) */}
                    <div className="rounded-xl p-2 bg-white/[0.03] border border-white/10 mb-2">
                      <div className="flex items-center justify-between text-[8px] text-[#8B839E] mb-1">
                        <span>Daily Generation</span>
                        <span className="text-emerald-400 font-bold">94%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#FF7A59] to-[#E284B3] h-1.5 rounded-full w-[94%]" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Frosted Bottom Dock (from Image 2) */}
                  <div className="flex items-center justify-around py-1.5 px-3 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-[#8B839E]">
                    <Home className="w-3 h-3 text-white" />
                    <Compass className="w-3 h-3 hover:text-white" />
                    <Zap className="w-3 h-3 text-[#FF7A59]" />
                    <Settings className="w-3 h-3 hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Enterprise Logos (from Image 3) */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-widest text-[#7B738D] font-mono mb-8">
            These industry leaders rely on SolarSense for clean energy intelligence
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 hover:opacity-90 transition-opacity">
            <span className="text-sm font-bold tracking-widest text-white/80 font-mono">SOLAREDGE</span>
            <span className="text-sm font-bold tracking-widest text-white/80 font-mono">ENPHASE</span>
            <span className="text-sm font-bold tracking-widest text-white/80 font-mono">TATA POWER</span>
            <span className="text-sm font-bold tracking-widest text-white/80 font-mono">SCHNEIDER</span>
            <span className="text-sm font-bold tracking-widest text-white/80 font-mono">TESLA ENERGY</span>
            <span className="text-sm font-bold tracking-widest text-white/80 font-mono">SIEMENS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
