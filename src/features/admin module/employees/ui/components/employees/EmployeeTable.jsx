import React from "react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({
  employees = [],
  onViewDetails,
  onUpdate,
  onDelete,
  onStatusChange,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-sm">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)]/50 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            <th className="p-4 pl-6">Employee</th>
            <th className="p-4">Role</th>
            <th className="p-4">Department</th>
            <th className="p-4">Status</th>
            <th className="p-4">Joined Date</th>
            <th className="p-4 pr-6 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)] text-sm">
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-8 text-center text-[var(--text-muted)]">
                No employees found matching the filters.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <EmployeeRow
                key={employee._id}
                employee={employee}
                onViewDetails={onViewDetails}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
