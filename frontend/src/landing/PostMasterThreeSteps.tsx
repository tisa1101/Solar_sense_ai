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
    <section id="three-steps" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#07040E] text-white overflow-hidden">
      {/* Background Subtle Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15"
          style={{ background: 'radial-gradient(circle, #E284B3 0%, #7928CA 50%, transparent 80%)' }}
        />
        <div
          className="absolute -bottom-24 left-1/4 w-[450px] h-[450px] rounded-full blur-[160px] opacity-15"
          style={{ background: 'radial-gradient(circle, #FF7A59 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#E284B3] font-mono mb-3"
          >
            SYSTEMATIC ENERGY FREEDOM
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4"
          >
            Manage solar intelligence in 3 steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[#9A91AB] leading-relaxed max-w-xl mx-auto"
          >
            Everything needed to scale your energy independence — in one unified, AI-driven interface.
          </motion.p>
        </div>

        {/* 3-Step Interactive Layout (from Image 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vertical Step Progression */}
          <div className="lg:col-span-6 space-y-6 relative">
            {/* Connecting Vertical Glowing Line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-white/10" />

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
                    className={`absolute left-2.5 top-1.5 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-gradient-to-tr from-[#FF7A59] to-[#E284B3] shadow-[0_0_18px_rgba(255,122,89,0.5)] ring-4 ring-[#FF7A59]/20'
                        : 'bg-[#181126] border border-white/20 text-[#8B839E]'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-white">{item.step}</span>
                  </div>

                  {/* Step Card Content */}
                  <div
                    className={`p-5 rounded-2xl border transition-all ${
                      isActive
                        ? 'bg-[#130E20]/90 border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl'
                        : 'bg-transparent border-transparent hover:border-white/5'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-mono tracking-wider text-[#FF9E79] mb-1">
                      {item.tag}
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-[#9A91AB] leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {isActive && (
                      <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs text-[#E284B3] font-medium">
                        <span>Explore in Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Step Preview Card (matching Image 3 & Image 2) */}
          <div className="lg:col-span-6">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-white/15 bg-[#120D1D]/90 p-8 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Internal Accent Glow */}
              <div
                className="absolute -top-16 -right-16 w-60 h-60 rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    activeStep === 1
                      ? 'radial-gradient(circle, #FF7A59 0%, transparent 70%)'
                      : activeStep === 2
                      ? 'radial-gradient(circle, #E284B3 0%, transparent 70%)'
                      : 'radial-gradient(circle, #9B51E0 0%, transparent 70%)'
                }}
              />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-[#FF9E79]">
                    {activeStep === 1 && <Sparkles className="w-5 h-5" />}
                    {activeStep === 2 && <Eye className="w-5 h-5 text-[#E284B3]" />}
                    {activeStep === 3 && <Battery className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {steps[activeStep - 1].details.badge}
                    </div>
                    <div className="text-[11px] text-[#8B839E]">Neural Validation Engine</div>
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
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#8B839E]">Monthly Power Consumption</span>
                      <span className="text-white font-mono font-bold">950 kWh</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-[#FF7A59] to-[#E284B3] h-2 rounded-full w-[75%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#8B839E]">Optimal Capacity</div>
                      <div className="text-base font-bold text-white mt-1">8.4 kW Bifacial</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#8B839E]">Annual Savings</div>
                      <div className="text-base font-bold text-emerald-400 mt-1">₹1,70,400</div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0E0A17] p-4 text-center">
                    <div className="text-xs text-[#E284B3] font-medium mb-1">
                      Keras MobileNetV2 Rooftop Analysis
                    </div>
                    <div className="text-[11px] text-[#8B839E]">
                      High-resolution visual segmentation active
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-[#8B839E]">Pitch</div>
                        <div className="text-xs font-bold text-white">18° South</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-[#8B839E]">Shade Risk</div>
                        <div className="text-xs font-bold text-emerald-400">Minimal</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                        <div className="text-[10px] text-[#8B839E]">Suitability</div>
                        <div className="text-xs font-bold text-[#FF9E79]">98/100</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#8B839E]">SafeDC™ Battery Status</span>
                      <span className="text-emerald-400 font-mono font-bold">88% (10 kWh)</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-400 h-2 rounded-full w-[88%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#8B839E]">Rapid Shutdown</div>
                      <div className="text-base font-bold text-white mt-1">1V Touch-Safe</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
                      <div className="text-[11px] text-[#8B839E]">Grid Export</div>
                      <div className="text-base font-bold text-[#E284B3] mt-1">Net-Metered</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Quick Button */}
              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#8B839E]">Ready to run your site assessment?</span>
                <button
                  onClick={() => navigate('/portal')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7A59] to-[#E284B3] text-white text-xs font-medium hover:brightness-110 transition-all cursor-pointer shadow-md"
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
