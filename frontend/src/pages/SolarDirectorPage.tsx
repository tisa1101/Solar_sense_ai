import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Users,
  FileCheck2,
  ArrowUpRight,
  Search,
  Download,
  Building,
  Clock,
  Sun,
  Layers,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Zap
} from 'lucide-react';
import { solarApi } from '../services/solarApi';
import { DirectorAnalytics, JobProfitabilityItem } from '../types/solar';
import { CompanyLogo } from '../components/CompanyLogo';

export const SolarDirectorPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<DirectorAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'profitable' | 'attention'>('all');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const res = await solarApi.getDirectorAnalytics();
      setAnalytics(res.data.data);
    } catch (err) {
      console.error('Failed to load director analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Demo fallback matching DirectorAnalytics schema
  const data: DirectorAnalytics = analytics || {
    totalProjectsMonth: 42,
    completedProjects: 38,
    inProgressProjects: 4,
    totalRevenue: 2845000,
    totalHardwareCost: 1620000,
    totalLaborCost: 315000,
    totalNetProfit: 910000,
    averageMarginPercentage: 31.98,
    subsidyApplicationsPending: 9,
    totalSubsidyAmountPending: 648000,
    activeTechniciansCount: 15,
    pipelineStages: {
      'Feasibility Survey': 4,
      'BOM Kit Packing': 2,
      'Warehouse Dispatch': 2,
      'On-Roof Installation': 3,
      'Net Meter & Subsidy': 9,
    },
    jobProfitability: [
      {
        projectId: 1,
        projectNumber: 'SP-2026-001',
        customerName: 'Rajesh Sharma',
        capacityKw: 3,
        systemType: 1,
        contractRevenue: 195000,
        hardwareBomCost: 112000,
        technicianLaborCost: 18000,
        miscCost: 5000,
        netProfit: 60000,
        marginPercentage: 30.77,
        madeMoney: true,
        subsidyStatus: 'Disbursed (₹78,000)',
      },
      {
        projectId: 2,
        projectNumber: 'SP-2026-002',
        customerName: 'Amit Verma (Factory)',
        capacityKw: 5,
        systemType: 2,
        contractRevenue: 340000,
        hardwareBomCost: 215000,
        technicianLaborCost: 32000,
        miscCost: 9000,
        netProfit: 84000,
        marginPercentage: 24.71,
        madeMoney: true,
        subsidyStatus: 'Off-Grid (Self-Funded)',
      },
      {
        projectId: 3,
        projectNumber: 'SP-2026-003',
        customerName: 'Anita Deshmukh',
        capacityKw: 3,
        systemType: 1,
        contractRevenue: 195000,
        hardwareBomCost: 114000,
        technicianLaborCost: 18000,
        miscCost: 6500,
        netProfit: 56500,
        marginPercentage: 28.97,
        madeMoney: true,
        subsidyStatus: 'Disbursed (₹78,000)',
      },
      {
        projectId: 4,
        projectNumber: 'SP-2026-004',
        customerName: 'Apex Precision Works',
        capacityKw: 5,
        systemType: 1,
        contractRevenue: 310000,
        hardwareBomCost: 188000,
        technicianLaborCost: 28000,
        miscCost: 8000,
        netProfit: 86000,
        marginPercentage: 27.74,
        madeMoney: true,
        subsidyStatus: 'Commercial (Tax Depreciation)',
      },
      {
        projectId: 5,
        projectNumber: 'SP-2026-005',
        customerName: 'Green Valley Villas #12',
        capacityKw: 2,
        systemType: 1,
        contractRevenue: 135000,
        hardwareBomCost: 81000,
        technicianLaborCost: 15000,
        miscCost: 4000,
        netProfit: 35000,
        marginPercentage: 25.92,
        madeMoney: true,
        subsidyStatus: 'Inspection Scheduled (₹60,000)',
      },
    ],
    technicianPerformance: [
      {
        technicianName: 'Suresh Kumar',
        jobsCompleted: 12,
        totalKwInstalled: 42,
        totalEarnings: 46000,
        averageRating: 4.9,
      },
      {
        technicianName: 'Ramesh Patel',
        jobsCompleted: 11,
        totalKwInstalled: 38,
        totalEarnings: 42500,
        averageRating: 4.8,
      },
      {
        technicianName: 'Vikas Jadhav',
        jobsCompleted: 9,
        totalKwInstalled: 31,
        totalEarnings: 36000,
        averageRating: 4.7,
      },
      {
        technicianName: 'Mahesh Patil',
        jobsCompleted: 8,
        totalKwInstalled: 28,
        totalEarnings: 32000,
        averageRating: 4.8,
      },
      {
        technicianName: 'Deepak Rao',
        jobsCompleted: 7,
        totalKwInstalled: 24,
        totalEarnings: 28000,
        averageRating: 4.6,
      },
    ],
  };

  const filteredJobs = data.jobProfitability.filter((job) => {
    const matchesSearch =
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.projectNumber.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === 'profitable') return job.marginPercentage >= 28;
    if (filterType === 'attention') return job.marginPercentage < 28;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#07040E] text-[#D5CEE0] p-4 sm:p-6 lg:p-8 space-y-8 font-['Work_Sans',sans-serif] relative overflow-hidden">
      {/* Vice City Ambient Horizon Glows */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(255,46,147,0.18)_0%,rgba(121,40,202,0.12)_35%,transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_90%_45%,rgba(255,122,0,0.08)_0%,transparent_50%)] z-0" />

      {/* Top Banner / Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 bg-[#0E081A]/60 p-6 rounded-3xl border backdrop-blur-2xl shadow-2xl">
        <div className="space-y-2">
          {/* Company Brand Logo & Eyebrow */}
          <div className="flex items-center gap-3">
            <CompanyLogo size="lg" subtitle="EXECUTIVE DIRECTOR DESK" />
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF2E93]/15 text-[#FF2E93] border border-[#FF2E93]/30">
              LEONIDA REGULATORY SCENE 06
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-['Plus_Jakarta_Sans',sans-serif]">
            Executive Financial & Operations Command
          </h1>
          <p className="text-xs sm:text-sm text-[#A79FB6] max-w-2xl leading-relaxed">
            Month-end job-level profitability (revenue vs BOM vs labor), PM Surya Ghar subsidy reconciliation, and 15-technician certified crew ledger.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/12 text-white text-xs font-bold uppercase tracking-wider font-mono transition-all cursor-pointer shadow-md"
          >
            <Download className="w-4 h-4 text-[#FF7A00]" />
            Export P&L Report
          </button>
          <div className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2E93]/20 to-[#FF7A00]/20 border border-[#FF2E93]/30 text-white text-xs font-bold font-mono flex items-center gap-2">
            <Sun className="w-4 h-4 text-[#FF7A00] animate-spin" />
            <span>Target: 40 // Completed: {data.completedProjects}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 shadow-2xl backdrop-blur-2xl hover:border-[#FF2E93]/40 transition-all group">
          <div className="flex items-center justify-between text-[#A79FB6] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-[#D5CEE0]">Gross Invoiced Revenue</span>
            <div className="p-2.5 rounded-2xl bg-[#FF2E93]/15 text-[#FF2E93] border border-[#FF2E93]/25 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
            ₹{data.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mt-2 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last cycle</span>
          </div>
        </div>

        {/* Total Hardware BOM Cost */}
        <div className="p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 shadow-2xl backdrop-blur-2xl hover:border-[#FF7A00]/40 transition-all group">
          <div className="flex items-center justify-between text-[#A79FB6] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-[#D5CEE0]">BOM Hardware Cost</span>
            <div className="p-2.5 rounded-2xl bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/25 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
            ₹{data.totalHardwareCost.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#A79FB6] mt-2 font-mono">
            56.9% of gross contract value
          </div>
        </div>

        {/* Total Labor Cost */}
        <div className="p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 shadow-2xl backdrop-blur-2xl hover:border-[#00F0FF]/40 transition-all group">
          <div className="flex items-center justify-between text-[#A79FB6] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-[#D5CEE0]">Technician Labor Cost</span>
            <div className="p-2.5 rounded-2xl bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/25 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
            ₹{data.totalLaborCost.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#A79FB6] mt-2 font-mono">
            15 field technicians deployed
          </div>
        </div>

        {/* Net Operating Profit */}
        <div className="p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 shadow-2xl backdrop-blur-2xl hover:border-emerald-500/40 transition-all group">
          <div className="flex items-center justify-between text-[#A79FB6] mb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-[#D5CEE0]">Net Operating Profit</span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Plus_Jakarta_Sans',sans-serif]">
            ₹{data.totalNetProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#A79FB6] mt-2 font-mono">
            Average margin: <span className="text-white font-bold">{data.averageMarginPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Subsidy Pipeline & Stage Progression Matrix */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pipeline Stage Breakdown */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 backdrop-blur-2xl shadow-2xl">
          <h2 className="text-base font-bold text-white mb-4 uppercase font-mono tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF2E93]" />
            Pipeline Stage Progression (All 42 Projects)
          </h2>
          <div className="space-y-3.5">
            {Object.entries(data.pipelineStages).map(([stage, count]) => {
              const pct = Math.round((count / data.totalProjectsMonth) * 100);
              return (
                <div key={stage} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/8">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-white">{stage}</span>
                    <span className="text-xs font-mono font-bold text-[#FF7A00]">{count} Projects ({pct}%)</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(8, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subsidy Applications Card */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#FF7A00]" />
                PM Surya Ghar Subsidy Vault
              </h2>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                DBT Active
              </span>
            </div>

            <p className="text-xs text-[#A79FB6] mb-6 leading-relaxed">
              Direct Central Subsidy claims submitted via the National Rooftop Solar Portal for fast-track homeowner reimbursement.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-[#A79FB6] font-mono uppercase">Pending Applications</div>
                <div className="text-xl font-black text-white mt-1 font-mono">
                  {data.subsidyApplicationsPending} Homeowners
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] text-[#A79FB6] font-mono uppercase">Total Locked Value</div>
                <div className="text-xl font-black text-[#FF7A00] mt-1 font-mono">
                  ₹{data.totalSubsidyAmountPending.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FF2E93]/15 to-[#FF7A00]/15 border border-[#FF2E93]/30 text-xs text-[#D5CEE0] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Average turnaround: 14 business days from DISCOM meter installation to DBT credit.</span>
          </div>
        </div>
      </div>

      {/* Job-Level Profitability Ledger Table */}
      <div className="relative z-10 p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 backdrop-blur-2xl shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#FF2E93]" />
              Job-Level Profitability Ledger (BOM + Labor + Net Margin)
            </h2>
            <p className="text-xs text-[#A79FB6] mt-0.5">
              Live audit comparing gross contract value against component BOM procurement and labor expenses.
            </p>
          </div>

          {/* Search & Filters with Clean .ti-input & .ti-select */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A79FB6]" />
              <input
                type="text"
                placeholder="Search customer or job #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ti-input text-xs pl-8 pr-3 py-2 w-52 rounded-xl"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="ti-select text-xs py-2 px-3 rounded-xl cursor-pointer"
            >
              <option value="all">All Jobs</option>
              <option value="profitable">High Margin (≥28%)</option>
              <option value="attention">Review Margin (&lt;28%)</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0514] text-[#A79FB6] font-mono uppercase text-[10px] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Job # / Client</th>
                <th className="py-3 px-4">Size & Type</th>
                <th className="py-3 px-4 text-right">Revenue</th>
                <th className="py-3 px-4 text-right">BOM Cost</th>
                <th className="py-3 px-4 text-right">Labor</th>
                <th className="py-3 px-4 text-right">Net Profit</th>
                <th className="py-3 px-4 text-center">Margin</th>
                <th className="py-3 px-4">Subsidy Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredJobs.map((job) => (
                <tr key={job.projectId} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{job.customerName}</div>
                    <div className="text-[10px] font-mono text-[#A79FB6]">{job.projectNumber}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs">
                    <span className="font-bold text-[#FF7A00]">{job.capacityKw} kW</span>{' '}
                    <span className="text-[#A79FB6]">{job.systemType === 1 ? 'On-Grid' : 'Off-Grid'}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    ₹{job.contractRevenue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#D5CEE0]">
                    ₹{job.hardwareBomCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#D5CEE0]">
                    ₹{job.technicianLaborCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                    ₹{job.netProfit.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {job.marginPercentage}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#A79FB6]">
                    {job.subsidyStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 15-Technician Field Crew Performance Ledger */}
      <div className="relative z-10 p-6 rounded-3xl bg-[#120B1F]/80 border border-white/12 backdrop-blur-2xl shadow-2xl space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Users className="w-5 h-5 text-[#00F0FF]" />
            15-Technician Certified Crew Ledger & Pay Slip Reconciliation
          </h2>
          <p className="text-xs text-[#A79FB6] mt-0.5">
            Job completion rate, installed kW capacity, customer sign-off rating, and accrued technician labor disbursement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {data.technicianPerformance.map((tech) => (
            <div key={tech.technicianName} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF2E93]/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-white truncate">{tech.technicianName}</span>
                <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  ★ {tech.averageRating}
                </span>
              </div>
              <div className="space-y-1 text-[11px] font-mono text-[#A79FB6]">
                <div className="flex justify-between">
                  <span>Installed:</span>
                  <span className="text-white font-bold">{tech.totalKwInstalled} kW</span>
                </div>
                <div className="flex justify-between">
                  <span>Jobs Done:</span>
                  <span className="text-[#FF7A00] font-bold">{tech.jobsCompleted} Sites</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10 text-white font-bold">
                  <span>Earnings:</span>
                  <span className="text-emerald-400">₹{tech.totalEarnings.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
