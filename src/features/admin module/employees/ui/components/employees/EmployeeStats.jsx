import React from "react";
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
        colorClass="from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-400"
      />
      <StatCard
        title="Active Members"
        value={active}
        icon={UserCheck}
        colorClass="from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-400"
      />
      <StatCard
        title="Departments"
        value={departmentsCount}
        icon={Layers}
        colorClass="from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400"
      />
      <StatCard
        title="Admins"
        value={adminCount}
        icon={Shield}
        colorClass="from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-400"
      />
    </div>
  );
};

export default EmployeeStats;
