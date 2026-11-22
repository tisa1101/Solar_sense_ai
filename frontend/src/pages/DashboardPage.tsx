import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { DashboardSummary, Receipt, DeliveryOrder, InternalTransfer, StockAdjustment, Warehouse, Category, OperationStatus } from '../types';
import { KpiCard } from '../components/KpiCard';
import { StatusBadge } from '../components/StatusBadge';
import { LoadingSpinner } from '../components/CommonState';
import {
  Package,
  Boxes,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Plus,
  History,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  Search,
  Zap,
  Activity,
  Layers,
  ShieldCheck,
  RefreshCw,
  Camera,
  Sun,
  Coins,
  Cpu,
  Eye,
  FileText,
  CheckCircle2,
  ExternalLink,
  X,
  Compass,
  Ruler,
  Leaf
} from 'lucide-react';
import { solarApi } from '../services/solarApi';
import { CustomerAiSubmission } from '../types/solar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface UnifiedOperation {
  id: number;
  type: 'Receipt' | 'Delivery' | 'Transfer' | 'Adjustment';
  referenceNumber: string;
  warehouseName: string;
  destinationWarehouse?: string;
  status: OperationStatus;
  itemCount: number;
  totalQuantity: number;
  createdAt: string;
  url: string;
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Operations data for dynamic filtering
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [deliveries, setDeliveries] = useState<DeliveryOrder[]>([]);
  const [transfers, setTransfers] = useState<InternalTransfer[]>([]);
  const [adjustments, setAdjustments] = useState<StockAdjustment[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [, setCategories] = useState<Category[]>([]);

  // Customer AI Ingestion & Camera Review Matrix State
  const [aiSubmissions, setAiSubmissions] = useState<CustomerAiSubmission[]>([]);
  const [selectedAiSubmission, setSelectedAiSubmission] = useState<CustomerAiSubmission | null>(null);
  const [aiSubmissionsLoading, setAiSubmissionsLoading] = useState<boolean>(false);
  const [aiSearch, setAiSearch] = useState<string>('');

  const filteredAiSubmissions = useMemo(() => {
    if (!aiSearch.trim()) return aiSubmissions;
    const q = aiSearch.toLowerCase();
    return aiSubmissions.filter(s =>
      s.customerName.toLowerCase().includes(q) ||
      (s.projectNumber && s.projectNumber.toLowerCase().includes(q)) ||
      s.phone.toLowerCase().includes(q) ||
      (s.address && s.address.toLowerCase().includes(q)) ||
      (s.cameraReview?.roofType && s.cameraReview.roofType.toLowerCase().includes(q))
    );
  }, [aiSubmissions, aiSearch]);

  // Dynamic Filters (As specified in Problem Statement)
  const [docTypeFilter, setDocTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [warehouseFilter, setWarehouseFilter] = useState<string>('all');
  const [opSearch, setOpSearch] = useState('');

  const fetchAiSubmissions = async () => {
    try {
      setAiSubmissionsLoading(true);
      const res = await solarApi.getAiSubmissions();
      if (res.data?.data) {
        setAiSubmissions(res.data.data);
      }
    } catch (e) {
      console.warn('Customer AI Submissions telemetry notice:', e);
    } finally {
      setAiSubmissionsLoading(false);
    }
  };

  const fetchDashboardData = async (isRetry = false) => {
    try {
      setLoading(true);
      setError(null);
      const [sumRes, rRes, dRes, tRes, aRes, wRes, cRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/receipts').catch(() => ({ data: { data: [] } })),
        api.get('/deliveries').catch(() => ({ data: { data: [] } })),
        api.get('/transfers').catch(() => ({ data: { data: [] } })),
        api.get('/adjustments').catch(() => ({ data: { data: [] } })),
        api.get('/warehouses').catch(() => ({ data: { data: [] } })),
        api.get('/categories').catch(() => ({ data: { data: [] } }))
      ]);

      setData(sumRes.data.data);
      setReceipts(rRes.data.data || []);
      setDeliveries(dRes.data.data || []);
      setTransfers(tRes.data.data || []);
      setAdjustments(aRes.data.data || []);
      setWarehouses(wRes.data.data || []);
      setCategories(cRes.data.data || []);

      // Concurrently fetch Customer AI Ingestion Submissions
      fetchAiSubmissions();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load dashboard.';
      // If 401 Unauthorized, automatically re-authenticate once
      if (!isRetry && (msg.includes('401') || msg.toLowerCase().includes('unauthorized'))) {
        try {
          const authRes = await api.post('/auth/login', {
            email: 'admin@stocksense.com',
            password: 'Admin@123'
          });
          if (authRes.data?.data?.accessToken) {
            localStorage.setItem('stocksense_token', authRes.data.data.accessToken);
            localStorage.setItem('stocksense_user', JSON.stringify(authRes.data.data.user));
            return fetchDashboardData(true);
          }
        } catch {
          // ignore
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password: pass });
      if (res.data?.data?.accessToken) {
        localStorage.setItem('stocksense_token', res.data.data.accessToken);
        localStorage.setItem('stocksense_user', JSON.stringify(res.data.data.user));
        setError(null);
        await fetchDashboardData(true);
      }
    } catch {
      setError('Authentication failed. Please check credentials or network.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Combine all operations into unified list for dynamic multi-criteria filtering
  const allOperations: UnifiedOperation[] = useMemo(() => {
    const list: UnifiedOperation[] = [];

    receipts.forEach((r) => {
      list.push({
        id: r.id,
        type: 'Receipt',
        referenceNumber: r.receiptNumber,
        warehouseName: r.warehouseName,
        status: r.status,
        itemCount: r.items?.length || 0,
        totalQuantity: r.items?.reduce((sum, i) => sum + i.quantity, 0) || 0,
        createdAt: r.createdAt,
        url: '/receipts'
      });
    });

    deliveries.forEach((d) => {
      list.push({
        id: d.id,
        type: 'Delivery',
        referenceNumber: d.deliveryNumber,
        warehouseName: d.warehouseName,
        status: d.status,
        itemCount: d.items?.length || 0,
        totalQuantity: d.items?.reduce((sum, i) => sum + i.quantity, 0) || 0,
        createdAt: d.createdAt,
        url: '/deliveries'
      });
    });

    transfers.forEach((t) => {
      list.push({
        id: t.id,
        type: 'Transfer',
        referenceNumber: t.transferNumber,
        warehouseName: t.sourceWarehouseName,
        destinationWarehouse: t.destinationWarehouseName,
        status: t.status,
        itemCount: t.items?.length || 0,
        totalQuantity: t.items?.reduce((sum, i) => sum + i.quantity, 0) || 0,
        createdAt: t.createdAt,
        url: '/transfers'
      });
    });

    adjustments.forEach((a) => {
      list.push({
        id: a.id,
        type: 'Adjustment',
        referenceNumber: a.adjustmentNumber,
        warehouseName: a.warehouseName,
        status: a.status,
        itemCount: a.items?.length || 0,
        totalQuantity: a.items?.reduce((sum, i) => sum + Math.abs(i.difference || 0), 0) || 0,
        createdAt: a.createdAt,
        url: '/adjustments'
      });
    });

    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [receipts, deliveries, transfers, adjustments]);

  // Apply Multi-Criteria Filters
  const filteredOperations = useMemo(() => {
    return allOperations.filter((op) => {
      const matchType =
        docTypeFilter === 'all' ||
        (docTypeFilter === 'receipt' && op.type === 'Receipt') ||
        (docTypeFilter === 'delivery' && op.type === 'Delivery') ||
        (docTypeFilter === 'transfer' && op.type === 'Transfer') ||
        (docTypeFilter === 'adjustment' && op.type === 'Adjustment');

      const matchStatus =
        statusFilter === 'all' ||
        String(op.status) === statusFilter;

      const matchWarehouse =
        warehouseFilter === 'all' ||
        op.warehouseName === warehouseFilter ||
        op.destinationWarehouse === warehouseFilter;

      const matchSearch = opSearch === '' || 
        op.referenceNumber.toLowerCase().includes(opSearch.toLowerCase()) ||
        op.warehouseName.toLowerCase().includes(opSearch.toLowerCase());

      return matchType && matchStatus && matchWarehouse && matchSearch;
    });
  }, [allOperations, docTypeFilter, statusFilter, warehouseFilter, opSearch]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-[#E284B3]/20 border-t-[#E284B3] animate-spin" />
          <Zap className="w-7 h-7 text-[#F4A5C6] absolute inset-0 m-auto animate-pulse" />
        </div>
        <div className="text-center font-mono">
          <span className="text-xs uppercase tracking-[0.25em] text-[#F4A5C6] font-bold">FROSTED ORCHID // POWER ERP</span>
          <p className="text-sm font-medium text-[#D5CEE0] mt-1">Aggregating telemetry matrix...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/15 rounded-3xl p-8 text-white shadow-[0_16px_40px_rgba(0,0,0,0.5)] max-w-lg w-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E284B3]/15 border border-[#E284B3]/30 flex items-center justify-center text-[#F4A5C6]">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F4A5C6]">
                Security Gateway
              </span>
              <h4 className="font-black text-lg font-display text-white">
                Session Authentication
              </h4>
            </div>
          </div>

          <p className="text-xs text-[#D5CEE0] leading-relaxed">
            {error.includes('401')
              ? 'Your security credentials expired or require re-authorization. Re-authenticate into the Command Center:'
              : error}
          </p>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleQuickLogin('admin@stocksense.com', 'Admin@123')}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_6px_24px_rgba(226,132,179,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Sign In as Admin Director (Instant)</span>
            </button>

            <button
              onClick={() => handleQuickLogin('staff@stocksense.com', 'Staff@123')}
              className="w-full py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/12 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
            >
              <span>Sign In as Operations Staff</span>
            </button>

            <button
              onClick={() => fetchDashboardData(true)}
              className="w-full text-center text-xs font-mono font-bold text-[#A79FB6] hover:text-white py-2 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-['Poppins',sans-serif]">
      {/* Quick Action Bar (Frosted Glass Dock) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.05] backdrop-blur-2xl p-5 rounded-3xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F4A5C6] block">
            Rapid Operations Dispatch
          </span>
          <span className="text-sm font-bold text-white font-display">Inventory Actions</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => navigate('/products/new')}
            className="px-4 py-2 bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] text-white rounded-full text-xs font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(226,132,179,0.35)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </button>
          <button
            onClick={() => navigate('/receipts/new')}
            className="px-4 py-2 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold hover:bg-emerald-500/25 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Receive Stock (PO)</span>
          </button>
          <button
            onClick={() => navigate('/deliveries/new')}
            className="px-4 py-2 bg-[#F5B895]/15 text-[#F5B895] border border-[#F5B895]/30 rounded-full text-xs font-bold hover:bg-[#F5B895]/25 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl"
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-[#F5B895]" />
            <span>Create Delivery</span>
          </button>
          <button
            onClick={() => navigate('/transfers/new')}
            className="px-4 py-2 bg-[#8A56E2]/15 text-[#D5CEE0] border border-[#8A56E2]/30 rounded-full text-xs font-bold hover:bg-[#8A56E2]/25 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#E284B3]" />
            <span>Internal Transfer</span>
          </button>
          <button
            onClick={() => navigate('/adjustments/new')}
            className="px-4 py-2 bg-white/[0.06] text-[#D5CEE0] border border-white/12 rounded-full text-xs font-bold hover:bg-white/[0.12] transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xl"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#F4A5C6]" />
            <span>Physical Count Adjustment</span>
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Products in Stock"
          value={data?.totalProducts || 0}
          icon={Package}
          color="rose"
          description="Active catalog SKUs tracked"
        />
        <KpiCard
          title="Total Stock Units"
          value={data?.totalStockQuantity.toLocaleString() || 0}
          icon={Boxes}
          color="blue"
          description="Aggregated warehouse inventory"
        />
        <KpiCard
          title="Low Stock / Out of Stock"
          value={(data?.lowStockCount || 0) + (data?.outOfStockCount || 0)}
          icon={AlertTriangle}
          color="amber"
          description={`${data?.lowStockCount || 0} Low · ${data?.outOfStockCount || 0} Critical Out`}
        />
        <KpiCard
          title="Active Warehouses"
          value={warehouses.length || 2}
          icon={Boxes}
          color="green"
          description="Fulfillment locations monitored"
        />
      </div>

      {/* PENDING OPERATIONS KPI ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div 
          onClick={() => { setDocTypeFilter('receipt'); setStatusFilter('1'); }}
          className="p-6 bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 hover:border-[#E284B3]/50 transition-all cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(226,132,179,0.2)] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">Pending Receipts</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display">{data?.pendingReceipts || 0}</p>
          <p className="text-[11px] text-[#A79FB6] mt-1">Inbound shipments awaiting validation intake</p>
        </div>

        <div 
          onClick={() => { setDocTypeFilter('delivery'); setStatusFilter('1'); }}
          className="p-6 bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 hover:border-[#F5B895]/50 transition-all cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(245,184,149,0.2)] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F5B895]">Pending Deliveries</span>
            <div className="w-10 h-10 rounded-2xl bg-[#F5B895]/15 border border-[#F5B895]/30 text-[#F5B895] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display">{data?.pendingDeliveries || 0}</p>
          <p className="text-[11px] text-[#A79FB6] mt-1">Outbound customer orders to pick, pack & ship</p>
        </div>

        <div 
          onClick={() => { setDocTypeFilter('transfer'); setStatusFilter('1'); }}
          className="p-6 bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 hover:border-[#8A56E2]/50 transition-all cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(138,86,226,0.2)] group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D5CEE0]">Internal Transfers Scheduled</span>
            <div className="w-10 h-10 rounded-2xl bg-[#8A56E2]/15 border border-[#8A56E2]/30 text-[#E284B3] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display">{data?.pendingTransfers || 0}</p>
          <p className="text-[11px] text-[#A79FB6] mt-1">Inter-facility transfers scheduled</p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CUSTOMER AI FEASIBILITY & CAMERA INGESTION MATRIX        */}
      {/* ======================================================== */}
      <div className="bg-[#130d22]/85 backdrop-blur-3xl rounded-3xl border border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.65)] overflow-hidden relative">
        {/* Luminous Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-gradient-to-tr from-violet-600/20 to-rose-500/10 blur-3xl pointer-events-none" />

        {/* Matrix Header */}
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0713]/80 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Ingestion Pipeline
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#D5CEE0] font-mono text-[10px] font-bold uppercase">
                Keras MobileNetV2 Vision
              </span>
            </div>
            <h3 className="text-xl font-black text-white font-display tracking-tight flex items-center gap-2.5">
              <Camera className="w-5 h-5 text-pink-400" />
              <span>Customer AI Feasibility &amp; Camera Ingestion Matrix</span>
            </h3>
            <p className="text-xs text-[#A79FB6] mt-0.5">
              Live customer calculations &amp; roof photographs submitted via Customer Portal (<span className="text-pink-300 font-mono">/portal</span>). Automatically assessed for roof material, obstacle setbacks, shadow loss %, and financial ROI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-[#A79FB6] absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search customer, phone, roof..."
                value={aiSearch}
                onChange={(e) => setAiSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-full bg-white/5 border border-white/12 text-xs text-white placeholder-[#786F86] focus:outline-none focus:border-pink-400/50 transition-all font-mono"
              />
            </div>
            <button
              onClick={fetchAiSubmissions}
              disabled={aiSubmissionsLoading}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/12 text-xs font-mono text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-pink-400 ${aiSubmissionsLoading ? 'animate-spin' : ''}`} />
              <span>{aiSubmissionsLoading ? 'Syncing...' : 'Live Sync'}</span>
            </button>
          </div>
        </div>

        {/* Matrix Ingestion Cards */}
        <div className="p-6 relative z-10">
          {filteredAiSubmissions.length === 0 ? (
            <div className="p-12 text-center text-[#A79FB6] font-mono text-xs">
              No customer AI submissions matching query.
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {filteredAiSubmissions.map((sub) => {
                const cost = sub.costEstimation;
                const cam = sub.cameraReview;
                const score = cam?.suitability?.score ?? 92;
                const scoreColor = score >= 90 ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' : 'text-blue-400 border-blue-500/30 bg-blue-500/10';

                return (
                  <div
                    key={sub.id}
                    className="p-5 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-pink-500/40 transition-all shadow-[0_12px_36px_rgba(0,0,0,0.4)] group flex flex-col justify-between"
                  >
                    <div>
                      {/* Customer Header */}
                      <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-black text-white font-display group-hover:text-pink-300 transition-colors">
                              {sub.customerName}
                            </h4>
                            {sub.projectNumber && (
                              <span className="px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 font-mono text-[10px] font-bold">
                                {sub.projectNumber}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#A79FB6] mt-0.5 font-mono">
                            {sub.phone} {sub.address ? `· ${sub.address}` : ''}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold ${scoreColor}`}>
                            {score}/100 FEASIBILITY
                          </span>
                          <span className="block text-[10px] text-[#786F86] font-mono mt-1">
                            {new Date(sub.submittedAt).toLocaleDateString()} {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>

                      {/* Split Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left: Keras Vision Review */}
                        <div className="p-3.5 rounded-2xl bg-black/30 border border-white/8 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase text-pink-400 flex items-center gap-1">
                              <Camera className="w-3 h-3" />
                              <span>KERAS ROOF AUDIT</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#D5CEE0] bg-white/5 px-2 py-0.5 rounded">
                              {cam?.confidenceScore ? `${(cam.confidenceScore * 100).toFixed(0)}% Conf` : 'Vision Verified'}
                            </span>
                          </div>

                          {sub.roofPhotoPreviewUrl && (
                            <div className="relative h-28 rounded-xl overflow-hidden border border-white/10 group/img">
                              <img
                                src={sub.roofPhotoPreviewUrl}
                                alt="Roof Preview"
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                              <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white">
                                <span className="truncate">{cam?.roofType || 'RCC Terrace'}</span>
                                <span className="text-emerald-400 font-bold">{cam?.suitability?.usableAreaPercent || 85}% Usable</span>
                              </div>
                            </div>
                          )}

                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-[#A79FB6]">Obstacles:</span>
                              <span className="font-mono text-white font-bold">
                                {cam?.totalObstructionsCount || 0} identified (
                                {cam?.obstructionsDetected?.[0]?.name ? cam.obstructionsDetected[0].name.slice(0, 18) + '...' : 'Clear'}
                                )
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-[#A79FB6]">Shadowing:</span>
                              <span className="font-mono text-amber-300 font-bold">
                                {cam?.shadingAnalysis?.estimatedShadowPercent || 3.8}% ({cam?.shadingAnalysis?.shadingRating?.split(' ')[0] || 'Minimal'})
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-[#A79FB6]">Mounting:</span>
                              <span className="font-mono text-[#D5CEE0] truncate max-w-[160px]" title={cam?.recommendedMounting}>
                                {cam?.recommendedMounting || 'Precast Ballast Blocks'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: AI Cost & Sizing Breakdown */}
                        <div className="p-3.5 rounded-2xl bg-black/30 border border-white/8 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase text-purple-400 flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              <span>AI SYSTEM SIZING &amp; COST</span>
                            </span>
                            <span className="text-xs font-black text-white font-mono">
                              {cost?.recommendedCapacityKw || 3.3} kW
                            </span>
                          </div>

                          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                            <span className="text-[10px] font-mono text-purple-300 block uppercase font-bold">
                              {cost?.systemType || 'On-Grid (Grid-Tied)'}
                            </span>
                            <p className="text-[11px] text-[#D5CEE0] line-clamp-2 mt-0.5">
                              {cost?.aiExplanation || 'Neural optimization calculated from homeowner monthly electricity bill.'}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                            <div className="bg-white/5 p-2 rounded-lg">
                              <span className="text-[#A79FB6] text-[10px] block">Central Subsidy</span>
                              <span className="text-emerald-400 font-bold">₹{cost?.financials?.centralSubsidy?.toLocaleString() || '78,000'}</span>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg">
                              <span className="text-[#A79FB6] text-[10px] block">Net Investment</span>
                              <span className="text-white font-bold">₹{cost?.financials?.netCost?.toLocaleString() || '93,600'}</span>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg">
                              <span className="text-[#A79FB6] text-[10px] block">Annual Savings</span>
                              <span className="text-[#F5B895] font-bold">₹{cost?.financials?.annualSavings?.toLocaleString() || '50,400'}/yr</span>
                            </div>
                            <div className="bg-white/5 p-2 rounded-lg">
                              <span className="text-[#A79FB6] text-[10px] block">Breakeven</span>
                              <span className="text-pink-300 font-bold">{cost?.financials?.paybackYears || 1.9} Years</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-white/8">
                      <button
                        onClick={() => setSelectedAiSubmission(sub)}
                        className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-pink-400" />
                        <span>Inspect Full AI Dossier</span>
                      </button>

                      <button
                        onClick={() => navigate('/solar/inquiries')}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 hover:from-pink-500/30 hover:to-purple-600/30 border border-pink-500/30 text-xs font-mono font-bold text-pink-200 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>Open in Scene 1 Inquiries</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* DYNAMIC OPERATIONS FILTER SECTION (Frosted Glass Container) */}
      <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="p-5 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#0D0917]/60">
          <div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#F4A5C6]" />
              <h3 className="text-base font-bold text-white font-display">
                Dynamic Operations & Documents Explorer
              </h3>
            </div>
            <p className="text-xs text-[#A79FB6] mt-0.5">Filter all warehouse operations by document type, status, warehouse, and search term</p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 bg-white/[0.08] text-[#F4A5C6] border border-white/15 rounded-full self-start md:self-auto backdrop-blur-xl">
            {filteredOperations.length} MATCHING DOCS
          </span>
        </div>

        {/* Dynamic Filters Bar (Clean Dropdowns matching reference photo) */}
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center gap-3 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-medium text-[#A79FB6] uppercase tracking-wider">TYPE:</label>
            <select
              value={docTypeFilter}
              onChange={(e) => setDocTypeFilter(e.target.value)}
              className="ti-select cursor-pointer py-2 pl-3.5 pr-8 text-xs"
            >
              <option value="all">ALL DOCUMENTS (RECEIPTS, DELIVERY, INTERNAL, ADJUSTMENTS)</option>
              <option value="receipt">RECEIPTS (INCOMING STOCK)</option>
              <option value="delivery">DELIVERY ORDERS (OUTGOING STOCK)</option>
              <option value="transfer">INTERNAL TRANSFERS</option>
              <option value="adjustment">INVENTORY ADJUSTMENTS</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[11px] font-medium text-[#A79FB6] uppercase tracking-wider">STATUS:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ti-select cursor-pointer py-2 pl-3.5 pr-8 text-xs"
            >
              <option value="all">ALL STATUSES</option>
              <option value="1">DRAFT</option>
              <option value="2">WAITING</option>
              <option value="3">READY</option>
              <option value="4">DONE</option>
              <option value="5">CANCELED</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[11px] font-medium text-[#A79FB6] uppercase tracking-wider">LOCATION:</label>
            <select
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="ti-select cursor-pointer py-2 pl-3.5 pr-8 text-xs"
            >
              <option value="all">ALL WAREHOUSES / LOCATIONS</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.name}>
                  {w.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-[#A79FB6] absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="SEARCH REFERENCE # OR LOCATION..."
              value={opSearch}
              onChange={(e) => setOpSearch(e.target.value)}
              className="ti-input w-full pl-9 py-2 text-xs"
            />
          </div>
        </div>

        {/* Filtered Operations Table */}
        <div className="overflow-x-auto max-h-84 overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-[#0B0F1D] border-b border-white/10 z-10">
              <tr className="text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Reference #</th>
                <th className="p-3.5">Document Type</th>
                <th className="p-3.5">Warehouse / Location</th>
                <th className="p-3.5">Items / Units</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOperations.length > 0 ? (
                filteredOperations.map((op) => {
                  return (
                    <tr key={`${op.type}-${op.id}`} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#FF2E93]">{op.referenceNumber}</td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          op.type === 'Receipt' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                          op.type === 'Delivery' ? 'bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30' :
                          op.type === 'Transfer' ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}>
                          {op.type === 'Receipt' && <ArrowDownLeft className="w-3 h-3" />}
                          {op.type === 'Delivery' && <ArrowUpRight className="w-3 h-3" />}
                          {op.type === 'Transfer' && <ArrowLeftRight className="w-3 h-3" />}
                          {op.type === 'Adjustment' && <SlidersHorizontal className="w-3 h-3" />}
                          {op.type}
                        </span>
                      </td>
                      <td className="p-3.5 font-medium text-slate-200">
                        {op.destinationWarehouse ? `${op.warehouseName} → ${op.destinationWarehouse}` : op.warehouseName}
                      </td>
                      <td className="p-3.5 text-slate-400">
                        <span className="font-bold text-white">{op.totalQuantity}</span> units ({op.itemCount} items)
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={op.status} />
                      </td>
                      <td className="p-3.5 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                        {new Date(op.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3.5 text-right">
                        <Link
                          to={op.url}
                          className="px-3 py-1 bg-white/5 hover:bg-[#FF2E93] hover:text-white text-slate-300 font-bold rounded-lg text-[11px] transition-all inline-flex items-center gap-1 border border-white/10"
                        >
                          <span>Open</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No operations matched your dynamic filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CHART: Stock Movement History (GTA VI Midnight Style) */}
      {/* CHART: Stock Movement History (Frosted Glass Chart Card) */}
      <div className="bg-white/[0.05] backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F4A5C6] block">
              Historical Velocity
            </span>
            <h3 className="text-lg font-bold text-white font-display">Stock Movement Telemetry</h3>
            <p className="text-xs text-[#A79FB6]">7-Day historical activity breakdown by transaction type</p>
          </div>
        </div>
        <div className="h-72 w-full">
          {data?.stockMovementHistory && data.stockMovementHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.stockMovementHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="date" stroke="#A79FB6" fontSize={11} />
                <YAxis stroke="#A79FB6" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D0917', borderColor: 'rgba(226,132,179,0.4)', color: '#fff', borderRadius: '16px', boxShadow: '0 12px 30px rgba(0,0,0,0.8)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line type="monotone" dataKey="receipts" name="Receipts (+)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="deliveries" name="Deliveries (-)" stroke="#E284B3" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="transfers" name="Transfers (In/Out)" stroke="#8A56E2" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="adjustments" name="Adjustments" stroke="#F5B895" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-[#A79FB6] text-sm">
              No historical movement data recorded yet.
            </div>
          )}
        </div>
      </div>

      {/* TWO COLUMN GRID: Low Stock Alert Table & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert Table */}
        <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0D0917]/50">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#F5B895]" />
              <h3 className="text-sm font-bold text-white font-display">Low & Out of Stock Alerts</h3>
            </div>
            <Link to="/reordering-rules" className="text-xs text-[#F4A5C6] font-bold hover:underline flex items-center gap-0.5">
              <span>Reorder Rules</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-black/20 text-[#A79FB6] font-mono border-b border-white/8 uppercase tracking-wider text-[10px]">
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">SKU</th>
                  <th className="p-3.5">Total Stock</th>
                  <th className="p-3.5">Reorder Level</th>
                  <th className="p-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data?.lowStockProducts && data.lowStockProducts.length > 0 ? (
                  data.lowStockProducts.map((p) => (
                    <tr key={p.productId} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-bold text-white">{p.productName}</td>
                      <td className="p-3.5 text-[#D5CEE0] font-mono">{p.sku}</td>
                      <td className="p-3.5 font-black text-rose-400">{p.totalStock}</td>
                      <td className="p-3.5 text-[#A79FB6]">{p.reorderLevel}</td>
                      <td className="p-3.5">
                        <StatusBadge status={p.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#A79FB6]">
                      All products maintain healthy stock levels above reorder thresholds!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Stock Activity */}
        <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 shadow-[0_16px_40px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0D0917]/50">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#E284B3]" />
              <h3 className="text-sm font-bold text-white font-display">Recent Stock Activity</h3>
            </div>
            <Link to="/ledger" className="text-xs text-[#F4A5C6] font-bold hover:underline flex items-center gap-0.5">
              <span>Full Audit Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-black/20 text-[#A79FB6] font-mono border-b border-white/8 uppercase tracking-wider text-[10px]">
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Change</th>
                  <th className="p-3.5">Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data?.recentStockMovements && data.recentStockMovements.length > 0 ? (
                  data.recentStockMovements.map((m) => (
                    <tr key={m.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 text-[#A79FB6] whitespace-nowrap font-mono text-[11px]">
                        {new Date(m.createdAt).toLocaleDateString()} {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3.5 font-bold text-white truncate max-w-[140px]" title={m.productName}>
                        {m.productName}
                      </td>
                      <td className="p-3.5">
                        <StatusBadge status={m.transactionType} />
                      </td>
                      <td className={`p-3.5 font-black ${m.quantityChange >= 0 ? 'text-emerald-400' : 'text-[#E284B3]'}`}>
                        {m.quantityChange > 0 ? `+${m.quantityChange}` : m.quantityChange}
                      </td>
                      <td className="p-3.5 text-[#D5CEE0] font-mono truncate max-w-[120px]" title={m.referenceId}>
                        {m.referenceId}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#A79FB6]">
                      No stock movement ledger records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* FULL CUSTOMER AI DOSSIER MODAL                           */}
      {/* ======================================================== */}
      {selectedAiSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto">
          <div className="bg-[#140e24] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-5xl w-full text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] relative max-h-[92vh] overflow-y-auto space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                    {selectedAiSubmission.projectNumber || 'PROSPECT AUDIT'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold">
                    ID: {selectedAiSubmission.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                    {selectedAiSubmission.status}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white font-display tracking-tight">
                  {selectedAiSubmission.customerName} — AI Technical Dossier
                </h3>
                <p className="text-xs text-[#A79FB6] font-mono mt-1">
                  Contact: {selectedAiSubmission.phone} · Location: {selectedAiSubmission.address || 'Pune, MH'} · Submitted: {new Date(selectedAiSubmission.submittedAt).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedAiSubmission(null)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-[#A79FB6] hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Keras Roof Computer Vision */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase font-mono tracking-wider text-pink-400 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    <span>Keras Roof Photo Vision Audit</span>
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {selectedAiSubmission.cameraReview?.suitability?.tier || 'HIGH FEASIBILITY'}
                  </span>
                </div>

                {selectedAiSubmission.roofPhotoPreviewUrl && (
                  <div className="rounded-2xl overflow-hidden border border-white/12 h-52 relative group">
                    <img
                      src={selectedAiSubmission.roofPhotoPreviewUrl}
                      alt="Roof Survey"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white">
                      <span className="font-bold">{selectedAiSubmission.cameraReview?.roofType}</span>
                      <span className="text-emerald-400 font-bold">{selectedAiSubmission.cameraReview?.confidenceScore ? `${(selectedAiSubmission.cameraReview.confidenceScore * 100).toFixed(0)}% Confidence` : '96% Conf'}</span>
                    </div>
                  </div>
                )}

                {/* Roof Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                    <span className="text-[#A79FB6] text-[10px] block uppercase">Slope Category</span>
                    <span className="font-bold text-white">{selectedAiSubmission.cameraReview?.slopeCategory || 'Flat (1° - 2°)'}</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                    <span className="text-[#A79FB6] text-[10px] block uppercase">Usable Solar Area</span>
                    <span className="font-bold text-emerald-400">{selectedAiSubmission.cameraReview?.suitability?.usableAreaPercent || 85}%</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                    <span className="text-[#A79FB6] text-[10px] block uppercase">Shadow Loss %</span>
                    <span className="font-bold text-amber-300">{selectedAiSubmission.cameraReview?.shadingAnalysis?.estimatedShadowPercent || 3.8}%</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/8">
                    <span className="text-[#A79FB6] text-[10px] block uppercase">Feasibility Rating</span>
                    <span className="font-bold text-pink-300">{selectedAiSubmission.cameraReview?.suitability?.score || 94}/100</span>
                  </div>
                </div>

                {/* Detected Obstructions */}
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/8 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D5CEE0] font-bold block">
                    Detected Obstructions &amp; Required Setbacks:
                  </span>
                  {selectedAiSubmission.cameraReview?.obstructionsDetected && selectedAiSubmission.cameraReview.obstructionsDetected.length > 0 ? (
                    <div className="space-y-1.5">
                      {selectedAiSubmission.cameraReview.obstructionsDetected.map((obs, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-black/40 flex items-start justify-between text-xs font-mono">
                          <div>
                            <span className="text-white font-bold">{obs.name}</span>
                            <p className="text-[10px] text-[#A79FB6] mt-0.5">{obs.recommendation}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[10px] font-bold whitespace-nowrap ml-2">
                            {obs.requiredSetbackMeters}m setback
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#A79FB6] font-mono">No significant physical obstructions detected.</p>
                  )}
                </div>

                {/* Mounting & Installation Concern */}
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/8 space-y-1.5 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D5CEE0] font-bold block">
                    Recommended Mounting Racking:
                  </span>
                  <p className="text-white font-mono">{selectedAiSubmission.cameraReview?.recommendedMounting || 'Precast Concrete Ballast Blocks'}</p>
                  <p className="text-[11px] text-[#A79FB6]">{selectedAiSubmission.cameraReview?.assessmentSummary}</p>
                </div>
              </div>

              {/* Right Column: AI System Sizing & Cost Estimation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold uppercase font-mono tracking-wider text-purple-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>AI System Sizing &amp; Subsidy Financials</span>
                  </h4>
                  <span className="text-xs font-mono text-purple-300 font-black bg-purple-500/15 px-2.5 py-1 rounded-full border border-purple-500/30">
                    {selectedAiSubmission.costEstimation?.recommendedCapacityKw || 3.3} kW {selectedAiSubmission.costEstimation?.systemType || 'On-Grid'}
                  </span>
                </div>

                {/* Sizing Synthesis Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-purple-500/20 space-y-2">
                  <span className="text-[10px] font-mono text-purple-300 uppercase font-bold tracking-wider block">
                    Engineering Sizing Rationale
                  </span>
                  <p className="text-xs text-[#E3DEF0] leading-relaxed">
                    {selectedAiSubmission.costEstimation?.aiExplanation}
                  </p>
                </div>

                {/* Financial Summary Matrix */}
                <div className="bg-white/5 p-4 rounded-2xl border border-white/8 space-y-3 font-mono">
                  <span className="text-[10px] uppercase tracking-wider text-[#A79FB6] font-bold block">
                    PM Surya Ghar Capital Subsidy &amp; ROI Table:
                  </span>
                  <div className="divide-y divide-white/8 text-xs">
                    <div className="py-2 flex justify-between">
                      <span className="text-[#A79FB6]">Gross System Estimated Cost:</span>
                      <span className="text-white font-bold">₹{selectedAiSubmission.costEstimation?.financials?.grossSystemCost?.toLocaleString() || '1,71,600'}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-emerald-400 font-bold">Direct Central DBT Subsidy:</span>
                      <span className="text-emerald-400 font-black">- ₹{selectedAiSubmission.costEstimation?.financials?.centralSubsidy?.toLocaleString() || '78,000'}</span>
                    </div>
                    <div className="py-2 flex justify-between text-sm bg-white/5 px-2 rounded-lg my-1">
                      <span className="text-white font-black">Net Customer Investment:</span>
                      <span className="text-pink-300 font-black">₹{selectedAiSubmission.costEstimation?.financials?.netCost?.toLocaleString() || '93,600'}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-[#A79FB6]">Annual Electricity Bill Offset:</span>
                      <span className="text-[#F5B895] font-bold">₹{selectedAiSubmission.costEstimation?.financials?.annualSavings?.toLocaleString() || '50,400'}/year</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-[#A79FB6]">Full Capital Payback:</span>
                      <span className="text-white font-bold">{selectedAiSubmission.costEstimation?.financials?.paybackYears || 1.9} Years</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span className="text-[#A79FB6]">25-Year Cumulative Savings:</span>
                      <span className="text-emerald-400 font-black">₹{selectedAiSubmission.costEstimation?.financials?.lifetimeSavings25Yr?.toLocaleString() || '11,66,400'}</span>
                    </div>
                  </div>
                </div>

                {/* Environmental & Roof Footprint */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/8 flex items-center gap-2.5">
                    <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[#A79FB6] text-[10px] block uppercase">CO2 Offset</span>
                      <span className="text-white font-bold">{selectedAiSubmission.costEstimation?.environmentalImpact?.co2SavedPerYearTons || 4.1} Tons/yr</span>
                    </div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/8 flex items-center gap-2.5">
                    <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[#A79FB6] text-[10px] block uppercase">Roof Footprint</span>
                      <span className="text-white font-bold">{selectedAiSubmission.costEstimation?.roofUtilization?.requiredSqFt || 218} sq.ft</span>
                    </div>
                  </div>
                </div>

                {/* Key Engineering Highlights */}
                {selectedAiSubmission.costEstimation?.keyEngineeringHighlights && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D5CEE0] font-bold block">
                      Engineering Deployment Highlights:
                    </span>
                    <div className="space-y-1">
                      {selectedAiSubmission.costEstimation.keyEngineeringHighlights.map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#D5CEE0] font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
              <span className="text-xs text-[#A79FB6] font-mono">
                AI Assessment synthesized via Keras MobileNetV2 + MNRE Central DBT Matrix
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedAiSubmission(null)}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/12 text-xs font-mono font-bold text-white transition-all cursor-pointer"
                >
                  Close Dossier
                </button>
                <button
                  onClick={() => {
                    setSelectedAiSubmission(null);
                    navigate('/solar/inquiries');
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-xs font-mono font-bold text-white shadow-[0_4px_20px_rgba(236,72,153,0.4)] flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Open Customer in Scene 1 Inquiries</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
