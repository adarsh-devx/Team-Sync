import { useState } from "react";
import { MoreVertical, Edit2, Trash2, UserMinus } from "lucide-react";

// `variant="plain"` grid card footer ke liye hai (border-less icon trigger),
// default "outlined" variant table rows me use hota hai.
const EmployeeAction = ({ employee, onUpdate, onDelete, onStatusChange, variant = "outlined" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const triggerClass =
    variant === "plain"
      ? "cursor-pointer rounded-[var(--radius-sm)] p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
      : "cursor-pointer rounded-[var(--radius-sm)] border border-[var(--border-color)] p-2 text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]";

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-label={`Actions for ${employee?.name ?? "employee"}`}
        onClick={(e) => {
          e.stopPropagation(); // Card/table row ke click navigation ko rokta hai
          setIsMenuOpen(!isMenuOpen);
        }}
        className={triggerClass}
      >
        <MoreVertical size={16} />
      </button>

      {isMenuOpen && (
        <>
          {/* Backdrop Click Overlay to auto-close dropdown when clicking outside */}
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          />

          {/* Action Dropdown Menu Box */}
          <div className="absolute right-0 mt-1.5 w-36 rounded-[var(--radius-sm)] bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl py-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* 1. Update Profile Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                if (onUpdate) onUpdate(employee);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-main)] hover:text-[var(--accent)] transition-colors text-left"
            >
              <Edit2 size={13} />
              <span>Update</span>
            </button>

            {/* 2. Toggle Status (Inactive) Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                if (onStatusChange) onStatusChange(employee, "inactive");
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-main)] hover:text-[var(--warning)] transition-colors text-left"
            >
              <UserMinus size={13} />
              <span>InActive</span>
            </button>

            {/* Separator line */}
            <div className="h-px bg-[var(--border-color)]/60 my-1" />

            {/* 3. Delete Profile Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                if (onDelete) onDelete(employee);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors text-left"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeAction;

