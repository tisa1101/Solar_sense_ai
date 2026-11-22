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
  AlertCircle
} from 'lucide-react';
import { solarApi } from '../services/solarApi';
import { DirectorAnalytics, JobProfitabilityItem } from '../types/solar';

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
        customerName: 'Anita Deshmukh',
        capacityKw: 3,
        systemType: 1,
        contractRevenue: 195000,
        hardwareBomCost: 112000,
        technicianLaborCost: 24000,
        miscCost: 7500,
        netProfit: 51500,
        marginPercentage: 26.41,
        madeMoney: true,
        subsidyStatus: 'Net Meter Synchronized (₹78,000)',
      },
      {
        projectId: 3,
        projectNumber: 'SP-2026-003',
        customerName: 'Amit Verma',
        capacityKw: 5,
        systemType: 2,
        contractRevenue: 410000,
        hardwareBomCost: 265000,
        technicianLaborCost: 35000,
        miscCost: 12000,
        netProfit: 98000,
        marginPercentage: 23.90,
        madeMoney: true,
        subsidyStatus: 'Off-Grid (Self-Funded)',
      },
      {
        projectId: 4,
        projectNumber: 'SP-2026-004',
        customerName: 'Apex Plastics Ltd',
        capacityKw: 5,
        systemType: 1,
        contractRevenue: 340000,
        hardwareBomCost: 198000,
        technicianLaborCost: 28000,
        miscCost: 9000,
        netProfit: 105000,
        marginPercentage: 30.88,
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
    if (filterType === 'profitable') return job.marginPercentage >= 25;
    if (filterType === 'attention') return job.marginPercentage < 25;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Scene 6: The Director's Month-End
            </span>
            <span className="text-xs text-slate-500">SunPower Solutions Executive Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-amber-400" />
            Executive Financial & Operations Command
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Month-end job-level profitability (revenue vs BOM vs labor), PM Surya Ghar subsidy tracking, and 15-technician crew ledger.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-sm font-semibold transition-all hover:bg-slate-800"
          >
            <Download className="w-4 h-4" />
            Export P&L Report
          </button>
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            Completed: {data.completedProjects} / Target: 40 Projects
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Gross Invoiced Revenue</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹{data.totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Total Hardware BOM Cost */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">BOM Hardware Cost</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300">
            ₹{data.totalHardwareCost.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Panels, Inverters, LFP Batteries & Racks
          </div>
        </div>

        {/* Technician Labor & Logistics */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Technician Labor & Travel</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            ₹{data.totalLaborCost.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-slate-400 mt-2">
            {data.activeTechniciansCount} Field Technicians • 100% on-time payouts
          </div>
        </div>

        {/* Net Operating Profit */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Net Realized Profit</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-300">
            ₹{data.totalNetProfit.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300">
              {data.averageMarginPercentage.toFixed(1)}% Net Margin
            </span>
            <span className="text-xs text-slate-400">Healthy</span>
          </div>
        </div>
      </div>

      {/* Pipeline Velocity Tracker */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          Unfinished Steps Pipeline Tracker
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(data.pipelineStages).map(([stage, count]) => (
            <div key={stage} className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-lg font-black text-amber-400">{count}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scene 6 Core: Job-Level Profitability Ledger */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              Job-by-Job Profitability Ledger
            </h2>
            <p className="text-xs text-slate-400">
              Granular breakdown: Revenue minus Hardware BOM minus Labor minus Misc fees for every rooftop project.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search client or system..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:ring-1 focus:ring-amber-500 w-56"
              />
            </div>

            <div className="flex items-center rounded-xl bg-slate-800 p-1 border border-slate-700">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Jobs
              </button>
              <button
                onClick={() => setFilterType('profitable')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'profitable' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                High Margin (&gt;25%)
              </button>
              <button
                onClick={() => setFilterType('attention')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  filterType === 'attention' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Review Margin
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-800/40">
                <th className="py-3 px-4">Project & Customer</th>
                <th className="py-3 px-3">System Specs</th>
                <th className="py-3 px-3">Revenue (₹)</th>
                <th className="py-3 px-3">BOM Cost (₹)</th>
                <th className="py-3 px-3">Labor (₹)</th>
                <th className="py-3 px-3">Misc (₹)</th>
                <th className="py-3 px-4">Net Profit (₹)</th>
                <th className="py-3 px-3">Margin %</th>
                <th className="py-3 px-3">Subsidy / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredJobs.map((job) => (
                <tr key={job.projectId} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{job.customerName}</div>
                    <div className="text-[11px] text-slate-500">{job.projectNumber}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-amber-300">{job.capacityKw} kW</span>
                    <div className="text-[11px] text-slate-400">{job.systemType === 1 ? 'On-Grid' : 'Off-Grid'}</div>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-white">
                    ₹{job.contractRevenue.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">
                    ₹{job.hardwareBomCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3 text-slate-400">
                    ₹{job.technicianLaborCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    ₹{job.miscCost.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400 text-sm">
                    +₹{job.netProfit.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        job.marginPercentage >= 30
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : job.marginPercentage >= 25
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {job.marginPercentage.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide bg-slate-800 border border-slate-700 text-slate-300">
                      {job.subsidyStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: Subsidy Overview & 15-Technician Crew Payout Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Government Subsidy Paperwork Tracker */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-400" />
                PM Surya Ghar & DISCOM Subsidy Tracker
              </h3>
              <p className="text-xs text-slate-400">
                Tracking national portal claims (up to ₹78,000 per home) and DISCOM net-meter synchronization.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {data.subsidyApplicationsPending} Claims (₹{data.totalSubsidyAmountPending.toLocaleString('en-IN')})
            </span>
          </div>

          <div className="space-y-3">
            {data.jobProfitability.map((job) => (
              <div
                key={job.projectId}
                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {job.projectNumber}
                    </span>
                    <span className="text-xs font-bold text-white">{job.customerName}</span>
                    <span className="text-[10px] text-slate-400">({job.capacityKw} kW)</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <Building className="w-3 h-3 text-slate-500" />
                    <span>MSEDCL State Grid</span>
                    <span>•</span>
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>Active Tracking</span>
                  </div>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                  <div className="text-sm font-bold text-emerald-400">
                    {job.subsidyStatus.includes('₹') ? job.subsidyStatus.match(/₹[\d,]+/)?.[0] || '₹78,000' : 'N/A'}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md mt-0.5 ${
                      job.subsidyStatus.includes('Disbursed')
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : job.subsidyStatus.includes('Synchronized') || job.subsidyStatus.includes('Scheduled')
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {job.subsidyStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 15-Technician Crew Performance & Payout Ledger */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                15-Technician Field Crew Ledger
              </h3>
              <p className="text-xs text-slate-400">
                Installation velocity, first-time inspection pass rate, and monthly payroll disbursement.
              </p>
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              Crew Size: {data.activeTechniciansCount} Technicians
            </span>
          </div>

          <div className="space-y-3">
            {data.technicianPerformance.map((tech, idx) => (
              <div
                key={tech.technicianName}
                className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between hover:border-slate-600 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-xs border border-amber-500/20">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{tech.technicianName}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {tech.jobsCompleted} installs completed ({tech.totalKwInstalled} kW) • ★ {tech.averageRating} rating
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white">
                    ₹{tech.totalEarnings.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold">
                    Verified Payout
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SolarDirectorPage;
