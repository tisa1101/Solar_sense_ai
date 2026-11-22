import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sun, CheckCircle2, Flame, Shield, Sparkles } from 'lucide-react';
import { InteractiveEnergyFlow } from '../components/InteractiveEnergyFlow';
import { FlipWords } from '../components/ui/FlipWords';
import { BlurFade } from '../components/ui/BlurFade';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-[#060812] pt-28 pb-16 font-sans">
      {/* Vice City Cinematic Sunset Horizon Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Hot Pink Sunset Radial Flare */}
        <div
          className="absolute -top-40 -left-20 w-[800px] h-[650px] rounded-full blur-[180px] opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(255,46,147,0.6) 0%, rgba(255,122,0,0.4) 50%, transparent 75%)' }}
        />
        {/* Miami Orange / Golden Hour Reflection */}
        <div
          className="absolute bottom-0 right-0 w-[700px] h-[550px] rounded-full blur-[160px] opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(255,122,0,0.5) 0%, rgba(121,40,202,0.3) 60%, transparent 75%)' }}
        />
        {/* Subtle Horizontal Sunset Horizon Band */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2E93]/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Cinematic Tag Badge */}
            <BlurFade delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF2E93]/40 bg-[#FF2E93]/10 text-white text-[11px] font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_25px_rgba(255,46,147,0.35)]">
                <span className="w-2 h-2 rounded-full bg-[#FF2E93] animate-ping" />
                <span className="text-[#FF2E93]">LEONIDA POWER INITIATIVE</span>
                <span className="text-white/30">•</span>
                <span className="text-[#FF7A00]">VICE CITY 2026</span>
              </div>
            </BlurFade>

            {/* Main Headline with Vice City FlipWords */}
            <BlurFade delay={0.2}>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
                UNLIMITED POWER.{' '}
                <br />
                <FlipWords
                  words={[
                    'COMPLETE CONTROL.',
                    'SAFE BY DESIGN.',
                    'TOUCH-SAFE 1V.',
                    'ZERO GRID DEPENDENCY.',
                    'VICE CITY FREEDOM.'
                  ]}
                  className="text-vice-gradient"
                />
              </h1>
            </BlurFade>

            {/* Sub-headline */}
            <BlurFade delay={0.3}>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl font-normal">
                Harness peak tropical irradiance with DC-optimized bifacial modules, whole-estate 10 kWh battery backup, and smart Level 2 EV charging engineered for maximum independence.
              </p>
            </BlurFade>

            {/* CTA Action Buttons */}
            <BlurFade delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {/* Vice City Signature Primary Button */}
                <button
                  onClick={() => navigate('/portal')}
                  className="vice-btn-primary"
                >
                  <span>Claim PM Surya Ghar Subsidy</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Portal Gateway Button */}
                <button
                  onClick={() => navigate('/portal')}
                  className="vice-btn-outline"
                >
                  <Sun className="w-4 h-4 text-[#FF7A00]" />
                  <span>Launch Customer Portal</span>
                </button>
              </div>
            </BlurFade>

            {/* Quick Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF2E93]" />
                <span className="text-slate-300">Module-Level MPPT</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-slate-300">20-Year Legal Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-slate-300">SafeDC™ 1V Touch-Safe</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero: Real Interactive Google Flow / Solar Flow Engine */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <InteractiveEnergyFlow />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
