// Quiet SaaS status: koi dot/pill nahi — sirf chhota uppercase label,
// color sirf text pe. Inactive halka grey, active semantic green text.
const StatusBadge = ({ status }) => {
  const isActive = status?.toLowerCase() === "active";

  return (
    <span
      className={`label inline-flex items-center rounded-full border px-2 py-0.5 ${
        isActive
          ? "border-[var(--success)]/25 bg-[var(--success)]/10 text-[var(--success)]"
          : "border-[var(--border-color)] bg-[var(--bg-hover)] text-[var(--text-muted)]"
      }`}
    >
      {status ? status : "Unknown"}
    </span>
  );
};

export default StatusBadge;
