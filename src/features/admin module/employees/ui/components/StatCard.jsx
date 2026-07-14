import React from "react";

const StatCard = ({ title, value, icon: Icon, colorClass = "" }) => {
  return (
    <div
      className={`flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br ${colorClass} border bg-[var(--bg-surface)] backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-[1.02]`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-[var(--text-muted)]">
          {title}
        </span>
        <span className="text-3xl font-bold text-[var(--text-primary)]">
          {value}
        </span>
      </div>
      <div className="p-3 rounded-xl bg-[var(--bg-main)]/60 text-[var(--text-primary)]">
        {Icon && <Icon size={24} />}
      </div>
    </div>
  );
};

export default StatCard;
