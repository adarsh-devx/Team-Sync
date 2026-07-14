import React from "react";
import { Shield, Briefcase, Calendar } from "lucide-react";
import StatusBadge from "./StatusBadge";
import EmployeeAction from "./EmployeeAction";
import { updateEmploye } from "../../../api/employeeApis";
import { useQueryClient } from "@tanstack/react-query";

export const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getAvatarColor = (name) => {
  const gradients = [
    "from-indigo-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-fuchsia-500 to-violet-600",
  ];
  if (!name) return gradients[0];
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  return gradients[sum % gradients.length];
};

// Exported date formatting helper to avoid duplicate logic across components
export const formatJoinedDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const EmployeeRow = ({
  employee,
  onUpdate,
  onDelete,
}) => {
  const queryClient = useQueryClient();
  const { name, role, department, status, avatar, createdAt } = employee;
  const initials = getInitials(name);
  const bgGradient = getAvatarColor(name);

  return (
    <tr
      // Removed onClick details handler from the tr tag as requested
      className="hover:bg-[var(--bg-main)]/30 transition-colors group"
    >
      {/* 1. Employee Name & Avatar */}
      <td className="p-4 pl-6">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-10 h-10 rounded-xl object-cover border border-[var(--border-color)]"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bgGradient} text-white flex items-center justify-center font-bold text-xs tracking-wider`}
            >
              {initials}
            </div>
          )}
          <div>
            <div className="font-semibold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors">
              {name}
            </div>
          </div>
        </div>
      </td>

      {/* 2. Role */}
      <td className="p-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] capitalize">
          {role === "admin" ? (
            <Shield size={14} className="text-amber-400" />
          ) : (
            <Briefcase size={14} className="text-blue-400" />
          )}
          <span>{role}</span>
        </span>
      </td>

      {/* 3. Department */}
      <td className="p-4 capitalize text-[var(--text-muted)]">
        {department || "Common"}
      </td>

      {/* 4. Status */}
      <td className="p-4">
        <StatusBadge status={status} />
      </td>

      {/* 5. Joined Date */}
      <td className="p-4 text-[var(--text-muted)] text-xs">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-[var(--text-muted)]" />
          <span>{formatJoinedDate(createdAt)}</span>
        </div>
      </td>

      {/* 6. Action Column: Restored the 3-dot actions dropdown menu */}
      <td className="p-4 pr-6 text-right relative">
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
