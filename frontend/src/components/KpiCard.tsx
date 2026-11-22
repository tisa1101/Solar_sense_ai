import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'amber' | 'rose' | 'purple' | 'indigo' | 'slate';
  description?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon: Icon, color, description }) => {
  const colorMap = {
    blue: 'bg-[#B668D8]/15 text-[#D875B7] border-[#B668D8]/30 shadow-[0_0_20px_rgba(182,104,216,0.2)]',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    amber: 'bg-[#F5B895]/15 text-[#F5B895] border-[#F5B895]/30 shadow-[0_0_20px_rgba(245,184,149,0.2)]',
    rose: 'bg-[#E284B3]/15 text-[#F4A5C6] border-[#E284B3]/35 shadow-[0_0_20px_rgba(226,132,179,0.25)]',
    purple: 'bg-[#8A56E2]/15 text-[#B668D8] border-[#8A56E2]/30 shadow-[0_0_20px_rgba(138,86,226,0.2)]',
    indigo: 'bg-[#E284B3]/15 text-[#E284B3] border-[#E284B3]/30 shadow-[0_0_20px_rgba(226,132,179,0.2)]',
    slate: 'bg-white/10 text-slate-200 border-white/15',
  };

  return (
    <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.45)] hover:border-pink-300/30 hover:shadow-[0_16px_48px_rgba(226,132,179,0.18)] transition-all duration-300 group hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold text-[#A79FB6] uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#F4A5C6] transition-colors">
            {value}
          </h3>
          {description && <p className="text-xs text-[#8E84A3] mt-1.5 font-light">{description}</p>}
        </div>
        <div className={`p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default KpiCard;
