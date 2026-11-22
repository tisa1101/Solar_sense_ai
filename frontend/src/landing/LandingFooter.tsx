import React from 'react';
import { Flame, Globe, Code2, Share2, ArrowRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'Solar Architecture',
    links: [
      'DC Power Optimizers',
      'Energy Hub Inverters',
      '10 kWh Home Battery',
      'SafeDC™ 1V Auto-Shutdown',
      'Smart EV Solar Boost',
      'DISCOM Net-Metering'
    ],
  },
  {
    title: 'Installations',
    links: [
      'Vice City Residential',
      'Leonida Commercial 2 MW',
      'Bifacial TOPCon PV',
      'Rooftop Feasibility LiDAR',
      'Mobile Job Sheet Signing',
      'Thermal Drone IR Scans'
    ],
  },
  {
    title: 'Compliance & Grants',
    links: ['PM Surya Ghar Grant', 'MNRE Technical Standard', 'Aadhaar DBT Credit', '20-Year Serial Ledger', '₹0 Monsoon Support', 'DISCOM Tariff Offset'],
  },
  {
    title: 'Command Gateways',
    links: ['Customer Solar Vault', 'Staff & Installer ERP', 'Director P&L Month-End', 'Warehouse BOM Kitting', 'Barcode Serial Dispatch', 'System Health Monitor'],
  },
];

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#04050B] border-t border-white/5 pt-20 pb-12 relative overflow-hidden font-sans">
      {/* Vice City Ambient Horizon Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(255,46,147,0.5) 0%, rgba(255,122,0,0.3) 50%, transparent 75%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16 text-left">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,46,147,0.4)]"
                style={{ background: 'linear-gradient(135deg, #FF2E93 0%, #FF7A00 100%)' }}
              >
                <Flame className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  SOLAR<span className="text-vice-gradient">SENSE</span>
                </span>
                <span className="text-[9px] text-[#FF7A00] uppercase font-mono font-bold tracking-widest">
                  LEONIDA CLEAN POWER ECOSYSTEM
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Next-generation clean energy management, module-level DC power optimization, and full-lifecycle solar installation ERP for the Vice City metropolitan region.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/tisa1101/Stock_Sense_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#FF2E93] hover:bg-[#FF2E93]/10 transition-all"
                title="GitHub Repository"
              >
                <Code2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#FF7A00] hover:bg-[#FF7A00]/10 transition-all"
                title="Global Grid"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-all"
                title="Community"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav Columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="col-span-1">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 pb-1 border-b border-white/10">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-[#FF2E93] text-xs transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <p className="text-slate-500">
            © 2026 SolarSense / Leonida Energy Inc. Built for Grand Theft Auto VI Cinematic Challenge • All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
              <span className="text-slate-300 font-bold">SafeDC™ Active • Leonida Microgrid Synchronized</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default LandingFooter;
