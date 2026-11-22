import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, AlertCircle, ShieldCheck, UserCheck, ArrowUpRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@stocksense.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (uEmail: string, uPass: string) => {
    setEmail(uEmail);
    setPassword(uPass);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Dual Portal Switcher Tabs (Frosted Glass Segmented Pill) */}
      <div className="flex p-1.5 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/10">
        <button
          type="button"
          className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider bg-white/[0.18] text-white rounded-full shadow-md backdrop-blur-md cursor-default"
        >
          01 // ADMIN ERP
        </button>
        <Link
          to="/portal/login"
          className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#A79FB6] hover:text-white rounded-full transition-colors"
        >
          02 // CLIENT VAULT ↗
        </Link>
      </div>

      {/* Main Admin Card */}
      <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div>
          <span className="text-[10px] font-bold text-[#F4A5C6] uppercase tracking-[2px] block">
            AUTHENTICATED GATEWAY
          </span>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-1">
            Sign In to Command Center
          </h2>
          <p className="text-xs text-[#A79FB6] mt-1 font-light">
            Access Solar ERP (6 Scenes), Warehouse Dispatch &amp; Stock Ledger
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-2xl flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E284B3]" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#F4A5C6] uppercase tracking-wider mb-1.5">
              OPERATOR EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A79FB6] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@stocksense.com"
                className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/15 rounded-2xl text-white text-xs placeholder:text-[#7E758D] focus:border-[#E284B3] focus:ring-2 focus:ring-[#E284B3]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-semibold text-[#F4A5C6] uppercase tracking-wider">
                PASSWORD
              </label>
              <Link to="/forgot-password" className="text-[10px] text-[#B668D8] hover:text-[#F4A5C6] transition-colors uppercase">
                Reset Key?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A79FB6] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/15 rounded-2xl text-white text-xs placeholder:text-[#7E758D] focus:border-[#E284B3] focus:ring-2 focus:ring-[#E284B3]/20 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:opacity-95 text-white font-bold text-xs uppercase tracking-[2px] rounded-full shadow-[0_6px_24px_rgba(226,132,179,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                AUTHENTICATING OPERATOR...
              </span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>SIGN IN TO COMMAND CENTER ↗</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Accounts */}
        <div className="pt-4 border-t border-white/10 space-y-2.5">
          <p className="text-[10px] font-semibold text-[#A79FB6] uppercase tracking-wider text-center">
            QUICK DEMO ROLES (SEED DATA):
          </p>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            {[
              { label: 'ADMIN DIRECTOR', email: 'admin@stocksense.com', pass: 'Admin@123' },
              { label: 'INV. MANAGER', email: 'manager@stocksense.com', pass: 'Manager@123' },
              { label: 'CREW STAFF', email: 'staff@stocksense.com', pass: 'Staff@123' }
            ].map((roleItem, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickFill(roleItem.email, roleItem.pass)}
                className={`py-2 px-1 text-center rounded-xl border transition-all ${
                  email === roleItem.email
                    ? 'bg-[#E284B3]/25 border-[#E284B3] text-white font-bold shadow-[0_0_12px_rgba(226,132,179,0.3)]'
                    : 'bg-white/[0.04] border-white/10 text-[#A79FB6] hover:border-white/25 hover:text-white'
                }`}
              >
                {roleItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Return to Home */}
      <div className="text-center text-xs">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[#A79FB6] hover:text-white transition-colors">
          <span>RETURN TO HOME LANDING</span>
          <span>↗</span>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
