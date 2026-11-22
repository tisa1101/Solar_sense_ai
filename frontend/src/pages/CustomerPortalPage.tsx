import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { solarApi } from '../services/solarApi';
import { CustomerPortalData, SolarSystemType, SolarPackageTemplate } from '../types/solar';
import { NasaEyesSolarCanvas } from '../components/NasaEyesSolarCanvas';
import { SolarScrollCanvas } from '../components/SolarScrollCanvas';
import { InteractiveEnergyFlow } from '../components/InteractiveEnergyFlow';
import { AiSolarIntelligence } from '../components/AiSolarIntelligence';
import { AiRoofPhotoIntelligence } from '../components/AiRoofPhotoIntelligence';
import { CompanyLogo } from '../components/CompanyLogo';
import {
  Sun,
  ShieldCheck,
  Zap,
  Clock,
  Wrench,
  FileCheck2,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Layers,
  FileText,
  BadgePercent,
  Download,
  Sliders,
  Home,
  Award,
  Headphones,
  Check,
  Compass,
  TrendingUp,
  ChevronDown,
  UserCheck,
  Sparkles,
  Camera
} from 'lucide-react';

export const CustomerPortalPage: React.FC = () => {
  const [project, setProject] = useState<CustomerPortalData | null>(null);
  const [allProjects, setAllProjects] = useState<CustomerPortalData[]>([]);
  const [packages, setPackages] = useState<SolarPackageTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'film' | 'nasa' | 'stages' | 'warranty' | 'calculator' | 'support' | 'certificate' | 'ai' | 'roof'>('overview');

  // Calculator State
  const [monthlyBill, setMonthlyBill] = useState<number>(3800);
  const [roofArea, setRoofArea] = useState<number>(360);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryAddress, setInquiryAddress] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Support Ticket State
  const [faultCode, setFaultCode] = useState('ERR-F04');
  const [issueDesc, setIssueDesc] = useState('Inverter shutdown during heavy rainfall. Display panel indicates fault code ERR-F04.');
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

  const fetchPortalData = async (projectId?: number) => {
    try {
      setLoading(true);
      const savedPhone = localStorage.getItem('stocksense_active_customer_phone');
      const savedId = projectId || (localStorage.getItem('stocksense_active_customer_id') ? Number(localStorage.getItem('stocksense_active_customer_id')) : undefined);

      const [projRes, allProjRes, pkgRes] = await Promise.all([
        solarApi.getPortalOverview(savedId, savedId ? undefined : (savedPhone || undefined)),
        solarApi.getProjects(),
        solarApi.getPackages()
      ]);
      setProject(projRes.data.data);
      setAllProjects(allProjRes.data.data);
      setPackages(pkgRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortalData();
  }, []);

  const handleSwitchProject = (id: number) => {
    localStorage.setItem('stocksense_active_customer_id', String(id));
    fetchPortalData(id);
  };

  const handleCustomerLogout = () => {
    localStorage.removeItem('stocksense_customer_session');
    localStorage.removeItem('stocksense_active_customer_id');
    localStorage.removeItem('stocksense_active_customer_phone');
  };

  // Calculator computations
  const recommendedKw = Math.min(5, Math.max(1, Math.round(monthlyBill / 1200)));
  const calculatedSavingsYear = recommendedKw * 4.2 * 365 * 9.2;
  const centralSubsidy = recommendedKw === 1 ? 30000 : recommendedKw === 2 ? 60000 : 78000;
  const estimatedSystemCost = recommendedKw * 54000;
  const netEstimatedCost = Math.max(20000, estimatedSystemCost - centralSubsidy);
  const paybackYears = (netEstimatedCost / calculatedSavingsYear).toFixed(1);

  const handleCreateInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    try {
      await solarApi.createInquiry({
        customerName: inquiryName,
        phone: inquiryPhone,
        email: `${inquiryName.toLowerCase().replace(/\s+/g, '')}@example.com`,
        address: inquiryAddress || 'Pune, Maharashtra',
        systemCapacityKw: recommendedKw,
        systemType: 1,
        monthlyElectricityBill: monthlyBill,
        shadowFreeRoofSqFt: roofArea,
        notes: 'Submitted via Trilogy Innovations Clean Energy Portal'
      });
      setInquirySubmitted(true);
      setTimeout(() => {
        fetchPortalData();
      }, 1000);
    } catch {
      alert('Failed to submit inquiry.');
    }
  };

  const handleRaiseTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    try {
      const serial = project.equipmentWithWarranty[0]?.serialNumber || 'INV-SP-3K-88492';
      const res = await solarApi.createTicket({
        projectId: project.projectId,
        customerName: project.customerName,
        customerPhone: project.phone,
        serialNumber: serial,
        faultCode: faultCode || 'ERR-F04',
        description: issueDesc
      });
      setTicketSuccess(
        `Support Ticket #${res.data.data.ticketNumber} created! Covered under 2-Year Inverter Warranty. Technician fee: ₹0.`
      );
      fetchPortalData(project.projectId);
    } catch {
      alert('Failed to submit ticket');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#00152B] flex flex-col items-center justify-center text-white space-y-4 font-['Space_Mono',monospace]">
        <div className="w-12 h-12 border-2 border-[#315AF7]/20 border-t-[#315AF7] animate-spin" />
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-[3px] text-[#F69125] font-bold block">
            TRILOGY INNOVATIONS // ENERGY MATRIX
          </span>
          <p className="text-xs text-[#929292] mt-1 font-['Work_Sans',sans-serif]">
            Retrieving client telemetry and serial records...
          </p>
        </div>
      </div>
    );
  }

  // 6 Stages directly matching problem statement
  const storyStages = [
    {
      index: '01',
      title: 'Consultation & Feasibility',
      desc: 'Shadow-free roof space, monthly electricity consumption and DISCOM grid feasibility evaluated.',
      status: (project?.progressPercent || 0) >= 15 ? 'completed' : 'active',
      date: 'Day 1'
    },
    {
      index: '02',
      title: 'Technical Site Assessment',
      desc: 'Roof compass orientation (azimuth), tilt angles and DC-to-AC distribution board distances measured on site.',
      status: (project?.progressPercent || 0) >= 35 ? 'completed' : (project?.progressPercent || 0) >= 15 ? 'active' : 'upcoming',
      date: 'Day 3'
    },
    {
      index: '03',
      title: 'Engineered System Design',
      desc: 'Capacity-optimized BOM kit approved, string sizing verified, and advance payment processed.',
      status: (project?.progressPercent || 0) >= 50 ? 'completed' : (project?.progressPercent || 0) >= 35 ? 'active' : 'upcoming',
      date: 'Day 6'
    },
    {
      index: '04',
      title: 'Warehouse Dispatch & Serial Binding',
      desc: 'Barcodes scanned, inverters and batteries mapped, and 2-year/20-year legal warranty clocks initialized.',
      status: (project?.progressPercent || 0) >= 65 ? 'completed' : (project?.progressPercent || 0) >= 50 ? 'active' : 'upcoming',
      date: 'Day 9'
    },
    {
      index: '05',
      title: 'On-Roof Installation & Testing',
      desc: 'Mounting rails fixed, DC solar cables routed, power generation (kW) and voltage (V) certified under live sun.',
      status: (project?.progressPercent || 0) >= 85 ? 'completed' : (project?.progressPercent || 0) >= 65 ? 'active' : 'upcoming',
      date: 'Day 12'
    },
    {
      index: '06',
      title: 'Commissioning & Handover',
      desc: 'Digital touchscreen acceptance signature captured, PM Surya Ghar net-metering submitted, and system activated.',
      status: (project?.progressPercent || 0) >= 100 ? 'completed' : (project?.progressPercent || 0) >= 85 ? 'active' : 'upcoming',
      date: 'Day 14'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0713] text-[#D5CEE0] flex flex-col font-['Work_Sans',sans-serif] selection:bg-[#E284B3] selection:text-white relative overflow-x-hidden">
      {/* Dreamy Ambient Orchid & Rose Backlight Glows (Reference Theme) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(226,132,179,0.22)_0%,rgba(138,86,226,0.14)_35%,transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_90%_45%,rgba(245,184,149,0.07)_0%,transparent_50%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_80%,rgba(138,86,226,0.08)_0%,transparent_50%)] z-0" />

      {/* Top Header Navigation (Frosted Glass Luxury) */}
      <header className="sticky top-0 z-50 bg-[#0D0917]/75 backdrop-blur-3xl border-b border-white/10 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo with GTA VI Solar Crest */}
          <Link to="/" className="flex items-center gap-3">
            <CompanyLogo size="md" subtitle="CLEAN ENERGY VAULT" />
            <span className="hidden sm:inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FF2E93]/20 text-[#FF2E93] border border-[#FF2E93]/35 uppercase tracking-wider font-mono">
              PORTAL
            </span>
          </Link>

          {/* Quick Actions & Architectural Dropdown List (Trilogy Style) */}
          {/* Quick Actions & Frosted Pill Dropdown */}
          <div className="flex items-center gap-3">
            {/* Custom Frosted Pill Dropdown Selector */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[#A79FB6] text-xs uppercase font-semibold tracking-wider">
                SYSTEM:
              </span>
              <div className="relative inline-block">
                <select
                  value={project?.projectId}
                  onChange={(e) => handleSwitchProject(Number(e.target.value))}
                  className="ti-select cursor-pointer text-xs font-semibold uppercase tracking-wider py-2 pl-3.5 pr-8"
                >
                  {allProjects.map((p, idx) => (
                    <option key={p.projectId} value={p.projectId} className="bg-[#0E0A18] text-white py-2">
                      0{idx + 1} // {p.customerName.toUpperCase()} — {p.systemCapacityKw}KW
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Link
              to="/portal/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-[#D5CEE0] hover:text-white border border-white/15 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#F4A5C6]" />
              <span>SWITCH CLIENT ↗</span>
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E284B3]/20 to-[#8A56E2]/20 hover:from-[#E284B3]/35 hover:to-[#8A56E2]/35 border border-[#E284B3]/40 rounded-full text-white text-xs font-semibold tracking-wider transition-all shadow-[0_0_16px_rgba(226,132,179,0.25)]"
            >
              <Layers className="w-3.5 h-3.5 text-[#F4A5C6]" />
              <span className="hidden md:inline text-xs tracking-wider">
                INSTALLER ERP ↗
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section (Frosted Glassmorphism Ambient Layout) */}
      <section className="relative pt-14 pb-12 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {/* Luminous Pill Badge */}
            <div className="flex items-center justify-center sm:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_4px_16px_rgba(226,132,179,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#E284B3] animate-pulse" />
                <span>CLIENT ENERGY VAULT // VERIFIED</span>
              </div>
            </div>

            {/* H1: Large Display with Rose-to-Orchid Gradient Accent */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase">
              HELLO, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4A5C6] to-[#E284B3]">{project?.customerName || 'Rajesh Sharma'}</span>
            </h1>

            {/* Subtitle with Frosted Pill Tag */}
            <p className="text-sm sm:text-base text-[#C7BED6] font-light max-w-2xl leading-relaxed">
              Real-time generation telemetry and legal warranty ledger for your{' '}
              <span className="inline-block px-3 py-1 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-full font-semibold text-white uppercase text-xs sm:text-sm">
                {project?.systemCapacityKw || 3} KW BIPHYSICAL ARRAY
              </span>
              . Engineered under SafeDC™ 1V touch-safe architectural protocol.
            </p>

            {/* Frosted Action Pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-4">
              <button
                onClick={() => setActiveTab('roof')}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] text-white text-xs font-bold uppercase tracking-wider shadow-[0_6px_24px_rgba(226,132,179,0.35)] hover:shadow-[0_8px_32px_rgba(226,132,179,0.5)] transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>KERAS ROOF PHOTO AUDIT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className="px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] text-white border border-white/15 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F4A5C6]" />
                <span>AI SIZING ENGINE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F4A5C6]" />
              </button>

              <button
                onClick={() => setActiveTab('certificate')}
                className="px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] text-white border border-white/15 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>HANDOVER CERTIFICATE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('stages')}
                className="px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] text-white border border-white/15 text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>6-STAGE ROADMAP</span>
                <ArrowUpRight className="w-4 h-4 text-[#F69125]" />
              </button>
            </div>
          </motion.div>

          {/* 4 Floating Frosted Glass Metric Cards (From Reference Theme) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12">
            <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-pink-300/30 transition-all duration-300 hover:-translate-y-1">
              <span className="text-[10px] font-bold text-[#F4A5C6] uppercase tracking-[1.5px] block">01 // PV CAPACITY</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                {project?.systemCapacityKw || 3} <span className="text-xs text-[#A79FB6] font-normal uppercase">kW</span>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#A79FB6] font-light">
                Tier-1 Monocrystalline Bifacial
              </div>
            </div>

            <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-pink-300/30 transition-all duration-300 hover:-translate-y-1">
              <span className="text-[10px] font-bold text-[#F5B895] uppercase tracking-[1.5px] block">02 // STAGE PROGRESS</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#F5B895] mt-2">
                {project?.progressPercent || 50}%
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#A79FB6] font-light">
                {project?.currentStageName || 'Kit Dispatched'}
              </div>
            </div>

            <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-pink-300/30 transition-all duration-300 hover:-translate-y-1">
              <span className="text-[10px] font-bold text-white uppercase tracking-[1.5px] block">03 // ANNUAL SAVINGS</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
                ₹{Math.round((project?.systemCapacityKw || 3) * 4.2 * 365 * 9.2).toLocaleString('en-IN')}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#A79FB6] font-light">
                Estimated Grid Bill Offset
              </div>
            </div>

            <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-6 text-left shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:border-pink-300/30 transition-all duration-300 hover:-translate-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[1.5px] block">04 // APPROVED SUBSIDY</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-2">
                ₹{project?.governmentSubsidy.toLocaleString('en-IN') || '78,000'}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-xs text-[#A79FB6] font-light">
                PM Surya Ghar Direct DBT
              </div>
            </div>
          </div>
        </div>

        {/* Floating Frosted Glass Segmented Navigation Dock (Exact Style of Reference Image) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="p-1.5 rounded-full bg-white/[0.06] backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto custom-scrollbar">
            {[
              { id: 'overview', index: '01', label: 'OVERVIEW & FLOW' },
              { id: 'film', index: '02', label: '4K ROOF FILM' },
              { id: 'nasa', index: '03', label: 'NASA SOLAR ENGINE' },
              { id: 'stages', index: '04', label: '6-STAGE ROADMAP' },
              { id: 'warranty', index: '05', label: '20-YR WARRANTY' },
              { id: 'calculator', index: '06', label: 'YIELD & SUBSIDY' },
              { id: 'support', index: '07', label: 'BREAKDOWN DESK' },
              { id: 'certificate', index: '08', label: 'CERTIFICATE' },
              { id: 'ai', index: '09', label: 'AI SOLAR INTELLIGENCE' },
              { id: 'roof', index: '10', label: 'AI ROOF PHOTO INTELLIGENCE' }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.22] text-white shadow-[0_4px_16px_rgba(226,132,179,0.3)] backdrop-blur-md border border-white/20 font-bold'
                      : 'text-[#A79FB6] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-[#F4A5C6] mr-1.5 font-bold">{tab.index}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full z-10">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW & FLOW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              <div>
                <span className="ti-eyebrow">FIELD TELEMETRY // CURRENT STATUS</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  Installation Overview
                </h2>
              </div>

              {/* Live Stage Progress Bar */}
              <div className="rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider font-['Work_Sans',sans-serif]">
                      Current Installation Stage
                    </h3>
                    <p className="text-xs text-[#A79FB6] mt-1 font-['Space_Mono',monospace]">
                      ESTIMATED HANDOVER: {project?.estimatedInstallDate ? new Date(project.estimatedInstallDate).toLocaleDateString() : 'WITHIN 14 DAYS'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4A5C6] via-[#B668D8] to-[#8A56E2] font-['Space_Mono',monospace]">
                      {project?.progressPercent || 50}%
                    </span>
                    <span className="text-[10px] font-['Space_Mono',monospace] text-[#A79FB6] block uppercase tracking-wider">
                      WORK ORDER COMPLETE
                    </span>
                  </div>
                </div>

                {/* Progress Track (Frosted Pill Track) */}
                <div className="h-3 rounded-full bg-white/[0.08] p-0.5 border border-white/10 mb-8 overflow-hidden shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#F4A5C6] via-[#B668D8] to-[#8A56E2] transition-all duration-700 shadow-[0_0_16px_rgba(226,132,179,0.5)]"
                    style={{ width: `${project?.progressPercent || 50}%` }}
                  />
                </div>

                {/* 6 Step Indicators */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {storyStages.map((stage) => (
                    <div
                      key={stage.index}
                      className={`p-4 rounded-2xl border transition-all text-left backdrop-blur-xl ${
                        stage.status === 'completed'
                          ? 'bg-[#8A56E2]/15 border-[#8A56E2]/40 text-white shadow-[0_4px_16px_rgba(138,86,226,0.2)]'
                          : stage.status === 'active'
                          ? 'bg-[#E284B3]/15 border-[#E284B3] text-white shadow-[0_0_20px_rgba(226,132,179,0.3)] ring-1 ring-[#E284B3]/40'
                          : 'bg-white/[0.03] border-white/8 text-[#A79FB6]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F4A5C6]">
                          0{stage.index}
                        </span>
                        {stage.status === 'completed' ? (
                          <Check className="w-3.5 h-3.5 text-[#E284B3]" />
                        ) : stage.status === 'active' ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E284B3] animate-ping" />
                        ) : (
                          <Clock className="w-3 h-3 text-[#A79FB6]" />
                        )}
                      </div>
                      <div className="text-xs font-bold uppercase truncate font-['Work_Sans',sans-serif]">{stage.title}</div>
                      <div className="text-[10px] text-[#A79FB6] mt-1 font-['Space_Mono',monospace]">{stage.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Energy Metrics (Frosted Glass Cards) */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="ti-card p-6 text-left">
                  <span className="ti-eyebrow text-[10px]">PV ARRAY OUTPUT</span>
                  <div className="text-3xl font-bold ti-stat-number mt-2">
                    {((project?.systemCapacityKw || 3) * 4.2).toFixed(1)}{' '}
                    <span className="text-xs text-[#A79FB6] font-normal uppercase">kWh/day</span>
                  </div>
                  <p className="text-xs text-[#A79FB6] mt-2">
                    550W Tier-1 Bifacial TOPCon
                  </p>
                </div>

                <div className="ti-card p-6 text-left">
                  <span className="ti-eyebrow text-[10px]">INVERTER EFFICIENCY</span>
                  <div className="text-3xl font-bold text-white font-['Space_Mono',monospace] mt-2">
                    99.2% <span className="text-xs text-[#A79FB6] font-normal uppercase">CEC</span>
                  </div>
                  <p className="text-xs text-[#A79FB6] mt-2">
                    SafeDC™ 1V Touch-Safe Auto Shutdown
                  </p>
                </div>

                <div className="ti-card p-6 text-left">
                  <span className="ti-eyebrow text-[10px]">SELF-CONSUMPTION</span>
                  <div className="text-3xl font-bold text-white font-['Space_Mono',monospace] mt-2">
                    100% <span className="text-xs text-[#A79FB6] font-normal uppercase">DAYTIME</span>
                  </div>
                  <p className="text-xs text-[#A79FB6] mt-2">
                    Zero Grid Draw During Sun Peak
                  </p>
                </div>

                <div className="ti-card p-6 text-left">
                  <span className="ti-eyebrow text-[10px]">APPROVED SUBSIDY</span>
                  <div className="text-3xl font-bold ti-stat-number mt-2">
                    ₹{project?.governmentSubsidy.toLocaleString('en-IN') || '78,000'}
                  </div>
                  <p className="text-xs text-[#A79FB6] mt-2">
                    Direct Bank Transfer (DBT) Scheme
                  </p>
                </div>
              </div>

              {/* NEW INNOVATION HERO BANNER: AI SOLAR INTELLIGENCE */}
              <div className="rounded-3xl p-7 bg-gradient-to-r from-[#E284B3]/15 via-[#8A56E2]/15 to-[#F5B895]/15 border border-white/15 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
                <div className="space-y-1.5 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="ti-pill">
                      <Sparkles className="w-3 h-3 text-[#F4A5C6]" />
                      <span>NEW INNOVATION ACTIVE</span>
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white uppercase font-['Work_Sans',sans-serif] tracking-wider">
                    AI Solar Intelligence &amp; Autonomous Roof Assessment
                  </h3>
                  <p className="text-xs text-[#D5CEE0] max-w-xl font-light">
                    Get physics-backed solar sizing, On-grid vs Off-grid battery analysis, missing data diagnostics, and 24/7 conversational assistance for your home.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('ai')}
                  className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-['Space_Mono',monospace] text-xs uppercase tracking-[1.5px] font-bold flex items-center gap-2 cursor-pointer transition-all shadow-[0_6px_24px_rgba(226,132,179,0.35)]"
                >
                  <span>LAUNCH AI SIZING</span>
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Real-time Google Flow / Solar Flow Engine */}
              <div className="pt-4">
                <InteractiveEnergyFlow />
              </div>
            </motion.div>
          )}

          {/* TAB 2: 4K SCROLL FILM */}
          {activeTab === 'film' && (
            <motion.div
              key="film"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="ti-eyebrow">PHOTOGRAMMETRIC FIELD REEL</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  28-Frame 4K Installation Film
                </h2>
              </div>
              <div className="border border-white/15 bg-[#002A57] p-2" style={{ borderRadius: 0 }}>
                <SolarScrollCanvas
                  systemCapacityKw={project?.systemCapacityKw || 3}
                  customerName={project?.customerName || 'Rajesh Sharma'}
                  totalFrames={28}
                />
              </div>
            </motion.div>
          )}

          {/* TAB 3: NASA EYES ORRERY */}
          {activeTab === 'nasa' && (
            <motion.div
              key="nasa"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <span className="ti-eyebrow">NASA JPL EYES ON THE SOLAR SYSTEM</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  Celestial Irradiance & Photon Flight
                </h2>
              </div>
              <div className="rounded-3xl border border-white/12 bg-white/[0.04] backdrop-blur-2xl p-3 overflow-hidden shadow-2xl">
                <NasaEyesSolarCanvas
                  systemCapacityKw={project?.systemCapacityKw || 3}
                  customerName={project?.customerName || 'Rajesh Sharma'}
                  address={project?.address || 'Pune, Maharashtra'}
                />
              </div>
            </motion.div>
          )}

          {/* TAB 4: 6-STAGE ROADMAP */}
          {activeTab === 'stages' && (
            <motion.div
              key="stages"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <span className="ti-eyebrow">FIELD EXECUTION METHODOLOGY</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  The 6-Stage Field Journey
                </h2>
              </div>

              <div className="space-y-4 max-w-4xl mx-auto">
                {storyStages.map((stg) => (
                  <div
                    key={stg.index}
                    className="rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left shadow-[0_12px_36px_rgba(0,0,0,0.4)] hover:border-[#E284B3]/40 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 text-[#F4A5C6] flex items-center justify-center font-['Space_Mono',monospace] font-bold text-base shrink-0 shadow-inner">
                        0{stg.index}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-base font-bold text-white uppercase tracking-wider font-['Work_Sans',sans-serif]">
                            {stg.title}
                          </h3>
                          <span className="text-[10px] font-['Space_Mono',monospace] px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#A79FB6] border border-white/10 uppercase">
                            {stg.date}
                          </span>
                        </div>
                        <p className="text-xs text-[#D5CEE0] mt-1.5 leading-relaxed font-light">{stg.desc}</p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {stg.status === 'completed' && (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8A56E2]/20 text-[#D5CEE0] border border-[#8A56E2]/40 flex items-center gap-1.5 font-['Space_Mono',monospace]">
                          <Check className="w-3.5 h-3.5 text-[#E284B3]" />
                          <span>VERIFIED</span>
                        </span>
                      )}
                      {stg.status === 'active' && (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E284B3]/20 text-[#F4A5C6] border border-[#E284B3]/50 flex items-center gap-1.5 font-['Space_Mono',monospace] shadow-[0_0_15px_rgba(226,132,179,0.3)]">
                          <span className="w-2 h-2 rounded-full bg-[#E284B3] animate-ping" />
                          <span>IN PROGRESS</span>
                        </span>
                      )}
                      {stg.status === 'upcoming' && (
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-['Space_Mono',monospace] bg-white/[0.04] text-[#A79FB6] border border-white/10">
                          SCHEDULED
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 5: 20-YEAR WARRANTY VAULT */}
          {activeTab === 'warranty' && (
            <motion.div
              key="warranty"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <span className="ti-eyebrow">CRYPTOGRAPHIC HARDWARE REGISTRATION</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  20-Year Legal Warranty Ledger
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Panel Warranty Card */}
                <div className="rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-6 sm:p-8 text-left space-y-4 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F4A5C6] uppercase tracking-[2px]">
                      01 // SOLAR PV PANELS
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#E284B3] to-[#8A56E2] text-white text-[11px] font-['Space_Mono',monospace] font-bold uppercase tracking-wider shadow-md">
                      20-Year Guarantee
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    550W Tier-1 Bifacial Array
                  </h3>
                  <p className="text-xs text-[#D5CEE0] leading-relaxed font-light">
                    Guaranteed performance: minimum 84.8% peak output retention at year 20. Direct replacement coverage for micro-cracks, moisture ingress, or delamination.
                  </p>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-['Space_Mono',monospace] text-xs text-[#D5CEE0] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#A79FB6]">SERIAL RANGE:</span>
                      <span className="text-white">MOD-SP550-849200 ~ 849210</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A79FB6]">CLOCK ACTIVE UNTIL:</span>
                      <span className="text-[#F4A5C6] font-bold">NOVEMBER 2046</span>
                    </div>
                  </div>
                </div>

                {/* Inverter Warranty Card */}
                <div className="rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-6 sm:p-8 text-left space-y-4 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F4A5C6] uppercase tracking-[2px]">
                      02 // POWER INVERTER
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#B668D8] to-[#8A56E2] text-white text-[11px] font-['Space_Mono',monospace] font-bold uppercase tracking-wider shadow-md">
                      10-Year Extended
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase font-['Work_Sans',sans-serif]">
                    SolarEdge SafeDC™ Power Hub
                  </h3>
                  <p className="text-xs text-[#D5CEE0] leading-relaxed font-light">
                    Zero-charge component replacement for inverter electronic trips, surge breakdown, or firmware anomalies. Includes instant ₹0 rainy day dispatch coverage.
                  </p>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-['Space_Mono',monospace] text-xs text-[#D5CEE0] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-[#A79FB6]">SERIAL NUMBER:</span>
                      <span className="text-white">INV-SP-3K-88492</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A79FB6]">CLOCK ACTIVE UNTIL:</span>
                      <span className="text-[#F4A5C6] font-bold">NOVEMBER 2036</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 6: YIELD & SUBSIDY CALCULATOR */}
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <span className="ti-eyebrow">PM SURYA GHAR NATIONAL CALCULATOR</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  Solar Yield & Return on Investment
                </h2>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
                {/* Sliders Form (Frosted Glass Form Controls) */}
                <div className="lg:col-span-7 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-6 sm:p-8 text-left space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                  {/* Monthly Bill Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F4A5C6] uppercase tracking-wider">
                        Monthly Electricity Bill
                      </label>
                      <span className="text-xl font-bold text-white font-['Space_Mono',monospace]">
                        ₹{monthlyBill.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000}
                      max={20000}
                      step={500}
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value))}
                      className="w-full accent-[#E284B3] cursor-pointer"
                    />
                  </div>

                  {/* Roof Area Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F4A5C6] uppercase tracking-wider">
                        Shadow-Free Roof Area
                      </label>
                      <span className="text-xl font-bold text-white font-['Space_Mono',monospace]">
                        {roofArea} sq.ft.
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={2000}
                      step={50}
                      value={roofArea}
                      onChange={(e) => setRoofArea(Number(e.target.value))}
                      className="w-full accent-[#8A56E2] cursor-pointer"
                    />
                  </div>

                  {/* Inquiry Form */}
                  <form onSubmit={handleCreateInquiry} className="pt-6 border-t border-white/12 space-y-4">
                    <h4 className="text-xs font-['Space_Mono',monospace] font-bold text-white uppercase tracking-wider">
                      Request Technical On-Site Verification
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="ti-input w-full"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        className="ti-input w-full"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-['Space_Mono',monospace] font-bold text-xs uppercase tracking-[2px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(226,132,179,0.35)]"
                    >
                      <span>{inquirySubmitted ? 'APPLICATION SUBMITTED ✓' : 'SCHEDULE TECHNICAL ROOF SURVEY ↗'}</span>
                    </button>
                  </form>
                </div>

                {/* Calculation Output Cards */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="ti-card p-6 text-left">
                    <span className="ti-eyebrow text-[10px]">RECOMMENDED CAPACITY</span>
                    <div className="text-3xl font-bold ti-stat-number mt-2">
                      {recommendedKw} kW
                    </div>
                    <p className="text-xs text-[#A79FB6] mt-1 font-['Work_Sans',sans-serif]">
                      Generates ~{(recommendedKw * 4.2 * 30).toFixed(0)} units monthly
                    </p>
                  </div>

                  <div className="ti-card p-6 text-left">
                    <span className="ti-eyebrow text-[10px]">CENTRAL DBT SUBSIDY</span>
                    <div className="text-3xl font-bold text-white font-['Space_Mono',monospace] mt-2">
                      ₹{centralSubsidy.toLocaleString('en-IN')}
                    </div>
                    <p className="text-xs text-[#A79FB6] mt-1 font-['Work_Sans',sans-serif]">
                      Credited directly into Aadhaar-linked account
                    </p>
                  </div>

                  <div className="ti-card p-6 text-left">
                    <span className="ti-eyebrow text-[10px]">ESTIMATED PAYBACK</span>
                    <div className="text-3xl font-bold ti-stat-number mt-2">
                      {paybackYears} Years
                    </div>
                    <p className="text-xs text-[#A79FB6] mt-1 font-['Work_Sans',sans-serif]">
                      Net Capex: ₹{netEstimatedCost.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: RAINY BREAKDOWN DESK */}
          {activeTab === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <span className="ti-eyebrow">PRIORITY FAULT RESOLUTION</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  Rainy Breakdown Desk
                </h2>
              </div>

              <div className="max-w-2xl mx-auto rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-6 sm:p-8 text-left space-y-6 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#E284B3]/10 border border-[#E284B3]/30 text-[#F4A5C6] text-xs font-['Space_Mono',monospace]">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-[#E284B3]" />
                  <span>
                    Emergency dispatch fee waived under 2-Year Inverter Warranty. Certified field engineer arrives within 4 hours.
                  </span>
                </div>

                {ticketSuccess && (
                  <div className="p-4 rounded-2xl bg-[#8A56E2]/20 border border-[#8A56E2]/40 text-white text-xs font-['Space_Mono',monospace]">
                    {ticketSuccess}
                  </div>
                )}

                <form onSubmit={handleRaiseTicket} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F4A5C6] uppercase tracking-wider block mb-1.5">
                      REPORTED INVERTER FAULT CODE
                    </label>
                    <select
                      value={faultCode}
                      onChange={(e) => setFaultCode(e.target.value)}
                      className="ti-select w-full"
                    >
                      <option value="ERR-F04">ERR-F04 // RAIN INGRESS GROUND ISOLATION FAULT</option>
                      <option value="ERR-V01">ERR-V01 // GRID OVER-VOLTAGE / DISCOM SURGE TRIP</option>
                      <option value="ERR-T02">ERR-T02 // THERMAL THRESHOLD EXCEEDED</option>
                      <option value="ERR-C03">ERR-C03 // MC4 CONNECTOR ARC DETECTION SHUTDOWN</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-['Space_Mono',monospace] font-bold text-[#F4A5C6] uppercase tracking-wider block mb-1.5">
                      INCIDENT DETAILS & OBSERVATIONS
                    </label>
                    <textarea
                      rows={3}
                      value={issueDesc}
                      onChange={(e) => setIssueDesc(e.target.value)}
                      className="ti-input w-full"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-['Space_Mono',monospace] font-bold text-xs uppercase tracking-[2px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_6px_24px_rgba(226,132,179,0.35)]"
                  >
                    <Headphones className="w-4 h-4" />
                    <span>DISPATCH FIELD ENGINEER (₹0 COVERED) ↗</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* TAB 8: HANDOVER CERTIFICATE */}
          {activeTab === 'certificate' && (
            <motion.div
              key="certificate"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <span className="ti-eyebrow">MNRE & DISCOM COMPLIANCE</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[2px] uppercase font-['Work_Sans',sans-serif] mt-1">
                  Commissioning Certificate
                </h2>
              </div>

              <div className="max-w-3xl mx-auto rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/12 p-8 text-left space-y-6 relative overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <div className="border-b border-white/12 pb-4 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-['Space_Mono',monospace] uppercase tracking-[2.5px] text-[#F4A5C6] font-bold block">
                      MINISTRY OF NEW & RENEWABLE ENERGY (MNRE) CERTIFIED
                    </span>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider font-['Work_Sans',sans-serif] mt-1">
                      Certificate of Grid Interconnect
                    </h3>
                  </div>
                  <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#E284B3] to-[#8A56E2] text-white text-[11px] font-['Space_Mono',monospace] font-bold uppercase tracking-wider shadow-md">
                    ACTIVE
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-xs font-['Space_Mono',monospace]">
                  <div>
                    <span className="text-[#A79FB6]">CLIENT NAME:</span>
                    <div className="font-bold text-white mt-0.5">{project?.customerName || 'Rajesh Sharma'}</div>
                  </div>
                  <div>
                    <span className="text-[#A79FB6]">INSTALLATION SITE:</span>
                    <div className="font-bold text-white mt-0.5">{project?.address || 'Pune, Maharashtra'}</div>
                  </div>
                  <div>
                    <span className="text-[#A79FB6]">CERTIFIED CAPACITY:</span>
                    <div className="font-bold text-[#F4A5C6] mt-0.5">{project?.systemCapacityKw || 3.0} kW Monocrystalline</div>
                  </div>
                  <div>
                    <span className="text-[#A79FB6]">APPROVED SUBSIDY:</span>
                    <div className="font-bold text-white mt-0.5">₹{project?.governmentSubsidy.toLocaleString('en-IN') || '78,000'} DBT</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-[#D5CEE0] leading-relaxed font-['Space_Mono',monospace]">
                  This certifies that the solar photovoltaic installation has successfully completed high-voltage insulation resistance testing, anti-islanding synchrony, and bi-directional smart net-metering integration.
                </div>

                <div className="pt-4 border-t border-white/12 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs font-['Space_Mono',monospace] text-[#A79FB6]">
                    <span>CERTIFIED MASTER ENGINEER: </span>
                    <span className="font-bold text-white">{project?.assignedTechnician || 'Vikram Malhotra'}</span>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:brightness-110 text-white font-['Space_Mono',monospace] font-bold text-xs uppercase tracking-[1.5px] flex items-center gap-1.5 cursor-pointer transition-all shadow-[0_4px_16px_rgba(226,132,179,0.35)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD CERTIFICATE (PDF) ↗</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 9: AI SOLAR INTELLIGENCE (NEW INNOVATION) */}
          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AiSolarIntelligence
                initialBill={monthlyBill || 4200}
                initialRoofArea={roofArea || 450}
                customerName={project?.customerName || 'Rajesh Sharma'}
                projectNumber={project?.projectNumber || 'PRJ-2026-AI'}
              />
            </motion.div>
          )}

          {/* TAB 10: AI ROOF PHOTO INTELLIGENCE (KERAS VISION) */}
          {activeTab === 'roof' && (
            <motion.div
              key="roof"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AiRoofPhotoIntelligence
                customerName={project?.customerName || 'Rajesh Sharma'}
                projectNumber={project?.projectNumber || 'PRJ-2026-AI'}
                onApplyToSizing={() => setActiveTab('ai')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Trilogy Innovations Footer */}
      <footer className="border-t border-white/10 py-12 mt-16 bg-[#0D0917]/75 backdrop-blur-3xl text-center text-xs text-[#A79FB6] space-y-2 z-10 font-['Space_Mono',monospace]">
        <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4A5C6] to-[#E284B3] uppercase tracking-[3px]">TRILOGY INNOVATIONS // SOLAR DIVISION</h3>
        <p className="text-[11px] text-[#A79FB6]">Clean Energy Infrastructure • SafeDC™ 1V Protocol • 20-Year Warranted</p>
        <p className="text-[10px] text-[#A79FB6]/60">© 2026 Trilogy Innovations. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default CustomerPortalPage;
