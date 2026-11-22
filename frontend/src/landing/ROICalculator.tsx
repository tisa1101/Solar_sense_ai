import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sun, Zap, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ROICalculator: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);
  const [roofArea, setRoofArea] = useState<number>(400);
  const navigate = useNavigate();

  // Vice City Solar Math
  const recommendedKw = Math.min(10, Math.max(1, Math.round(monthlyBill / 1150)));
  const annualUnitsKwh = Math.round(recommendedKw * 4.2 * 365);
  const annualBillSavings = Math.round(annualUnitsKwh * 9.5);
  const twentyFiveYearSavings = annualBillSavings * 25;
  const centralSubsidy = recommendedKw === 1 ? 30000 : (recommendedKw === 2 ? 60000 : 78000);
  const grossCost = recommendedKw * 54000;
  const netInvestment = Math.max(25000, grossCost - centralSubsidy);
  const paybackYears = (netInvestment / annualBillSavings).toFixed(1);

  return (
    <section id="financing" className="bg-[#060812] py-24 relative overflow-hidden border-t border-white/5 font-sans">
      <div
        className="absolute top-1/2 right-1/4 w-[700px] h-[550px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,46,147,0.2) 0%, rgba(255,122,0,0.12) 50%, transparent 75%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF2E93]/40 bg-[#FF2E93]/10 text-white text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(255,46,147,0.3)]">
            <Calculator className="w-3.5 h-3.5 text-[#FF2E93]" />
            LEONIDA SOLAR SAVINGS & PM SURYA GHAR CALCULATOR
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
            Calculate Your Solar <span className="text-vice-gradient">Payback & Subsidy</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            See how much you can save with a DC-optimized system and the national PM Surya Ghar subsidy grant.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch rounded-3xl border border-white/10 bg-[#12182A]/90 p-8 lg:p-12 backdrop-blur-2xl shadow-2xl">
          {/* Left Inputs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-8 lg:pb-0 text-left">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Home & Energy Profile</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-8">
                Adjust the sliders to match your monthly electric utility bill and shadow-free roof space.
              </p>

              {/* Slider 1: Monthly Bill */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-300">Average Monthly Electric Bill</span>
                  <span className="text-base font-black text-[#FF2E93]">₹{monthlyBill.toLocaleString('en-IN')} / mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF2E93]"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>₹1,000 / mo</span>
                  <span>₹12,500</span>
                  <span>₹25,000 / mo</span>
                </div>
              </div>

              {/* Slider 2: Roof Area */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-slate-300">Shadow-Free Roof Area</span>
                  <span className="text-base font-black text-[#FF7A00]">{roofArea} sq.ft.</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={roofArea}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF7A00]"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>100 sq.ft</span>
                  <span>1,000 sq.ft</span>
                  <span>2,000+ sq.ft</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#00F0FF] shrink-0" />
              <div className="text-xs text-slate-400">
                <span className="text-white font-bold block">100% DISCOM Net-Metering Guaranteed</span>
                Includes bi-directional smart meter setup and direct bank grant processing.
              </div>
            </div>
          </div>

          {/* Right Results Display */}
          <div className="lg:col-span-6 flex flex-col justify-between pl-0 lg:pl-6 space-y-6 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0B0F1D] border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Annual Bill Savings</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">₹{annualBillSavings.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Recurring each year</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B0F1D] border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Govt Subsidy Grant</span>
                <div className="text-2xl font-black text-[#FF2E93] mt-1">₹{centralSubsidy.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">PM Surya Ghar direct credit</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#12182A] to-[#182038] border border-[#FF2E93]/40 shadow-xl">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">25-Year Cumulative Savings</span>
              <span className="text-3xl sm:text-4xl font-black text-vice-gradient mt-1 block">
                ₹{twentyFiveYearSavings.toLocaleString('en-IN')}
              </span>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block">Net System Cost:</span>
                  <span className="text-white font-bold">~₹{netInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Est. Payback Period:</span>
                  <span className="text-[#00F0FF] font-bold">{paybackYears} Years</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/portal')}
              className="w-full py-4 rounded-full vice-btn-primary flex items-center justify-center gap-2"
            >
              <span>Lock My Subsidy in Customer Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ROICalculator;
