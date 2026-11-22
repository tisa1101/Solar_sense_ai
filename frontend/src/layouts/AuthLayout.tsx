import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CompanyLogo } from '../components/CompanyLogo';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#07040E] text-[#D5CEE0] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-['Work_Sans',sans-serif] relative overflow-hidden selection:bg-[#FF2E93] selection:text-white">
      {/* Ambient Vice City Glow Backdrops */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(255,46,147,0.22)_0%,rgba(121,40,202,0.14)_35%,transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(255,122,0,0.08)_0%,transparent_50%)] z-0" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center z-10 space-y-3">
        <Link to="/" className="inline-flex items-center justify-center">
          <CompanyLogo size="xl" subtitle="ENTERPRISE COMMAND CENTER" />
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
