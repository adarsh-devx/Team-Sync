// pages/Login.jsx — Enterprise calm: ink brand panel + quiet form
import { LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { USE_MOCK_API } from "../../../../mock/mockConfig";

const Login = () => {
  let { register, handleSubmit, errors, onLoginSubmit, navigate } = useAuth();

  return (
    <div className="min-h-screen grid lg:grid-cols-[44%_1fr] bg-[var(--bg-main)]">
      {/* Left: ink brand panel — typographic, honest, no glow */}
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

        <p className="label text-[var(--text-ink-muted)]">
          Employee management platform
        </p>
      </div>

      {/* Right: form on warm paper */}
      <div className="flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">
          <div className="mb-10 lg:hidden">
            <img src="/logo.webp" alt="team-sync" className="h-7 w-7 shrink-0 object-contain" />
          </div>

          <h1 className="font-display text-[1.75rem] font-semibold tracking-tight text-[var(--text-primary)]">
            Sign in
          </h1>
          <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
            Apne workspace me wapas aao.
          </p>

          <form onSubmit={handleSubmit(onLoginSubmit)} className="mt-8 space-y-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-[13px] font-medium text-[var(--text-primary)]">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="name@company.com"
                className={`w-full rounded-[var(--radius-sm)] border bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors ${
                  errors.email
                    ? "border-[var(--danger)]"
                    : "border-[var(--border-color)] focus:border-[var(--accent)]"
                }`}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <span className="text-xs text-[var(--danger)]">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="text-[13px] font-medium text-[var(--text-primary)]">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-[var(--radius-sm)] border bg-[var(--bg-surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-colors ${
                  errors.password
                    ? "border-[var(--danger)]"
                    : "border-[var(--border-color)] focus:border-[var(--accent)]"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-xs text-[var(--danger)]">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              Sign in
              <LogIn size={15} />
            </button>
          </form>

          <p className="mt-8 text-center text-[13px] text-[var(--text-secondary)]">
            Account nahi hai?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-[var(--accent)] hover:underline cursor-pointer"
            >
              Register karo
            </button>
          </p>

          {USE_MOCK_API && (
            <p className="mt-6 rounded-[var(--radius-sm)] border border-[var(--border-color)] px-4 py-3 text-center text-[11px] leading-relaxed text-[var(--text-muted)]">
              Mock mode (backend offline): koi bhi email/password chalega.
              Email me <b className="text-[var(--accent)]">admin</b> likho to Admin panel,
              warna Employee panel khulega.
            </p>
          )}

          <p className="mt-12 text-center text-[11px] text-[var(--text-muted)]">
            © 2026 team-sync
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
