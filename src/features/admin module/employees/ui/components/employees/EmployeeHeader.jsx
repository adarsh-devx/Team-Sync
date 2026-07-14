import React from "react";
import { UserPlus } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router";

const EmployeeHeader = ({ totalCount, onAddClick }) => {
  let navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Team Members
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Currently managing {totalCount} organizational profiles, statuses, and
          credentials.
        </p>
      </div>

      <Button
        variant="primary"
        icon={UserPlus}
        onClick={() => navigate("/home/add-employee")}
      >
        Add Employee
      </Button>
    </div>
  );
};

export default EmployeeHeader;
