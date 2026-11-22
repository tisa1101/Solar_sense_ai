import React, { useEffect, useRef, useState } from 'react';
import { solarApi } from '../services/solarApi';
import { CustomerPortalData, TechnicianJobSheet } from '../types/solar';
import { LoadingSpinner } from '../components/CommonState';
import {
  Smartphone,
  CheckCircle2,
  Clock,
  Camera,
  PenTool,
  RotateCcw,
  Zap,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const SolarJobSheetPage: React.FC = () => {
  const [projects, setProjects] = useState<CustomerPortalData[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(101); // Rajesh Sharma
  const [loading, setLoading] = useState(true);

  // Form State
  const [leadTech, setLeadTech] = useState('Manoj Shinde (Crew Lead)');
  const [startTime, setStartTime] = useState('09:30');
  const [endTime, setEndTime] = useState('16:15');
  const [systemSize, setSystemSize] = useState<number>(3.0);
  const [powerTestPassed, setPowerTestPassed] = useState(true);
  const [testedKw, setTestedKw] = useState(3.14);
  const [testedVoltage, setTestedVoltage] = useState(238.2);
  const [homeownerName, setHomeownerName] = useState('Rajesh Sharma');
  const [notes, setNotes] = useState('Earthing test < 2 Ohms. Generation meter synchronised with grid. Customer inspected rooftop.');
  const [submittedSheet, setSubmittedSheet] = useState<TechnicianJobSheet | null>(null);

  // Canvas Signature Pad
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const fetchProj = async () => {
      try {
        setLoading(true);
        const res = await solarApi.getProjects();
        setProjects(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProj();
  }, []);

  // Canvas Drawing Methods
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const signatureData = canvasRef.current ? canvasRef.current.toDataURL() : '';

    try {
      const res = await solarApi.submitJobSheet({
        projectId: selectedProjectId,
        leadTechnician: leadTech,
        workStartTime: new Date().toISOString(),
        workEndTime: new Date().toISOString(),
        systemSizeKw: systemSize,
        powerGenerationTestPassed: powerTestPassed,
        testedKwOutput: testedKw,
        testedVoltage: testedVoltage,
        roofPhotos: ['/images/solar-roof-finished.jpg', '/images/inverter-mounted.jpg'],
        customerSignatureBase64: signatureData,
        homeownerName,
        notes,
      });

      setSubmittedSheet(res.data.data);
      alert('Installation job sheet & homeowner digital signature accepted! Handover certificate created.');
    } catch (err) {
      alert('Failed to submit job sheet');
    }
  };

  if (loading) return <LoadingSpinner message="Loading technician mobile job sheet..." />;

  const currentProject = projects.find((p) => p.projectId === selectedProjectId);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-emerald-600" />
          <span>Scene 4: On the Roof (Technician Mobile Job Sheet & Sign-Off)</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Crew mounts stands, lays panels, connects boxes and finishes earthing. They test power generation, upload roof photos, and the homeowner signs directly on screen to accept the work!
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xs space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Project Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                Installation Project
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(Number(e.target.value));
                  const p = projects.find((x) => x.projectId === Number(e.target.value));
                  if (p) {
                    setHomeownerName(p.customerName);
                    setSystemSize(p.systemCapacityKw);
                  }
                }}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
              >
                {projects.map((p) => (
                  <option key={p.projectId} value={p.projectId}>
                    {p.projectNumber} • {p.customerName} ({p.systemCapacityKw} kW)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                Lead Technician Name
              </label>
              <input
                type="text"
                required
                value={leadTech}
                onChange={(e) => setLeadTech(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          {/* Time & Size */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                Finish Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                Confirmed System Size
              </label>
              <input
                type="number"
                step="0.5"
                value={systemSize}
                onChange={(e) => setSystemSize(Number(e.target.value))}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>

          {/* Power Generation Test */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>On-Site Power Generation Verification</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-emerald-600 text-white">
                LIVE METRICS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-500 font-bold block mb-1">Tested AC Power Output (kW)</label>
                <input
                  type="number"
                  step="0.01"
                  value={testedKw}
                  onChange={(e) => setTestedKw(Number(e.target.value))}
                  className="w-full p-2 bg-white dark:bg-slate-800 border border-emerald-300 rounded-lg font-bold text-emerald-700 dark:text-emerald-300"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold block mb-1">Grid Voltage (V AC)</label>
                <input
                  type="number"
                  step="0.1"
                  value={testedVoltage}
                  onChange={(e) => setTestedVoltage(Number(e.target.value))}
                  className="w-full p-2 bg-white dark:bg-slate-800 border border-emerald-300 rounded-lg font-bold text-emerald-700 dark:text-emerald-300"
                />
              </div>
            </div>
          </div>

          {/* Photos Upload Mock */}
          <div>
            <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
              Photos of Completed Rooftop Installation (Panels, Inverter & Earthing)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 text-center gap-1">
                <Camera className="w-5 h-5 text-slate-400" />
                <span className="text-[10px]">Photo 1: Solar Roof Array</span>
                <span className="text-[9px] text-emerald-600 font-bold">✓ Uploaded</span>
              </div>
              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 text-center gap-1">
                <Camera className="w-5 h-5 text-slate-400" />
                <span className="text-[10px]">Photo 2: Inverter & DCDB</span>
                <span className="text-[9px] text-emerald-600 font-bold">✓ Uploaded</span>
              </div>
              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-400 text-center gap-1">
                <Camera className="w-5 h-5 text-slate-400" />
                <span className="text-[10px]">Photo 3: Earthing Rod</span>
                <span className="text-[9px] text-emerald-600 font-bold">✓ Uploaded</span>
              </div>
            </div>
          </div>

          {/* Homeowner Signature Canvas */}
          <div className="border border-slate-300 dark:border-slate-700 rounded-xl p-4 space-y-2 bg-slate-50 dark:bg-slate-900/60">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-indigo-600" />
                  <span>Homeowner Screen Signature (Acceptance of Work)</span>
                </span>
                <p className="text-[11px] text-slate-500">Sign with mouse, trackpad or stylus on tablet</p>
              </div>
              <button
                type="button"
                onClick={clearSignature}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white rounded border border-slate-300 dark:border-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="bg-white rounded-lg border border-slate-300 overflow-hidden shadow-inner flex justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={130}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="cursor-crosshair touch-none w-full max-w-[500px]"
              />
            </div>
            <p className="text-[10px] text-slate-400 text-center">
              Signed by homeowner: <strong>{homeownerName}</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Mobile Job Sheet & Issue Handover Certificate</span>
          </button>
        </form>

        {submittedSheet && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
            <p className="font-bold text-sm">✓ Commissioning Certificate Issued: {submittedSheet.handoverCertificateNumber}</p>
            <p>Signed by {submittedSheet.homeownerName}. System generation verified at {submittedSheet.testedKwOutput} kW.</p>
          </div>
        )}
      </div>
    </div>
  );
};
