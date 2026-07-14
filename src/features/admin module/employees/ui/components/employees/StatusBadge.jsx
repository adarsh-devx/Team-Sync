import React from "react";

const StatusBadge = ({ status }) => {
  const isActive = status?.toLowerCase() === "active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-gray-500/10 text-[var(--text-muted)] border border-[var(--border-color)]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-emerald-400 animate-pulse" : "bg-gray-400"
        }`}
      />
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Unknown"}
    </span>
  );
};

export default StatusBadge;
