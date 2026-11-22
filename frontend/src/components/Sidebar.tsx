import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, Boxes, ArrowDownLeft, ArrowUpRight, ArrowLeftRight,
  SlidersHorizontal, History, Building2, Settings, User as UserIcon, LogOut,
  ChevronDown, ChevronRight, Layers, TrendingUp, ShieldAlert, Bot,
  Truck, FileBarChart2, BarChart3, Bell, Menu, X, Sun, Compass, Wrench, QrCode, ClipboardCheck, LifeBuoy, DollarSign, ExternalLink, Zap, HardHat
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { CompanyLogo } from './CompanyLogo';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const [solarOpen, setSolarOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [operationsOpen, setOperationsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleName = user?.role === UserRole.Admin
    ? 'Admin'
    : user?.role === UserRole.InventoryManager
    ? 'Inventory Manager'
    : 'Warehouse Staff';

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-3.5 left-4 z-50 p-2.5 bg-[#12182A] text-white rounded-xl border border-white/10 shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5 text-[#FF2E93]" /> : <Menu className="w-5 h-5 text-[#FF7A00]" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 z-40 w-68 bg-[#0D0917]/85 backdrop-blur-3xl text-[#D5CEE0] flex flex-col h-screen border-r border-white/10 shadow-2xl select-none transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Brand Header with GTA VI Solar Crest */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <CompanyLogo size="md" subtitle="ENTERPRISE SUITE" />
          <span className="text-[9px] bg-[#FF2E93]/20 text-[#FF2E93] px-2 py-0.5 rounded-full font-mono font-bold border border-[#FF2E93]/30">
            PRO
          </span>
        </div>

        {/* Navigation Scroll */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1 custom-scrollbar">
          {/* Main Dashboard */}
          <NavLink 
            to="/dashboard" 
            onClick={() => setMobileOpen(false)} 
            className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isActive 
                ? 'bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] text-white shadow-[0_4px_24px_rgba(226,132,179,0.35)]' 
                : 'hover:bg-white/[0.06] hover:text-white text-[#A79FB6]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-white" /> 
            <span>Command Center</span>
          </NavLink>

          {/* SunPower Solar Operations (All 6 Scenes) */}
          <div className="pt-3">
            <button 
              onClick={() => setSolarOpen(!solarOpen)} 
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-mono font-black text-[#F4A5C6] uppercase tracking-wider hover:text-white transition-colors bg-white/[0.04] rounded-2xl border border-white/10 mb-1.5"
            >
              <span className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#F5B895] animate-spin-slow" />
                Solar ERP (6 Scenes)
              </span>
              {solarOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {solarOpen && (
              <div className="space-y-1 pl-1 pt-1">
                <NavLink 
                  to="/solar/inquiries" 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#E284B3]/25 to-[#8A56E2]/25 text-white font-bold border-l-2 border-[#E284B3] shadow-[0_0_16px_rgba(226,132,179,0.2)]' 
                      : 'hover:bg-white/[0.05] hover:text-white text-[#A79FB6]'
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#F5B895]" /> <span>1. Rooftop & Surveys</span>
                </NavLink>
                <NavLink 
                  to="/solar/packages" 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#E284B3]/25 to-[#8A56E2]/25 text-white font-bold border-l-2 border-[#E284B3] shadow-[0_0_16px_rgba(226,132,179,0.2)]' 
                      : 'hover:bg-white/[0.05] hover:text-white text-[#A79FB6]'
                  }`}
                >
                  <Wrench className="w-4 h-4 text-[#F5B895]" /> <span>2. Kits & Auto-BOM</span>
                </NavLink>
                <NavLink 
                  to="/solar/dispatch" 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#E284B3]/25 to-[#8A56E2]/25 text-white font-bold border-l-2 border-[#E284B3] shadow-[0_0_16px_rgba(226,132,179,0.2)]' 
                      : 'hover:bg-white/[0.05] hover:text-white text-[#A79FB6]'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-[#F5B895]" /> <span>3. Dispatch & Serials</span>
                </NavLink>
                <NavLink 
                  to="/solar/jobsheet" 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#E284B3]/25 to-[#8A56E2]/25 text-white font-bold border-l-2 border-[#E284B3] shadow-[0_0_16px_rgba(226,132,179,0.2)]' 
                      : 'hover:bg-white/[0.05] hover:text-white text-[#A79FB6]'
                  }`}
                >
                  <ClipboardCheck className="w-4 h-4 text-[#F5B895]" /> <span>4. Crew Job Sheet</span>
                </NavLink>
                <NavLink 
                  to="/solar/support" 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#E284B3]/25 to-[#8A56E2]/25 text-white font-bold border-l-2 border-[#E284B3] shadow-[0_0_16px_rgba(226,132,179,0.2)]' 
                      : 'hover:bg-white/[0.05] hover:text-white text-[#A79FB6]'
                  }`}
                >
                  <LifeBuoy className="w-4 h-4 text-[#F5B895]" /> <span>5. Breakdown Desk</span>
                </NavLink>
                <NavLink 
                  to="/solar/director" 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#E284B3]/25 to-[#8A56E2]/25 text-white font-bold border-l-2 border-[#E284B3] shadow-[0_0_16px_rgba(226,132,179,0.2)]' 
                      : 'hover:bg-white/[0.05] hover:text-white text-[#A79FB6]'
                  }`}
                >
                  <DollarSign className="w-4 h-4 text-[#F5B895]" /> <span>6. Director Month-End</span>
                </NavLink>

                {/* Dedicated Workers & Field Crew Portal (Role-governed) */}
                <NavLink 
                  to="/workers" 
                  onClick={() => setMobileOpen(false)} 
                  className={({ isActive }) => `flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/35 hover:border-pink-400 transition-all mt-2 shadow-[0_0_18px_rgba(236,72,153,0.2)] group ${isActive ? 'ring-1 ring-pink-400 font-black' : ''}`}
                >
                  <span className="flex items-center gap-2 font-mono text-[11px]">
                    <HardHat className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>Workers Portal</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-pink-500/30 text-pink-200 font-mono">ROLE</span>
                </NavLink>
                
                {/* Direct Link to Customer Solar Vault */}
                <NavLink 
                  to="/portal" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#E284B3]/20 via-[#B668D8]/20 to-[#8A56E2]/20 border border-[#E284B3]/40 hover:border-[#E284B3] transition-all mt-2.5 shadow-[0_0_18px_rgba(226,132,179,0.2)] group"
                >
                  <span className="flex items-center gap-2 font-mono text-[11px]">
                    <Sun className="w-3.5 h-3.5 text-[#F4A5C6] group-hover:rotate-45 transition-transform" /> Customer Solar Portal
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#F4A5C6]" />
                </NavLink>
              </div>
            )}
          </div>

          {/* Inventory Accordion */}
          <div>
            <button 
              onClick={() => setInventoryOpen(!inventoryOpen)} 
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider hover:text-white transition-colors mt-3 mb-1"
            >
              <span>Inventory</span>
              {inventoryOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {inventoryOpen && (
              <div className="space-y-1 pl-2">
                <NavLink to="/products" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold shadow-[0_0_12px_rgba(255,46,147,0.3)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <Package className="w-4 h-4 text-slate-400" /> <span>Products</span>
                </NavLink>
                <NavLink to="/inventory" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold shadow-[0_0_12px_rgba(255,46,147,0.3)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <Boxes className="w-4 h-4 text-slate-400" /> <span>Stock Overview</span>
                </NavLink>
                <NavLink to="/reordering-rules" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold shadow-[0_0_12px_rgba(255,46,147,0.3)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <SlidersHorizontal className="w-4 h-4 text-slate-400" /> <span>Reordering Rules</span>
                </NavLink>
                <NavLink to="/suppliers" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold shadow-[0_0_12px_rgba(255,46,147,0.3)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <Truck className="w-4 h-4 text-slate-400" /> <span>Suppliers</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Operations Accordion */}
          <div>
            <button 
              onClick={() => setOperationsOpen(!operationsOpen)} 
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider hover:text-white transition-colors mt-3 mb-1"
            >
              <span>Operations</span>
              {operationsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {operationsOpen && (
              <div className="space-y-1 pl-2">
                <NavLink to="/receipts" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <ArrowDownLeft className="w-4 h-4 text-emerald-400" /> <span>Receipts</span>
                </NavLink>
                <NavLink to="/deliveries" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <ArrowUpRight className="w-4 h-4 text-[#FF7A00]" /> <span>Deliveries</span>
                </NavLink>
                <NavLink to="/transfers" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <ArrowLeftRight className="w-4 h-4 text-[#00F0FF]" /> <span>Transfers</span>
                </NavLink>
                <NavLink to="/adjustments" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <SlidersHorizontal className="w-4 h-4 text-amber-400" /> <span>Adjustments</span>
                </NavLink>
              </div>
            )}
          </div>

          <div className="pt-2">
            <NavLink to="/ledger" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${isActive ? 'bg-[#FF2E93] text-white font-bold shadow-[0_0_15px_rgba(255,46,147,0.3)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
              <History className="w-4 h-4 text-amber-400" /> <span>Stock Ledger</span>
            </NavLink>
          </div>

          {/* Reports & Analytics */}
          <div>
            <button 
              onClick={() => setReportsOpen(!reportsOpen)} 
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider hover:text-white transition-colors mt-2 mb-1"
            >
              <span>Reports & Analytics</span>
              {reportsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
            {reportsOpen && (
              <div className="space-y-1 pl-2">
                <NavLink to="/reports" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <FileBarChart2 className="w-4 h-4 text-slate-400" /> <span>Reports</span>
                </NavLink>
                <NavLink to="/analytics" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
                  <BarChart3 className="w-4 h-4 text-slate-400" /> <span>Analytics</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* AI Intelligence */}
          <div className="pt-2">
            <div className="px-3 py-2 text-[11px] font-mono font-bold text-[#00F0FF] uppercase tracking-wider mb-1 flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-[#00F0FF]" /> AI Neural Matrix
            </div>
            <NavLink to="/forecast" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
              <TrendingUp className="w-4 h-4 text-[#00F0FF]" /> <span>Demand Forecast</span>
            </NavLink>
            <NavLink to="/anomalies" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
              <ShieldAlert className="w-4 h-4 text-[#00F0FF]" /> <span>Anomaly Detection</span>
            </NavLink>
            <NavLink to="/copilot" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 mt-1 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-[#00F0FF]/20 text-[#00F0FF] font-bold border border-[#00F0FF]/40 shadow-[0_0_12px_rgba(0,240,255,0.2)]' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
              <Bot className="w-4 h-4 text-[#00F0FF]" /> <span>AI Copilot</span>
            </NavLink>
          </div>

          <div className="pt-2 space-y-1">
            <NavLink to="/warehouses" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
              <Building2 className="w-4 h-4 text-slate-400" /> <span>Warehouses</span>
            </NavLink>
            <NavLink to="/notifications" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
              <Bell className="w-4 h-4 text-slate-400" /> <span>Notifications</span>
            </NavLink>
            <NavLink to="/settings" onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isActive ? 'bg-[#FF2E93] text-white font-bold' : 'hover:bg-white/5 hover:text-white text-slate-400'}`}>
              <Settings className="w-4 h-4 text-slate-400" /> <span>Settings</span>
            </NavLink>
          </div>
        </nav>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-white/10 bg-[#060812]/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF2E93] to-[#FF7A00] flex items-center justify-center text-white font-black shrink-0 shadow-[0_0_10px_rgba(255,46,147,0.4)]">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">{user?.name || 'Operator'}</p>
                <p className="text-[10px] text-[#FF7A00] font-mono uppercase tracking-wider truncate">{roleName} • Leonida HQ</p>
              </div>
            </div>
            <button 
              onClick={logout} 
              title="Logout" 
              className="p-2 text-slate-400 hover:text-[#FF2E93] hover:bg-white/5 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
