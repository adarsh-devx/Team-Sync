

const FormTextarea = ({ label, name, value, onChange, placeholder, rows = 3 }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-[var(--text-primary)]">
        {label}
      </label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm rounded-[var(--radius-sm)] bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors resize-none"
      />
    </div>
  );
};

export default FormTextarea;

