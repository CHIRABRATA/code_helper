import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Code, Sparkles, X } from 'lucide-react';
import { supabase } from './supabaseClient';

const LoginPage = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Login error: " + error.message);
      } else {
        alert("Login successful!");
        console.log("User logged in:", data.user);
        // Redirect to dashboard
        onNavigate("dashboard");
      }
    } catch (err) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        alert("Error: " + error.message);
      } else {
        setResetSent(true);
        alert("Password reset email sent! Check your inbox.");
        setTimeout(() => {
          setShowForgotModal(false);
          setResetSent(false);
          setForgotEmail("");
        }, 2000);
      }
    } catch (err) {
      alert("An unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f8fafc] font-sans">
      
      {/* 1. LAYERED ETHERIAL BACKGROUND */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/50 to-purple-200/50 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-pink-100/50 to-blue-200/50 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>

      {/* 2. MAIN CONTAINER */}
      <div className="relative z-10 w-full max-w-[440px] px-6">
        
        {/* LOGO SECTION */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => onNavigate('landing')}
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <Code className="w-7 h-7" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black tracking-tighter text-slate-800 leading-none">CODE PEER</span>
              <span className="text-[10px] font-bold text-indigo-500 tracking-[0.2em] uppercase mt-1">Beta Access</span>
            </div>
          </button>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative">
          
          {/* Subtle Inner Glow */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-indigo-50/50 to-transparent rounded-t-[3rem] pointer-events-none"></div>

          <div className="relative text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center justify-center gap-2">
              Welcome back <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Continue your journey to cleaner code.</p>
          </div>

          {/* FORM */}
          <form className="space-y-6 relative" onSubmit={handleLogin}>
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 ml-1 uppercase tracking-wider">Email Address</label>
              <div className={`relative transition-all duration-300 ${focused === 'email' ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute inset-0 bg-indigo-500/10 rounded-2xl blur-md transition-opacity ${focused === 'email' ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative flex items-center">
                  <Mail className={`absolute left-4 transition-colors duration-300 ${focused === 'email' ? 'text-indigo-600' : 'text-slate-400'}`} size={20} />
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl outline-none transition-all focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 text-slate-800 font-medium" 
                    placeholder="name@company.com"
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className={`relative transition-all duration-300 ${focused === 'pass' ? 'scale-[1.02]' : ''}`}>
                <div className={`absolute inset-0 bg-indigo-500/10 rounded-2xl blur-md transition-opacity ${focused === 'pass' ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative flex items-center">
                  <Lock className={`absolute left-4 transition-colors duration-300 ${focused === 'pass' ? 'text-indigo-600' : 'text-slate-400'}`} size={20} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    onFocus={() => setFocused('pass')}
                    onBlur={() => setFocused('')}
                    className="w-full pl-12 pr-12 py-4 bg-white/50 border border-slate-200 rounded-2xl outline-none transition-all focus:border-indigo-500 focus:bg-white placeholder:text-slate-400 text-slate-800 font-medium" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="group relative w-full bg-slate-900 overflow-hidden text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-indigo-600 hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[30deg] -translate-x-full group-hover:translate-x-[250%] transition-transform duration-1000"></div>
              <span className="flex items-center justify-center gap-2">
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>

          {/* CREATE ACCOUNT LINK */}
          <div className="mt-10 text-center">
            <span className="text-slate-500 font-medium">Don't have an account? </span>
            <button
              onClick={() => onNavigate('signup')}
              className="font-bold text-indigo-600 hover:text-indigo-500 transition-all underline decoration-2 underline-offset-4 decoration-indigo-100 hover:decoration-indigo-500"
            >
              Get started for free
            </button>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex gap-6 text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <span className="opacity-30">•</span>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <span className="opacity-30">•</span>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
        </div>

        {/* FORGOT PASSWORD MODAL */}
        {showForgotModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setResetSent(false);
                    setForgotEmail("");
                  }}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>

              {!resetSent ? (
                <>
                  <p className="text-slate-600 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Email Address</label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="name@company.com"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-green-600 font-semibold">✓ Email sent successfully!</p>
                  <p className="text-slate-600 text-sm mt-2">Check your inbox for the password reset link.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;