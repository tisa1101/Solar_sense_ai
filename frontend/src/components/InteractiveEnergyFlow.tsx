import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  BatteryCharging,
  Zap,
  Car,
  Home,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

export type FlowScenario = 'day' | 'evening' | 'storm' | 'ev_boost';

interface Hotspot {
  id: string;
  name: string;
  category: string;
  tag: string;
  x: number; // percentage from left
  y: number; // percentage from top
  voltage: string;
  power: string;
  status: string;
  description: string;
  specPill: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'roof',
    name: '550W High-Efficiency Monocrystalline Array',
    category: 'Production Layer',
    tag: 'PRODUCE',
    x: 28,
    y: 14,
    voltage: '380V DC',
    power: '4.85 kW',
    status: 'Optimal Irradiance (980 W/m²)',
    description: 'High-yield bifacial panels equipped with module-level DC Power Optimizers. Generates power independently even with partial shading.',
    specPill: '25-Yr Performance Guarantee'
  },
  {
    id: 'inverter',
    name: 'SolarEdge Home Energy Hub Inverter',
    category: 'Management Layer',
    tag: 'MANAGE',
    x: 12,
    y: 54,
    voltage: '240V AC / 400V DC',
    power: '99.2% CEC Efficiency',
    status: 'SafeDC™ 1V Touch-Safe Ready',
    description: 'Central brain of the ecosystem. Synchronizes solar generation, whole-home battery backup, EV charging, and grid bi-directional metering.',
    specPill: '10-Yr Standard Warranty'
  },
  {
    id: 'battery',
    name: 'SolarEdge Home 10 kWh Battery Storage',
    category: 'Storage Layer',
    tag: 'STORE',
    x: 28,
    y: 65,
    voltage: '400V High Voltage DC',
    power: '5.0 kW Continuous / 7.5 kW Peak',
    status: '97% Round-Trip Efficiency',
    description: 'DC-coupled high-voltage lithium iron phosphate (LiFePO4) architecture. Eliminates unnecessary AC conversions for maximum stored yield.',
    specPill: '100% Depth of Discharge'
  },
  {
    id: 'ev',
    name: 'Smart EV Charger with Solar Boost',
    category: 'Charging Layer',
    tag: 'CHARGE',
    x: 48,
    y: 64,
    voltage: '240V AC Level 2',
    power: '32A / 7.6 kW Boost',
    status: 'Solar + Grid Dynamic Blend',
    description: 'Simultaneously charges electric vehicle with 100% solar power and grid boost. Delivers up to 6x faster charging than standard Level 1 outlet.',
    specPill: 'Universal J1772 & NACS Compatible'
  },
  {
    id: 'car',
    name: 'Electric Vehicle Integration',
    category: 'Mobility Node',
    tag: 'CONSUME',
    x: 78,
    y: 72,
    voltage: '400V EV Battery',
    power: '+42 Miles/hr Added',
    status: 'Smart Scheduled Charging',
    description: 'Programmed to soak up daytime solar surplus, lowering cost per mile to zero while eliminating peak DISCOM demand charges.',
    specPill: 'Zero Grid Carbon Emissions'
  }
];

