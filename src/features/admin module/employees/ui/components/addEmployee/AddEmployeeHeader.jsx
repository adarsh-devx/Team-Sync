import React from "react";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

const AddEmployeeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-semibold mb-2">
        <span
          onClick={() => navigate("/home/employee")}
          className="hover:text-purple-400 cursor-pointer transition-colors"
        >
          Team
        </span>
        <ChevronRight size={12} className="text-[var(--text-muted)]/70" />
        <span className="text-[var(--text-primary)] font-bold">Add New Employee</span>
      </nav>

      {/* Title & Description */}
      <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
        Add Employee
      </h1>
      <p className="text-sm text-[var(--text-muted)] mt-1">
        Configure the new team member's workspace profile and permissions.
      </p>
    </div>
  );
};

export default AddEmployeeHeader;
