import { Users, UserCheck, Shield, Layers } from "lucide-react";
import StatCard from "../StatCard";

const EmployeeStats = ({ employees = [] }) => {
  const total = employees.length;
  const active = employees.filter((e) => e.status === "active").length;
  const uniqueDepartments = new Set(employees.map((e) => e.department).filter(Boolean));
  const departmentsCount = uniqueDepartments.size;
  const adminCount = employees.filter((e) => e.role === "admin").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-6">
      <StatCard
        title="Total Employees"
        value={total}
        icon={Users}
        colorClass="bg-[var(--accent)]/10 text-[var(--accent)]"
        trend="14%"
        subtitle="from last month"
        menu
      />
      <StatCard
        title="Active Members"
        value={active}
        icon={UserCheck}
        colorClass="bg-[var(--success)]/10 text-[var(--success)]"
        trend="12%"
        subtitle="from last month"
        menu
      />
      <StatCard
        title="Departments"
        value={departmentsCount}
        icon={Layers}
        colorClass="bg-[var(--warning)]/10 text-[var(--warning)]"
        subtitle="Across the organization"
      />
      <StatCard
        title="Administrators"
        value={adminCount}
        icon={Shield}
        colorClass="bg-[var(--indigo)]/10 text-[var(--indigo)]"
        subtitle="System administrators"
      />
    </div>
  );
};

export default EmployeeStats;

