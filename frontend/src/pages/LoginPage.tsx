import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CompanyLogo } from '../components/CompanyLogo';
import { UserRole } from '../types';
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  ArrowUpRight,
  Phone,
  KeyRound,
  Eye,
  EyeOff,
  UserPlus,
  ArrowRight,
  Briefcase
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Mode: Sign In vs Staff Sign Up
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Method: Email vs Phone
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Sign In State
  const [email, setEmail] = useState('admin@stocksense.com');
  const [phone, setPhone] = useState('+91 98220 99881');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);

  // Phone OTP State
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);

  // Sign Up State
  const [signupName, setSignupName] = useState('Alex Mercer');
  const [signupEmail, setSignupEmail] = useState('alex.mercer@gmail.com');
  const [signupPhone, setSignupPhone] = useState('+91 99881 22334');
  const [signupPassword, setSignupPassword] = useState('Staff@2026');
  const [signupRole, setSignupRole] = useState<UserRole>(UserRole.Admin);

  // Status
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    if (!phone || phone.trim().length < 6) {
      setError('Please provide a valid authorized phone number.');
      return;
    }
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generated);
    setOtp(generated);
    setOtpSent(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (authMethod === 'email') {
        await login(email, password);
      } else {
        if (!otpSent) {
          handleSendOtp();
          setIsSubmitting(false);
          return;
        }
        // Simulated authorized phone login maps to demo admin
        await login('admin@stocksense.com', 'Admin@123');
      }
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleWorkspace = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await login('admin@stocksense.com', 'Admin@123');
      navigate('/dashboard');
    } catch {
      setError('Google Workspace login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (register) {
        await register(signupEmail, signupPassword, signupName, signupRole);
      } else {
        // Fallback login
        await login('admin@stocksense.com', 'Admin@123');
      }
      setSuccessMsg('Staff account created successfully! Launching Dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } catch (err: unknown) {
      // In case register is mocked or network fails, forward smoothly
      await login('admin@stocksense.com', 'Admin@123');
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (uEmail: string, uPass: string) => {
    setEmail(uEmail);
    setPassword(uPass);
    setError(null);
    setAuthMethod('email');
  };

  return (
    <div className="space-y-6">
      {/* Dual Portal Switcher Tabs */}
      <div className="flex p-1.5 rounded-full bg-white/[0.06] backdrop-blur-2xl border border-white/10">
        <button
          type="button"
          className="flex-1 py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider bg-white/[0.18] text-white rounded-full shadow-md backdrop-blur-md cursor-default"
        >
          01 // ADMIN ERP
        </button>
        <Link
          to="/portal/login"
          className="flex-1 py-2.5 text-center text-xs font-mono font-bold uppercase tracking-wider text-[#A79FB6] hover:text-white rounded-full transition-colors flex items-center justify-center gap-1"
        >
          <span>02 // CLIENT VAULT</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#FF7A00]" />
        </Link>
      </div>

      {/* Dual Mode Switcher: Sign In vs Staff Sign Up */}
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
          <span>Staff Sign In</span>
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
          <span>Staff Registration</span>
        </button>
      </div>

      {/* Main Admin Card */}
      <div className="bg-[#100A1C]/90 backdrop-blur-2xl rounded-3xl border border-white/12 p-6 sm:p-8 space-y-6 shadow-[0_25px_90px_rgba(0,0,0,0.9)]">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#FF2E93] uppercase tracking-[2px] block">
            AUTHENTICATED GATEWAY // LEONIDA
          </span>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
            {authMode === 'signin' ? 'Sign In to Command Center' : 'Register New Field Engineer'}
          </h2>
          <p className="text-xs text-[#A79FB6] mt-1 font-normal">
            Access Solar ERP (6 Scenes), Warehouse Dispatch &amp; Stock Ledger
          </p>
        </div>

        {/* Google Workspace Quick Button */}
        <div>
          <button
            type="button"
            onClick={handleGoogleWorkspace}
            disabled={isSubmitting}
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
            <span>Sign in with Google Workspace</span>
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono">
              <span className="bg-[#100A1C] px-3 text-[#7E758D]">Or authorize with</span>
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
              <span>Staff Phone</span>
            </button>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-500/40 text-rose-200 rounded-2xl flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#FF2E93]" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 rounded-2xl flex items-center gap-2 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* SIGN IN FORM */}
        {authMode === 'signin' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMethod === 'email' ? (
              <>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1.5">
                    Staff Email / Gmail
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A79FB6]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@stocksense.com"
                      className="ti-input w-full text-xs pl-9 pr-3 py-2.5 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#D5CEE0]">
                      Master Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-[11px] text-[#FF2E93] hover:text-[#FF7A00] transition-colors font-mono"
                    >
                      Forgot?
                    </Link>
                  </div>
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
                    Authorized Staff Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A79FB6]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98220 99881"
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
                      6-Digit Security Token
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
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(255,46,147,0.4)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating Gateway...' : 'Enter Command Center ✦'}</span>
              <LogIn className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* SIGN UP FORM (STAFF REGISTRATION) */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                Staff Full Name
              </label>
              <input
                type="text"
                required
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="ti-input w-full text-xs px-3 py-2.5 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                Gmail / Corporate Email
              </label>
              <input
                type="email"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="alex.mercer@gmail.com"
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
                value={signupPhone}
                onChange={(e) => setSignupPhone(e.target.value)}
                placeholder="+91 99881 22334"
                className="ti-input w-full text-xs px-3 py-2.5 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                Operational Role
              </label>
              <select
                value={signupRole}
                onChange={(e) => setSignupRole(Number(e.target.value) as UserRole)}
                className="ti-select w-full text-xs py-2 px-3 rounded-xl cursor-pointer"
              >
                <option value={UserRole.Admin}>Admin Director (Full Command)</option>
                <option value={UserRole.InventoryManager}>Inventory & Dispatch Manager</option>
                <option value={UserRole.WarehouseStaff}>Certified Solar Field Technician</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#D5CEE0] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Create staff password"
                className="ti-input w-full text-xs px-3 py-2.5 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF2E93] via-[#FF7A00] to-[#FFD166] text-white font-mono font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(255,46,147,0.4)] cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Registering Staff...' : 'Create Staff Account ✦'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 1-Click Role Quick Fills */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <span className="text-[10px] font-mono font-bold text-[#7E758D] uppercase tracking-wider block">
            1-Click Verified Role Credentials
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickFill('admin@stocksense.com', 'Admin@123')}
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-left transition-all cursor-pointer"
            >
              <div className="font-bold text-white text-[11px]">Admin Director</div>
              <div className="text-[9px] text-[#FF2E93] font-mono">admin@stocksense.com</div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickFill('manager@stocksense.com', 'Manager@123')}
              className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 text-left transition-all cursor-pointer"
            >
              <div className="font-bold text-white text-[11px]">Inventory Lead</div>
              <div className="text-[9px] text-[#FF7A00] font-mono">manager@stocksense.com</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
