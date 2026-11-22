import React, { useEffect, useState } from 'react';
import { solarApi } from '../services/solarApi';
import { SolarPackageTemplate, SolarSystemType } from '../types/solar';
import { LoadingSpinner } from '../components/CommonState';
import {
  Sun,
  Layers,
  Zap,
  Battery,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Truck,
  Box,
  FileText,
  BadgePercent
} from 'lucide-react';

export const SolarPackagesPage: React.FC = () => {
  const [packages, setPackages] = useState<SolarPackageTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<SolarPackageTemplate | null>(null);
  const [activeType, setActiveType] = useState<SolarSystemType>(SolarSystemType.OnGrid);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await solarApi.getPackages();
      setPackages(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedPackage(res.data.data[2]); // Default 3 kW On-Grid (SunPower flagship)
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const filtered = packages.filter((p) => p.systemType === activeType);

  if (loading) return <LoadingSpinner message="Calculating ready-kit templates and automated BOM..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Scene 2: Ready Kit Templates, Automated BOM & Crew Schedule</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Customer says yes to 3 kW system. The quote and exact list of parts follows on its own: panels, inverter, stands, switches, wires. Nobody has to remember every small part.
          </p>
        </div>

        {/* Toggle On-Grid vs Off-Grid */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setActiveType(SolarSystemType.OnGrid)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeType === SolarSystemType.OnGrid
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>On-Grid (1 kW - 5 kW)</span>
          </button>
          <button
            onClick={() => setActiveType(SolarSystemType.OffGrid)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeType === SolarSystemType.OffGrid
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Battery className="w-3.5 h-3.5" />
            <span>Off-Grid (With Battery)</span>
          </button>
        </div>
      </div>

      {/* Grid of 1kW - 5kW Systems */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {filtered.map((pkg) => {
          const isSelected = selectedPackage?.id === pkg.id;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {pkg.capacityKw} kW System
                </span>
                {pkg.capacityKw === 3 && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-indigo-600 text-white">
                    POPULAR
                  </span>
                )}
              </div>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                ₹{pkg.basePrice.toLocaleString()}
              </p>
              {pkg.centralSubsidyAmount > 0 && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  -₹{pkg.centralSubsidyAmount.toLocaleString()} Subsidy
                </p>
              )}
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[10px] text-slate-500 space-y-0.5">
                <p>⚡ ~{pkg.capacityKw * 4} kWh / day</p>
                <p>📋 {pkg.billOfMaterials.length} Parts Auto-Calculated</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Package Detailed Bill of Materials (BOM) */}
      {selectedPackage && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Box className="w-5 h-5 text-indigo-600" />
                  <span>Automated Kit Bill of Materials: {selectedPackage.name}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Warehouse packing pick-list generated without manual entry. Includes safety earthing, connectors and switches.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
                BOM-{selectedPackage.capacityKw}KW-{activeType === SolarSystemType.OnGrid ? 'ONG' : 'OFFG'}
              </span>
            </div>

            {/* BOM Parts Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/40 text-slate-500 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3">Component / Description</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Unit Cost</th>
                    <th className="p-3">Total Cost</th>
                    <th className="p-3">Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {selectedPackage.billOfMaterials.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="p-3 font-semibold text-slate-900 dark:text-white">
                        {item.itemName}
                        <span className="block text-[10px] font-mono text-slate-400">{item.sku}</span>
                      </td>
                      <td className="p-3 text-slate-500">{item.category}</td>
                      <td className="p-3 font-black text-slate-900 dark:text-white">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-3 text-slate-500">₹{item.unitCost.toLocaleString()}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">₹{item.totalCost.toLocaleString()}</td>
                      <td className="p-3">
                        {item.isSerialized ? (
                          <span className="text-[10px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-200">
                            Serialized S/N
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Batch Stock</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Workflow Automation Sidebar (Warehouse Pack & Crew Dispatch) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 space-y-4 shadow-2xs">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Automated Workflow Trigger</span>
              </h4>
              <p className="text-xs text-slate-500">
                Once customer order is confirmed, the warehouse automatically receives the packing slip and the 15-technician crew schedule updates automatically without phone calls.
              </p>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Hardware BOM Cost:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    ₹{selectedPackage.billOfMaterials.reduce((acc, i) => acc + i.totalCost, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Contract MRP:</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{selectedPackage.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-emerald-600">
                  <span>Central Subsidy:</span>
                  <span className="font-bold">-₹{selectedPackage.centralSubsidyAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex items-center justify-between text-sm font-bold">
                  <span>Net Customer Price:</span>
                  <span className="text-indigo-600 dark:text-indigo-400">₹{selectedPackage.netCustomerPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Packing pick-list for ${selectedPackage.name} generated & sent to Central Warehouse queue!`)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Generate Warehouse Packing Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
