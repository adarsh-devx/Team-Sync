import { Shield, Briefcase } from "lucide-react";
import StatusBadge from "./StatusBadge";
import EmployeeAction from "./EmployeeAction";
import { updateEmploye } from "../../../api/employeeApis";
import { useQueryClient } from "@tanstack/react-query";
import { getInitials, formatJoinedDate } from "../../../utils/employeeList";

const EmployeeRow = ({
  employee,
  onUpdate,
  onDelete,
}) => {
  const queryClient = useQueryClient();
  const { name, role, department, status, avatar, createdAt } = employee;
  const initials = getInitials(name);

  return (
    <tr className="hover:bg-[var(--bg-main)]/30 transition-colors group">
      {/* 1. Employee Name & Avatar */}
      <td className="py-2.5 pl-6 pr-4">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-8 h-8 rounded-full object-cover border border-[var(--border-color)]"
            />
          ) : (
            // Consistent avatar treatment — random per-person colors nahi
            <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center font-semibold text-[11px] tracking-wider">
              {initials}
            </div>
          )}
          <div className="font-medium text-[var(--text-primary)]">
            {name}
          </div>
        </div>
      </td>

      {/* 2. Role */}
      <td className="px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] capitalize">
          {role === "admin" ? (
            <Shield size={13} className="text-[var(--warning)]" />
          ) : (
            <Briefcase size={13} className="text-[var(--accent)]" />
          )}
          <span>{role}</span>
        </span>
      </td>

      {/* 3. Department */}
      <td className="px-4 py-2.5 capitalize text-[var(--text-secondary)]">
        {department || "Common"}
      </td>

      {/* 4. Status */}
      <td className="px-4 py-2.5">
        <StatusBadge status={status} />
      </td>

      {/* 5. Joined Date — tabular-nums se digits align rehte hain */}
      <td className="px-4 py-2.5 text-[var(--text-muted)] text-xs tabular-nums">
        {formatJoinedDate(createdAt)}
      </td>

      {/* 6. Action Column */}
      <td className="px-4 py-2.5 pr-6 text-right relative">
        <EmployeeAction
          employee={employee}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onStatusChange={async () => {
            const currentStatus = employee.status?.trim().toLowerCase();
            const nextStatus = currentStatus === "inactive" ? "active" : "inactive";

            const updated = await updateEmploye(employee?._id, { status: nextStatus });
            if (updated) {
              alert(`${name} status changed successfully to ${nextStatus.toUpperCase()}`);
            }
            queryClient.invalidateQueries({ queryKey: ["employees"] });
          }}
        />
      </td>
    </tr>
  );
};

export default EmployeeRow;
