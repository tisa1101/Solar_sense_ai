import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserRole } from '../types';
import { ShieldCheck, Sun, Moon, ExternalLink, Activity } from 'lucide-react';
import { NotificationBell } from './NotificationBell';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const getPageTitle = (path: string) => {
    if (path.startsWith('/solar/inquiries')) return 'Scene 1: Rooftop Inquiries & Feasibility Survey';
    if (path.startsWith('/solar/packages')) return 'Scene 2: Ready Solar Kits & Automated BOM Builder';
    if (path.startsWith('/solar/dispatch')) return 'Scene 3: Warehouse Dispatch & Serial Number Clocks';
    if (path.startsWith('/solar/jobsheet')) return 'Scene 4: Field Crew Mobile Sheet & Digital Signature';
    if (path.startsWith('/solar/support')) return 'Scene 5: Rainy Season Breakdown & ₹0 Warranty Desk';
    if (path.startsWith('/solar/director')) return "Scene 6: Director's Month-End Financial P&L";
    if (path.startsWith('/dashboard')) return 'Leonida Operations & Inventory Matrix';
    if (path.startsWith('/products/new')) return 'Create Product Catalog Item';
    if (path.startsWith('/products')) return 'Product Catalog Matrix';
    if (path.startsWith('/inventory')) return 'Stock Level Matrix';
    if (path.startsWith('/receipts/new')) return 'Create Stock Receipt (PO)';
    if (path.startsWith('/receipts')) return 'Stock Receipts Ledger';
    if (path.startsWith('/deliveries/new')) return 'Create Stock Delivery';
    if (path.startsWith('/deliveries')) return 'Stock Deliveries';
    if (path.startsWith('/transfers/new')) return 'Create Warehouse Transfer';
    if (path.startsWith('/transfers')) return 'Internal Transfers';
    if (path.startsWith('/adjustments/new')) return 'New Stock Adjustment';
    if (path.startsWith('/adjustments')) return 'Stock Adjustments';
    if (path.startsWith('/ledger')) return 'Audit Stock Ledger';
    if (path.startsWith('/warehouses')) return 'Warehouse Management';
    if (path.startsWith('/settings')) return 'System Settings';
    if (path.startsWith('/suppliers')) return 'Supplier Directory';
    if (path.startsWith('/reports')) return 'Executive Reports';
    if (path.startsWith('/analytics')) return 'Predictive Analytics';
    if (path.startsWith('/notifications')) return 'System Notifications';
    return 'Leonida Solar Matrix';
  };

  const roleName = user?.role === UserRole.Admin
    ? 'Admin Director'
    : user?.role === UserRole.InventoryManager
    ? 'Inventory Manager'
    : 'Warehouse Staff';

  return (
    <header className="h-18 bg-[#0D0917]/75 backdrop-blur-3xl border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E284B3] shadow-[0_0_12px_#E284B3] animate-ping" />
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>{getPageTitle(location.pathname)}</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        {/* Customer Portal Shortcut */}
        <Link
          to="/portal"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(226,132,179,0.35)] hover:shadow-[0_6px_28px_rgba(226,132,179,0.5)] transition-all hover:scale-105"
        >
          <Sun className="w-3.5 h-3.5 fill-white" />
          <span>Customer Portal</span>
          <ExternalLink className="w-3 h-3" />
        </Link>

        {/* Status Badge for System Health */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/[0.06] rounded-full border border-white/15 text-xs font-mono font-bold text-[#F5B895] shadow-[0_0_12px_rgba(245,184,149,0.15)]">
          <Activity className="w-3.5 h-3.5 animate-pulse text-[#E284B3]" />
          <span>GRID SYNC 100%</span>
        </div>

        {/* User Role Badge */}
        <div className="px-3 py-1 bg-[#E284B3]/15 border border-[#E284B3]/35 rounded-full text-xs font-mono font-bold text-[#F4A5C6]">
          {roleName}
        </div>

        {/* Notification Dropdown Trigger */}
        <NotificationBell />

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-[#A79FB6] hover:text-white rounded-full hover:bg-white/10 transition-colors border border-white/10"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F5B895]" /> : <Moon className="w-4 h-4 text-[#B668D8]" />}
        </button>
      </div>
    </header>
  );
};
export default Navbar;
