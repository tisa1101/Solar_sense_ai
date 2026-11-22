import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Eye,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sun,
  Battery,
  Activity,
  Camera,
  HardHat,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PostMasterThreeSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2); // Step 2 active by default like in screenshot
  const [selectedSystem, setSelectedSystem] = useState('8.4 kW Bifacial TOPCon + 10 kWh Storage');
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      title: 'Instant Aerial Photo Analysis',
      subtitle: 'Upload drone or smartphone rooftop photos for instant 3D geometry extraction.',
      description:
        'Upload your roof photograph or electricity bill. Our Keras neural model automatically detects roof surface material, measures pitch angle, and identifies obstacles.',
      image: '/images/solar-sunset-roof.jpg',
      badge: 'KERAS DEEP-VISION AUDIT',
      metric: '94% Usable Roof Area',
      tagline: 'High-precision computer vision mapping'
    },
    {
      step: 2,
      title: 'AI Roof Geometry & Shading Analysis',
      subtitle: 'Seamlessly simulate 365-day solar radiance and optimal string layouts.',
      description:
        'Simulate hourly shadow cast from nearby trees, chimneys, and parapets. Automatically derive optimal panel tilt and calculate PM Surya Ghar cash subsidies.',
      image: '/images/solar-panels-sunflare.jpg',
      badge: '99.2% PHOTON EFFICIENCY',
      metric: '₹78,000 Govt Subsidy',
      tagline: 'Zero Light-Induced Degradation (LID)'
    },
    {
      step: 3,
      title: 'Field Installation & Live Telemetry',
      subtitle: 'Auto-dispatch certified technicians and monitor generation in real time.',
      description:
        'Certified field crew executes ballast racking, SafeDC™ rapid shutdown wiring, and DISCOM bidirectional net-metering synchronization with live yield telemetry.',
      image: '/images/solar-technicians-installing.jpg',
      badge: 'CREW DISPATCH & COMMISSIONING',
      metric: '3.14 kW Live Yield',
      tagline: '1V Touch-Safe Grid Synchronization'
    }
  ];

  const currentStepData = steps.find((s) => s.step === activeStep) || steps[1];

  return (
    <section id="three-steps" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#06040C] text-white overflow-hidden">
      {/* =========================================================
          AMBIENT FLOATING 3D GLASS BUBBLES / SPHERES (Post Master aesthetic)
          ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Bubble Top Left */}
        <div className="absolute top-12 left-8 w-20 h-20 rounded-full border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent shadow-[inset_0_2px_6px_rgba(255,255,255,0.25),0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm opacity-50 animate-pulse" />
        {/* Floating Bubble Mid Right */}
        <div className="absolute top-1/3 right-12 w-28 h-28 rounded-full border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent shadow-[inset_0_3px_8px_rgba(255,255,255,0.2),0_20px_45px_rgba(0,0,0,0.7)] backdrop-blur-sm opacity-40" />
        {/* Floating Bubble Bottom Left */}
        <div className="absolute bottom-16 left-20 w-16 h-16 rounded-full border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)] backdrop-blur-sm opacity-35" />

        {/* Ambient Nebula Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full blur-[180px] opacity-25"
          style={{ background: 'radial-gradient(circle, #FF2E93 0%, #FF7A00 40%, #7928CA 70%, transparent 85%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 uppercase font-['Plus_Jakarta_Sans',sans-serif]"
          >
            Manage Solar Deployment <br />
            <span className="bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] bg-clip-text text-transparent">
              In 3 Steps
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm sm:text-base text-[#D5CEE0] leading-relaxed max-w-xl mx-auto"
          >
            Everything needed to scale your clean energy independence — from initial drone audit to certified rooftop installation.
          </motion.p>
        </div>

        {/* 3-Step Interactive Layout: Vertical Stepper on Left, Dynamic Studio Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* =========================================================
              LEFT COLUMN: VERTICAL STEPPER WITH GLOWING ACTIVE NODE
              ========================================================= */}
          <div className="lg:col-span-5 space-y-8 relative pl-6">
            {/* Connecting Vertical Track */}
            <div className="absolute left-[33px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-white/10 via-white/20 to-white/10" />

            {steps.map((item) => {
              const isActive = activeStep === item.step;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className="relative pl-12 cursor-pointer group"
                >
                  {/* Step Node Marker */}
                  <div
                    className={`absolute left-2.5 top-1 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-tr from-[#FF7A00] to-[#FFD166] shadow-[0_0_22px_rgba(255,122,0,0.9)] ring-4 ring-[#FF7A00]/30 scale-125'
                        : 'bg-[#150D24] border border-white/25 group-hover:border-white/50'
                    }`}
                  >
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    )}
                  </div>

                  {/* Step Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isActive ? 'text-white' : 'text-[#8E859E] group-hover:text-[#D5CEE0]'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed transition-all duration-300 ${
                        isActive ? 'text-[#D5CEE0] max-h-24 opacity-100' : 'text-[#6E6480] max-h-0 opacity-0 overflow-hidden group-hover:max-h-12 group-hover:opacity-75'
                      }`}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =========================================================
              RIGHT COLUMN: POST MASTER STUDIO CARD WITH LIVE PHOTO PREVIEW
              ========================================================= */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl border border-white/15 bg-[#100A1C]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden"
            >
              {/* Internal Sunset Glow */}
              <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-35 pointer-events-none"
                style={{
                  background:
                    activeStep === 1
                      ? 'radial-gradient(circle, #FF2E93 0%, transparent 70%)'
                      : activeStep === 2
                      ? 'radial-gradient(circle, #FF7A00 0%, transparent 70%)'
                      : 'radial-gradient(circle, #00F0FF 0%, transparent 70%)'
                }}
              />

              {/* Card Top: Studio Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                    <span>Generate Solar Architecture</span>
                  </h4>
                  <p className="text-[11px] text-[#A79FB6] mt-0.5">
                    Specify roof parameters, bill details, and sizing criteria.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 font-bold">
                  {currentStepData.badge}
                </span>
              </div>

              {/* Dropdown Selector (Matching Post Master 'Post type: LinkedIn post' look) */}
              <div className="space-y-2 mb-4">
                <label className="text-[11px] font-mono font-bold text-[#A79FB6] uppercase tracking-wider">
                  Target Array Configuration
                </label>
                <div className="relative">
                  <select
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                    className="w-full appearance-none px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-[#FF7A00] transition-colors cursor-pointer"
                  >
                    <option value="8.4 kW Bifacial TOPCon + 10 kWh Storage" className="bg-[#120B1F]">
                      8.4 kW Bifacial TOPCon + 10 kWh Storage (Residential High-Yield)
                    </option>
                    <option value="5.0 kW On-Grid String Array" className="bg-[#120B1F]">
                      5.0 kW On-Grid String Array (Standard Rooftop)
                    </option>
                    <option value="12.0 kW Commercial BIPV Array" className="bg-[#120B1F]">
                      12.0 kW Commercial BIPV Array (Zero Grid Curfew)
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/50 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Content Preview & Real Photo Display */}
              <div className="space-y-4">
                {/* AI Textarea Box (Matching 'Create content // Generate with AI' in photo) */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#A79FB6] uppercase tracking-wider">
                      Synthesized System Recommendation
                    </span>
                    <button
                      onClick={() => navigate('/portal')}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#FF7A00] hover:text-[#FFD166] transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Re-derive with AI</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#D5CEE0] font-mono leading-relaxed">
                    ✨ <strong className="text-white">Optimal Engineering:</strong> Sized for 8.4 kW peak generation with N-Type Bifacial panels, SafeDC™ 1V touch-safe auto-shutdown, and 100% PM Surya Ghar subsidy qualification (₹78,000 cash grant).
                  </p>
                </div>

                {/* Real Photo Attachment with Scanning HUD (Image 2, 3, or 4 from user) */}
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/50 group h-48 sm:h-56">
                  <img
                    src={currentStepData.image}
                    alt={currentStepData.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white flex items-center gap-1.5">
                    {activeStep === 1 && <Camera className="w-3 h-3 text-[#FF2E93]" />}
                    {activeStep === 2 && <Sun className="w-3 h-3 text-[#FF7A00]" />}
                    {activeStep === 3 && <HardHat className="w-3 h-3 text-emerald-400" />}
                    <span>{currentStepData.tagline}</span>
                  </div>

                  {/* Bottom Metrics Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{currentStepData.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{currentStepData.metric}</span>
                    </div>

                    <button
                      onClick={() => navigate(activeStep === 3 ? '/workers' : '/portal')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white text-[11px] font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostMasterThreeSteps;
