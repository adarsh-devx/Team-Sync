import React from "react";

const FormInput = ({ label, name, type = "text", value, onChange, placeholder, required = false }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-[var(--text-primary)]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-purple-500 transition-colors"
      />
    </div>
  );
};

export default FormInput;
