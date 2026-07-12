// pages/Register.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Sparkles, ShieldCheck, Network } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

// Google SVG Icon for social button
const GoogleIcon = () => (
  <svg
    className="w-5 h-5 mr-1"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const Register = () => {
  let { register, handleSubmit, watch, errors, onRegisterSubmit, navigate } =
    useAuth();

  const password = watch("password", "");
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1; // Basic length
    if (pwd.length >= 8) score += 1; // Standard length
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score += 1; // Complexity (Uppercase + Number)
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1; // Special char
    return score;
  };
  const strength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-[#0b0914] text-white flex flex-col justify-between">
      {/* Main Container Grid */}
      <div className="flex-grow grid lg:grid-cols-2">
        {/* Left Side: Branding and Hero Visuals */}
        <div
          className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-cover bg-center border-r border-[#1d1830]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(11, 9, 20, 0.45), rgba(11, 9, 20, 0.95)), url('/bg.png')",
          }}
        >
          <div className="text-xl font-bold tracking-tight text-white select-none">
            Team Sync
          </div>

          <div className="max-w-lg z-10">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#a78bfa] uppercase">
              <Sparkles size={14} className="animate-pulse" />
              <span>Next-Gen Intelligence</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold mt-5 leading-[1.15] text-white">
              Accelerate your team's intelligence.
            </h1>

            <p className="mt-5 text-[#94a3b8] text-base leading-relaxed">
              Connect your enterprise data to our specialized AI models and
              unlock unparalleled strategic insights in seconds.
            </p>

            {/* Stats Row */}
            <div className="flex gap-16 mt-12 pt-8 border-t border-[#1d1830]/60">
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  99.9%
                </h2>
                <p className="text-xs text-[#64748b] mt-1 uppercase font-medium tracking-wider">
                  Uptime SLA
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  ISO
                </h2>
                <p className="text-xs text-[#64748b] mt-1 uppercase font-medium tracking-wider">
                  27001 Certified
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Container */}
        <div className="flex flex-col justify-center items-center px-6 py-12 lg:px-16">
          <div className="w-full max-w-[440px]">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Create your account
            </h1>
            <p className="text-[#64748b] mt-2.5 mb-10 text-sm">
              Experience the future of collaborative data intelligence.
            </p>

            <form
              onSubmit={handleSubmit(onRegisterSubmit)}
              className="space-y-6"
            >
              {/* Full Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Full Name
                </label>
                <div
                  className={`flex items-center border ${
                    errors.name
                      ? "border-red-500/50 focus-within:border-red-500"
                      : "border-[#221e36] focus-within:border-[#a78bfa]"
                  } bg-[#121019] rounded-lg px-4 transition-all focus-within:ring-1 focus-within:ring-[#a78bfa]/50`}
                >
                  <User size={18} className="text-[#524d6e] mr-3" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-transparent py-3.5 text-sm text-white placeholder-[#524d6e] outline-none"
                    {...register("name", { required: "Full name is required" })}
                  />
                </div>
                {errors.name && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Address Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Email Address
                </label>
                <div
                  className={`flex items-center border ${
                    errors.email
                      ? "border-red-500/50 focus-within:border-red-500"
                      : "border-[#221e36] focus-within:border-[#a78bfa]"
                  } bg-[#121019] rounded-lg px-4 transition-all focus-within:ring-1 focus-within:ring-[#a78bfa]/50`}
                >
                  <Mail size={18} className="text-[#524d6e] mr-3" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-transparent py-3.5 text-sm text-white placeholder-[#524d6e] outline-none"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Password
                </label>
                <div
                  className={`flex items-center border ${
                    errors.password
                      ? "border-red-500/50 focus-within:border-red-500"
                      : "border-[#221e36] focus-within:border-[#a78bfa]"
                  } bg-[#121019] rounded-lg px-4 transition-all focus-within:ring-1 focus-within:ring-[#a78bfa]/50`}
                >
                  <Lock size={18} className="text-[#524d6e] mr-3" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent py-3.5 text-sm text-white placeholder-[#524d6e] outline-none"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                  />
                </div>

                {/* Live Password Strength Bars */}
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className={`h-1 flex-1 rounded transition-colors duration-300 ${
                        index <= strength
                          ? strength === 1
                            ? "bg-red-500"
                            : strength === 2
                              ? "bg-amber-500"
                              : "bg-[#a78bfa]"
                          : "bg-[#221e36]"
                      }`}
                    />
                  ))}
                </div>

                {/* Strength Labels */}
                {password && (
                  <p className="text-xs text-[#a78bfa] mt-1 font-semibold">
                    {strength === 1 && "Weak password"}
                    {strength === 2 && "Fair password"}
                    {strength === 3 && "Strong password"}
                    {strength === 4 && "Very strong password"}
                  </p>
                )}

                {errors.password && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    className="mt-1 w-4 h-4 rounded border-[#221e36] bg-[#121019] text-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/50 accent-[#a78bfa] cursor-pointer"
                    {...register("agreeTerms", {
                      required: "You must accept the terms and conditions",
                    })}
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="text-xs text-[#64748b] leading-tight select-none cursor-pointer"
                  >
                    I agree to the{" "}
                    <span className="text-white hover:underline">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-white hover:underline">
                      Privacy Policy
                    </span>
                    .
                  </label>
                </div>
                {errors.agreeTerms && (
                  <span className="text-red-400 text-xs">
                    {errors.agreeTerms.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-lg bg-[#a78bfa] hover:bg-[#b59dfb] text-[#0b0914] font-bold text-sm tracking-wide transition-all shadow-md shadow-[#a78bfa]/5 active:scale-[0.98] cursor-pointer"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <hr className="flex-1 border-[#1d1a2f]" />
              <span className="text-gray-500 text-xs font-semibold tracking-wider">
                OR CONTINUE WITH
              </span>
              <hr className="flex-1 border-[#1d1a2f]" />
            </div>

            {/* Social Authentication Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-[#221e36] bg-[#121019]/40 hover:bg-[#181525] rounded-lg py-3 text-sm font-medium text-white transition-all cursor-pointer"
              >
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-[#221e36] bg-[#121019]/40 hover:bg-[#181525] rounded-lg py-3 text-sm font-medium text-white transition-all cursor-pointer"
              >
                <Network size={16} className="text-gray-400" />
                <span>SSO</span>
              </button>
            </div>

            {/* Log In Link */}
            <p className="text-center text-sm text-gray-400 mt-10">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-[#a78bfa] font-bold hover:underline cursor-pointer transition-all"
              >
                Log In
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Global Footer Section */}
      <footer className="w-full border-t border-[#1d1830]/80 bg-[#08060f] py-5 px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        <div className="text-xs font-bold text-[#64748b] tracking-wider">
          Team Sync
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-[#64748b] font-medium">
          <a href="#privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#security" className="hover:text-white transition-colors">
            Security
          </a>
          <a href="#status" className="hover:text-white transition-colors">
            System Status
          </a>
        </div>
        <div className="text-[10px] md:text-xs text-[#64748b]">
          &copy; 2024 Team Sync. Enterprise Intelligence Platforms.
        </div>
      </footer>
    </div>
  );
};

export default Register;
