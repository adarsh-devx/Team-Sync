// pages/Login.jsx
import React from "react";

import { 
  Network, 
  Cloud, 
  Terminal, 
  LogIn 
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
let {register , handleSubmit , errors , onLoginSubmit , navigate} = useAuth()
  return (
    <div className="min-h-screen bg-[#0b0914] text-white flex flex-col justify-between items-center py-10 px-4 select-none relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-950/15 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-[#121019] border border-[#221e36] rounded-2xl p-8 flex flex-col items-center mt-12 relative z-10 shadow-2xl">
        
        {/* Network Logo Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 flex items-center justify-center border border-[#8b5cf6]/30 mb-5">
          <Network className="text-[#a78bfa] w-6 h-6" />
        </div>

        {/* Branding */}
        <h1 className="text-2xl font-bold tracking-tight text-white">Team Sync</h1>
        <p className="text-[#64748b] mt-1.5 mb-8 text-xs font-medium tracking-wide">
          Sign in to your workspace
        </p>

        {/* Social Authentication Row */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 border border-[#221e36] bg-[#181524]/60 hover:bg-[#1f1b2e] rounded-lg py-3 text-xs font-bold tracking-wider text-white transition-all cursor-pointer"
          >
            <Cloud size={16} className="text-[#64748b]" />
            <span>GOOGLE</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 border border-[#221e36] bg-[#181524]/60 hover:bg-[#1f1b2e] rounded-lg py-3 text-xs font-bold tracking-wider text-white transition-all cursor-pointer"
          >
            <Terminal size={16} className="text-[#64748b]" />
            <span>GITHUB</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full mb-6">
          <hr className="flex-1 border-[#1d1a2f]" />
          <span className="text-gray-500 text-[10px] font-semibold tracking-wider uppercase">or continue with email</span>
          <hr className="flex-1 border-[#1d1a2f]" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-5 w-full">
          
          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className={`w-full bg-[#0b0914] border ${
                errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#221e36] focus:border-[#a78bfa]'
              } rounded-lg py-3 px-4 text-sm text-white placeholder-[#524d6e] outline-none transition-all focus:ring-1 focus:ring-[#a78bfa]/50`}
              {...register("email", { 
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address"
                }
              })}
            />
            {errors.email && (
              <span className="text-red-400 text-xs mt-0.5">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Password</label>
              <a href="#forgot" className="text-xs text-[#a78bfa] font-semibold hover:underline transition-all">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className={`w-full bg-[#0b0914] border ${
                errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-[#221e36] focus:border-[#a78bfa]'
              } rounded-lg py-3 px-4 text-sm text-white placeholder-[#524d6e] outline-none transition-all focus:ring-1 focus:ring-[#a78bfa]/50`}
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />
            {errors.password && (
              <span className="text-red-400 text-xs mt-0.5">{errors.password.message}</span>
            )}
          </div>

          {/* Stay Signed In Checkbox */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="staySignedIn"
              className="w-4 h-4 rounded border-[#221e36] bg-[#0b0914] text-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/50 accent-[#a78bfa] cursor-pointer"
              {...register("staySignedIn")}
            />
            <label htmlFor="staySignedIn" className="text-xs text-gray-400 select-none cursor-pointer">
              Stay signed in
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-lg bg-[#635fc7] hover:bg-[#726eda] text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <LogIn size={16} />
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Don't have an account?{" "}
          <a onClick={() => navigate("/register")} className="text-[#a78bfa] font-bold hover:underline transition-all">
            Sign Up
          </a>
        </p>
      </div>

      {/* Decorative Floating 3D/Abstract element mockup */}
      <div className="hidden lg:block absolute bottom-12 right-24 w-44 h-44 pointer-events-none opacity-30 select-none">
        <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-purple-800 to-indigo-950/20 blur-sm relative flex items-center justify-center">
          {/* Outer Ring */}
          <div className="w-24 h-24 border border-purple-500/40 rounded-full animate-[spin_10s_linear_infinite]" />
          {/* Inner Loop */}
          <div className="absolute w-16 h-16 border-2 border-dashed border-indigo-400/30 rounded-full animate-[spin_5s_linear_infinite]" />
        </div>
      </div>

      {/* Global Footer */}
      <div className="mt-12 text-center space-y-2.5 z-10 select-none">
        <p className="text-[10px] text-gray-600">
          &copy; 2024 Synthetix AI. Enterprise Intelligence Platforms.
        </p>
        <div className="flex justify-center gap-4 text-[10px] text-gray-600">
          <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Service</a>
        </div>
      </div>

    </div>
  );
};

export default Login;
