import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, BatteryCharging, Zap, ShieldCheck, Wrench, Building, 
  ArrowRight, CheckCircle2, Sliders, Smartphone, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const solutionPillars = [
  {
    id: 'residential',
    title: 'SolarEdge Home (Residential Ecosystem)',
    subtitle: 'Produce, store, and manage your clean home electricity',
    icon: Sun,
    color: '#FF2E93',
    items: [
      { name: 'Energy Hub Inverter with 200A Backup', desc: 'Central smart inverter combining solar conversion and battery management in a single unit.' },
      { name: 'DC-Coupled SolarEdge Home Battery', desc: '10 kWh LFP storage providing whole-home backup during blackout grid failures with 97% efficiency.' },
      { name: 'Smart EV Charger with Solar Boost', desc: 'Level 2 smart charger using pure rooftop solar to power electric vehicles 2.5x faster.' },
    ],
    metric: 'Save Up to 85% on Electricity Bills',
    actionText: 'Open Customer Portal',
    actionRoute: '/portal',
  },
  {
    id: 'commercial',
    title: 'Commercial & Industrial Solar (C&I)',
    subtitle: 'Turn unused warehouse and factory roofs into profit centers',
    icon: Building,
    color: '#F59E0B',
    items: [
      { name: 'Three-Phase Inverters with Synergy Technology', desc: 'Lightweight modular units scalable from 25 kW up to 1 MW with 150% DC oversizing.' },
      { name: 'Commercial 2-to-1 Power Optimizers', desc: 'Connects two high-wattage panels to one optimizer, lowering hardware costs while maintaining individual MPPT.' },
      { name: 'Virtual Power Plant & Peak Shaving', desc: 'Discharge stored commercial battery power during peak tariff hours to slash commercial demand charges.' },
    ],
    metric: '100% Tax Accelerated Depreciation',
    actionText: 'View Commercial Systems',
    actionRoute: '/solar/packages',
  },
  {
    id: 'optimization',
    title: 'DC Power Optimizer Architecture',
    subtitle: 'Why module-level MPPT outperforms legacy string inverters',
    icon: Zap,
    color: '#00E5FF',
    items: [
      { name: 'Zero Mismatch & Shading Loss', desc: 'A shaded or soiled panel only affects itself—the rest of the string continues producing at 100% capacity.' },
      { name: 'SafeDC™ Rapid Shutdown to 1V', desc: 'Automatically de-energizes high-voltage DC down to safe touch voltage (1V per module) during maintenance or fire.' },
      { name: '25-Year Industry-Leading Warranty', desc: 'Built-in electronics engineered to outlast the roof with free factory replacement guarantees.' },
    ],
    metric: 'Up to 25% More Energy Harvested',
    actionText: 'Explore DC Technology',
    actionRoute: '/portal',
  },
  {
    id: 'installer-erp',
    title: 'Field Installation & Operations ERP (6 Scenes)',
    subtitle: 'From rooftop feasibility surveys to 20-year legal warranty tracking',
    icon: Wrench,
    color: '#10B981',
    items: [
      { name: 'Scene 1: Rooftop Feasibility Survey', desc: 'Measure roof tilt, azimuth, shadow-free area and lock quotes until approved.' },
      { name: 'Scene 2 & 3: Automated BOM & Serial Dispatch', desc: 'Instant 1-5 kW bill of materials, barcode scanning, and automatic warranty clock arming.' },
      { name: 'Scene 4, 5 & 6: Touchscreen Handover & P&L', desc: 'Mobile job sheet with customer signature, ₹0 rainy season breakdown guarantee, and Director P&L.' },
    ],
    metric: '40 Projects / Mo at 32% Margin',
    actionText: 'Launch Installer ERP',
    actionRoute: '/solar/inquiries',
  },
];

export const SolutionMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState(solutionPillars[0].id);
  const navigate = useNavigate();

  const activeSolution = solutionPillars.find(p => p.id === activeTab) || solutionPillars[0];
  const Icon = activeSolution.icon;

  return (
    <section id="solution-matrix" className="bg-[#060812] py-24 relative overflow-hidden border-t border-white/5 font-sans">
      {/* Ambient Vice City Sunset Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,46,147,0.22) 0%, rgba(255,122,0,0.15) 50%, transparent 75%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF2E93]/40 bg-[#FF2E93]/10 text-white text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(255,46,147,0.3)]">
            ✦ LEONIDA ADVANCED CLEAN ENERGY ARCHITECTURE
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
            Engineered for <span className="text-vice-gradient">Maximum Yield</span> & Zero Grid Downtime.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Discover how module-level power optimizers, whole-home battery backup, and smart EV charging synchronize in the Vice City metro.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {solutionPillars.map((p) => {
            const TabIcon = p.icon;
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#12182A] border-[#FF2E93] shadow-[0_0_30px_rgba(255,46,147,0.3)] text-white'
                    : 'bg-[#0B0F1D]/80 border-white/5 text-slate-400 hover:text-white hover:bg-[#12182A]/70'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="p-2.5 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}25`, color: p.color }}
                  >
                    <TabIcon className="w-5 h-5" />
                  </div>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FF2E93] animate-ping" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{p.title.split('(')[0]}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{p.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tab Showcase Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#12182A]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details & Items */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF7A00]">
                  SYSTEM SPECIFICATIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {activeSolution.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {activeSolution.subtitle}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {activeSolution.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#080B11] border border-white/[0.06] flex items-start gap-4 hover:border-white/20 transition-all"
                  >
                    <div className="p-2 rounded-xl bg-white/[0.04] text-[#ED1C24] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: High-Impact Card & CTA */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#080B11] to-[#0A0D14] border border-[#ED1C24]/30 shadow-xl relative overflow-hidden">
                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                  VERIFIED BENEFIT
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {activeSolution.metric}
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  SolarEdge technology guarantees maximum uptime and financial ROI, backed by global tier-1 component standards.
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>SafeDC™ Protected</span>
                  <span className="text-emerald-400 font-bold">100% Certified</span>
                </div>
              </div>

              <button
                onClick={() => navigate(activeSolution.actionRoute)}
                className="w-full py-4 rounded-full vice-btn-primary flex items-center justify-center gap-2"
              >
                <span>{activeSolution.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SolutionMatrix;
