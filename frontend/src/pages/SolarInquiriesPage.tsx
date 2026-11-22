import React, { useEffect, useState } from 'react';
import { solarApi } from '../services/solarApi';
import { SolarInquiry, SiteSurvey, SolarSystemType } from '../types/solar';
import { LoadingSpinner } from '../components/CommonState';
import {
  Sun,
  Compass,
  Ruler,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  FileCheck2,
  Plus,
  X
} from 'lucide-react';

export const SolarInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<SolarInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<SolarInquiry | null>(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  // Survey Form State
  const [technicianName, setTechnicianName] = useState('Kiran Pawar (Senior Surveyor)');
  const [roofDirection, setRoofDirection] = useState('South-Facing 180°');
  const [roofTiltDegrees, setRoofTiltDegrees] = useState(22.5);
  const [cableDistanceMeters, setCableDistanceMeters] = useState(25);
  const [shadingAnalysis, setShadingAnalysis] = useState('Zero Shading from 9 AM to 4 PM; High Solar Yield');
  const [structuralFeasibility, setStructuralFeasibility] = useState('RCC Concrete Slab, Load-bearing capacity > 500 kg/sqm');
  const [isApproved, setIsApproved] = useState(true);
  const [surveyNotes, setSurveyNotes] = useState('Terrace accessible via staircase. Feasible for 3kW-5kW Mono-PERC modules.');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await solarApi.getInquiries();
      setInquiries(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleOpenSurvey = (inq: SolarInquiry) => {
    setSelectedInquiry(inq);
    if (inq.survey) {
      setTechnicianName(inq.survey.technicianName);
      setRoofDirection(inq.survey.roofDirection);
      setRoofTiltDegrees(inq.survey.roofTiltDegrees);
      setCableDistanceMeters(inq.survey.cableDistanceMeters);
      setShadingAnalysis(inq.survey.shadingAnalysis);
      setStructuralFeasibility(inq.survey.structuralFeasibility);
      setIsApproved(inq.survey.isApproved);
      setSurveyNotes(inq.survey.notes);
    }
    setShowSurveyModal(true);
  };

  const handleSaveSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    try {
      await solarApi.updateSurvey(selectedInquiry.id, {
        technicianName,
        roofDirection,
        roofTiltDegrees,
        cableDistanceMeters,
        shadingAnalysis,
        structuralFeasibility,
        isApproved,
        notes: surveyNotes,
      });
      setShowSurveyModal(false);
      fetchInquiries();
    } catch (err) {
      alert('Failed to update feasibility survey.');
    }
  };

  const handleQuickApprove = async (id: number) => {
    try {
      await solarApi.approveSurvey(id, 'Kiran Pawar');
      fetchInquiries();
    } catch (err) {
      alert('Approval failed.');
    }
  };

  if (loading) return <LoadingSpinner message="Loading SunPower inquiries & feasibility surveys..." />;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
              <span>Scene 1: Rooftop Inquiries & Site Feasibility Surveys</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            SunPower receives customer inquiries online. Technicians visit to measure roof direction, tilt, and cable distance before generating quotes.
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Inquiries</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{inquiries.length}</p>
          <span className="text-[11px] text-amber-500 font-semibold">Lands with sales team</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Surveys Approved</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {inquiries.filter((i) => i.survey?.isApproved).length}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">Quotes unlocked</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Roof Area</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">480 sq ft</p>
          <span className="text-[11px] text-slate-400 font-medium">Shadow-free terrace</span>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Technician Fleet</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">15 Techs</p>
          <span className="text-[11px] text-indigo-500 font-semibold">On-site survey crew</span>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Incoming Rooftop Customer Inquiries
          </h3>
          <span className="text-xs text-slate-500 font-medium">{inquiries.length} Inquiries Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <th className="p-3.5">Inquiry #</th>
                <th className="p-3.5">Customer & Phone</th>
                <th className="p-3.5">Capacity & Type</th>
                <th className="p-3.5">Monthly Bill</th>
                <th className="p-3.5">Roof Space</th>
                <th className="p-3.5">Survey Status</th>
                <th className="p-3.5 text-right">Feasibility Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {inquiries.map((inq) => {
                const isAppr = inq.survey?.isApproved;
                return (
                  <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {inq.inquiryNumber}
                    </td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900 dark:text-white">{inq.customerName}</p>
                      <p className="text-[11px] text-slate-500">{inq.phone}</p>
                    </td>
                    <td className="p-3.5">
                      <span className="font-extrabold text-slate-900 dark:text-white">{inq.systemCapacityKw} kW</span>{' '}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                        inq.systemType === SolarSystemType.OnGrid
                          ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300'
                          : 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/50 dark:text-purple-300'
                      }`}>
                        {inq.systemType === SolarSystemType.OnGrid ? 'On-Grid' : 'Off-Grid'}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">
                      ₹{inq.monthlyElectricityBill.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400">
                      <span className="font-bold text-slate-900 dark:text-white">{inq.shadowFreeRoofSqFt}</span> sq ft
                    </td>
                    <td className="p-3.5">
                      {isAppr ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Survey Approved</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200">
                          <Compass className="w-3.5 h-3.5" />
                          <span>Survey Pending</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenSurvey(inq)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
                      >
                        {inq.survey ? 'View/Edit Survey' : 'Schedule Survey'}
                      </button>

                      {!isAppr && (
                        <button
                          onClick={() => handleQuickApprove(inq.id)}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Site Survey Modal */}
      {showSurveyModal && selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Technician Rooftop Survey: {selectedInquiry.customerName}
                </h3>
              </div>
              <button
                onClick={() => setShowSurveyModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSurvey} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Assigned Surveyor / Technician
                </label>
                <input
                  type="text"
                  required
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                    Roof Direction
                  </label>
                  <input
                    type="text"
                    required
                    value={roofDirection}
                    onChange={(e) => setRoofDirection(e.target.value)}
                    placeholder="e.g. South 180°"
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                    Roof Tilt Angle (Degrees)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={roofTiltDegrees}
                    onChange={(e) => setRoofTiltDegrees(Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Cable Distance to Main Breaker (Meters)
                </label>
                <input
                  type="number"
                  required
                  value={cableDistanceMeters}
                  onChange={(e) => setCableDistanceMeters(Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Shading Analysis & Obstructions
                </label>
                <input
                  type="text"
                  required
                  value={shadingAnalysis}
                  onChange={(e) => setShadingAnalysis(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Structural Feasibility (RCC / Tin Shed)
                </label>
                <input
                  type="text"
                  required
                  value={structuralFeasibility}
                  onChange={(e) => setStructuralFeasibility(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-amber-900 dark:text-amber-200">Feasibility Survey Approval</p>
                  <p className="text-[11px] text-amber-700 dark:text-amber-400">
                    Once approved, the customer will automatically receive their template quote and BOM.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isApproved}
                  onChange={(e) => setIsApproved(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSurveyModal(false)}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
                >
                  Save Survey Measurements
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
