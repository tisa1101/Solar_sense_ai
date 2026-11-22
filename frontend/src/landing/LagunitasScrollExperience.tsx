import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sun,
  Zap,
  Shield,
  Camera,
  HardHat,
  Coins,
  ArrowRight,
  Compass,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  ChevronDown,
  Activity,
  Award
} from 'lucide-react';

export const LagunitasScrollExperience: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Global scroll progress for the multi-page pinned sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth springs for Lagunitas-style scrub inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  // ========================================================
  // PINNED 3D SOLAR MODULE TRANSFORMS (The "Bottle" equivalent)
  // ========================================================
  // Rotates from 0deg -> -15deg -> -8deg -> -18deg -> 0deg as you scroll through pages
  const panelRotateZ = useTransform(smoothProgress, [0, 0.22, 0.45, 0.7, 0.95], [0, -16, -6, -20, 0]);
  const panelRotateY = useTransform(smoothProgress, [0, 0.22, 0.45, 0.7, 0.95], [0, 18, -12, 14, 0]);
  const panelRotateX = useTransform(smoothProgress, [0, 0.22, 0.45, 0.7, 0.95], [12, 18, 10, 22, 8]);

  // Scale: Large in hero (1.05) -> docks and scales down to (0.52) in Section 6
  const panelScale = useTransform(smoothProgress, [0, 0.2, 0.45, 0.72, 0.98], [1.02, 0.88, 0.82, 0.72, 0.48]);

  // Horizontal Drift: Centers in Hero -> moves to Right (page 2) -> Left (page 3) -> Center (page 6)
  const panelX = useTransform(
    smoothProgress,
    [0, 0.22, 0.45, 0.72, 0.98],
    ['0%', '22%', '-20%', '24%', '0%']
  );

  // Vertical Parallax Lift
  const panelY = useTransform(
    smoothProgress,
    [0, 0.22, 0.45, 0.72, 0.98],
    ['0%', '4%', '8%', '10%', '0%']
  );

  // Sun flare opacity & glow intensity
  const flareOpacity = useTransform(smoothProgress, [0, 0.15, 0.4, 0.8, 1], [0.9, 0.4, 0.85, 0.5, 0.2]);
  const flareScale = useTransform(smoothProgress, [0, 0.15, 0.4, 0.8, 1], [1.2, 0.8, 1.4, 0.9, 0.6]);

  return (
    <div ref={containerRef} className="relative bg-[#06030c] text-white selection:bg-pink-500/30 selection:text-white">
      {/* ========================================================
          LEFT NAVIGATION RAIL (Lagunitas nav_left style)
          ======================================================== */}
      <nav className="fixed left-0 top-0 h-screen w-14 sm:w-16 hidden md:flex flex-col items-center justify-between py-8 border-r border-white/10 z-40 bg-black/40 backdrop-blur-xl">
        <div className="flex flex-col items-center gap-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            <Sun className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="text-[9px] font-mono font-black text-pink-400 rotate-180 uppercase tracking-widest [writing-mode:vertical-rl]">
            SOLARSENSE · 2026
          </span>
        </div>

        <div className="flex flex-col items-center gap-5 text-white/50">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="p-2 hover:text-pink-400 transition-colors" title="Hero">
            <Sun className="w-4 h-4" />
          </button>
          <button onClick={() => navigate('/portal')} className="p-2 hover:text-pink-400 transition-colors" title="Customer Portal">
            <Coins className="w-4 h-4" />
          </button>
          <button onClick={() => navigate('/workers')} className="p-2 hover:text-pink-400 transition-colors" title="Worker Portal">
            <HardHat className="w-4 h-4" />
          </button>
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:text-pink-400 transition-colors" title="Admin Fleet Matrix">
            <Shield className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">LIVE</span>
        </div>
      </nav>

      {/* ========================================================
          TOP NAVBAR (Lagunitas nav_top style)
          ======================================================== */}
      <header className="fixed top-0 left-0 md:left-16 right-0 h-20 px-6 sm:px-10 flex items-center justify-between z-40 bg-[#06030c]/70 backdrop-blur-2xl border-b border-white/8">
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-black tracking-tight font-display text-white">
            SOLAR<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-amber-300">SENSE</span>
          </span>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-pink-300 font-mono text-[10px] font-bold tracking-wider uppercase">
            N-Type TOPCon
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/portal')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-white transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-pink-400" />
            <span>AI Roof Audit</span>
          </button>

          <button
            onClick={() => navigate('/workers')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/35 text-xs font-mono font-bold text-pink-200 transition-all cursor-pointer"
          >
            <HardHat className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Worker Portal</span>
            <span className="sm:hidden">Crew</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('roi-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(244,114,182,0.4)] hover:brightness-110 transition-all cursor-pointer"
          >
            Calculate ROI ⚡
          </button>
        </div>
      </header>

      {/* ========================================================
          THE PINNED 3D SOLAR MODULE (Lagunitas #bottle equivalent)
          Fixed inside a sticky viewport container that follows scroll
          ======================================================== */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-30 overflow-hidden">
        {/* Golden Hour / Sunburst Ambient Radial Flare */}
        <motion.div
          style={{ opacity: flareOpacity, scale: flareScale }}
          className="absolute w-[600px] h-[600px] sm:w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none"
          style-background="radial-gradient(circle, rgba(251,146,60,0.35) 0%, rgba(236,72,153,0.25) 45%, transparent 75%)"
        />

        {/* 3D Photorealistic Solar Panel & Inverter Assembly */}
        <motion.div
          style={{
            rotateZ: panelRotateZ,
            rotateY: panelRotateY,
            rotateX: panelRotateX,
            scale: panelScale,
            x: panelX,
            y: panelY,
            transformPerspective: 1200
          }}
          className="relative w-[300px] sm:w-[420px] md:w-[460px] aspect-[1/1.6] transition-transform duration-75 will-change-transform drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
        >
          {/* Anodized Aluminum Outer Bezel */}
          <div className="w-full h-full rounded-2xl p-3 bg-gradient-to-br from-slate-200 via-slate-400 to-slate-700 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_20px_50px_rgba(0,0,0,0.9)] border border-white/30 relative overflow-hidden">
            {/* Corner Glass Glare Flare */}
            <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-gradient-to-br from-white/60 via-amber-200/30 to-transparent blur-xl pointer-events-none z-10" />

            {/* Anti-Reflective Blue-Black Glass Layer */}
            <div className="w-full h-full rounded-xl bg-gradient-to-b from-[#0a1128] via-[#0d1b3e] to-[#080d1e] p-2 relative overflow-hidden border border-cyan-400/20 shadow-inner">
              {/* Diagonal Light Reflection Sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />

              {/* Monocrystalline Solar Cells Grid (6 x 10 Wafers) */}
              <div className="w-full h-full grid grid-cols-6 grid-rows-10 gap-1 opacity-90">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative rounded-[2px] bg-gradient-to-br from-[#12224d] to-[#080f24] border border-cyan-500/25 overflow-hidden shadow-xs"
                  >
                    {/* Micro Busbars */}
                    <div className="absolute inset-0 flex flex-col justify-between py-1">
                      <div className="w-full h-[0.5px] bg-cyan-200/40" />
                      <div className="w-full h-[0.5px] bg-cyan-200/40" />
                      <div className="w-full h-[0.5px] bg-cyan-200/40" />
                    </div>
                    {/* Wafer Cut-corners */}
                    <div className="absolute top-0 left-0 w-1 h-1 bg-[#060a16]" />
                    <div className="absolute top-0 right-0 w-1 h-1 bg-[#060a16]" />
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-[#060a16]" />
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#060a16]" />
                  </div>
                ))}
              </div>

              {/* SolarSense Brand Badge on Glass */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center gap-1.5 z-10">
                <Sun className="w-3 h-3 text-amber-400" />
                <span className="text-[9px] font-mono font-black tracking-widest text-white uppercase">
                  550W BIFACIAL N-TYPE
                </span>
              </div>
            </div>

            {/* Rear Micro-Inverter with SafeDC Status LED (Peeking behind frame) */}
            <div className="absolute -bottom-3 right-4 px-2.5 py-1 rounded-lg bg-black/80 border border-emerald-400/40 flex items-center gap-1.5 shadow-lg z-20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[8px] font-mono text-emerald-300 font-bold">SafeDC™ 1V OK</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================
          PAGE 1: HERO // UNLIMITED HARVEST (Lagunitas #page1)
          ======================================================== */}
      <section className="relative min-h-screen flex flex-col items-center justify-between pt-36 pb-20 px-6 sm:px-12 md:pl-28 z-20">
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-amber-500/15 border border-pink-500/30 text-pink-300 font-mono text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>UNLIMITED ENERGY RELEASE // 2026 EDITION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-display tracking-tight text-white uppercase leading-[0.9]"
          >
            UNLIMITED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 drop-shadow-[0_10px_35px_rgba(244,114,182,0.5)]">
              SOLAR POWER
            </span>
          </motion.h1>

          <p className="text-sm sm:text-base text-[#D5CEE0] font-mono max-w-xl mx-auto pt-2">
            Pioneering N-Type Bifacial TOPCon architecture with integrated SafeDC™ touch-safe isolation. Scroll down to experience the engineering journey.
          </p>
        </div>

        {/* Scroll Prompt */}
        <div className="flex flex-col items-center gap-2 text-white/50 animate-bounce pt-8">
          <span className="text-[10px] font-mono uppercase tracking-widest text-pink-300">Scroll to Explore</span>
          <ChevronDown className="w-4 h-4 text-pink-400" />
        </div>
      </section>

      {/* ========================================================
          PAGE 2: ENGINEERING ANATOMY & METRICS (Lagunitas #page2)
          Left: Story & Buy Button | Right: Bold ABV/IBU Metric Boxes
          ======================================================== */}
      <section className="relative min-h-screen py-32 px-6 sm:px-12 md:pl-28 z-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (Lagunitas #page2_part1) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400 block">
              01 // PHYSICAL QUANTUM HARVEST
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight uppercase leading-[1.05]">
              N-Type Bifacial TOPCon Architecture
            </h2>
            <p className="text-xs sm:text-sm text-[#D5CEE0] font-mono leading-relaxed">
              Engineered with zero Light-Induced Degradation (LID) and an ultra-low temperature coefficient (-0.30%/°C). Captures reflected ground radiance from the backside, boosting daily energy harvest by up to 25% across hot Indian summers and monsoon cloud cover.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/portal')}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(236,72,153,0.45)] hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Order Custom Array ✦</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/solar/packages')}
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                View 1kW-5kW Kits
              </button>
            </div>
          </div>

          {/* Spacer for the Pinned 3D Module floating at center-right */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Right Column Metric Boxes (Lagunitas #page2_part2 style) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-[#130d22]/85 backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-pink-400 uppercase">PHOTON EFFICIENCY</span>
                <span className="text-[10px] font-mono text-white/50">IEC 61215</span>
              </div>
              <div className="flex items-baseline gap-1 text-5xl sm:text-6xl font-black font-display text-white">
                <span>99.2</span>
                <span className="text-2xl text-pink-400">%</span>
              </div>
              <p className="text-[11px] font-mono text-[#A79FB6] mt-2">
                Maximum MPPT power conversion tracking under diffused cloud cover.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#130d22]/85 backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">CENTRAL CASH SUBSIDY</span>
                <span className="text-[10px] font-mono text-white/50">DBT DIRECT</span>
              </div>
              <div className="flex items-baseline gap-1 text-5xl sm:text-6xl font-black font-display text-white">
                <span className="text-3xl text-purple-400">₹</span>
                <span>78,000</span>
              </div>
              <p className="text-[11px] font-mono text-[#A79FB6] mt-2">
                Direct Bank Transfer under PM Surya Ghar Muft Bijli Yojana.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#130d22]/85 backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">CAPITAL PAYBACK</span>
                <span className="text-[10px] font-mono text-white/50">FINANCIAL ROI</span>
              </div>
              <div className="flex items-baseline gap-1 text-5xl sm:text-6xl font-black font-display text-white">
                <span>1.9</span>
                <span className="text-2xl text-amber-400">YRS</span>
              </div>
              <p className="text-[11px] font-mono text-[#A79FB6] mt-2">
                Full payback with 25-Year cumulative lifetime savings over ₹11,60,000.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 3: KERAS AI AERIAL VISION (Lagunitas #page3 Split)
          Left: Sunset Roof Image & Scanning HUD | Right: Technical Notes
          ======================================================== */}
      <section className="relative min-h-screen py-32 px-6 sm:px-12 md:pl-28 z-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400 block">
              02 // AUTOMATED ROOFTOP INTELLIGENCE
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-white tracking-tight uppercase">
              Keras MobileNetV2 Vision Audit
            </h2>
            <p className="text-xs sm:text-sm text-[#D5CEE0] font-mono">
              Upload any roof photograph. Our computer vision pipeline detects structure materials, maps obstacles, and models hourly shadow cast.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Card: Sunset Roof with AI Viewfinder HUD */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black/50 shadow-[0_24px_60px_rgba(0,0,0,0.7)] group">
              <img
                src="/images/solar-sunset-roof.jpg"
                alt="Solar Sunset Roof"
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Viewfinder Target HUD Overlays */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-pink-300 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-pink-400" />
                <span>KERAS CAMERA REVIEW · 94% CONFIDENCE</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-white">
                  <span className="font-bold text-sm">Flat RCC Terrace + Pitched Tile</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    94/100 Prime Candidate
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-[#D5CEE0] pt-2 border-t border-white/10">
                  <div>
                    <span className="text-[#A79FB6] block">Usable Area</span>
                    <span className="font-bold text-white text-xs">86.2%</span>
                  </div>
                  <div>
                    <span className="text-[#A79FB6] block">Obstacles</span>
                    <span className="font-bold text-white text-xs">2 Flagged</span>
                  </div>
                  <div>
                    <span className="text-[#A79FB6] block">Shadow Density</span>
                    <span className="font-bold text-amber-300 text-xs">3.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Technical Specifications */}
            <div className="p-8 rounded-3xl bg-[#130d22]/85 backdrop-blur-3xl border border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.6)] space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                  OBSTRUCTION MITIGATION &amp; SETBACKS
                </span>
                <span className="text-xs font-mono text-white/50">NBC-2016 Compliant</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/30 border border-white/8 flex items-start justify-between">
                  <div>
                    <span className="text-white font-bold block">Overhead Water Storage Tank</span>
                    <span className="text-[11px] text-[#A79FB6]">Requires minimum 1.5m clearance to eliminate afternoon cast shadows.</span>
                  </div>
                  <span className="text-pink-300 font-bold whitespace-nowrap ml-2">1.5m setback</span>
                </div>

                <div className="p-3 rounded-xl bg-black/30 border border-white/8 flex items-start justify-between">
                  <div>
                    <span className="text-white font-bold block">Terrace Parapet Boundary Wall</span>
                    <span className="text-[11px] text-[#A79FB6]">0.8m edge margin maintained for wind vortex pressure relief.</span>
                  </div>
                  <span className="text-pink-300 font-bold whitespace-nowrap ml-2">0.8m setback</span>
                </div>

                <div className="p-3 rounded-xl bg-black/30 border border-white/8 flex items-start justify-between">
                  <div>
                    <span className="text-white font-bold block">Plumbing Air Vents &amp; Outlets</span>
                    <span className="text-[11px] text-[#A79FB6]">Elevated racking 300mm above terrace level preserves rainwater flow.</span>
                  </div>
                  <span className="text-emerald-300 font-bold whitespace-nowrap ml-2">Preserved</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/portal')}
                className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-pink-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Upload Your Roof Photo to Test Keras Vision</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 4: EXPLODED BOM SYSTEM COMPONENTS (Lagunitas #page4)
          Elastic Pop-in of Hardware Modules
          ======================================================== */}
      <section className="relative min-h-screen py-32 px-6 sm:px-12 md:pl-28 z-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400 block">
              03 // AUTOMATED BILL OF MATERIALS (BOM)
            </span>
            <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight uppercase">
              Factory-Matched Modular Kits
            </h2>
            <p className="text-xs sm:text-sm text-[#D5CEE0] font-mono">
              Every component pre-engineered for rapid installation, lightning arrestor protection, and certified 20-year durability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Component 1: PV Modules */}
            <div className="p-6 rounded-3xl bg-[#130d22]/85 backdrop-blur-2xl border border-white/12 hover:border-pink-500/40 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.5)] group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                  <Sun className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-pink-400 uppercase">CORE HARVEST</span>
                <h4 className="text-lg font-bold text-white mt-1">550W Bifacial TOPCon</h4>
                <p className="text-xs text-[#A79FB6] mt-2">
                  Dual-glass monocrystalline with silver busbars and anti-reflective nanocoating.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold mt-4 pt-3 border-t border-white/8">
                20-Yr Linear Warranty
              </span>
            </div>

            {/* Component 2: Smart Inverter */}
            <div className="p-6 rounded-3xl bg-[#130d22]/85 backdrop-blur-2xl border border-white/12 hover:border-purple-500/40 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.5)] group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">POWER CONVERSION</span>
                <h4 className="text-lg font-bold text-white mt-1">SafeDC™ Dual MPPT</h4>
                <p className="text-xs text-[#A79FB6] mt-2">
                  1V touch-safe auto shutdown, Wi-Fi cloud monitoring, and lightning SPD surge arrestor.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold mt-4 pt-3 border-t border-white/8">
                2-Yr Free Swap Guarantee
              </span>
            </div>

            {/* Component 3: Mounting Racking */}
            <div className="p-6 rounded-3xl bg-[#130d22]/85 backdrop-blur-2xl border border-white/12 hover:border-amber-500/40 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.5)] group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">STRUCTURAL RIGGING</span>
                <h4 className="text-lg font-bold text-white mt-1">HDGI Ballast Mounts</h4>
                <p className="text-xs text-[#A79FB6] mt-2">
                  Hot-dip galvanized steel rated for Zone III winds (up to 160 km/h) with non-penetrative feet.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold mt-4 pt-3 border-t border-white/8">
                Zero Roof Punctures
              </span>
            </div>

            {/* Component 4: Battery Storage */}
            <div className="p-6 rounded-3xl bg-[#130d22]/85 backdrop-blur-2xl border border-white/12 hover:border-cyan-500/40 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.5)] group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">OUTAGE RESILIENCE</span>
                <h4 className="text-lg font-bold text-white mt-1">10.24 kWh LiFePO4</h4>
                <p className="text-xs text-[#A79FB6] mt-2">
                  Lithium-Ferro Phosphate pack with &lt;10ms UPS switchover and 6,000 charge cycle lifespan.
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold mt-4 pt-3 border-t border-white/8">
                6,000 Cycle Life
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 5: ON THE ROOF // FIELD CREW IN ACTION (Lagunitas #page6)
          Featuring user-uploaded image solar-technicians-installing.jpg
          ======================================================== */}
      <section className="relative min-h-screen py-32 px-6 sm:px-12 md:pl-28 z-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Real Installation Photo */}
          <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-[0_24px_70px_rgba(0,0,0,0.8)] group">
            <img
              src="/images/solar-technicians-installing.jpg"
              alt="Solar Field Installation Crew"
              className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <HardHat className="w-3.5 h-3.5 text-pink-400" />
              <span>FIELD CREW · CERTIFIED TECHNICIANS</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <div className="flex items-center justify-between text-white">
                <span className="text-lg font-black font-display uppercase">
                  Manoj Shinde &amp; Crew of 3 On-Site
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                  Grid Synchronization Active
                </span>
              </div>
              <p className="text-xs text-[#D5CEE0] font-mono">
                Field technicians mount racking, torque panel clamps, connect DC isolator boxes, test earthing resistance &lt; 2 Ohms, and capture homeowner digital handover signatures directly on screen.
              </p>
            </div>
          </div>

          {/* Right Column: Live Telemetry Gauges */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-400 block">
              04 // FIELD OPERATIONS &amp; COMMISSIONING
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase leading-[1.05]">
              Real-Time Rooftop Telemetry
            </h2>

            <div className="space-y-3 font-mono">
              <div className="p-4 rounded-2xl bg-[#130d22]/85 border border-white/12 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#A79FB6] block uppercase">Tested Generation Yield</span>
                  <span className="text-xl font-bold text-emerald-400">3.14 kW Output</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#130d22]/85 border border-white/12 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#A79FB6] block uppercase">AC Grid Voltage Injected</span>
                  <span className="text-xl font-bold text-white">238.2 V AC</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                  <Activity className="w-5 h-5" />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#130d22]/85 border border-white/12 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#A79FB6] block uppercase">Chemical Earth Pit Resistance</span>
                  <span className="text-xl font-bold text-amber-300">1.4 Ohms (&lt; 2.0Ω Safe)</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <Shield className="w-5 h-5" />
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/workers')}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_4px_24px_rgba(236,72,153,0.45)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <HardHat className="w-4 h-4" />
              <span>Access Worker &amp; Field Crew Portal</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE 6: DOCKING & ACTION LAUNCHPAD
          The 3D Solar Panel scales down (scale: 0.5) and docks into CTA
          ======================================================== */}
      <section className="relative min-h-screen py-32 px-6 sm:px-12 md:pl-28 z-20 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl w-full mx-auto space-y-6">
          <span className="px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 font-mono text-xs font-bold uppercase tracking-wider">
            READY TO HARVEST THE SUN?
          </span>

          <h2 className="text-5xl sm:text-7xl font-black font-display text-white tracking-tight uppercase">
            Turn Your Rooftop Into A Clean Powerhouse
          </h2>

          <p className="text-xs sm:text-sm text-[#D5CEE0] font-mono max-w-xl mx-auto">
            Zero upfront lock-in, automated PM Surya Ghar ₹78,000 cash subsidy claims, and instant AI visual estimation.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('roi-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 text-black font-black text-sm uppercase tracking-wider shadow-[0_6px_30px_rgba(244,114,182,0.5)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Calculate System Sizing &amp; ROI</span>
            </button>

            <button
              onClick={() => navigate('/portal')}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-pink-400" />
              <span>Launch Customer Portal</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LagunitasScrollExperience;