export const InteractiveEnergyFlow: React.FC = () => {
  const [scenario, setScenario] = useState<FlowScenario>('day');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [pulseTick, setPulseTick] = useState(0);

  // Subtle live power flicker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseTick((t) => (t + 1) % 100);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const getScenarioData = () => {
    switch (scenario) {
      case 'day':
        return {
          title: 'Daytime Solar Harvest & Storage',
          description: 'Panels generate peak energy. Inverter powers household loads, charges the 10 kWh battery, and exports clean surplus to DISCOM.',
          solarKW: '+5.42 kW',
          batteryKW: '+2.80 kW (Charging)',
          homeKW: '1.45 kW',
          evKW: '0.00 kW',
          gridKW: '+1.17 kW (Export)'
        };
      case 'evening':
        return {
          title: 'Evening Peak Battery Self-Consumption',
          description: 'Sun sets. 10 kWh battery automatically discharges to power family lighting, HVAC, and TV, shielding you from DISCOM peak tariffs.',
          solarKW: '0.00 kW',
          batteryKW: '-2.40 kW (Discharging)',
          homeKW: '2.40 kW',
          evKW: '0.00 kW',
          gridKW: '0.00 kW (Zero Grid Draw)'
        };
      case 'storm':
        return {
          title: 'Storm Watch & Microgrid Islanding',
          description: 'Grid collapses due to heavy storm. System instantly disconnects from grid in 16ms; battery provides uninterrupted whole-home backup.',
          solarKW: '+0.80 kW',
          batteryKW: '-1.80 kW (Backing Up)',
          homeKW: '2.60 kW',
          evKW: '0.00 kW',
          gridKW: '0.00 kW (Disconnected SafeDC™)'
        };
      case 'ev_boost':
        return {
          title: 'Solar Boost Smart EV Supercharging',
          description: 'Electric car plugged in. Solar generation and battery reserve combine to channel maximum 7.6 kW direct clean power into EV.',
          solarKW: '+4.80 kW',
          batteryKW: '-2.80 kW (Assisting)',
          homeKW: '0.00 kW (Optimized)',
          evKW: '+7.60 kW (Charging)',
          gridKW: '0.00 kW (Zero Draw)'
        };
    }
  };

  const currentData = getScenarioData();

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-white/[0.04] backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
      {/* Top Scenario Switcher Bar */}
      <div className="p-4 sm:p-6 border-b border-white/10 bg-[#0D0917]/75 backdrop-blur-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E284B3] animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#F4A5C6] font-bold">
              SOLAR FLOW ARCHITECTURE • REAL-TIME ENERGY TELEMETRY
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Interactive Ecosystem Flow
          </h3>
        </div>

        {/* 4 Scenario Pill Buttons (Frosted Dock) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white/[0.06] backdrop-blur-3xl border border-white/15">
          {[
            { id: 'day', label: 'Day Harvest', icon: Sun },
            { id: 'evening', label: 'Peak Evening', icon: BatteryCharging },
            { id: 'storm', label: 'Storm Backup', icon: ShieldCheck },
            { id: 'ev_boost', label: 'EV Solar Boost', icon: Car }
          ].map((sc) => {
            const Icon = sc.icon;
            const active = scenario === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => setScenario(sc.id as FlowScenario)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#E284B3] to-[#8A56E2] text-white shadow-[0_4px_16px_rgba(226,132,179,0.35)]'
                    : 'text-[#A79FB6] hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Visual Stage with Real Photographic Substrate */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#080B11] overflow-hidden select-none">
        {/* Real High-Resolution Photogrammetric Asset (User Uploaded Image 1) */}
        <img
          src="/assets/solar/solar-home-flow.jpg"
          alt="Residential Solar Flow Installation"
          className="w-full h-full object-cover object-center filter contrast-105"
        />

        {/* Subtle Darkening Mask for High Contrast Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

        {/* Animated Google Flow Pulsing Light Lines Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          viewBox="0 0 1000 562"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cyanEnergyGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Conduit 1: Roof to Inverter */}
          <path
            d="M 280 80 L 120 140 L 120 300"
            stroke="url(#cyanEnergyGlow)"
            strokeWidth="3.5"
            strokeDasharray={scenario === 'evening' ? '0' : '8 6'}
            filter="url(#glowFilter)"
            opacity={scenario === 'evening' ? 0.2 : 0.85}
            className="animate-pulse"
          />

          {/* Conduit 2: Inverter to Battery */}
          <path
            d="M 120 350 L 120 420 L 280 420"
            stroke="url(#cyanEnergyGlow)"
            strokeWidth="4"
            filter="url(#glowFilter)"
            opacity="0.95"
          />

          {/* Conduit 3: Inverter to EV Charger */}
          <path
            d="M 280 420 L 480 420 L 480 380"
            stroke="url(#cyanEnergyGlow)"
            strokeWidth="3.5"
            filter="url(#glowFilter)"
            opacity={scenario === 'ev_boost' ? 1 : 0.7}
          />

          {/* Conduit 4: EV Charger to Electric Car */}
          <path
            d="M 480 400 C 560 450, 680 430, 780 410"
            stroke="url(#cyanEnergyGlow)"
            strokeWidth={scenario === 'ev_boost' ? '5' : '3'}
            strokeDasharray={scenario === 'ev_boost' ? '10 8' : 'none'}
            filter="url(#glowFilter)"
            opacity={scenario === 'ev_boost' ? 1 : 0.6}
            className={scenario === 'ev_boost' ? 'animate-pulse' : ''}
          />
        </svg>

        {/* Interactive Clickable Hotspots across the Photo */}
        {HOTSPOTS.map((spot) => {
          const isSelected = selectedHotspot?.id === spot.id;
          return (
            <div
              key={spot.id}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setSelectedHotspot(isSelected ? null : spot)}
                className={`relative group p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#ED1C24] text-white scale-125 shadow-[0_0_25px_#ED1C24]'
                    : 'bg-black/80 hover:bg-[#ED1C24] text-white border border-white/30 backdrop-blur-md shadow-xl'
                }`}
                title={spot.name}
              >
                {/* Sonar Ping Rings */}
                <span className="absolute inset-0 rounded-full border border-current animate-ping opacity-40 pointer-events-none" />

                <div className="w-2.5 h-2.5 rounded-full bg-current" />

                {/* Hover Label Preview */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/90 border border-white/20 text-[11px] font-mono text-white whitespace-nowrap shadow-2xl pointer-events-none z-30">
                  <span className="text-[#ED1C24] font-bold">[{spot.tag}]</span>
                  <span>{spot.name.split(' ')[0]}</span>
                  <span className="text-emerald-400 font-bold">{spot.power}</span>
                </div>
              </button>
            </div>
          );
        })}

        {/* Floating Top-Left Status HUD */}
        <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl max-w-xs text-left shadow-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              {currentData.title}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
            {currentData.description}
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/10 text-[10px] font-mono">
            <div>
              <span className="text-slate-400 block">Solar Generation:</span>
              <span className="text-white font-bold">{currentData.solarKW}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Battery Dispatch:</span>
              <span className="text-[#38BDF8] font-bold">{currentData.batteryKW}</span>
            </div>
          </div>
        </div>

        {/* Selected Hotspot Detailed Drawer (Modal overlay on canvas) */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 left-4 right-4 z-30 p-4 sm:p-5 rounded-2xl bg-[#0F1420]/95 backdrop-blur-xl border border-white/20 shadow-2xl text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ED1C24]/20 border border-[#ED1C24]/40 text-[#ED1C24] font-mono text-[10px] font-bold uppercase">
                    {selectedHotspot.tag} // {selectedHotspot.category}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {selectedHotspot.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-mono self-end sm:self-auto"
                >
                  Close [×]
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mb-3">
                {selectedHotspot.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 font-mono text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">OPERATING VOLTAGE</span>
                  <span className="text-white font-bold">{selectedHotspot.voltage}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">ACTIVE POWER</span>
                  <span className="text-emerald-400 font-bold">{selectedHotspot.power}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">TELEMETRY STATUS</span>
                  <span className="text-[#38BDF8] font-bold">{selectedHotspot.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">CERTIFICATION</span>
                  <span className="text-amber-300 font-bold">{selectedHotspot.specPill}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Live Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-white/10 text-left font-mono">
        <div className="p-3.5 bg-[#0F1420]">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">1. PV Array</span>
          <span className="text-sm font-bold text-white">{currentData.solarKW}</span>
          <span className="text-[10px] text-emerald-400 block">Harvesting</span>
        </div>
        <div className="p-3.5 bg-[#0F1420]">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">2. Inverter Hub</span>
          <span className="text-sm font-bold text-white">99.2% CEC</span>
          <span className="text-[10px] text-[#ED1C24] block">SafeDC™ Active</span>
        </div>
        <div className="p-3.5 bg-[#0F1420]">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">3. 10 kWh Storage</span>
          <span className="text-sm font-bold text-[#38BDF8]">{currentData.batteryKW}</span>
          <span className="text-[10px] text-slate-400 block">LiFePO4 DC-Coupled</span>
        </div>
        <div className="p-3.5 bg-[#0F1420]">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">4. EV Smart Charger</span>
          <span className="text-sm font-bold text-amber-300">{currentData.evKW}</span>
          <span className="text-[10px] text-slate-400 block">Level 2 Fast</span>
        </div>
        <div className="p-3.5 bg-[#0F1420] col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">5. DISCOM Grid</span>
          <span className="text-sm font-bold text-emerald-400">{currentData.gridKW}</span>
          <span className="text-[10px] text-slate-400 block">Net Metered</span>
        </div>
      </div>
    </div>
  );
};
