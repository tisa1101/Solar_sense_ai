import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { solarApi } from '../services/solarApi';
import {
  AiSolarEvaluationRequest,
  AiSolarEvaluationResponse,
  AiSolarChatResponse,
} from '../types/solar';
import {
  Sparkles,
  Zap,
  BatteryCharging,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  FileText,
  Printer,
  Send,
  CheckCircle2,
  Sliders,
  Compass,
  ArrowRight,
  RefreshCw,
  Sun,
  Leaf,
  Coins,
  ChevronRight,
  Info
} from 'lucide-react';

interface AiSolarIntelligenceProps {
  initialBill?: number;
  initialRoofArea?: number;
  customerName?: string;
  projectNumber?: string;
}

export const AiSolarIntelligence: React.FC<AiSolarIntelligenceProps> = ({
  initialBill = 4200,
  initialRoofArea = 450,
  customerName = 'Valued Homeowner',
  projectNumber = 'PRJ-AI-2026',
}) => {
  // Assessment Form State
  const [bill, setBill] = useState<number>(initialBill);
  const [unitsKwh, setUnitsKwh] = useState<number | ''>('');
  const [roofArea, setRoofArea] = useState<number>(initialRoofArea);
  const [propertyType, setPropertyType] = useState<string>('Independent Villa');
  const [roofType, setRoofType] = useState<string>('Flat Concrete RCC');
  const [shadowObstructions, setShadowObstructions] = useState<string>('None (Clear Sun Exposure)');
  const [powerCuts, setPowerCuts] = useState<string>('Moderate (1 - 3 hours daily)');
  const [daytimeUsage, setDaytimeUsage] = useState<number>(60);
  const [sanctionedLoad, setSanctionedLoad] = useState<number | ''>('');
  const [discomName, setDiscomName] = useState<string>('');
  const [roofOrientation, setRoofOrientation] = useState<string>('');

  // Evaluation API State
  const [loading, setLoading] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<AiSolarEvaluationResponse | null>(null);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Chat Assistant State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string; suggestions?: string[] }>>([
    {
      sender: 'ai',
      text: `Hello ${customerName}, I am your AI Solar Technical Advisor. Ask me anything about net-metering, monsoon generation, battery backup, or PM Surya Ghar subsidies.`,
      time: '10:00 AM',
      suggestions: [
        'Will solar work during monsoons?',
        'Can I run a 1.5-ton AC on battery?',
        'How does DISCOM net-metering work?',
        'What is SafeDC 1V touch-safe protocol?'
      ]
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Assessment Report Modal / Print View State
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Run evaluation
  const runEvaluation = async () => {
    try {
      setLoading(true);
      setEvalError(null);
      const req: AiSolarEvaluationRequest = {
        monthlyBill: bill,
        monthlyUnitsKwh: unitsKwh === '' ? null : Number(unitsKwh),
        propertyType,
        roofAreaSqFt: roofArea,
        roofType,
        shadowObstructions,
        powerCutsFrequency: powerCuts,
        daytimeUsagePercent: daytimeUsage,
        sanctionedLoadKw: sanctionedLoad === '' ? null : Number(sanctionedLoad),
        discomName: discomName || null,
        roofOrientation: roofOrientation || null,
      };

      const res = await solarApi.evaluateAiSolar(req);
      if (res.data?.data) {
        setEvaluation(res.data.data);
      }
    } catch (err: any) {
      console.error('Failed to run AI Solar Evaluation', err);
      setEvalError(err?.response?.data?.message || 'Failed to generate AI evaluation. Please verify your input parameters.');
    } finally {
      setLoading(false);
    }
  };

  // Run evaluation on mount
  useEffect(() => {
    runEvaluation();
  }, []);

  // Handle chat submission
  const handleSendMessage = async (msgToSend?: string) => {
    const text = (msgToSend || chatInput).trim();
    if (!text || chatLoading) return;

    const userMsg = {
      sender: 'user' as const,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setChatLoading(true);

    try {
      const contextReq: AiSolarEvaluationRequest = {
        monthlyBill: bill,
        monthlyUnitsKwh: unitsKwh === '' ? null : Number(unitsKwh),
        propertyType,
        roofAreaSqFt: roofArea,
        roofType,
        shadowObstructions,
        powerCutsFrequency: powerCuts,
        daytimeUsagePercent: daytimeUsage,
        sanctionedLoadKw: sanctionedLoad === '' ? null : Number(sanctionedLoad),
        discomName: discomName || null,
        roofOrientation: roofOrientation || null,
      };

      const res = await solarApi.chatAiSolar({
        message: text,
        context: contextReq
      });

      if (res.data?.data) {
        const aiReply = {
          sender: 'ai' as const,
          text: res.data.data.reply,
          time: new Date(res.data.data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: res.data.data.suggestedFollowUps
        };
        setChatMessages((prev) => [...prev, aiReply]);
      }
    } catch (err) {
      console.error('Chat error', err);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Technical connection glitch. SolarEdge architecture operates at 99.2% CEC efficiency, and our engineering team is available 24/7.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10">
      {/* SECTION HEADER (Trilogy Innovations Sharp Style) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="ti-pill">
              <Sparkles className="w-3.5 h-3.5 text-[#F69125]" />
              <span>NEW INNOVATION // AUTONOMOUS AI SIZING</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif]">
            AI Solar Intelligence
          </h2>
          <p className="text-sm text-[#929292] font-['Space_Mono',monospace] mt-1">
            PHYSICS-BASED PHOTON HARVEST &amp; SANCTION LOAD ADVISORY ENGINE
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowReportModal(true)}
            disabled={!evaluation}
            className="px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 font-['Space_Mono',monospace] text-xs uppercase tracking-[1.5px] flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#F4A5C6]" />
            <span>AI ASSESSMENT REPORT</span>
          </button>

          <button
            onClick={runEvaluation}
            disabled={loading}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-['Space_Mono',monospace] text-xs uppercase tracking-[1.5px] font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_16px_rgba(226,132,179,0.35)] disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'EVALUATING...' : 'RECALCULATE'}</span>
          </button>
        </div>
      </div>

      {evalError && (
        <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-['Space_Mono',monospace] flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{evalError}</span>
        </div>
      )}

      {/* TOP GRID: PARAMETER MATRIX (LEFT) + REAL-TIME RECOMMENDATION CARD (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: ARCHITECTURAL INPUT PARAMETERS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="ti-card p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#F4A5C6]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-['Work_Sans',sans-serif]">
                  Property &amp; Energy Input
                </h3>
              </div>
              <span className="text-[10px] font-['Space_Mono',monospace] text-[#A79FB6] uppercase">
                Step 1 of 2
              </span>
            </div>

            <div className="space-y-5">
              {/* Electricity Bill Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label className="text-[#D5CEE0] font-['Space_Mono',monospace] uppercase tracking-wider">
                    Monthly Electricity Bill
                  </label>
                  <span className="text-base font-bold text-[#F4A5C6] font-['Space_Mono',monospace]">
                    ₹{bill.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="45000"
                  step="200"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full accent-[#E284B3] bg-white/[0.08] rounded-full cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] mt-1">
                  <span>₹1,200</span>
                  <span>₹20,000</span>
                  <span>₹45,000+</span>
                </div>
              </div>

              {/* Exact Monthly Units (kWh) Optional */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs text-[#D5CEE0] font-medium tracking-wide">
                    Monthly Consumption (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => setUnitsKwh(Math.round(bill / 8.5))}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F4A5C6] hover:text-white transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-[#E284B3]" />
                    <span>Auto-derive with AI</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder={`Auto-derived (~${Math.round(bill / 8.5)} kWh)`}
                    value={unitsKwh}
                    onChange={(e) => setUnitsKwh(e.target.value === '' ? '' : Number(e.target.value))}
                    className="ti-input w-full pr-20 text-xs"
                  />
                  <span className="absolute right-3.5 top-2.5 text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] pointer-events-none">
                    KWH / MO
                  </span>
                </div>
              </div>

              {/* Shadow-Free Roof Area Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label className="text-[#D5CEE0] font-['Space_Mono',monospace] uppercase tracking-wider">
                    Shadow-Free Roof Area
                  </label>
                  <span className="text-base font-bold text-white font-['Space_Mono',monospace]">
                    {roofArea} <span className="text-xs text-[#A79FB6]">SQ.FT</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3500"
                  step="25"
                  value={roofArea}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="w-full accent-[#8A56E2] bg-white/[0.08] rounded-full cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] mt-1">
                  <span>100 sq ft</span>
                  <span>1,500 sq ft</span>
                  <span>3,500 sq ft</span>
                </div>
              </div>

              {/* Property Type Selector (Clean Dropdown matching photo) */}
              <div>
                <label className="block text-xs text-[#D5CEE0] font-medium tracking-wide mb-1.5">
                  Property Structure
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="ti-select w-full"
                >
                  <option value="Independent Villa">Independent Villa / Bungalow</option>
                  <option value="Row House">Duplex / Row House</option>
                  <option value="Apartment Penthouse">Apartment Penthouse / Top Floor</option>
                  <option value="Commercial Shop">Commercial Establishment / Office</option>
                  <option value="Farmhouse">Farmhouse / Rural Estate</option>
                </select>
              </div>

              {/* Roof Surface Type (Clean Dropdown matching photo) */}
              <div>
                <label className="block text-xs text-[#D5CEE0] font-medium tracking-wide mb-1.5">
                  Roof Surface Architecture
                </label>
                <select
                  value={roofType}
                  onChange={(e) => setRoofType(e.target.value)}
                  className="ti-select w-full"
                >
                  <option value="Flat Concrete RCC">Flat Concrete (RCC)</option>
                  <option value="Sloped Metal Shed">Sloped Metal Sheet (Trapezoidal)</option>
                  <option value="Clay Tile Shingle">Clay Tile / Terracotta Shingle</option>
                  <option value="Elevated Gazebo Frame">Elevated Terrace Gazebo (Superstructure)</option>
                </select>
              </div>

              {/* Shadow Obstructions (Clean Dropdown matching photo) */}
              <div>
                <label className="block text-xs text-[#D5CEE0] font-medium tracking-wide mb-1.5">
                  Shading &amp; Surroundings
                </label>
                <select
                  value={shadowObstructions}
                  onChange={(e) => setShadowObstructions(e.target.value)}
                  className="ti-select w-full"
                >
                  <option value="None (Clear Sun Exposure)">None (Unobstructed 100% Sky View)</option>
                  <option value="Partial (Water Tank / Parapet)">Partial (Water Tank / Parapet Wall)</option>
                  <option value="Neighbor Trees / High-rise">Significant (Tall Trees / Adjacent Building)</option>
                </select>
              </div>

              {/* Grid Power Cuts Frequency (Clean Dropdown matching photo) */}
              <div>
                <label className="block text-xs text-[#D5CEE0] font-medium tracking-wide mb-1.5">
                  Grid Outage Frequency
                </label>
                <select
                  value={powerCuts}
                  onChange={(e) => setPowerCuts(e.target.value)}
                  className="ti-select w-full"
                >
                  <option value="Rare / None">Stable Grid (Outages &lt; 30 mins / month)</option>
                  <option value="Moderate (1 - 3 hours daily)">Moderate Cuts (1 - 3 hours daily)</option>
                  <option value="Frequent (> 4 hours daily)">Severe Cuts (&gt; 4 hours daily / Unreliable)</option>
                  <option value="No Grid Access">No Grid Connection (Zero DISCOM Line)</option>
                </select>
              </div>

              {/* Daytime Consumption Ratio */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label className="text-[#D5CEE0] font-['Space_Mono',monospace] uppercase tracking-wider">
                    Daytime Energy Consumption
                  </label>
                  <span className="text-xs font-bold text-[#F4A5C6] font-['Space_Mono',monospace]">
                    {daytimeUsage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="90"
                  step="5"
                  value={daytimeUsage}
                  onChange={(e) => setDaytimeUsage(Number(e.target.value))}
                  className="w-full accent-[#B668D8] bg-white/[0.08] rounded-full cursor-pointer h-1.5"
                />
                <div className="flex justify-between text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] mt-1">
                  <span>Night-heavy (20%)</span>
                  <span>Balanced (50%)</span>
                  <span>Day-heavy (90%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* MISSING INFORMATION CHECKLIST (Requirement 5) */}
          <div className="ti-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#F69125]" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Work_Sans',sans-serif]">
                  AI Missing Information Audit
                </h4>
              </div>
              <span className="text-[10px] font-['Space_Mono',monospace] text-[#F4A5C6] font-bold">
                {evaluation?.missingInformationAlerts?.length || 0} ITEMS IDENTIFIED
              </span>
            </div>

            <p className="text-xs text-[#A79FB6] mb-4">
              The AI identifies missing electrical &amp; utility variables before your physical DISCOM net-metering submission:
            </p>

            <div className="space-y-3">
              {evaluation?.missingInformationAlerts?.map((alert, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Space_Mono',monospace] font-bold text-white uppercase">
                      {alert.field}
                    </span>
                    <span
                      className={`text-[9px] font-['Space_Mono',monospace] px-2 py-0.5 rounded-full uppercase ${
                        alert.importance === 'Critical'
                          ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                          : alert.importance === 'Recommended'
                          ? 'bg-[#E284B3]/20 text-[#F4A5C6] border border-[#E284B3]/40'
                          : 'bg-white/10 text-[#A79FB6] border border-white/20'
                      }`}
                    >
                      {alert.importance}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D5CEE0] leading-relaxed">
                    {alert.description}
                  </p>
                  <div className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace]">
                    Impact: {alert.impact}
                  </div>
                </div>
              ))}

              {/* Quick Input fields for Missing Information */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-[#A79FB6] font-medium uppercase block mb-1">
                      Sanctioned Load (kW)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 5"
                      value={sanctionedLoad}
                      onChange={(e) => setSanctionedLoad(e.target.value === '' ? '' : Number(e.target.value))}
                      className="ti-input w-full text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#A79FB6] font-medium uppercase block mb-1">
                      DISCOM Provider
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BSES / TPDDL / MSEDCL"
                      value={discomName}
                      onChange={(e) => setDiscomName(e.target.value)}
                      className="ti-input w-full text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#A79FB6] font-medium uppercase block mb-1">
                    Roof Azimuth / Tilt
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. South 180° / 15° Tilt"
                    value={roofOrientation}
                    onChange={(e) => setRoofOrientation(e.target.value)}
                    className="ti-input w-full text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI RECOMMENDATION DOSSIER & BATTERY (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          {/* PRIMARY SYSTEM RECOMMENDATION CARD (Requirements 1, 2, 3) */}
          <div className="ti-card p-6 sm:p-8 relative overflow-hidden">
            {/* Top Badge & System Type Indicator */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Sun className="w-5 h-5 text-[#F4A5C6]" />
                <div>
                  <span className="ti-eyebrow text-[10px]">AI SYNTHESIS // CONFIDENCE: {(evaluation?.technicalConfidenceScore || 0.94) * 100}%</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    Recommended Solar System
                  </h3>
                </div>
              </div>

              {/* On-Grid vs Off-Grid vs Hybrid Pill Badge (Requirement 3) */}
              <div
                className={`px-4 py-1.5 rounded-full font-['Space_Mono',monospace] text-xs uppercase tracking-wider font-bold border backdrop-blur-xl ${
                  evaluation?.systemType === 'On-Grid'
                    ? 'bg-[#8A56E2]/20 text-[#D5CEE0] border-[#8A56E2]/50 shadow-sm'
                    : evaluation?.systemType?.includes('Hybrid')
                    ? 'bg-[#E284B3]/20 text-[#F4A5C6] border-[#E284B3]/50 shadow-sm'
                    : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                }`}
              >
                ● {evaluation?.systemType || 'ON-GRID SYSTEM'}
              </div>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10">
              <div>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  CAPACITY
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4A5C6] to-[#E284B3] font-['Space_Mono',monospace]">
                  {evaluation?.recommendedCapacityKw || 3} <span className="text-xs text-white">kW</span>
                </span>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] block mt-0.5">
                  {(evaluation?.roofUtilization?.panelsCount) || 6} × Bifacial Panels
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  ROOF OCCUPANCY
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-white font-['Space_Mono',monospace]">
                  {evaluation?.roofUtilization?.utilizationPercent || 53}%
                </span>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] block mt-0.5">
                  {evaluation?.roofUtilization?.requiredSqFt || 240} sq.ft utilized
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  ANNUAL GENERATION
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-white font-['Space_Mono',monospace]">
                  {Math.round((evaluation?.recommendedCapacityKw || 3) * 4.2 * 365)}
                </span>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] block mt-0.5">
                  Units (kWh) / Year
                </span>
              </div>

              <div>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  EST. PAYBACK
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-['Space_Mono',monospace]">
                  {evaluation?.financials?.paybackYears || 3.8} <span className="text-xs">YRS</span>
                </span>
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] block mt-0.5">
                  25-Yr ROI: ₹{(evaluation?.financials?.lifetimeSavings25Yr || 850000).toLocaleString()}
                </span>
              </div>
            </div>

            {/* AI Reasoning Section (Requirement 2 & 3) */}
            <div className="pt-6 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#E284B3]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Mono',monospace]">
                    AI Engineering Logic &amp; Why This System Was Chosen:
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#D5CEE0] leading-relaxed font-light rounded-2xl bg-white/[0.04] p-4 border border-white/10 backdrop-blur-xl">
                  {evaluation?.aiExplanation || 'Analyzing your electrical profile and roof layout...'}
                </p>
              </div>

              {/* On-Grid vs Off-Grid / Hybrid System Rationale */}
              <div className="rounded-2xl bg-white/[0.04] p-4 border border-white/10 text-xs space-y-2 backdrop-blur-xl">
                <span className="font-['Space_Mono',monospace] font-bold text-[#F4A5C6] uppercase tracking-wider text-[11px] block">
                  Grid Strategy Logic // {evaluation?.systemType?.toUpperCase()}:
                </span>
                <p className="text-[#A79FB6] leading-relaxed">
                  {evaluation?.systemTypeReasoning}
                </p>
              </div>

              {/* Key Engineering Highlights list */}
              <div>
                <span className="text-[11px] font-['Space_Mono',monospace] text-[#A79FB6] uppercase block mb-2">
                  Autonomous Verification Criteria:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {evaluation?.keyEngineeringHighlights?.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#D5CEE0]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E284B3] shrink-0 mt-0.5" />
                      <span className="text-[11px]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BATTERY STORAGE RECOMMENDATION CARD (Requirement 4) */}
          <div className="ti-card p-6 border-l-4 border-l-[#E284B3]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <BatteryCharging className="w-6 h-6 text-[#F4A5C6]" />
                <div>
                  <span className="ti-eyebrow text-[10px]">ENERGY INDEPENDENCE // STORAGE SIZING</span>
                  <h3 className="text-lg font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    Battery Storage Recommendation
                  </h3>
                </div>
              </div>

              <div
                className={`px-4 py-1.5 rounded-full font-['Space_Mono',monospace] text-xs uppercase font-bold border backdrop-blur-xl ${
                  evaluation?.batteryRecommendation?.needed
                    ? 'bg-[#E284B3]/20 text-[#F4A5C6] border-[#E284B3]/50 shadow-sm'
                    : 'bg-white/10 text-[#A79FB6] border-white/20'
                }`}
              >
                {evaluation?.batteryRecommendation?.needed ? '⚡ BATTERY REQUIRED / RECOMMENDED' : 'GRID NET-METERING SUFFICIENT'}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 text-xs">
              <div className="p-3 bg-[#00152B] border border-white/10">
                <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">
                  CAPACITY SIZING
                </span>
                <span className="text-xl font-bold text-white font-['Space_Mono',monospace] block mt-1">
                  {evaluation?.batteryRecommendation?.capacityKwh || 0} kWh
                </span>
                <span className="text-[10px] text-[#A79FB6]">
                  {evaluation?.batteryRecommendation?.batteryType || 'LiFePO4 Modular Rack'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  AUTONOMOUS BACKUP
                </span>
                <span className="text-xl font-bold text-[#F4A5C6] font-['Space_Mono',monospace] block mt-1">
                  ~{evaluation?.batteryRecommendation?.backupHours || 0} Hours
                </span>
                <span className="text-[10px] text-[#A79FB6]">
                  Critical load: 1.5-ton AC + lights + WiFi
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
                <span className="text-[10px] text-[#A79FB6] font-['Space_Mono',monospace] uppercase block">
                  ESTIMATED STORAGE CAPEX
                </span>
                <span className="text-xl font-bold text-white font-['Space_Mono',monospace] block mt-1">
                  ₹{(evaluation?.batteryRecommendation?.estimatedCost || 0).toLocaleString()}
                </span>
                <span className="text-[10px] text-[#A79FB6]">
                  6000+ Cycles (15-yr lifespan)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D5CEE0] leading-relaxed pt-2">
              <strong className="text-white">AI Storage Logic:</strong> {evaluation?.batteryRecommendation?.reasoning}
            </p>
          </div>

          {/* FINANCIAL & ENVIRONMENTAL METRICS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="ti-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Coins className="w-4 h-4 text-[#F4A5C6]" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Mono',monospace]">
                  Financials &amp; Subsidies
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A79FB6]">Gross System Capex:</span>
                  <span className="font-['Space_Mono',monospace] text-white">₹{(evaluation?.financials?.grossSystemCost || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A79FB6]">PM Surya Ghar DBT Subsidy:</span>
                  <span className="font-['Space_Mono',monospace] text-emerald-400 font-bold">-₹{(evaluation?.financials?.centralSubsidy || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold">
                  <span className="text-white">Net Customer Outlay:</span>
                  <span className="font-['Space_Mono',monospace] text-[#F4A5C6]">₹{(evaluation?.financials?.netCost || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#A79FB6]">Monthly Bill Savings:</span>
                  <span className="font-['Space_Mono',monospace] text-white">~₹{(evaluation?.financials?.monthlyAverageSavings || 0).toLocaleString()}/mo</span>
                </div>
              </div>
            </div>

            <div className="ti-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-['Space_Mono',monospace]">
                  25-Year Carbon Offset
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#A79FB6]">CO2 Avoided Annually:</span>
                  <span className="font-['Space_Mono',monospace] text-white">{evaluation?.environmentalImpact?.co2SavedPerYearTons || 3.4} Metric Tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A79FB6]">Forest Equivalent:</span>
                  <span className="font-['Space_Mono',monospace] text-emerald-400 font-bold">{evaluation?.environmentalImpact?.treesEquivalent || 155} Mature Trees</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span className="text-[#A79FB6]">Thermal Coal Saved:</span>
                  <span className="font-['Space_Mono',monospace] text-white">{(evaluation?.environmentalImpact?.coalSavedKg || 1400).toLocaleString()} kg/yr</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#A79FB6]">SolarEdge Inverter Safety:</span>
                  <span className="font-['Space_Mono',monospace] text-[#E284B3]">SafeDC™ 1V Rapid Touch-Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONVERSATIONAL SOLAR ASSISTANT (Requirement 6) */}
      <div className="ti-card p-6 sm:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#E284B3] to-[#8A56E2] flex items-center justify-center shadow-[0_4px_16px_rgba(226,132,179,0.35)]">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="ti-eyebrow text-[10px]">NEURAL ADVISORY // 24/7 COPILOT</span>
              <h3 className="text-xl font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                Conversational Solar Assistant
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-['Space_Mono',monospace] text-[#A79FB6] uppercase px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
            LIVE ADVISOR ACTIVE
          </span>
        </div>

        {/* Suggested Quick Question Prompts */}
        <div className="mb-4">
          <span className="text-[10px] font-['Space_Mono',monospace] text-[#A79FB6] uppercase block mb-2">
            Ask Instant Technical Questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              'Will solar work during monsoons?',
              'Can I run a 1.5-ton AC on battery?',
              'How does DISCOM net-metering work?',
              'What is SafeDC 1V touch-safe protocol?',
              'How long does the PM Surya Ghar subsidy take?'
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={chatLoading}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] text-[#D5CEE0] hover:text-white border border-white/12 text-[11px] font-['Space_Mono',monospace] transition-colors cursor-pointer text-left backdrop-blur-xl"
              >
                + {q}
              </button>
            ))}
          </div>
        </div>

        {/* Message Thread Box */}
        <div className="h-72 overflow-y-auto bg-white/[0.03] rounded-3xl border border-white/10 p-5 space-y-4 mb-4 backdrop-blur-2xl custom-scrollbar shadow-inner">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-['Space_Mono',monospace] uppercase text-[#A79FB6]">
                  {msg.sender === 'user' ? customerName : 'AI SOLAR ADVISOR'}
                </span>
                <span className="text-[9px] font-['Space_Mono',monospace] text-[#A79FB6]">
                  {msg.time}
                </span>
              </div>
              <div
                className={`max-w-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#E284B3] to-[#8A56E2] text-white shadow-md'
                    : 'rounded-2xl rounded-tl-sm bg-white/[0.07] border border-white/10 text-[#D5CEE0] backdrop-blur-xl'
                }`}
              >
                {msg.text}
              </div>

              {/* Follow-up suggestions if provided by AI */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.suggestions.map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSendMessage(sug)}
                      disabled={chatLoading}
                      className="text-[10px] text-[#F4A5C6] hover:text-white font-['Space_Mono',monospace] underline cursor-pointer"
                    >
                      → {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {chatLoading && (
            <div className="flex items-center gap-2 text-xs text-[#A79FB6] font-['Space_Mono',monospace] px-2">
              <span className="w-2 h-2 rounded-full bg-[#E284B3] animate-ping" />
              <span>Analyzing solar database and DISCOM regulations...</span>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about tariffs, warranties, weather degradation, or inverter specs..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 rounded-full bg-white/[0.04] text-white border border-white/12 px-5 py-3 text-xs font-['Space_Mono',monospace] focus:border-[#E284B3] focus:outline-none backdrop-blur-xl"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!chatInput.trim() || chatLoading}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-['Space_Mono',monospace] text-xs uppercase font-bold flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_16px_rgba(226,132,179,0.35)] disabled:opacity-50"
          >
            <span>SEND</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* AI ASSESSMENT REPORT MODAL / PRINT DOSSIER (Requirement 7) */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#00152B] border border-white/20 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 text-white space-y-8 print:p-0 print:border-none print:bg-white print:text-black"
              style={{ borderRadius: 0 }}
            >
              {/* Modal Actions */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4 print:hidden">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#F69125]" />
                  <span className="font-['Space_Mono',monospace] text-xs uppercase text-[#929292]">
                    OFFICIAL AI FEASIBILITY DOSSIER // {projectNumber}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 bg-[#315AF7] text-white font-['Space_Mono',monospace] text-xs uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>PRINT / EXPORT PDF</span>
                  </button>
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-['Space_Mono',monospace] text-xs uppercase cursor-pointer"
                  >
                    CLOSE [✕]
                  </button>
                </div>
              </div>

              {/* Dossier Header */}
              <div className="border-b border-white/10 pb-6 print:border-black">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase font-['Work_Sans',sans-serif] tracking-wider text-white print:text-black">
                      AI Solar Assessment Report
                    </h1>
                    <p className="text-xs font-['Space_Mono',monospace] text-[#929292] mt-1 print:text-gray-600">
                      PREPARED FOR: {customerName.toUpperCase()} • DATE: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right font-['Space_Mono',monospace] text-xs">
                    <span className="text-[#F69125] font-bold block print:text-black">SOLAREDGE ARCHITECTURE</span>
                    <span className="text-[#929292] text-[10px]">CERTIFIED SPECIFICATION</span>
                  </div>
                </div>
              </div>

              {/* Summary Technical Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#002A57] p-5 border border-white/10 print:bg-gray-100 print:text-black print:border-black">
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">
                    RECOMMENDED CAPACITY
                  </span>
                  <span className="text-xl font-bold font-['Space_Mono',monospace] text-white print:text-black">
                    {evaluation?.recommendedCapacityKw} kW
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">
                    GRID TOPOLOGY
                  </span>
                  <span className="text-xl font-bold font-['Space_Mono',monospace] text-[#F69125] print:text-black">
                    {evaluation?.systemType}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">
                    BATTERY STORAGE
                  </span>
                  <span className="text-xl font-bold font-['Space_Mono',monospace] text-white print:text-black">
                    {evaluation?.batteryRecommendation?.capacityKwh || 0} kWh
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">
                    25-YEAR NET SAVINGS
                  </span>
                  <span className="text-xl font-bold font-['Space_Mono',monospace] text-emerald-400 print:text-black">
                    ₹{(evaluation?.financials?.lifetimeSavings25Yr || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Engineering Sizing Analysis */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase font-['Space_Mono',monospace] text-white print:text-black border-b border-white/10 pb-2">
                  01 // Engineering Sizing &amp; Generation Feasibility
                </h3>
                <p className="text-xs text-[#E4E4E4] print:text-gray-800 leading-relaxed">
                  {evaluation?.aiExplanation}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
                  <div className="p-3 bg-[#002A57] border border-white/10 print:bg-white print:border-gray-400">
                    <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">Panel Configuration</span>
                    <span className="text-white font-bold print:text-black">{evaluation?.roofUtilization?.panelsCount} × {evaluation?.roofUtilization?.panelModel}</span>
                  </div>
                  <div className="p-3 bg-[#002A57] border border-white/10 print:bg-white print:border-gray-400">
                    <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">Roof Footprint</span>
                    <span className="text-white font-bold print:text-black">{evaluation?.roofUtilization?.requiredSqFt} sq.ft ({evaluation?.roofUtilization?.utilizationPercent}% of roof)</span>
                  </div>
                  <div className="p-3 bg-[#002A57] border border-white/10 print:bg-white print:border-gray-400">
                    <span className="text-[10px] text-[#929292] font-['Space_Mono',monospace] uppercase block">Mounting Structure</span>
                    <span className="text-white font-bold print:text-black">{evaluation?.roofUtilization?.structureType}</span>
                  </div>
                </div>
              </div>

              {/* Financial & Subsidy Breakdown */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase font-['Space_Mono',monospace] text-white print:text-black border-b border-white/10 pb-2">
                  02 // PM Surya Ghar Financial Audit
                </h3>
                <table className="w-full text-xs font-['Space_Mono',monospace] border-collapse">
                  <tbody>
                    <tr className="border-b border-white/10 print:border-gray-300">
                      <td className="py-2 text-[#929292]">Gross Turnkey EPC Cost</td>
                      <td className="py-2 text-right font-bold text-white print:text-black">₹{(evaluation?.financials?.grossSystemCost || 0).toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-white/10 print:border-gray-300">
                      <td className="py-2 text-[#929292]">PM Surya Ghar Muft Bijli Yojana Central Subsidy</td>
                      <td className="py-2 text-right font-bold text-emerald-400 print:text-green-700">- ₹{(evaluation?.financials?.centralSubsidy || 0).toLocaleString()}</td>
                    </tr>
                    {evaluation?.batteryRecommendation?.needed && (
                      <tr className="border-b border-white/10 print:border-gray-300">
                        <td className="py-2 text-[#929292]">LiFePO4 Storage Expansion ({evaluation?.batteryRecommendation?.capacityKwh} kWh)</td>
                        <td className="py-2 text-right font-bold text-[#F69125] print:text-orange-700">+ ₹{(evaluation?.batteryRecommendation?.estimatedCost || 0).toLocaleString()}</td>
                      </tr>
                    )}
                    <tr className="border-b border-white/20 print:border-black font-bold">
                      <td className="py-2 text-white print:text-black">Net Homeowner Outlay</td>
                      <td className="py-2 text-right text-base text-[#F69125] print:text-black">₹{(evaluation?.financials?.netCost || 0).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-[#929292]">Estimated Payback Period</td>
                      <td className="py-2 text-right font-bold text-emerald-400 print:text-green-700">{evaluation?.financials?.paybackYears} Years</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Environmental Offset Certificate */}
              <div className="p-4 bg-[#002A57] border border-white/10 print:bg-white print:border-gray-400 space-y-2">
                <h4 className="text-xs font-bold uppercase font-['Space_Mono',monospace] text-emerald-400 print:text-green-700">
                  03 // Ecological Impact Verified
                </h4>
                <p className="text-xs text-[#E4E4E4] print:text-gray-800">
                  This system will offset <strong>{evaluation?.environmentalImpact?.co2SavedPerYearTons} tons of CO2</strong> annually, equivalent to planting <strong>{evaluation?.environmentalImpact?.treesEquivalent} mature trees</strong> and replacing <strong>{(evaluation?.environmentalImpact?.coalSavedKg || 0).toLocaleString()} kg</strong> of coal combustion annually for the next 25 years.
                </p>
              </div>

              {/* Footer Note */}
              <div className="text-[10px] text-[#929292] font-['Space_Mono',monospace] border-t border-white/10 pt-4 print:border-black">
                NOTICE: This AI assessment is calculated utilizing SolarEdge technical standards, MNRE benchmark specifications, and local DISCOM net-metering regulations. Physical rooftop structural stability and azimuth angles will be re-verified by an authorized field engineer prior to final dispatch.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
