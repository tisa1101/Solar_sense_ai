import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { solarApi } from '../services/solarApi';
import { CustomerPortalData } from '../types/solar';
import { CompanyLogo } from '../components/CompanyLogo';
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
  UserCheck,
  Eye,
  EyeOff,
  Sparkles,
  UserPlus,
  LogIn
} from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Mode: Sign In vs Sign Up
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Method: Email / Gmail vs Phone OTP
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Form Fields
  const [name, setName] = useState('Rajesh Sharma');
  const [email, setEmail] = useState('rajesh.sharma@gmail.com');
  const [phone, setPhone] = useState('+91 98220 12345');
  const [password, setPassword] = useState('Solar@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [consumerId, setConsumerId] = useState('SUN-2026-001');

  // Phone OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Seeded Verified Customers for Instant Test
  const realCustomers = [
    {
      name: 'Rajesh Sharma',
      phone: '+91 98220 12345',
      email: 'rajesh.sharma@gmail.com',
      consumerId: 'SUN-2026-001',
      capacity: '3 kW On-Grid',
      stage: 'Commissioned 100%'
    },
    {
      name: 'Amit Verma',
      phone: '+91 98450 77112',
      email: 'amit.verma@gmail.com',
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
      email: 'factory.apex@gmail.com',
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

  const executeLogin = async (targetPhone: string, targetEmail: string) => {
    setLoading(true);
    setError(null);

    try {
      const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
      const res = await solarApi.getPortalOverview(undefined, cleanPhone || targetPhone);
      const customerData: CustomerPortalData = res.data.data;

      if (!customerData) {
        throw new Error('No matching solar installation found for these credentials.');
      }

      // Persist client session
      localStorage.setItem('stocksense_customer_session', JSON.stringify(customerData));
      localStorage.setItem('stocksense_active_customer_id', String(customerData.projectId));
      localStorage.setItem('stocksense_active_customer_phone', customerData.phone);
      localStorage.setItem('stocksense_active_customer_email', targetEmail);

      navigate('/portal');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'email') {
      if (!email || !password) {
        setError('Please enter both Gmail / Email address and password.');
        return;
      }
      await executeLogin(phone, email);
    } else {
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      if (!otp || otp.length < 6) {
        setError('Please enter the 6-digit verification code.');
        return;
      }
      await executeLogin(phone, email);
    }
  };

  const handleGoogleSignIn = () => {
    // Instant Google OAuth Mockup
    setLoading(true);
    setError(null);
    setEmail('rajesh.sharma@gmail.com');
    setSuccessMsg('Google Account verified! Accessing Customer Solar Vault...');
    setTimeout(() => {
      executeLogin('+91 98220 12345', 'rajesh.sharma@gmail.com');
    }, 700);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Register inquiry / new client in backend
      await solarApi.createInquiry({
        customerName: name,
        phone,
        email,
        address: 'Leonida Metro Area, FL',
        systemCapacityKw: 4,
        systemType: 1,
        monthlyElectricityBill: 4500,
        shadowFreeRoofSqFt: 400,
        notes: 'Signed up via Customer Solar Portal'
      });

      setSuccessMsg('Account registered successfully! Redirecting to Solar Vault...');
      setTimeout(() => {
        executeLogin(phone, email);
      }, 800);
    } catch {
      // Fallback: log in anyway
      executeLogin(phone, email);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCustomer = (c: typeof realCustomers[0]) => {
    setName(c.name);
    setPhone(c.phone);
    setEmail(c.email);
    setConsumerId(c.consumerId);
    setError(null);
    setOtpSent(false);
    setSuccessMsg(null);
  };

  return (
    <div className="min-h-screen bg-[#06040C] text-[#D5CEE0] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-['Work_Sans',sans-serif] relative overflow-hidden selection:bg-[#FF2E93] selection:text-white">
      {/* Vice City Ambient Sunset Atmosphere */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_-10%,rgba(255,46,147,0.22)_0%,rgba(121,40,202,0.14)_35%,transparent_70%)] z-0" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_80%,rgba(255,122,0,0.08)_0%,transparent_50%)] z-0" />

      <div className="max-w-md w-full space-y-6 z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center justify-center">
            <CompanyLogo size="lg" subtitle="CUSTOMER VAULT // SECURE SIGN-IN" />
          </Link>
          <p className="text-xs text-[#A79FB6] tracking-wider font-mono">
            Access your 20-Year Legal Warranty &amp; Live Generation Telemetry
          </p>
        </div>

        {/* Dual Mode Switcher: Sign In vs Sign Up */}
        <div className="flex p-1 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => {
              setAuthMode('signin');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'signin'
                ? 'bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white shadow-lg'
                : 'text-[#A79FB6] hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Customer Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setError(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'signup'
                ? 'bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white shadow-lg'
                : 'text-[#A79FB6] hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Main Card Container */}
        <div className="bg-[#100A1C]/90 backdrop-blur-2xl rounded-3xl border border-white/12 p-6 sm:p-8 space-y-6 shadow-[0_25px_90px_rgba(0,0,0,0.9)]">
          {/* Quick Google Sign In Button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-white text-gray-900 font-semibold text-xs flex items-center justify-center gap-3 hover:bg-gray-100 transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{authMode === 'signin' ? 'Continue with Google / Gmail' : 'Sign up with Google'}</span>
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-mono">
                <span className="bg-[#100A1C] px-3 text-[#7E758D]">Or authenticate with</span>
              </div>
            </div>
          </div>

          {/* Sub-tabs: Email / Gmail vs Phone OTP (For Sign In) */}
          {authMode === 'signin' && (
            <div className="grid grid-cols-2 gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setAuthMethod('email')}
                className={`py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMethod === 'email'
                    ? 'bg-white/[0.1] text-white border border-white/15'
                    : 'text-[#A79FB6] hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-[#FF2E93]" />
                <span>Gmail / Email</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMethod('phone')}
                className={`py-2 text-xs font-mono font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  authMethod === 'phone'
                    ? 'bg-white/[0.1] text-white border border-white/15'
                    : 'text-[#A79FB6] hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#FF7A00]" />
                <span>Phone &amp; OTP</span>
              </button>
            </div>
          )}

          {/* Alerts */}
          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-xl flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#FF2E93]" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 rounded-xl flex items-center gap-2 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {authMode === 'signin' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {authMethod === 'email' ? (
                <>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1.5">
                      Gmail / Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A79FB6]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="homeowner@gmail.com"
                        className="ti-input w-full text-xs pl-9 pr-3 py-2.5 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A79FB6]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="ti-input w-full text-xs pl-9 pr-10 py-2.5 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A79FB6] hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1.5">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A79FB6]" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98220 12345"
                        className="ti-input w-full text-xs pl-9 pr-24 py-2.5 rounded-xl font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#FF2E93] text-[10px] font-mono font-bold uppercase transition-colors"
                      >
                        {otpSent ? 'Resend' : 'Send OTP'}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0]">
                        6-Digit Verification Code
                      </label>
                      <div className="relative">
                        <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A79FB6]" />
                        <input
                          type="text"
                          maxLength={6}
                          required
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="123456"
                          className="ti-input w-full text-sm pl-9 pr-3 py-2.5 rounded-xl font-mono tracking-[4px]"
                        />
                      </div>
                      {simulatedOtp && (
                        <p className="text-[10px] text-emerald-400 font-mono">
                          Simulated SMS code: {simulatedOtp} (Auto-filled)
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(255,46,147,0.4)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Verifying Credentials...' : 'Sign In to Solar Vault ✦'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* SIGN UP FORM */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                  Full Homeowner Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="ti-input w-full text-xs px-3 py-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                  Gmail / Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena.vance@gmail.com"
                  className="ti-input w-full text-xs px-3 py-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98220 12345"
                  className="ti-input w-full text-xs px-3 py-2.5 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="ti-input w-full text-xs px-3 py-2.5 rounded-xl"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(255,46,147,0.4)] cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                <span>{loading ? 'Creating Profile...' : 'Complete Sign Up & Launch Vault ✦'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Quick-Switch Verified Customer Accounts */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#7E758D] uppercase tracking-wider block">
              1-Click Demo Profiles (All 4 Verified Customers)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {realCustomers.map((c) => (
                <button
                  key={c.consumerId}
                  type="button"
                  onClick={() => handleSelectCustomer(c)}
                  className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-left transition-all cursor-pointer"
                >
                  <div className="font-bold text-white text-[11px] truncate">{c.name}</div>
                  <div className="text-[9px] text-[#A79FB6] font-mono">{c.capacity}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Portal Switcher Link to Admin */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-xs text-[#A79FB6] hover:text-white transition-colors font-mono inline-flex items-center gap-1"
          >
            <span>Switch to Admin &amp; Staff Login</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF7A00]" />
          </Link>
        </div>
      </div>
    </div>
  );
};
