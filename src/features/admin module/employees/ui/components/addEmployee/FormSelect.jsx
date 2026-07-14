import React from "react";
import { ChevronDown } from "lucide-react";

const FormSelect = ({ label, name, value, onChange, options = [], required = false, placeholder }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-[var(--text-primary)]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Relative wrapper for custom ChevronDown alignment */}
      <div className="relative">
        <select
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="appearance-none w-full pl-4 pr-10 py-2.5 text-sm rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none focus:border-purple-500 hover:bg-[var(--bg-hover)] transition-all cursor-pointer shadow-sm"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
        />
      </div>
    </div>
  );
};

export default FormSelect;
