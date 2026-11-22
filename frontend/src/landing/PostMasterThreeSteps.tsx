import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Eye, CheckCircle2, Zap, ArrowRight, ShieldCheck, Sun, Battery, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PostMasterThreeSteps: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      title: 'AI Solar Intelligence & Usage Derivation',
      description:
        'Upload your electricity bill or specify monthly consumption. Our neural engine auto-derives optimal kW capacity, tariff bracket arbitrage, and on-grid vs off-grid suitability.',
      tag: 'Step 01 • Assessment',
      details: {
        badge: 'Bill OCR & Tariff Matrix',
        metric1: '8.4 kW Recommended',
        metric2: '₹14,200/mo Savings',
        highlight: '99.2% Sizing Accuracy'
      }
    },
    {
      step: 2,
      title: 'Keras Neural Roof Vision & Shading Analysis',
      description:
        'Upload aerial or smartphone photos of your rooftop. Our deep learning model analyzes roof architecture, identifies vent/chimney obstacles, and simulates tree shading.',
      tag: 'Step 02 • Neural Vision',
      details: {
        badge: 'Keras MobileNetV2 Vision',
        metric1: 'Gable / Concrete RCC',
        metric2: '0 Obstructions Detected',
        highlight: 'Clear Unobstructed Solar Arc'
      }
    },
    {
      step: 3,
      title: 'Automated Net-Metering & Grid Dispatch',
      description:
        'Seamless integration with DISCOM bi-directional net-metering. Intelligent battery storage discharges automatically during peak utility tariffs, maximizing savings.',
      tag: 'Step 03 • Zero Grid Curfew',
      details: {
        badge: 'SafeDC™ Smart Dispatch',
        metric1: '10 kWh LiFePO4 Reserve',
        metric2: '1V Touch-Safe Rapid Shutdown',
        highlight: '100% DISCOM Compliant'
      }
    }
  ];

  return (
    <section id="three-steps" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#06040C] text-white overflow-hidden">
      {/* Vice City Ambient Horizon Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[550px] h-[550px] rounded-full blur-[170px] opacity-20"
          style={{ background: 'radial-gradient(circle, #FF2E93 0%, #7928CA 50%, transparent 80%)' }}
        />
        <div
          className="absolute -bottom-24 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] opacity-20"
          style={{ background: 'radial-gradient(circle, #FF7A00 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#FF2E93] font-mono font-bold mb-3"
          >
            SYSTEMATIC ENERGY FREEDOM // LEONIDA STANDARD
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 uppercase font-['Plus_Jakarta_Sans',sans-serif]"
          >
            MANAGE SOLAR INTELLIGENCE <br />
            <span className="bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] bg-clip-text text-transparent">
              IN 3 STEPS
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#D5CEE0] leading-relaxed max-w-xl mx-auto"
          >
            Everything needed to scale your energy independence — in one unified, AI-driven interface.
          </motion.p>
        </div>

        {/* 3-Step Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vertical Step Progression */}
          <div className="lg:col-span-6 space-y-6 relative">
            {/* Connecting Vertical Glowing Line */}
            <div className="absolute left-[20px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#FF2E93] via-[#FF7A00] to-[#7928CA]" />

            {steps.map((item) => {
              const isActive = activeStep === item.step;
              return (
                <div
                  key={item.step}
                  onClick={() => setActiveStep(item.step)}
                  className={`relative pl-12 cursor-pointer transition-all ${
                    isActive ? 'opacity-100' : 'opacity-60 hover:opacity-85'
                  }`}
                >
                  {/* Step Marker Dot / Ring */}
                  <div
                    className={`absolute left-2.5 top-1.5 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gradient-to-tr from-[#FF2E93] to-[#FF7A00] shadow-[0_0_22px_rgba(255,46,147,0.6)] ring-4 ring-[#FF2E93]/25 scale-110'
                        : 'bg-[#140D22] border border-white/20 text-[#A79FB6]'
                    }`}
                  >
                    <span className="text-xs font-bold text-white font-mono">{item.step}</span>
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`p-5 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-[#120B1F]/90 border-[#FF2E93]/35 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl'
                        : 'bg-transparent border-transparent hover:border-white/5'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#FF7A00] mb-1">
                      {item.tag}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#D5CEE0] leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {isActive && (
                      <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs text-[#FF2E93] font-bold">
                        <span>Explore in Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Step Preview Card */}
          <div className="lg:col-span-6">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/15 bg-[#100A1C]/90 p-8 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] relative overflow-hidden"
            >
              {/* Internal Accent Glow */}
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-35"
                style={{
                  background:
                    activeStep === 1
                      ? 'radial-gradient(circle, #FF2E93 0%, transparent 70%)'
                      : activeStep === 2
                      ? 'radial-gradient(circle, #FF7A00 0%, transparent 70%)'
                      : 'radial-gradient(circle, #00F0FF 0%, transparent 70%)'
                }}
              />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-[#FF7A00]">
                    {activeStep === 1 && <Sparkles className="w-5 h-5 text-[#FF2E93]" />}
                    {activeStep === 2 && <Eye className="w-5 h-5 text-[#FF7A00]" />}
                    {activeStep === 3 && <Battery className="w-5 h-5 text-[#00F0FF]" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white font-mono">
                      {steps[activeStep - 1].details.badge}
                    </div>
                    <div className="text-[11px] text-[#A79FB6]">Neural Validation Engine</div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {steps[activeStep - 1].details.highlight}
                </span>
              </div>

              {/* Dynamic Feature Visuals based on Active Step */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between text-xs mb-2 font-mono">
                      <span className="text-[#A79FB6]">MONTHLY POWER CONSUMPTION</span>
                      <span className="text-white font-bold">950 kWh</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#FF2E93] to-[#FF7A00] h-2 rounded-full w-[75%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#A79FB6] font-mono">OPTIMAL CAPACITY</div>
                      <div className="text-base font-bold text-white mt-1">8.4 kW Bifacial</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#A79FB6] font-mono">ANNUAL SAVINGS</div>
                      <div className="text-base font-bold text-emerald-400 mt-1">₹1,70,400</div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0A0514] p-4 text-center">
                    <div className="text-xs text-[#FF2E93] font-bold mb-1 font-mono uppercase">
                      Keras MobileNetV2 Rooftop Analysis
                    </div>
                    <div className="text-[11px] text-[#A79FB6]">
                      High-resolution visual segmentation active
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-[#A79FB6] font-mono">Pitch</div>
                        <div className="text-xs font-bold text-white">18° South</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-[#A79FB6] font-mono">Shade Risk</div>
                        <div className="text-xs font-bold text-emerald-400">Minimal</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-[#A79FB6] font-mono">Suitability</div>
                        <div className="text-xs font-bold text-[#FF7A00]">98/100</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between text-xs mb-2 font-mono">
                      <span className="text-[#A79FB6]">SAFEDC™ BATTERY RESERVE</span>
                      <span className="text-emerald-400 font-bold">88% (10 kWh)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-400 h-2 rounded-full w-[88%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#A79FB6] font-mono">RAPID SHUTDOWN</div>
                      <div className="text-base font-bold text-white mt-1">1V Touch-Safe</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#A79FB6] font-mono">GRID EXPORT</div>
                      <div className="text-base font-bold text-[#FF2E93] mt-1">Net-Metered</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Quick Button */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#A79FB6]">Ready to run your site assessment?</span>
                <button
                  onClick={() => navigate('/portal')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
                >
                  Launch in Portal ✦
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
