import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { FloatingCopilot } from '../components/FloatingCopilot';
import { LightingCursor } from '../components/ui/LightingCursor';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#0A0713] text-[#D5CEE0] transition-colors relative selection:bg-[#E284B3] selection:text-white font-['Work_Sans',sans-serif]">
      {/* Volumetric Cursor */}
      <LightingCursor />

      {/* Atmospheric Dreamy Rose & Orchid Glow Backdrops (From Reference Theme) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(226,132,179,0.18)_0%,rgba(138,86,226,0.12)_35%,transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_90%_45%,rgba(245,184,149,0.07)_0%,transparent_50%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_80%,rgba(138,86,226,0.08)_0%,transparent_50%)] z-0" />

      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen z-10">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative bg-transparent custom-scrollbar">
          <Outlet />
        </main>
      </div>
      <FloatingCopilot />
    </div>
  );
};
export default MainLayout;
