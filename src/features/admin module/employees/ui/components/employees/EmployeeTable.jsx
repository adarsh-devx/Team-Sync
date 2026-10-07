import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({
  employees = [],
  onViewDetails,
  onUpdate,
  onDelete,
  onStatusChange,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)]">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-[var(--border-color)] bg-[var(--bg-main)]/50 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
            <th className="py-2.5 pl-6 pr-4 font-semibold">Employee</th>
            <th className="px-4 py-2.5 font-semibold">Role</th>
            <th className="px-4 py-2.5 font-semibold">Department</th>
            <th className="px-4 py-2.5 font-semibold">Status</th>
            <th className="px-4 py-2.5 font-semibold">Joined</th>
            <th className="px-4 py-2.5 pr-6 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color)]">
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

