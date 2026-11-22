import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Sun,
  BatteryCharging,
  Zap,
  Car,
  Layers,
  ThermometerSnowflake,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const ArchitecturalCutaway: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'roof' | 'hub' | 'storage' | 'hvac' | 'garage'>('all');

  const layerDetails = {
    all: {
      title: 'Whole-Home Integrated Energy System',
      description: 'Full architectural cross-section showing DC-coupled solar generation, smart battery storage, heat pump HVAC climate control, and electric vehicle charging synchronized under a single Energy Hub.',
      tag: 'ECOSYSTEM OVERVIEW'
    },
    roof: {
      title: 'Rooftop Photovoltaic Array',
      description: 'Monocrystalline bifacial panels with SafeDC™ optimizers generate DC electricity. Integrated fire-safety shuts down to 1V per module during grid disconnect.',
      tag: 'HARVEST LAYER'
    },
    hub: {
      title: 'Central Energy Hub Inverter',
      description: 'High-speed DSP inverter orchestrates multi-source power balancing with 99.2% efficiency, zeroing out daytime grid consumption.',
      tag: 'CONVERSION & CONTROL'
    },
    storage: {
      title: 'Basement 10 kWh Battery Storage',
      description: 'High-voltage LiFePO4 cells store daytime solar surplus. Discharges automatically at dusk to bypass high DISCOM peak tariffs.',
      tag: 'RESERVE VAULT'
    },
    hvac: {
      title: 'Heat Pump Climate Integration',
      description: 'Smart heating and cooling powered directly by solar surplus, dynamically throttling power based on real-time irradiance.',
      tag: 'THERMAL REGULATION'
    },
    garage: {
      title: 'Smart EV Charging Station',
      description: 'Level 2 charger combines rooftop solar with home battery to deliver up to 7.6 kW charging directly to electric vehicle.',
      tag: 'CLEAN MOBILITY'
    }
  };

  const current = layerDetails[activeLayer];

  return (
    <section className="relative py-24 bg-[#080B11] border-t border-white/5 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D ARCHITECTURAL CROSS-SECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            How Energy Circulates <span className="text-[#38BDF8]">Through Your Home</span>
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Examine how our integrated energy ecosystem powers every appliance, battery, HVAC zone, and electric vehicle with zero wasted energy.
          </p>
        </div>

        {/* 3D Cutaway Graphic Card with Layer Controls */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#0F1420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Left: 3D Villa Cutaway Visual (User Uploaded Image 3) */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner group">
            <img
              src="/assets/solar/solar-villa-cutaway.jpg"
              alt="3D Architectural Solar Home Cutaway"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Radiant Ambient Light Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Glowing Energy Path Indicator Overlays */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-white">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>{current.tag}</span>
            </div>

            {/* Bottom HUD Box */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#0F1420]/90 backdrop-blur-xl border border-white/15 p-4 rounded-xl text-left">
              <h4 className="text-base font-bold text-white mb-1">{current.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{current.description}</p>
            </div>
          </div>

          {/* Right: Layer Selector Tabs */}
          <div className="lg:col-span-4 space-y-2 text-left">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3">
              Interactive Layer Breakdown
            </h3>

            {[
              { id: 'all', label: 'Complete Ecosystem', icon: Layers, metric: '100% Autonomy' },
              { id: 'roof', label: 'Rooftop PV Array', icon: Sun, metric: '550W Bifacial' },
              { id: 'hub', label: 'Energy Hub Inverter', icon: Zap, metric: '99.2% Eff.' },
              { id: 'storage', label: '10 kWh Battery Bank', icon: BatteryCharging, metric: '400V High Volt' },
              { id: 'hvac', label: 'Heat Pump Climate', icon: ThermometerSnowflake, metric: 'Smart Throttle' },
              { id: 'garage', label: 'EV Solar Fast-Charge', icon: Car, metric: '+42 mi/hr' }
            ].map((layer) => {
              const Icon = layer.icon;
              const active = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id as typeof activeLayer)}
                  className={`w-full p-3.5 rounded-xl text-left transition-all flex items-center justify-between border ${
                    active
                      ? 'bg-[#38BDF8]/15 border-[#38BDF8] text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                      : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        active ? 'bg-[#38BDF8] text-black font-bold' : 'bg-black/40 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{layer.label}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{layer.metric}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${active ? 'translate-x-1 text-[#38BDF8]' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
