import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const PostMasterCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#07040E] text-white overflow-hidden">
      {/* Background Rim Light & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #FF7A59 0%, #E284B3 40%, #7928CA 70%, transparent 85%)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-white/12 bg-[#120D1D]/90 p-10 sm:p-14 text-center backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Subtle Internal Orbital Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-b from-[#FF7A59]/20 to-transparent blur-3xl pointer-events-none" />

          {/* Subheader Badge */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#E284B3] mb-4">
            GET STARTED WITH SOLARSENSE FOR FREE
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
            Maximise Your Solar Energy Impact with AI
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#9A91AB] leading-relaxed max-w-xl mx-auto mb-9 font-normal">
            Ready to elevate your solar performance? Experience the efficiency and effectiveness of AI-driven clean energy management.
          </p>

          {/* Dual CTA Buttons (from Image 3) */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              onClick={() => navigate('/portal')}
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#FF7A59] via-[#FF5C8A] to-[#E284B3] text-white font-medium text-sm hover:brightness-110 transition-all shadow-[0_4px_25px_rgba(255,122,89,0.35)] cursor-pointer"
            >
              Get started for free
            </button>
            <button
              onClick={() => navigate('/portal')}
              className="px-7 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white/90 font-medium text-sm border border-white/12 backdrop-blur-md transition-all cursor-pointer"
            >
              Explore Customer Portal
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex items-center justify-center gap-6 text-xs text-[#8B839E]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E284B3]" />
              14-day energy guarantee
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
