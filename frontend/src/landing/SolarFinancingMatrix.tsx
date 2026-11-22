import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Banknote,
  Landmark,
  FileText,
  Handshake,
  CheckCircle2,
  TrendingUp,
  Percent,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SolarFinancingMatrix: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'cash' | 'loan' | 'lease' | 'ppa'>('loan');

  const plans = [
    {
      id: 'cash',
      name: 'Cash Purchase',
      icon: Banknote,
      tag: 'MAXIMUM LIFETIME SAVINGS',
      upfront: '100% Upfront',
      monthly: '₹0 Ongoing Loan',
      ownership: 'Immediate 100% Ownership',
      savings: 'Maximum ROI over 25 Years',
      subsidy: 'Direct PM Surya Ghar Credit (Up to ₹78,000)',
      bestFor: 'Homeowners seeking highest long-term financial return.'
    },
    {
      id: 'loan',
      name: 'Zero-Down Solar Loan',
      icon: Landmark,
      tag: 'MOST POPULAR',
      upfront: '₹0 Down Payment',
      monthly: 'Low EMI offset by bill savings',
      ownership: 'Own system from Day 1',
      savings: 'Immediate cash flow positive',
      subsidy: 'Subsidy applied directly to principal',
      bestFor: 'Families wanting zero upfront cost with instant bill reduction.'
    },
    {
      id: 'lease',
      name: 'Solar Lease',
      icon: FileText,
      tag: 'PREDICTABLE FIXED PAYMENTS',
      upfront: 'Zero or minimal upfront',
      monthly: 'Fixed predictable monthly rate',
      ownership: 'Third-party managed & owned',
      savings: 'Free lifetime operations & maintenance',
      subsidy: 'Subsidy retained by financing provider',
      bestFor: 'Those wanting zero maintenance responsibility.'
    },
    {
      id: 'ppa',
      name: 'Power Purchase Agreement (PPA)',
      icon: Handshake,
      tag: 'PAY ONLY FOR POWER PRODUCED',
      upfront: '₹0 Capital Investment',
      monthly: 'Pay per kWh produced at lower rate',
      ownership: 'Utility / Developer owned',
      savings: 'Guaranteed 20-30% below DISCOM tariff',
      subsidy: 'Handled by PPA operator',
      bestFor: 'Commercial buildings & large residential estates.'
    }
  ];

  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[1];

  return (
    <section className="relative py-24 bg-[#0A0D14] border-t border-white/5 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FLEXIBLE SOLAR FINANCING MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Clear Financing Paths <span className="text-emerald-400">For Every Home</span>
          </h2>
          <p className="mt-3 text-base text-slate-400 leading-relaxed">
            Choose between full cash ownership, zero-down bank loans with PM Surya Ghar subsidies, solar leases, or power purchase agreements (PPA).
          </p>
        </div>

        {/* Presentation Graphic & Interactive Financing Selector */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#0F1420] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Left: Presentation HUD Visual (User Uploaded Image 2) */}
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner group">
            <img
              src="/assets/solar/solar-financing-hud.jpg"
              alt="Solar Energy Financing Tablet HUD"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

            {/* Overlay Telemetry Pill */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>72% GRID INDEPENDENCE TELEMETRY</span>
            </div>

            {/* Bottom Floating Stats */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 font-mono text-xs">
              <span className="text-slate-300">Central DBT Subsidy:</span>
              <span className="text-emerald-400 font-bold">₹78,000 Direct Bank Credit</span>
            </div>
          </div>

          {/* Right: Interactive 4-Way Comparison */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* 4 Plan Pill Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {plans.map((pl) => {
                const active = selectedPlan === pl.id;
                return (
                  <button
                    key={pl.id}
                    onClick={() => setSelectedPlan(pl.id as typeof selectedPlan)}
                    className={`p-3 rounded-xl text-center text-xs font-bold transition-all border ${
                      active
                        ? 'bg-emerald-500 text-black border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                        : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {pl.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>

            {/* Selected Plan Details Card */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {currentPlan.tag}
                </span>
                <span className="text-xs font-mono text-slate-400">Option {selectedPlan.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl font-bold text-white">{currentPlan.name}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{currentPlan.bestFor}</p>

              <div className="space-y-2.5 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Upfront Investment:</span>
                  <span className="font-bold text-white font-mono">{currentPlan.upfront}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Monthly Cash Flow:</span>
                  <span className="font-bold text-emerald-400 font-mono">{currentPlan.monthly}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-slate-400">Asset Ownership:</span>
                  <span className="font-bold text-white font-mono">{currentPlan.ownership}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Government Subsidy:</span>
                  <span className="font-bold text-sky-400 font-mono">{currentPlan.subsidy}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/portal')}
                className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Calculate My Savings on {currentPlan.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
