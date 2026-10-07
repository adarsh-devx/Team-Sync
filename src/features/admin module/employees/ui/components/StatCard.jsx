import { MoreHorizontal, TrendingUp } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, colorClass = "", trend, subtitle, menu = false }) => {
  return (
    <div className="flex items-start justify-between p-5 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${colorClass || "bg-[var(--bg-hover)] text-[var(--text-muted)]"}`}>
            <Icon size={20} strokeWidth={1.75} />
          </div>
        )}
        <div>
          <p className="text-[13px] font-medium text-[var(--text-secondary)]">{title}</p>
          <p className="mt-1 text-2xl font-semibold leading-none text-[var(--text-primary)] tabular-nums">
            {value}
          </p>
          <p className="mt-2 flex items-center gap-1 text-xs text-[var(--text-muted)]">
            {trend && (
              <span className="flex items-center gap-0.5 font-medium text-[var(--success)]">
                <TrendingUp size={12} />
                {trend}
              </span>
            )}
            {subtitle && <span>{subtitle}</span>}
          </p>
        </div>
      </div>
      {menu && (
        <button
          type="button"
          aria-label={`${title} options`}
          className="rounded-md p-1 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] cursor-pointer"
        >
          <MoreHorizontal size={16} />
        </button>
      )}
    </div>
  );
};

export default StatCard;
