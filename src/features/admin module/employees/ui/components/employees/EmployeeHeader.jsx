import { ChevronRight, Plus } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router";

const EmployeeHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>Team</span>
          <ChevronRight size={12} />
          <span className="font-medium text-[var(--text-secondary)]">Members</span>
        </nav>
        <h1 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-[var(--text-primary)] sm:text-[32px]">
          Team Members
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your team, view their details, and keep your organization organized.
        </p>
      </div>

      <Button
        variant="primary"
        icon={Plus}
        className="shrink-0 self-start sm:self-auto"
        onClick={() => navigate("/home/add-employee")}
      >
        Add Employee
      </Button>
    </div>
  );
};

export default EmployeeHeader;
