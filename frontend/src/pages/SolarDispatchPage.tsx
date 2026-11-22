import React, { useEffect, useState } from 'react';
import { solarApi } from '../services/solarApi';
import { CustomerPortalData, DispatchRecord } from '../types/solar';
import { LoadingSpinner } from '../components/CommonState';
import { BarcodeScannerModal } from '../components/BarcodeScannerModal';
import {
  Truck,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Plus,
  Box,
  Clock,
  ScanLine
} from 'lucide-react';

export const SolarDispatchPage: React.FC = () => {
  const [projects, setProjects] = useState<CustomerPortalData[]>([]);
  const [dispatches, setDispatches] = useState<DispatchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(102); // Amit Verma
  const [vehicleNumber, setVehicleNumber] = useState('MH-12-TR-9421 (Tata Ace 1.5T)');
  const [driverTechnician, setDriverTechnician] = useState('Suresh Jadhav (Lead Tech)');

  // Scanned Serials for the Dispatch
  const [inverterSerial, setInverterSerial] = useState('INV-OG-5K-99014');
  const [batterySerial, setBatterySerial] = useState('BAT-LFP-5K-0192A');
  const [panelBatch, setPanelBatch] = useState('MOD-SP-540-BATCH-B14');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [activeScanField, setActiveScanField] = useState<'inverter' | 'battery' | 'panel'>('inverter');
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projRes, dispRes] = await Promise.all([
        solarApi.getProjects(),
        solarApi.getDispatches(),
      ]);
      setProjects(projRes.data.data);
      setDispatches(dispRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenScanner = (field: 'inverter' | 'battery' | 'panel') => {
    setActiveScanField(field);
    setIsScannerOpen(true);
  };

  const handleScanResult = (code: string) => {
    if (activeScanField === 'inverter') setInverterSerial(code);
    else if (activeScanField === 'battery') setBatterySerial(code);
    else setPanelBatch(code);
  };

  const handleExecuteDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serializedItems = [
        { itemName: 'Solar Inverter (String/Hybrid)', category: 'Inverter', serialNumber: inverterSerial, warrantyYears: 2 },
        { itemName: 'Lithium Storage Battery / Controller', category: 'Battery Storage', serialNumber: batterySerial, warrantyYears: 2 },
        { itemName: 'Solar PV Modules (Mono-PERC Tier 1)', category: 'Solar Panels', serialNumber: panelBatch, warrantyYears: 20 },
      ];

      const res = await solarApi.createDispatch({
        projectId: selectedProjectId,
        assignedVehicle: vehicleNumber,
        driverTechnician,
        serializedItems,
      });

      setDispatchSuccess(`Dispatch ${res.data.data.dispatchNumber} logged! Truck dispatched. Warranty clock started: Inverter (2 Yrs), Battery (2 Yrs), Panels (20 Yrs).`);
      fetchData();
    } catch (err) {
      alert('Dispatch creation failed.');
    }
  };

  if (loading) return <LoadingSpinner message="Loading warehouse dispatch bay & serial tracking..." />;

  const selectedProj = projects.find((p) => p.projectId === selectedProjectId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Truck className="w-6 h-6 text-purple-600" />
          <span>Scene 3: Dispatch Day & Serial Numbers (Auto-Warranty Clock)</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Truck about to leave with ₹1,50,000+ worth of inverters and batteries. Every unit has its own serial number scanned before leaving. The moment delivery is done, the warranty clock starts by itself!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dispatch Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-purple-600" />
              <span>Warehouse Loading & Barcode Scan Form</span>
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              Ready for Truck Loading
            </span>
          </div>

          <form onSubmit={handleExecuteDispatch} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                Select Customer Order
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
              >
                {projects.map((p) => (
                  <option key={p.projectId} value={p.projectId}>
                    {p.projectNumber} • {p.customerName} ({p.systemCapacityKw} kW - {p.address})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Assigned Delivery Vehicle
                </label>
                <input
                  type="text"
                  required
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold uppercase text-[10px] mb-1">
                  Driver / Crew Lead
                </label>
                <input
                  type="text"
                  required
                  value={driverTechnician}
                  onChange={(e) => setDriverTechnician(e.target.value)}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Serial Scans */}
            <div className="space-y-3 pt-2">
              <span className="block text-[11px] font-bold uppercase text-purple-600 dark:text-purple-400">
                Mandatory Serial Number Scans
              </span>

              {/* Inverter */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    Solar Inverter S/N (2-Year Auto Warranty)
                  </span>
                  <input
                    type="text"
                    required
                    value={inverterSerial}
                    onChange={(e) => setInverterSerial(e.target.value)}
                    className="w-full bg-transparent font-mono font-bold text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenScanner('inverter')}
                  className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-1 font-semibold text-[11px]"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Scan</span>
                </button>
              </div>

              {/* Battery */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    Battery / Charge Controller S/N (2-Year Auto Warranty)
                  </span>
                  <input
                    type="text"
                    required
                    value={batterySerial}
                    onChange={(e) => setBatterySerial(e.target.value)}
                    className="w-full bg-transparent font-mono font-bold text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenScanner('battery')}
                  className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-1 font-semibold text-[11px]"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Scan</span>
                </button>
              </div>

              {/* Panel Batch */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    Solar Modules Batch ID (20-Year Auto Warranty)
                  </span>
                  <input
                    type="text"
                    required
                    value={panelBatch}
                    onChange={(e) => setPanelBatch(e.target.value)}
                    className="w-full bg-transparent font-mono font-bold text-slate-900 dark:text-white text-xs focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleOpenScanner('panel')}
                  className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-1 font-semibold text-[11px]"
                >
                  <ScanLine className="w-3.5 h-3.5" />
                  <span>Scan</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Validate Dispatch & Start Auto-Warranty Clock</span>
            </button>

            {dispatchSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 font-medium">
                {dispatchSuccess}
              </div>
            )}
          </form>
        </div>

        {/* Real-time Warranty Clocks Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Automated Warranty Clocks (Zero Manual Registers)</span>
            </h4>
            <p className="text-xs text-slate-500">
              When dispatched, the warranty clocks start by themselves with accurate timestamps.
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs">
                <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-200 mb-1">
                  <span>Solar Panels Clock</span>
                  <span>20 Years</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Tier-1 performance guarantee valid until <strong>November 2046</strong>.
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs">
                <div className="flex items-center justify-between font-bold text-blue-900 dark:text-blue-200 mb-1">
                  <span>Inverter Clock</span>
                  <span>2 Years</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Free parts & labor replacement valid until <strong>November 2028</strong>.
                </p>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 rounded-xl text-xs">
                <div className="flex items-center justify-between font-bold text-purple-900 dark:text-purple-200 mb-1">
                  <span>Battery Storage Clock</span>
                  <span>2 Years</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  LFP battery cells & BMS guarantee valid until <strong>November 2028</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleScanResult}
        title={`Scan Serial Number (${activeScanField.toUpperCase()})`}
        description="Align camera with the hardware barcode or QR label on the packaging."
      />
    </div>
  );
};
