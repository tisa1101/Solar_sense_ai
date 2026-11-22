import React, { useEffect, useState, useRef } from 'react';
import { solarApi } from '../services/solarApi';
import {
  SolarWorker,
  WorkerTask,
  CreateSolarWorker,
  AssignWorkerTask,
  CustomerPortalData
} from '../types/solar';
import { LoadingSpinner } from '../components/CommonState';
import {
  HardHat,
  ShieldCheck,
  UserCheck,
  Plus,
  Clock,
  CheckCircle2,
  Calendar,
  Phone,
  MapPin,
  Zap,
  Sparkles,
  Camera,
  Layers,
  ArrowRight,
  Filter,
  Search,
  RefreshCw,
  X,
  FileCheck2,
  Award,
  ChevronRight,
  SlidersHorizontal,
  Navigation,
  Lock,
  Eye,
  CheckSquare,
  Square,
  PenTool,
  RotateCcw
} from 'lucide-react';

export const WorkerPortalPage: React.FC = () => {
  // Mode State: 'admin' (can view all, add workers, assign tasks) vs 'worker' (only view assigned tasks)
  const [viewMode, setViewMode] = useState<'admin' | 'worker'>('admin');
  
  // When in worker mode, selected worker identity
  const [selectedWorkerId, setSelectedWorkerId] = useState<number>(3); // Default: Ramesh Patil (Field Technician)

  // Data States
  const [workers, setWorkers] = useState<SolarWorker[]>([]);
  const [tasks, setTasks] = useState<WorkerTask[]>([]);
  const [projects, setProjects] = useState<CustomerPortalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);

  // Filters (for Admin view)
  const [workerFilter, setWorkerFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [showAddWorkerModal, setShowAddWorkerModal] = useState<boolean>(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState<boolean>(false);
  const [activeTaskForInspection, setActiveTaskForInspection] = useState<WorkerTask | null>(null);

  // Add Worker Form State
  const [newWorkerName, setNewWorkerName] = useState<string>('');
  const [newWorkerPhone, setNewWorkerPhone] = useState<string>('+91 ');
  const [newWorkerRole, setNewWorkerRole] = useState<string>('FieldTechnician');
  const [newWorkerSpec, setNewWorkerSpec] = useState<string>('Rooftop Racking & SafeDC™ 1V Wiring');
  const [newWorkerEmail, setNewWorkerEmail] = useState<string>('');
  const [isSubmittingWorker, setIsSubmittingWorker] = useState<boolean>(false);

  // Assign Task Form State
  const [assignProjectId, setAssignProjectId] = useState<number>(101);
  const [assignWorkerId, setAssignWorkerId] = useState<number>(3);
  const [assignTaskType, setAssignTaskType] = useState<string>('RoofMounting');
  const [assignDate, setAssignDate] = useState<string>(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [assignNotes, setAssignNotes] = useState<string>('Follow MNRE rooftop mounting protocols and verify SafeDC 1V isolation.');
  const [isSubmittingTask, setIsSubmittingTask] = useState<boolean>(false);

  // Task Execution Form (for Worker Checklist & Digital Signature)
  const [taskTestedKw, setTaskTestedKw] = useState<number>(3.2);
  const [taskTestedVoltage, setTaskTestedVoltage] = useState<number>(238.4);
  const [taskNotes, setTaskNotes] = useState<string>('Earthing tested 1.2 Ohms. Module polarity and Voc verified.');
  const [completedChecklist, setCompletedChecklist] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [hasSignature, setHasSignature] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load initial workers & projects
  const fetchData = async () => {
    try {
      setLoading(true);
      const [wRes, pRes] = await Promise.all([
        solarApi.getWorkers(),
        solarApi.getProjects().catch(() => ({ data: { data: [] } }))
      ]);
      setWorkers(wRes.data.data);
      setProjects(pRes.data.data);

      if (wRes.data.data.length > 0 && !selectedWorkerId) {
        setSelectedWorkerId(wRes.data.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load workers or projects', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks based on active mode
  const fetchTasks = async (overrideWorkerId?: number) => {
    try {
      setTasksLoading(true);
      // In worker mode, STRICTLY fetch tasks for that worker ID only!
      // In admin mode, pass undefined to fetch ALL tasks across the entire company.
      const targetWorkerId = viewMode === 'worker' ? (overrideWorkerId ?? selectedWorkerId) : undefined;
      const res = await solarApi.getWorkerTasks(targetWorkerId);
      setTasks(res.data.data);
    } catch (err) {
      console.error('Failed to fetch worker tasks', err);
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [viewMode, selectedWorkerId]);

  // Handle Canvas Drawing for Customer Digital Signature
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
    ctx.strokeStyle = '#f472b6'; // Vibrant rose signature
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

  // Submit New Worker
  const handleCreateWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkerName.trim()) return;

    try {
      setIsSubmittingWorker(true);
      const res = await solarApi.createWorker({
        fullName: newWorkerName,
        phone: newWorkerPhone,
        role: newWorkerRole,
        specialization: newWorkerSpec,
        email: newWorkerEmail || undefined
      });

      if (res.data?.data) {
        setWorkers((prev) => [...prev, res.data.data]);
        setShowAddWorkerModal(false);
        setNewWorkerName('');
        setNewWorkerPhone('+91 ');
        alert(`Worker ${res.data.data.fullName} registered successfully with code ${res.data.data.workerCode}!`);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to register new worker.');
    } finally {
      setIsSubmittingWorker(false);
    }
  };

  // Assign Task
  const handleAssignTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmittingTask(true);
      const res = await solarApi.assignWorkerTask({
        projectId: assignProjectId,
        workerId: assignWorkerId,
        taskType: assignTaskType,
        scheduledDate: new Date(assignDate).toISOString(),
        notes: assignNotes
      });

      if (res.data?.data) {
        setShowAssignTaskModal(false);
        fetchTasks();
        fetchData(); // refresh worker counts
        alert(`Task ${res.data.data.taskCode} dispatched to ${res.data.data.assignedWorkerName}!`);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to dispatch worker task.');
    } finally {
      setIsSubmittingTask(false);
    }
  };

  // Update Task Status & Complete Field Inspection
  const handleUpdateTaskStatus = async (task: WorkerTask, newStatus: string) => {
    try {
      const sigData = canvasRef.current ? canvasRef.current.toDataURL() : undefined;
      const res = await solarApi.updateWorkerTaskStatus(task.id, {
        status: newStatus,
        notes: taskNotes,
        testedKw: taskTestedKw,
        testedVoltage: taskTestedVoltage,
        customerSignatureBase64: hasSignature ? sigData : undefined
      });

      if (res.data?.data) {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? res.data.data : t)));
        if (activeTaskForInspection?.id === task.id) {
          setActiveTaskForInspection(res.data.data);
        }
        alert(`Task status updated to: ${newStatus}`);
      }
    } catch (err) {
      alert('Failed to update task status.');
    }
  };

  const activeWorkerObj = workers.find((w) => w.id === selectedWorkerId);

  // Filtered Tasks for Admin View
  const filteredTasksForAdmin = tasks.filter((t) => {
    const matchWorker = workerFilter === 'all' || String(t.assignedWorkerId) === workerFilter;
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchQuery = !searchQuery.trim() ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.taskCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedWorkerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchWorker && matchStatus && matchQuery;
  });

  if (loading) {
    return <LoadingSpinner message="Connecting to SunPower Field Operations & Worker Fleet Matrix..." />;
  }

  return (
    <div className="space-y-8 font-['Poppins',sans-serif] pb-16">
      {/* ======================================================== */}
      {/* 1. TOP ROLE SWITCHER & IDENTITY BAR (Clearly Visible)    */}
      {/* ======================================================== */}
      <div className="bg-[#130d22]/85 backdrop-blur-3xl rounded-3xl border border-white/12 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.65)] relative overflow-hidden">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-violet-600/20 to-rose-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <HardHat className="w-3.5 h-3.5 text-pink-400" />
                <span>FIELD CREW &amp; WORKER DISPATCH SYSTEM</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Fleet Sync
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
              Workers &amp; Field Crew Portal
            </h1>
            <p className="text-xs text-[#A79FB6] mt-1 max-w-2xl leading-relaxed">
              Role-governed field operations console. <strong className="text-white">Admin &amp; Crew Leaders</strong> can add workers, assign tasks, and view all installation dossiers. <strong className="text-pink-300">Workers</strong> log in to view and execute <span className="underline decoration-pink-400">only their assigned tasks</span>.
            </p>
          </div>

          {/* Mode Switcher Pill Control */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="p-1 rounded-full bg-black/50 border border-white/15 flex items-center gap-1 backdrop-blur-xl">
              <button
                onClick={() => setViewMode('admin')}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'admin'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_4px_20px_rgba(236,72,153,0.45)]'
                    : 'text-[#A79FB6] hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin / Crew Leader</span>
              </button>
              <button
                onClick={() => setViewMode('worker')}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'worker'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_4px_20px_rgba(236,72,153,0.45)]'
                    : 'text-[#A79FB6] hover:text-white'
                }`}
              >
                <HardHat className="w-3.5 h-3.5" />
                <span>Worker Login Mode</span>
              </button>
            </div>

            {viewMode === 'admin' ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddWorkerModal(true)}
                  className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-pink-400" />
                  <span>Add Worker</span>
                </button>
                <button
                  onClick={() => setShowAssignTaskModal(true)}
                  className="px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/35 text-xs font-mono font-bold text-pink-200 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  <span>Assign Task</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-black/40 border border-white/12 px-3 py-2 rounded-2xl">
                  <span className="text-[10px] font-mono text-[#A79FB6] uppercase">Active Worker:</span>
                  <select
                    value={selectedWorkerId}
                    onChange={(e) => setSelectedWorkerId(Number(e.target.value))}
                    className="bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
                  >
                    {workers.map((w) => (
                      <option key={w.id} value={w.id} className="bg-[#140e24] text-white">
                        {w.fullName} ({w.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ADMIN VIEW: Full Fleet Overview & Worker Management   */}
      {/* ======================================================== */}
      {viewMode === 'admin' && (
        <div className="space-y-6">
          {/* Active Workers Fleet Roster */}
          <div className="bg-[#130d22]/85 backdrop-blur-3xl rounded-3xl border border-white/12 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono text-pink-400 uppercase font-bold tracking-wider block">
                  Field Personnel Roster
                </span>
                <h3 className="text-xl font-black text-white font-display">
                  Certified Solar Technicians &amp; Crew Leaders ({workers.length})
                </h3>
              </div>
              <button
                onClick={() => setShowAddWorkerModal(true)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-xs font-bold shadow-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register New Worker</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-pink-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-white/15 flex items-center justify-center text-white font-black font-display text-sm">
                        {worker.fullName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        worker.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : worker.status === 'OnField'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-white/5 text-[#A79FB6] border-white/10'
                      }`}>
                        {worker.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-base group-hover:text-pink-300 transition-colors">
                      {worker.fullName}
                    </h4>
                    <span className="text-[11px] font-mono text-purple-300 font-bold block">
                      {worker.role} · {worker.workerCode}
                    </span>
                    <p className="text-xs text-[#A79FB6] mt-2 line-clamp-2">
                      {worker.specialization}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/8 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#A79FB6]">Active Tasks:</span>
                      <span className="text-pink-300 font-black">{worker.assignedTasksCount} tasks</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#A79FB6]">Completed:</span>
                      <span className="text-emerald-400 font-bold">{worker.completedTasksCount} jobs</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-[#A79FB6]">Phone:</span>
                      <span className="text-white">{worker.phone}</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedWorkerId(worker.id);
                        setViewMode('worker');
                      }}
                      className="w-full mt-2 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-[11px] font-mono font-bold text-pink-300 border border-white/10 hover:border-pink-500/30 flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Switch to {worker.fullName.split(' ')[0]}'s View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Field Tasks Board (Admin View) */}
          <div className="bg-[#130d22]/85 backdrop-blur-3xl rounded-3xl border border-white/12 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold tracking-wider block">
                  Central Operations Dispatch
                </span>
                <h3 className="text-xl font-black text-white font-display">
                  All Installation &amp; Service Tasks ({tasks.length})
                </h3>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative min-w-[180px]">
                  <Search className="w-3.5 h-3.5 text-[#A79FB6] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search task, customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white/5 border border-white/12 text-xs text-white placeholder-[#786F86] font-mono focus:outline-none"
                  />
                </div>

                <select
                  value={workerFilter}
                  onChange={(e) => setWorkerFilter(e.target.value)}
                  className="bg-white/5 border border-white/12 px-3 py-1.5 rounded-full text-xs font-mono text-white focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#140e24]">All Field Workers</option>
                  {workers.map((w) => (
                    <option key={w.id} value={String(w.id)} className="bg-[#140e24]">
                      {w.fullName} ({w.role})
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white/5 border border-white/12 px-3 py-1.5 rounded-full text-xs font-mono text-white focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#140e24]">All Statuses</option>
                  <option value="Assigned" className="bg-[#140e24]">Assigned</option>
                  <option value="EnRoute" className="bg-[#140e24]">En Route</option>
                  <option value="InProgress" className="bg-[#140e24]">In Progress</option>
                  <option value="Completed" className="bg-[#140e24]">Completed</option>
                </select>

                <button
                  onClick={() => fetchTasks()}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/12 text-[#A79FB6] hover:text-white cursor-pointer transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${tasksLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Tasks Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-black/30 text-[#A79FB6] font-mono border-b border-white/8 uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Task Code</th>
                    <th className="p-3.5">Assigned Worker</th>
                    <th className="p-3.5">Customer &amp; Location</th>
                    <th className="p-3.5">Task Type</th>
                    <th className="p-3.5">System</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredTasksForAdmin.map((task) => (
                    <tr key={task.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 font-mono font-bold text-pink-300">
                        {task.taskCode}
                        <span className="block text-[10px] text-[#A79FB6]">{task.projectNumber}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-white">{task.assignedWorkerName}</span>
                        <span className="block text-[10px] text-purple-300 font-mono">{task.assignedWorkerRole}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-white">{task.customerName}</span>
                        <span className="block text-[11px] text-[#A79FB6] truncate max-w-[200px]" title={task.customerAddress}>
                          {task.customerAddress}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-[#D5CEE0]">
                        {task.taskType}
                      </td>
                      <td className="p-3.5 font-mono text-white font-bold">
                        {task.systemCapacityKw} kW <span className="text-[#A79FB6] font-normal">({task.systemType})</span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                          task.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : task.status === 'InProgress'
                            ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                            : task.status === 'EnRoute'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-white/5 text-[#A79FB6] border-white/10'
                        }`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => {
                            setActiveTaskForInspection(task);
                            setSelectedWorkerId(task.assignedWorkerId);
                          }}
                          className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/12 text-xs font-mono font-bold text-white transition-all cursor-pointer"
                        >
                          View Task Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. WORKER VIEW: Strictly Scoped to Logged In Worker      */}
      {/* ======================================================== */}
      {viewMode === 'worker' && (
        <div className="space-y-6">
          {/* Privacy Isolation Alert Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-pink-500/15 via-purple-600/15 to-indigo-600/10 border border-pink-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black text-pink-300 uppercase tracking-wider">
                    WORKER PORTAL // ACTIVE SESSION
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    Authenticated
                  </span>
                </div>
                <h3 className="text-lg font-black text-white font-display">
                  {activeWorkerObj?.fullName} — {activeWorkerObj?.role} ({activeWorkerObj?.workerCode})
                </h3>
                <p className="text-xs text-[#D5CEE0] font-mono mt-0.5">
                  Phone: {activeWorkerObj?.phone} · Rating: ★ {activeWorkerObj?.rating} · Scoped View: <strong className="text-white">Only your {tasks.length} assigned tasks are visible.</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#A79FB6] font-mono">Switch Worker:</span>
              <select
                value={selectedWorkerId}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedWorkerId(id);
                  fetchTasks(id);
                }}
                className="bg-black/50 border border-white/20 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-pink-300 focus:outline-none cursor-pointer"
              >
                {workers.map((w) => (
                  <option key={w.id} value={w.id} className="bg-[#140e24] text-white">
                    {w.fullName} ({w.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tasks Scoped To Worker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white font-display tracking-tight flex items-center gap-2">
                <Calendar className="w-5 h-5 text-pink-400" />
                <span>My Assigned Tasks &amp; Installation Work Orders ({tasks.length})</span>
              </h3>
              <span className="text-xs font-mono text-[#A79FB6]">
                Assigned strictly to {activeWorkerObj?.fullName}
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white/[0.03] border border-white/10 text-[#A79FB6] font-mono text-xs">
                No active tasks assigned to you right now. Stand by for crew leader dispatch!
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {tasks.map((task) => {
                  const isCompleted = task.status === 'Completed';

                  return (
                    <div
                      key={task.id}
                      className="p-6 rounded-3xl bg-[#130d22]/90 backdrop-blur-3xl border border-white/12 hover:border-pink-500/40 transition-all shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-5 group"
                    >
                      <div>
                        {/* Task Card Header */}
                        <div className="flex items-start justify-between border-b border-white/8 pb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono text-[10px] font-bold">
                                {task.taskCode}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold">
                                {task.projectNumber}
                              </span>
                              <span className="text-[10px] font-mono text-purple-300">
                                {task.taskType}
                              </span>
                            </div>
                            <h4 className="text-lg font-black text-white font-display mt-2 group-hover:text-pink-300 transition-colors">
                              {task.customerName}
                            </h4>
                          </div>

                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${
                            isCompleted
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : task.status === 'InProgress'
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                              : task.status === 'EnRoute'
                              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              : 'bg-white/5 text-[#A79FB6] border-white/10'
                          }`}>
                            {task.status}
                          </span>
                        </div>

                        {/* Customer Info & Coordinates */}
                        <div className="mt-4 space-y-2 text-xs font-mono">
                          <div className="flex items-start gap-2 text-[#D5CEE0]">
                            <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                            <span>{task.customerAddress}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#A79FB6]">
                            <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>{task.customerPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#A79FB6]">
                            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>Scheduled: {new Date(task.scheduledDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* System Specs */}
                        <div className="mt-4 p-3 rounded-2xl bg-black/40 border border-white/8 grid grid-cols-2 gap-2 text-xs font-mono">
                          <div>
                            <span className="text-[#A79FB6] text-[10px] block">Capacity</span>
                            <span className="font-bold text-white">{task.systemCapacityKw} kW</span>
                          </div>
                          <div>
                            <span className="text-[#A79FB6] text-[10px] block">System Type</span>
                            <span className="font-bold text-purple-300">{task.systemType}</span>
                          </div>
                        </div>

                        {/* Checklist Preview */}
                        <div className="mt-4 space-y-1.5">
                          <span className="text-[10px] font-mono text-[#A79FB6] uppercase font-bold block">
                            Field Inspection Checklist:
                          </span>
                          {task.checklistItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#D5CEE0]">
                              {isCompleted ? (
                                <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Square className="w-3.5 h-3.5 text-pink-400" />
                              )}
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {task.notes && (
                          <div className="mt-3 p-2.5 rounded-xl bg-white/5 text-[11px] font-mono text-[#D5CEE0]">
                            <strong>Lead Notes:</strong> {task.notes}
                          </div>
                        )}
                      </div>

                      {/* Action Stepper for Worker */}
                      <div className="pt-4 border-t border-white/8 space-y-3">
                        {!isCompleted ? (
                          <div className="flex flex-wrap items-center gap-2">
                            {task.status === 'Assigned' && (
                              <button
                                onClick={() => handleUpdateTaskStatus(task, 'EnRoute')}
                                className="flex-1 py-2 px-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold transition-all cursor-pointer text-center"
                              >
                                🚀 Mark En Route to Site
                              </button>
                            )}

                            {task.status === 'EnRoute' && (
                              <button
                                onClick={() => handleUpdateTaskStatus(task, 'InProgress')}
                                className="flex-1 py-2 px-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold transition-all cursor-pointer text-center"
                              >
                                🪜 Arrived &amp; Start Installation
                              </button>
                            )}

                            <button
                              onClick={() => setActiveTaskForInspection(task)}
                              className="py-2 px-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-mono text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <FileCheck2 className="w-3.5 h-3.5" />
                              <span>Execute Checklist &amp; Sign-Off</span>
                            </button>
                          </div>
                        ) : (
                          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-bold">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>Task Completed &amp; Handover Certificate Issued</span>
                            </span>
                            <button
                              onClick={() => setActiveTaskForInspection(task)}
                              className="text-[11px] underline hover:text-white"
                            >
                              View Certificate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MODAL: ADD NEW WORKER (Admin / Leader Feature)        */}
      {/* ======================================================== */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="bg-[#140e24] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <HardHat className="w-5 h-5 text-pink-400" />
                <h3 className="text-xl font-black text-white font-display">
                  Register Field Worker / Crew Member
                </h3>
              </div>
              <button
                onClick={() => setShowAddWorkerModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-[#A79FB6] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateWorker} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={newWorkerName}
                  onChange={(e) => setNewWorkerName(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98221 00000"
                    value={newWorkerPhone}
                    onChange={(e) => setNewWorkerPhone(e.target.value)}
                    className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                    Role Category
                  </label>
                  <select
                    value={newWorkerRole}
                    onChange={(e) => setNewWorkerRole(e.target.value)}
                    className="w-full p-2.5 bg-[#1a1230] border border-white/15 rounded-xl text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="FieldTechnician">Field Technician</option>
                    <option value="CrewLeader">Senior Crew Leader</option>
                    <option value="MasterElectrician">Master Electrician</option>
                    <option value="SolarRoofer">Solar Racking &amp; Roofer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                  Specialization &amp; Skill Certifications
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SafeDC 1V Wiring, Earthing Pit Testing, Elevated Ballast"
                  value={newWorkerSpec}
                  onChange={(e) => setNewWorkerSpec(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="worker@sunpower.com"
                  value={newWorkerEmail}
                  onChange={(e) => setNewWorkerEmail(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddWorkerModal(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-[#A79FB6] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingWorker}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:brightness-110"
                >
                  {isSubmittingWorker ? 'Registering...' : 'Register Worker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. MODAL: ASSIGN TASK (Admin / Leader Feature)            */}
      {/* ======================================================== */}
      {showAssignTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="bg-[#140e24] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-black text-white font-display">
                  Dispatch &amp; Assign Work Order
                </h3>
              </div>
              <button
                onClick={() => setShowAssignTaskModal(false)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-[#A79FB6] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAssignTask} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                  Target Customer Project
                </label>
                <select
                  value={assignProjectId}
                  onChange={(e) => setAssignProjectId(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#1a1230] border border-white/15 rounded-xl text-white font-medium focus:outline-none cursor-pointer"
                >
                  {projects.map((p) => (
                    <option key={p.projectId} value={p.projectId}>
                      {p.projectNumber} · {p.customerName} ({p.systemCapacityKw} kW {p.systemType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                    Assign to Worker
                  </label>
                  <select
                    value={assignWorkerId}
                    onChange={(e) => setAssignWorkerId(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#1a1230] border border-white/15 rounded-xl text-white font-medium focus:outline-none cursor-pointer"
                  >
                    {workers.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.fullName} ({w.role})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                    Task Type
                  </label>
                  <select
                    value={assignTaskType}
                    onChange={(e) => setAssignTaskType(e.target.value)}
                    className="w-full p-2.5 bg-[#1a1230] border border-white/15 rounded-xl text-white font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="RoofMounting">Roof Mounting</option>
                    <option value="InverterWiring">Inverter Wiring</option>
                    <option value="PreCommissioningAudit">Pre-Commissioning Audit</option>
                    <option value="NetMeterLiaison">Net Meter Liaison</option>
                    <option value="SupportTicketVisit">Support Warranty Ticket</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                  Scheduled Date
                </label>
                <input
                  type="date"
                  required
                  value={assignDate}
                  onChange={(e) => setAssignDate(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-[#A79FB6] font-bold uppercase text-[10px] mb-1">
                  Technical Instructions / Lead Notes
                </label>
                <textarea
                  rows={3}
                  value={assignNotes}
                  onChange={(e) => setAssignNotes(e.target.value)}
                  className="w-full p-2.5 bg-white/5 border border-white/15 rounded-xl text-white font-medium focus:outline-none focus:border-pink-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAssignTaskModal(false)}
                  className="px-4 py-2 rounded-full border border-white/15 text-[#A79FB6] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTask}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg hover:brightness-110"
                >
                  {isSubmittingTask ? 'Dispatching...' : 'Dispatch Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. MODAL: TASK EXECUTION & DIGITAL SIGN-OFF (Worker)     */}
      {/* ======================================================== */}
      {activeTaskForInspection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
          <div className="bg-[#140e24] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] relative max-h-[92vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono text-[10px] font-bold">
                    {activeTaskForInspection.taskCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold">
                    {activeTaskForInspection.projectNumber}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white font-display">
                  {activeTaskForInspection.customerName} — {activeTaskForInspection.taskType}
                </h3>
                <p className="text-xs text-[#A79FB6] font-mono mt-0.5">
                  {activeTaskForInspection.customerAddress}
                </p>
              </div>

              <button
                onClick={() => setActiveTaskForInspection(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-[#A79FB6] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Checklist */}
            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/8">
              <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-wider block">
                Technical Field Checklist (Verify on Site):
              </span>
              <div className="space-y-2">
                {activeTaskForInspection.checklistItems.map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 text-xs font-mono text-white cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={completedChecklist[idx] || activeTaskForInspection.status === 'Completed'}
                      onChange={(e) => setCompletedChecklist({ ...completedChecklist, [idx]: e.target.checked })}
                      className="w-4 h-4 accent-pink-500 rounded cursor-pointer"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Field Measurements */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                <label className="block text-[#A79FB6] text-[10px] uppercase font-bold mb-1">
                  Tested Power Generation (kW)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={taskTestedKw}
                  onChange={(e) => setTaskTestedKw(Number(e.target.value))}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none"
                />
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                <label className="block text-[#A79FB6] text-[10px] uppercase font-bold mb-1">
                  Tested Grid Voltage (V AC)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={taskTestedVoltage}
                  onChange={(e) => setTaskTestedVoltage(Number(e.target.value))}
                  className="w-full bg-transparent text-white font-bold text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="bg-white/5 p-3 rounded-xl border border-white/8 text-xs font-mono">
              <label className="block text-[#A79FB6] text-[10px] uppercase font-bold mb-1">
                Technician Inspection Notes
              </label>
              <textarea
                rows={2}
                value={taskNotes}
                onChange={(e) => setTaskNotes(e.target.value)}
                className="w-full bg-transparent text-white focus:outline-none text-xs"
              />
            </div>

            {/* Customer Digital Signature Pad */}
            <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Customer Digital Handover Signature:</span>
                </span>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-[11px] font-mono text-pink-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear Signature</span>
                </button>
              </div>

              {activeTaskForInspection.customerSignatureBase64 ? (
                <div className="p-3 bg-white rounded-xl">
                  <img
                    src={activeTaskForInspection.customerSignatureBase64}
                    alt="Customer Signature"
                    className="h-16 object-contain mx-auto"
                  />
                  <p className="text-center text-[10px] font-mono text-slate-700 mt-1">
                    Signed by {activeTaskForInspection.customerName}
                  </p>
                </div>
              ) : (
                <div className="border border-white/20 rounded-xl overflow-hidden bg-black/40">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={120}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-28 cursor-crosshair touch-none"
                  />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setActiveTaskForInspection(null)}
                className="px-4 py-2 rounded-full border border-white/15 text-xs font-mono font-bold text-[#A79FB6] hover:text-white"
              >
                Close
              </button>

              {activeTaskForInspection.status !== 'Completed' && (
                <button
                  type="button"
                  onClick={() => handleUpdateTaskStatus(activeTaskForInspection, 'Completed')}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-mono text-xs font-bold shadow-[0_4px_20px_rgba(16,185,129,0.4)] flex items-center gap-2 cursor-pointer transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Complete Task &amp; Issue Handover Certificate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerPortalPage;
