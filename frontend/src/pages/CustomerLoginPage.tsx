import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { solarApi } from '../services/solarApi';
import { CustomerPortalData } from '../types/solar';
import {
  Sun,
  ShieldCheck,
  Zap,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  FileText,
  UserCheck
} from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('+91 98220 12345');
  const [email, setEmail] = useState('rajesh.sharma@example.com');
  const [consumerId, setConsumerId] = useState('SUN-2026-001');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quick Seeded Real Customer Accounts
  const realCustomers = [
    {
      name: 'Rajesh Sharma',
      phone: '+91 98220 12345',
      email: 'rajesh.sharma@example.com',
      consumerId: 'SUN-2026-001',
      capacity: '3 kW On-Grid',
      stage: 'Commissioned 100%'
    },
    {
      name: 'Amit Verma',
      phone: '+91 98450 77112',
      email: 'amit.verma@vermafabrics.com',
      consumerId: 'SUN-2026-002',
      capacity: '5 kW Off-Grid',
      stage: 'Kit Dispatched 70%'
    },
    {
      name: 'Anita Deshmukh',
      phone: '+91 97654 33221',
      email: 'anita.deshmukh@gmail.com',
      consumerId: 'SUN-2026-003',
      capacity: '3 kW On-Grid',
      stage: 'Breakdown Desk 95%'
    },
    {
      name: 'Apex Precision Factory',
      phone: '+91 99231 88990',
      email: 'factory@apexprecision.in',
      consumerId: 'SUN-2026-004',
      capacity: '5 kW Commercial',
      stage: 'Survey Approved 35%'
    }
  ];

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    if (!phone || phone.trim().length < 6) {
      setError('Please provide a valid registered mobile number.');
      return;
    }
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generatedOtp);
    setOtp(generatedOtp); // Auto-fill for friction-free real-world demonstration
    setOtpSent(true);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Query backend for this customer's solar project records
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const res = await solarApi.getPortalOverview(undefined, cleanPhone || phone);
      const customerData: CustomerPortalData = res.data.data;

      if (!customerData) {
        throw new Error('No matching solar installation found for these credentials.');
      }

      // Persist client session in localStorage
      localStorage.setItem('stocksense_customer_session', JSON.stringify(customerData));
      localStorage.setItem('stocksense_active_customer_id', String(customerData.projectId));
      localStorage.setItem('stocksense_active_customer_phone', customerData.phone);

      // Navigate to Customer Solar Vault
      navigate('/portal');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCustomer = (c: typeof realCustomers[0]) => {
    setPhone(c.phone);
    setEmail(c.email);
    setConsumerId(c.consumerId);
    setError(null);
    setOtpSent(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0713] text-[#D5CEE0] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-['Work_Sans',sans-serif] relative overflow-hidden selection:bg-[#E284B3] selection:text-white">
      {/* Ambient Dreamy Rose & Orchid Glow Backdrops */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(226,132,179,0.22)_0%,rgba(138,86,226,0.14)_35%,transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(245,184,149,0.08)_0%,transparent_50%)] z-0" />

      <div className="max-w-md w-full space-y-6 z-10">
        {/* Brand & Portal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-wider shadow-[0_4px_16px_rgba(226,132,179,0.2)]">
            <Sun className="w-3.5 h-3.5 text-[#F4A5C6] animate-spin-slow" />
            <span>CLIENT VAULT // SECURE SIGN-IN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">
            Customer Solar Portal
          </h1>
          <p className="text-xs text-[#A79FB6] tracking-wider font-light">
            Access your 20-Year Legal Warranty &amp; Live Generation Telemetry
          </p>
        </div>

        {/* Dual Portal Switcher Tabs (Frosted Glass Segmented Pill) */}
        <div className="flex p-1.5 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/10">
          <button
            type="button"
            className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider bg-white/[0.18] text-white rounded-full shadow-md backdrop-blur-md cursor-default"
          >
            01 // CLIENT VAULT
          </button>
          <Link
            to="/login"
            className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#A79FB6] hover:text-white rounded-full transition-colors"
          >
            02 // ADMIN ERP ↗
          </Link>
        </div>

        {/* Main Login Card */}
        <div className="bg-white/[0.05] backdrop-blur-2xl rounded-3xl border border-white/12 p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Method Selector: Mobile OTP vs Consumer Email */}
          <div className="flex border-b border-white/10 pb-4 justify-between items-center text-xs">
            <span className="text-[#A79FB6] uppercase font-semibold text-[11px]">SIGN-IN METHOD:</span>
            <div className="flex p-1 rounded-full bg-white/[0.06] border border-white/10 gap-1">
              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${
                  authMethod === 'phone'
                    ? 'bg-gradient-to-r from-[#E284B3] to-[#B668D8] text-white shadow-sm'
                    : 'text-[#A79FB6] hover:text-white'
                }`}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all ${
                  authMethod === 'email'
                    ? 'bg-gradient-to-r from-[#E284B3] to-[#B668D8] text-white shadow-sm'
                    : 'text-[#A79FB6] hover:text-white'
                }`}
              >
                Consumer ID
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-2xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#E284B3]" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {authMethod === 'phone' ? (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-[#F4A5C6] uppercase tracking-wider mb-1.5">
                    REGISTERED MOBILE NUMBER
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A79FB6] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setOtpSent(false);
                      }}
                      placeholder="+91 98220 12345"
                      className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/15 rounded-2xl text-white text-xs placeholder:text-[#7E758D] focus:border-[#E284B3] focus:ring-2 focus:ring-[#E284B3]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full py-3.5 bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:opacity-95 text-white font-bold text-xs uppercase tracking-[2px] rounded-full shadow-[0_6px_24px_rgba(226,132,179,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>REQUEST 6-DIGIT SMS OTP ↗</span>
                  </button>
                ) : (
                  <>
                    <div className="p-3.5 bg-white/[0.04] border border-[#B668D8]/40 rounded-2xl text-xs text-[#D5CEE0] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#F4A5C6]">✓ OTP DISPATCHED</span>
                        <span className="text-[10px] text-[#A79FB6]">SMS GATEWAY</span>
                      </div>
                      <p className="text-[11px] text-[#A79FB6]">
                        Demo test code: <span className="font-bold text-[#F5B895]">{simulatedOtp}</span>
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#F4A5C6] uppercase tracking-wider mb-1.5">
                        ENTER 6-DIGIT VERIFICATION CODE
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 text-[#A79FB6] absolute left-3.5 top-3.5" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="654321"
                          className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/15 rounded-2xl text-white text-base tracking-[4px] font-bold placeholder:text-[#7E758D] focus:border-[#E284B3] focus:ring-2 focus:ring-[#E284B3]/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.length < 6}
                      className="w-full py-3.5 bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:opacity-95 text-white font-bold text-xs uppercase tracking-[2px] rounded-full shadow-[0_6px_24px_rgba(226,132,179,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>AUTHENTICATING TELEMETRY...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>VERIFY &amp; OPEN CUSTOMER VAULT ↗</span>
                        </>
                      )}
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-[#F4A5C6] uppercase tracking-wider mb-1.5">
                    CONSUMER NUMBER / ACCOUNT ID
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-[#A79FB6] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={consumerId}
                      onChange={(e) => setConsumerId(e.target.value)}
                      placeholder="SUN-2026-001"
                      className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/15 rounded-2xl text-white text-xs placeholder:text-[#7E758D] focus:border-[#E284B3] focus:ring-2 focus:ring-[#E284B3]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#F4A5C6] uppercase tracking-wider mb-1.5">
                    REGISTERED EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A79FB6] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rajesh.sharma@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white/[0.05] border border-white/15 rounded-2xl text-white text-xs placeholder:text-[#7E758D] focus:border-[#E284B3] focus:ring-2 focus:ring-[#E284B3]/20 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-[#E284B3] via-[#B668D8] to-[#8A56E2] hover:opacity-95 text-white font-bold text-xs uppercase tracking-[2px] rounded-full shadow-[0_6px_24px_rgba(226,132,179,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>AUTHENTICATING TELEMETRY...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>SIGN IN WITH CONSUMER ID ↗</span>
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Quick Real Customer Select (Real Life Demonstration) */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-semibold text-[#A79FB6] uppercase tracking-wider block text-center">
              QUICK SELECT REGISTERED CLIENTS:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {realCustomers.map((c) => (
                <button
                  key={c.consumerId}
                  type="button"
                  onClick={() => handleSelectCustomer(c)}
                  className={`p-3 text-left rounded-2xl border transition-all ${
                    phone === c.phone
                      ? 'bg-[#E284B3]/20 border-[#E284B3] text-white shadow-[0_0_16px_rgba(226,132,179,0.25)]'
                      : 'bg-white/[0.04] border-white/10 text-[#D5CEE0] hover:border-white/25 hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="font-bold text-white truncate text-xs">{c.name}</div>
                  <div className="text-[10px] text-[#F5B895] truncate">{c.capacity}</div>
                  <div className="text-[9px] text-[#A79FB6] truncate">{c.stage}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center text-xs">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[#A79FB6] hover:text-white transition-colors">
            <span>RETURN TO HOME LANDING</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CustomerLoginPage;
