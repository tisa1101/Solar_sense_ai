import React from 'react';
import { motion } from 'framer-motion';
import {
  Factory,
  Building2,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CommercialArrayShowcase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 bg-[#080B11] border-t border-white/5 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-3">
              <Factory className="w-3.5 h-3.5" />
              <span>COMMERCIAL & INDUSTRIAL (C&I) SCALE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Utility-Grade Commercial <span className="text-[#38BDF8]">Rooftop Arrays</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl">
              Scalable 50 kW to 2.5 MW solar installations for manufacturing plants, data centers, and corporate parks with 1500V balance of system and module-level monitoring.
            </p>
          </div>

          <button
            onClick={() => navigate('/portal')}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>Request Commercial Audit</span>
            <ArrowRight className="w-4 h-4 text-[#38BDF8]" />
          </button>
        </div>

        {/* Hero Commercial Visual Banner (User Uploaded Image 4) */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-black border border-white/15 shadow-2xl group">
          <img
            src="/assets/solar/solar-commercial-array.jpg"
            alt="Megawatt Commercial Solar Array"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105"
          />

          {/* Environmental Gradient & Lens Flare */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

          {/* Top Badge */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
            <span>500 kWp INDUSTRIAL ROOFTOP DEPLOYMENT • BIFACIAL GLASS-GLASS</span>
          </div>

          {/* Bottom Telemetry HUD Bar */}
          <div className="absolute bottom-6 left-6 right-6 z-20 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#0F1420]/90 backdrop-blur-xl border border-white/15 text-left font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Generation</span>
              <span className="text-lg sm:text-xl font-bold text-white">720,000 kWh / yr</span>
              <span className="text-[10px] text-emerald-400 block">Offsets 82% Factory Power</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">System DC Voltage</span>
              <span className="text-lg sm:text-xl font-bold text-[#38BDF8]">1500V High-Yield</span>
              <span className="text-[10px] text-slate-400 block">Low Resistance Cable Loss</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">CO2 Abatement</span>
              <span className="text-lg sm:text-xl font-bold text-emerald-400">510 Metric Tons</span>
              <span className="text-[10px] text-slate-400 block">Equivalent to 23,000 Trees</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Payback Horizon</span>
              <span className="text-lg sm:text-xl font-bold text-amber-300">3.2 Years</span>
              <span className="text-[10px] text-slate-400 block">Accelerated Depreciation (40%)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
