

const RadioStatus = ({ label, name, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-[var(--text-primary)]">
        {label}
      </label>
      
      <div className="flex items-center gap-6 py-2.5">
        {/* Active Option */}
        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] cursor-pointer group">
          <input
            type="radio"
            name={name}
            value="active"
            checked={value === "active"}
            onChange={onChange}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
            value === "active"
              ? "border-[var(--accent)] bg-[var(--accent)]"
              : "border-[var(--border-color)] bg-[var(--bg-main)] group-hover:border-[var(--accent)]"
          }`}>
            {value === "active" && (
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </span>
          <span>Active</span>
        </label>

        {/* Inactive Option */}
        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] cursor-pointer group">
          <input
            type="radio"
            name={name}
            value="inactive"
            checked={value === "inactive"}
            onChange={onChange}
            className="sr-only"
          />
          <span className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
            value === "inactive"
              ? "border-[var(--accent)] bg-[var(--accent)]"
              : "border-[var(--border-color)] bg-[var(--bg-main)] group-hover:border-[var(--accent)]"
          }`}>
            {value === "inactive" && (
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            )}
          </span>
          <span>Inactive</span>
        </label>
      </div>
    </div>
  );
};

export default RadioStatus;

