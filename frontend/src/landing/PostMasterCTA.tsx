import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PostMasterCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#06040C] text-white overflow-hidden">
      {/* Vice City Rim Light & Sunset Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] rounded-full blur-[170px] opacity-30"
          style={{ background: 'radial-gradient(circle, #FF2E93 0%, #FF7A00 40%, #7928CA 70%, transparent 85%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-[#FF2E93]/30 bg-[#100A1C]/90 p-10 sm:p-16 text-center backdrop-blur-2xl shadow-[0_25px_90px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Internal Orbital Flare */}
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-[#FF2E93]/25 via-[#FF7A00]/15 to-transparent blur-3xl pointer-events-none" />

          {/* Subheader Badge */}
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF2E93] mb-4">
            GET STARTED WITH SOLARSENSE FOR FREE // LEONIDA 2026
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 max-w-3xl mx-auto uppercase font-['Plus_Jakarta_Sans',sans-serif]">
            MAXIMISE YOUR SOLAR IMPACT <br />
            <span className="bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] bg-clip-text text-transparent">
              WITH NEURAL AI
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#D5CEE0] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            Ready to elevate your solar performance? Experience the efficiency and precision of AI-driven clean energy management and zero-curfew battery storage.
          </p>

          {/* Dual CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/portal')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-bold text-sm tracking-wide uppercase hover:brightness-110 transition-all shadow-[0_4px_30px_rgba(255,46,147,0.45)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/portal')}
              className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all hover:border-[#FF2E93]/50 cursor-pointer"
            >
              Explore Customer Portal
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#A79FB6] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93]" />
              Zero credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
              PM Surya Ghar Subsidy Guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              Instant DISCOM simulation
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
