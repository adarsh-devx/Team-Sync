import React, { useState } from "react";
import { MoreVertical, Edit2, Trash2, UserMinus } from "lucide-react";

const EmployeeAction = ({ employee, onUpdate, onDelete, onStatusChange }) => {
  // State to manage the open/close state of the action dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="inline-block text-left relative">
      {/* Trigger Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents tr click navigation
          setIsMenuOpen(!isMenuOpen);
        }}
        className="p-2 rounded-xl border border-[var(--border-color)] hover:border-purple-500/50 hover:bg-purple-500/10 text-[var(--text-muted)] hover:text-purple-400 transition-all duration-200 cursor-pointer"
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
          <div className="absolute right-0 mt-1.5 w-36 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl py-1.5 z-20 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* 1. Update Profile Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
                if (onUpdate) onUpdate(employee);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-main)] hover:text-purple-400 transition-colors text-left"
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
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-main)] hover:text-amber-400 transition-colors text-left"
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
              className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-500 hover:bg-[var(--bg-main)] hover:bg-red-500/10 transition-colors text-left"
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
