import React, { useEffect, useState } from 'react';
import { solarApi } from '../services/solarApi';
import { SolarSupportTicket, WarrantyLookupResult } from '../types/solar';
import { LoadingSpinner } from '../components/CommonState';
import {
  Wrench,
  Search,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Clock,
  RotateCcw,
  User,
  Zap,
  HelpCircle
} from 'lucide-react';

export const SolarSupportPage: React.FC = () => {
  const [tickets, setTickets] = useState<SolarSupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  // Instant Serial / Phone Search
  const [searchQuery, setSearchQuery] = useState('INV-SP-3K-71203'); // Anita Deshmukh sample
  const [searchResult, setSearchResult] = useState<WarrantyLookupResult | null>(null);
  const [searching, setSearching] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await solarApi.getTickets();
      setTickets(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSearchWarranty = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    try {
      setSearching(true);
      const res = await solarApi.lookupWarranty(searchQuery.trim());
      setSearchResult(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleResolveTicket = async (ticketId: number) => {
    const notes = prompt('Enter resolution notes:', 'Replaced surge protector card on inverter. Tested power output: 3.1 kW. Customer confirmed generation.');
    if (!notes) return;
    try {
      await solarApi.resolveTicket(ticketId, notes);
      fetchTickets();
    } catch (err) {
      alert('Failed to resolve ticket');
    }
  };

  if (loading) return <LoadingSpinner message="Loading rainy season breakdown tickets & warranty registry..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Wrench className="w-6 h-6 text-rose-500" />
          <span>Scene 5: The Rainy Season Breakdown (Support & Warranty Serial Lookup)</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          18 months later, pouring rain and inverter displays fault code. Support finds customer & inverter serial within seconds. If in warranty: repair costs ₹0. If not: auto-billed.
        </p>
      </div>

      {/* Instant Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Instant Serial Number & Customer Phone Warranty Lookup</span>
            </h3>
            <p className="text-xs text-slate-500">Find customer profile and warranty eligibility in &lt;1 second</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setSearchQuery('INV-SP-3K-71203'); }}
              className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono"
            >
              Anita Deshmukh S/N
            </button>
            <button
              onClick={() => { setSearchQuery('INV-SP-3K-88492'); }}
              className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono"
            >
              Rajesh Sharma S/N
            </button>
          </div>
        </div>

        <form onSubmit={handleSearchWarranty} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Inverter/Battery Serial Number (e.g. INV-SP-3K-71203) or Phone..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {searching ? 'Checking...' : 'Check Warranty'}
          </button>
        </form>

        {/* Search Result Box */}
        {searchResult && (
          <div className={`p-4 rounded-xl border transition-all text-xs space-y-3 ${
            searchResult.found && searchResult.isValidWarranty
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {searchResult.isValidWarranty ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                )}
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">
                    {searchResult.equipmentName || searchResult.serialNumber}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">Serial: {searchResult.serialNumber}</p>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-2.5 py-1 rounded text-xs font-black uppercase ${
                  searchResult.isValidWarranty
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}>
                  {searchResult.isValidWarranty ? 'UNDER ACTIVE WARRANTY' : 'OUT OF WARRANTY'}
                </span>
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 mt-1">
                  Customer Billing: <strong className={searchResult.isValidWarranty ? 'text-emerald-600' : 'text-rose-600'}>
                    ₹{searchResult.repairCostIfClaimed}
                  </strong>
                </p>
              </div>
            </div>

            {searchResult.found && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px]">
                <div>
                  <span className="text-slate-400 block font-semibold">Homeowner:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{searchResult.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Phone:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{searchResult.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Installation Date:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {searchResult.installationDate ? new Date(searchResult.installationDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Remaining Term:</span>
                  <span className="font-bold text-emerald-600">{searchResult.daysRemaining}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active Service Tickets Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Active Breakdown Complaints & Service Tickets
          </h3>
          <span className="text-xs text-slate-500 font-medium">{tickets.length} Tickets</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <th className="p-3.5">Ticket #</th>
                <th className="p-3.5">Customer & Phone</th>
                <th className="p-3.5">Equipment & S/N</th>
                <th className="p-3.5">Fault Code</th>
                <th className="p-3.5">Warranty Status</th>
                <th className="p-3.5">Billed</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {tickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {t.ticketNumber}
                  </td>
                  <td className="p-3.5">
                    <p className="font-bold text-slate-900 dark:text-white">{t.customerName}</p>
                    <p className="text-[11px] text-slate-500">{t.customerPhone}</p>
                  </td>
                  <td className="p-3.5">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{t.equipmentName}</p>
                    <p className="font-mono text-[10px] text-slate-400">{t.serialNumber}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      {t.faultCode}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {t.isUnderWarranty ? (
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Valid Warranty</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-600">Expired</span>
                    )}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                    ₹{t.billedAmount}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      t.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {t.status !== 'Resolved' && (
                      <button
                        onClick={() => handleResolveTicket(t.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded transition-colors"
                      >
                        Resolve & Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
