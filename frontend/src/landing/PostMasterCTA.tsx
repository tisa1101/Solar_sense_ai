import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PostMasterCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#06040C] text-white overflow-hidden">
      {/* Floating 3D Glass Bubbles / Spheres (Post Master Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Floating Sphere */}
        <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),0_20px_45px_rgba(0,0,0,0.8)] backdrop-blur-sm opacity-50" />
        {/* Right Floating Sphere */}
        <div className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent shadow-[inset_0_3px_8px_rgba(255,255,255,0.25),0_25px_50px_rgba(0,0,0,0.8)] backdrop-blur-sm opacity-45" />

        {/* Vice City Rim Light & Sunset Atmosphere */}
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

          {/* Subheader Badge (Matching Post Master small uppercase header) */}
          <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF2E93] mb-4">
            GET STARTED WITH SOLARSENSE FOR FREE
          </div>

          {/* Main Title (Matching Post Master headline) */}
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

          {/* Dual CTA Buttons (Matching Post Master buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/portal')}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-black font-black text-sm tracking-wide uppercase hover:brightness-110 transition-all shadow-[0_4px_30px_rgba(255,46,147,0.45)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>Get started for free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('roi-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all hover:border-[#FF2E93]/50 cursor-pointer"
            >
              Learn more
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#A79FB6] font-mono">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E93]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00]" />
              PM Surya Ghar ₹78,000 Subsidy
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              14-Day Free Trial
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PostMasterCTA;
