import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Sun, Layers } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0713] text-[#D5CEE0] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-['Work_Sans',sans-serif] relative overflow-hidden selection:bg-[#E284B3] selection:text-white">
      {/* Ambient Dreamy Rose & Orchid Glow Backdrops */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(226,132,179,0.22)_0%,rgba(138,86,226,0.14)_35%,transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(245,184,149,0.08)_0%,transparent_50%)] z-0" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-3">
        <Link to="/" className="inline-flex items-center justify-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E284B3] via-[#B668D8] to-[#8A56E2] flex items-center justify-center text-white shadow-[0_0_24px_rgba(226,132,179,0.45)] font-bold text-sm tracking-wider group-hover:scale-105 transition-transform">
            SS
          </div>
          <span className="font-bold text-xl tracking-[2px] text-white uppercase">
            STOCKSENSE
          </span>
        </Link>
        <p className="text-xs text-[#A79FB6] uppercase tracking-[2px]">
          Enterprise Solar Suite & Command Center
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
