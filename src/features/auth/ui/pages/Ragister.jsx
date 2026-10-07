// pages/Register.jsx — Enterprise calm: ink brand panel + form on paper
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  let { register, handleSubmit, watch, errors, onRegisterSubmit, navigate } =
    useAuth();

  const password = watch("password", "");
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };
  const strength = getPasswordStrength(password);

  const inputClass = (hasError) =>
    `w-full rounded-[var(--radius-sm)] border bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors ${
      hasError
        ? "border-[var(--danger)]"
        : "border-[var(--border-color)] focus:border-[var(--accent)]"
    }`;

  const strengthColor = (i) => {
    if (i > strength) return "bg-[var(--border-color)]";
    if (strength === 1) return "bg-[var(--danger)]";
    if (strength === 2) return "bg-[var(--warning)]";
    return "bg-[var(--accent)]";
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[44%_1fr] bg-[var(--bg-main)]">
      {/* Left: ink brand panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[var(--bg-ink)] p-12">
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="team-sync" className="h-7 w-7 shrink-0 object-contain" />
          <span className="font-display text-lg font-semibold tracking-tight text-[var(--text-ink)]">
            team-sync
          </span>
        </div>

        <div className="max-w-md">
          <h2 className="font-display text-4xl xl:text-[2.75rem] font-semibold leading-[1.15] tracking-tight text-[var(--text-ink)]">
            One workspace for your whole team.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[var(--text-ink-muted)]">
            Employees, tasks, attendance and documents — ek hi jagah, admin aur
            employee dono ke liye.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 lg:hidden">
            <img src="/logo.webp" alt="team-sync" className="h-7 w-7 shrink-0 object-contain" />
          </div>

          <h1 className="font-display text-[1.75rem] font-semibold tracking-tight text-[var(--text-primary)]">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
            Naya employee workspace me shamil karo.
          </p>

          <form
            onSubmit={handleSubmit(onRegisterSubmit)}
            className="mt-8 space-y-5"
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-name" className="text-[13px] font-medium text-[var(--text-primary)]">
                Full name
              </label>
              <input
                id="reg-name"
                type="text"
                placeholder="Aarav Sharma"
                className={inputClass(!!errors.name)}
                {...register("name", { required: "Full name is required" })}
              />
              {errors.name && (
                <span className="text-xs text-[var(--danger)]">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-email" className="text-[13px] font-medium text-[var(--text-primary)]">
                Email
              </label>
              <input
                id="reg-email"
                type="email"
                placeholder="name@company.com"
                className={inputClass(!!errors.email)}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-xs text-[var(--danger)]">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="reg-password" className="text-[13px] font-medium text-[var(--text-primary)]">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                className={inputClass(!!errors.password)}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />

              <div className="flex gap-1.5 mt-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${strengthColor(i)}`}
                  />
                ))}
              </div>
              {password && (
                <p className="text-xs text-[var(--text-muted)]">
                  {strength === 1 && "Weak"}
                  {strength === 2 && "Fair"}
                  {strength === 3 && "Strong"}
                  {strength === 4 && "Very strong"}
                </p>
              )}

              {errors.password && (
                <span className="text-xs text-[var(--danger)]">{errors.password.message}</span>
              )}
            </div>

            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="agreeTerms"
                className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--accent)]"
                {...register("agreeTerms", {
                  required: "You must accept the terms and conditions",
                })}
              />
              <label
                htmlFor="agreeTerms"
                className="text-[13px] leading-snug text-[var(--text-secondary)] select-none cursor-pointer"
              >
                Main{" "}
                <span className="font-medium text-[var(--text-primary)] underline underline-offset-2">
                  Terms of Service
                </span>{" "}
                accept karta/karti hoon.
              </label>
            </div>
            {errors.agreeTerms && (
              <span className="-mt-3 text-xs text-[var(--danger)]">
                {errors.agreeTerms.message}
              </span>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-[var(--radius-sm)] bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              Create account
            </button>
          </form>

          <p className="mt-8 text-center text-[13px] text-[var(--text-secondary)]">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="font-medium text-[var(--accent)] hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>

          <p className="mt-12 text-center text-[11px] text-[var(--text-muted)]">
            © 2026 team-sync
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
