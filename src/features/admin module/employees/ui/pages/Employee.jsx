import React, { useState, useEffect } from "react";
import { useEmployee } from "../../hooks/useEmployees";
// Reusable components for header, statistics, filters, list view, and pagination
import EmployeeHeader from "../components/employees/EmployeeHeader";
import EmployeeStats from "../components/employees/EmployeeStats";
import SearchFilterBar from "../components/employees/SearchFilterBar";
import EmployeeTable from "../components/employees/EmployeeTable";
import StatusBadge from "../components/employees/StatusBadge";
import Pagination from "../components/employees/Pagination";
// Avatar initials, background gradients, and date formatting helpers imported from EmployeeRow to avoid duplicates
import { getInitials, getAvatarColor, formatJoinedDate } from "../components/employees/EmployeeRow";
import { Loader2, X, Mail, Shield, Briefcase, Calendar, Clock, Sparkles, Edit2, Trash2, UserMinus } from "lucide-react";

// ==========================================
// 1. EMPLOYEE DETAILS MODAL COMPONENT
// ==========================================
// This component shows the detailed profile of the selected employee in a modern popup card,
// supporting profile actions (Update, InActive, Delete) directly within the modal.
const EmployeeDetailsModal = ({ employee, onClose, onUpdate, onDelete, onStatusChange }) => {
  if (!employee) return null;

  // Destructure employee data fields coming from your API
  const { name, email, role, department, status, avatar, createdAt, updatedAt, _id } = employee;
  const initials = getInitials(name);
  const bgGradient = getAvatarColor(name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent backdrop blur background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Profile Box */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top visual gradient bar */}
        <div className={`h-2.5 w-full bg-gradient-to-r ${bgGradient}`} />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-purple-500/50 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-6">
          {/* Header Profile Section (Avatar, Name, Status Badge using reusable component) */}
          <div className="flex flex-col items-center text-center mt-4 mb-6">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-24 h-24 rounded-2xl object-cover border border-[var(--border-color)] shadow-md mb-4"
              />
            ) : (
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${bgGradient} text-white flex items-center justify-center font-bold text-3xl tracking-wider shadow-md mb-4`}>
                {initials}
              </div>
            )}
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{name}</h2>
            <div className="mt-2.5">
              <StatusBadge status={status} />
            </div>
          </div>

          {/* Details Section Fields (Email, Department, Role, ID) */}
          <div className="space-y-4 rounded-2xl bg-[var(--bg-main)]/60 p-5 border border-[var(--border-color)]/60">
            {/* Email Field */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)]">
                <Mail size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)]">Email Address</p>
                <p className="text-sm font-medium text-[var(--text-primary)] break-all">{email}</p>
              </div>
            </div>

            {/* Department Field */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)]">
                <Briefcase size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)]">Department</p>
                <p className="text-sm font-medium text-[var(--text-primary)] capitalize">{department || "Common"}</p>
              </div>
            </div>

            {/* Role Field */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)]">
                {role === "admin" ? <Shield size={16} className="text-amber-400" /> : <Briefcase size={16} className="text-blue-400" />}
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)]">Workspace Role</p>
                <p className="text-sm font-medium text-[var(--text-primary)] capitalize">{role}</p>
              </div>
            </div>

            {/* ID Field */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)]">
                <Sparkles size={16} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase font-semibold tracking-wider text-[var(--text-muted)]">Employee ID</p>
                <p className="text-xs font-mono text-[var(--text-primary)]">{_id}</p>
              </div>
            </div>
          </div>

          {/* Joined & Last Active Dates */}
          <div className="mt-5 grid grid-cols-2 gap-4 text-left text-xs border-t border-[var(--border-color)] pt-4 text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="shrink-0" />
              <div>
                <p className="text-[10px] font-semibold uppercase text-[var(--text-muted)]/70">Joined On</p>
                <p className="font-medium text-[var(--text-primary)]/80 mt-0.5">{formatJoinedDate(createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="shrink-0" />
              <div>
                <p className="text-[10px] font-semibold uppercase text-[var(--text-muted)]/70">Last Active</p>
                <p className="font-medium text-[var(--text-primary)]/80 mt-0.5">{formatJoinedDate(updatedAt)}</p>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons Footer */}
          <div className="mt-5 flex items-center justify-end gap-2.5 border-t border-[var(--border-color)] pt-4">
            {/* Update Button */}
            <button
              onClick={() => {
                onClose();
                if (onUpdate) onUpdate(employee);
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-purple-500/50 hover:text-purple-400 transition-colors cursor-pointer"
            >
              <Edit2 size={13} />
              <span>Update</span>
            </button>

            {/* InActive Button */}
            <button
              onClick={() => {
                onClose();
                if (onStatusChange) onStatusChange(employee, "inactive");
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-amber-500/50 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <UserMinus size={13} />
              <span>InActive</span>
            </button>

            {/* Delete Button */}
            <button
              onClick={() => {
                onClose();
                if (onDelete) onDelete(employee);
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:border-red-500/50 transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Delete</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. MAIN EMPLOYEE PAGE COMPONENT
// ==========================================
const Employee = () => {
  // Fetch API employee data using your custom TanStack Query hook
  const { data, isPending } = useEmployee();

  // Search filter query state
  const [search, setSearch] = useState("");
  
  // Selected department filter state ("all" or selected department name)
  const [departmentFilter, setDepartmentFilter] = useState("all");
  
  // Selected status filter state ("all", "active", "inactive")
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Layout format view switcher state ("grid" or "list")
  const [viewMode, setViewMode] = useState("grid");
  
  // Holds the employee object whose details modal is currently open (null if closed)
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of employees to show per page

  // Reset pagination to Page 1 whenever search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, departmentFilter, statusFilter]);

  // Loading indicator overlay while waiting for API data
  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
        <Loader2 size={36} className="text-purple-500 animate-spin" />
        <p className="text-sm text-[var(--text-muted)] font-medium">Fetching team members...</p>
      </div>
    );
  }

  // Robust array fallback checks. Support direct arrays and nested `{ employees: [...] }` formats
  const employeesList = Array.isArray(data) ? data : (data?.employees || []);

  // Collect a set of unique department names present in your database to populate the select dropdown
  const uniqueDepartments = [...new Set(employeesList.map((e) => e.department).filter(Boolean))];

  // Filtering filter workflow
  const filteredEmployees = employeesList.filter((employee) => {
    // Check if name or email matches search input
    const matchesSearch =
      employee.name?.toLowerCase().includes(search.toLowerCase()) ||
      employee.email?.toLowerCase().includes(search.toLowerCase());
    
    // Check if department matches
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    
    // Check if status matches
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Calculate pagination parameters based on filtered items
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Shared Action Handlers
  const handleUpdate = (emp) => {
    alert(`Update employee profile workflow for: ${emp.name}`);
  };

  const handleDelete = (emp) => {
    alert(`Delete employee profile workflow for: ${emp.name}`);
  };

  const handleStatusChange = (emp, newStatus) => {
    alert(`Change status of ${emp.name} to ${newStatus.toUpperCase()}`);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 select-none animate-in fade-in duration-300 pb-10">
      
      {/* 1. Header Bar: Welcome text & Add button CTA */}
      <EmployeeHeader
        totalCount={employeesList.length}
        onAddClick={() => alert("Add Employee workflow coming soon!")}
      />

      {/* 2. Stats cards component (Total, Active, Departments, Admins counts) */}
      <EmployeeStats employees={employeesList} />

      {/* 3. Search and dropdown filters bar controls */}
      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
        departments={uniqueDepartments}
      />

      {/* 4. Employees list content (Grid Card view / Table row view) */}
      <div className="flex-1">
        {filteredEmployees.length === 0 ? (
          // Empty State fallback when no employees match filters
          <div className="flex flex-col items-center justify-center py-16 px-4 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-center">
            <p className="text-lg font-semibold text-[var(--text-primary)]">No matches found</p>
            <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xs">
              We couldn't find any team members matching your current filters.
            </p>
          </div>
        ) : viewMode === "grid" ? (
          // Render Grid Layout Cards using paginated items
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedEmployees.map((employee) => {
              const initials = getInitials(employee.name);
              const bgGradient = getAvatarColor(employee.name);
              return (
                <div
                  key={employee._id}
                  onClick={() => setSelectedEmployee(employee)}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-purple-500/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div>
                    {/* Top avatar & status badge */}
                    <div className="flex items-start justify-between mb-4">
                      {employee.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[var(--border-color)]"
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgGradient} text-white flex items-center justify-center font-bold text-base tracking-wider`}>
                          {initials}
                        </div>
                      )}
                      <StatusBadge status={employee.status} />
                    </div>

                    {/* Name */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-purple-400 transition-colors truncate">
                        {employee.name}
                      </h3>
                    </div>

                    {/* Role & Department */}
                    <div className="mb-4 text-sm text-[var(--text-muted)] space-y-1.5">
                      <div className="flex items-center gap-1.5 capitalize font-medium">
                        {employee.role === "admin" ? (
                          <Shield size={14} className="text-amber-400" />
                        ) : (
                          <Briefcase size={14} className="text-blue-400" />
                        )}
                        <span>Role: {employee.role}</span>
                      </div>
                      <div className="capitalize text-xs">
                        Dept: {employee.department || "Common"}
                      </div>
                    </div>

                    {/* Joined Date */}
                    <div className="pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-[var(--text-muted)]" />
                        <span>Joined: {formatJoinedDate(employee.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Render Table List Layout using paginated items with row action handles wired
          <EmployeeTable
            employees={paginatedEmployees}
            onViewDetails={setSelectedEmployee}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {/* 5. Pagination controls bar with totalItems passed */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredEmployees.length}
      />

      {/* 6. Detail Profile Modal Drawer Overlay */}
      {selectedEmployee && (
        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default Employee;
