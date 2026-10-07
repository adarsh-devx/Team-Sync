import { useState } from "react";
import { useNavigate } from "react-router";
import { useEmployee } from "../../hooks/useEmployees";
// Reusable components for header, statistics, filters, list view, and pagination
import EmployeeHeader from "../components/employees/EmployeeHeader";
import EmployeeStats from "../components/employees/EmployeeStats";
import SearchFilterBar from "../components/employees/SearchFilterBar";
import EmployeeTable from "../components/employees/EmployeeTable";
import StatusBadge from "../components/employees/StatusBadge";
import Pagination from "../components/employees/Pagination";
// Loading + empty states
import EmployeeSkeleton from "../components/employees/EmployeeSkeleton";
import EmptyState from "../components/employees/EmptyState";
import EmployeeAction from "../components/employees/EmployeeAction";
// Pure list helpers (initials, date formatting, sorting) — plain module, node se testable
import { getInitials, formatJoinedDate, sortEmployees } from "../../utils/employeeList";
import { X, Edit2, Trash2, UserMinus, Calendar, Building2, Mail } from "lucide-react";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent backdrop — no blur, Quiet SaaS me glass nahi */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal Profile Box */}
      <div className="relative w-full max-w-lg rounded-[var(--radius-lg)] bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-[var(--shadow-md)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-[var(--radius-sm)] bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="p-6">
          {/* Header: identity row */}
          <div className="flex items-center gap-4">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-14 w-14 shrink-0 rounded-full object-cover border border-[var(--border-color)]"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] font-display text-lg font-semibold text-[var(--accent)]">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-xl font-semibold tracking-tight text-[var(--text-primary)] truncate">
                {name}
              </h2>
              <p className="mt-0.5 text-[13px] text-[var(--text-muted)] capitalize">
                {role} · {department || "Common"}
              </p>
            </div>
            <StatusBadge status={status} />
          </div>

          {/* Details: hairline definition grid */}
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--border-color)]">
            <div className="col-span-2 bg-[var(--bg-surface)] p-3.5">
              <p className="label text-[var(--text-muted)]">Email</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)] break-all">{email}</p>
            </div>
            <div className="bg-[var(--bg-surface)] p-3.5">
              <p className="label text-[var(--text-muted)]">Department</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)] capitalize">{department || "Common"}</p>
            </div>
            <div className="bg-[var(--bg-surface)] p-3.5">
              <p className="label text-[var(--text-muted)]">Workspace Role</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)] capitalize">{role}</p>
            </div>
            <div className="col-span-2 bg-[var(--bg-surface)] p-3.5">
              <p className="label text-[var(--text-muted)]">Employee ID</p>
              <p className="mt-1 text-xs font-mono text-[var(--text-secondary)] break-all">{_id}</p>
            </div>
            <div className="bg-[var(--bg-surface)] p-3.5">
              <p className="label text-[var(--text-muted)]">Joined On</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{formatJoinedDate(createdAt)}</p>
            </div>
            <div className="bg-[var(--bg-surface)] p-3.5">
              <p className="label text-[var(--text-muted)]">Last Active</p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{formatJoinedDate(updatedAt)}</p>
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
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
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
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-primary)] hover:border-[var(--warning)] hover:text-[var(--warning)] transition-colors cursor-pointer"
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
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-[var(--radius-sm)] border border-[var(--danger)]/20 bg-[var(--danger)]/10 text-[var(--danger)] hover:bg-[var(--danger)]/20 hover:border-[var(--danger)]/40 transition-colors cursor-pointer"
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
  const navigate = useNavigate();

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
  // Sorting — keys SearchFilterBar ke sort dropdown se match karte hain
  const [sortBy, setSortBy] = useState("name-asc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of employees to show per page

  // Search/filter badalne pe page 1 par wapas — ye handlers me hi handle kiya,
  // taaki effect ke andar setState (cascading render) na ho.
  const updateSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const updateDepartment = (value) => {
    setDepartmentFilter(value);
    setCurrentPage(1);
  };

  const updateStatus = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Loading — spinner ki jagah card-shaped skeletons, header turant visible rehta hai
  if (isPending) {
    return (
      <div className="flex flex-1 flex-col gap-6 pb-10">
        <EmployeeHeader />
        <EmployeeSkeleton />
      </div>
    );
  }

  // Robust array fallback checks. Support direct arrays and nested `{ employees: [...] }` formats
  const employeesList = Array.isArray(data) ? data : (data?.employees || []);

  // Collect a set of unique department names present in your database to populate the select dropdown
  const uniqueDepartments = [...new Set(employeesList.map((e) => e.department).filter(Boolean))];

  // Filtering filter workflow
  const filteredEmployees = employeesList.filter((employee) => {
    // Name, email ya department — teeno par search (brief ke placeholder ke mutabik)
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      employee.name?.toLowerCase().includes(query) ||
      employee.email?.toLowerCase().includes(query) ||
      employee.department?.toLowerCase().includes(query);
    
    // Check if department matches
    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter;
    
    // Check if status matches
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Sorting — logic utils/employeeList.js me hai (plain node se testable)
  const sortedEmployees = sortEmployees(filteredEmployees, sortBy);

  // Calculate pagination parameters based on sorted + filtered items
  const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / itemsPerPage));
  const paginatedEmployees = sortedEmployees.slice(
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
      <EmployeeHeader />

      {/* 2. Stats cards component (Total, Active, Departments, Admins counts) */}
      <EmployeeStats employees={employeesList} />

      {/* 3. Search and dropdown filters bar controls */}
      <SearchFilterBar
        search={search}
        setSearch={updateSearch}
        departmentFilter={departmentFilter}
        setDepartmentFilter={updateDepartment}
        statusFilter={statusFilter}
        setStatusFilter={updateStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        departments={uniqueDepartments}
      />

      {/* 4. Employees list content (Grid Card view / Table row view) */}
      <div className="flex-1">
        {filteredEmployees.length === 0 ? (
          // Do alag empty states — org bilkul khali vs filters se zero match
          employeesList.length === 0 ? (
            <EmptyState variant="empty" onAddEmployee={() => navigate("/home/add-employee")} />
          ) : (
            <EmptyState
              variant="filtered"
              onClearFilters={() => {
                updateSearch("");
                updateDepartment("all");
                updateStatus("all");
              }}
            />
          )
        ) : viewMode === "grid" ? (
          // Render Grid Layout Cards using paginated items
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedEmployees.map((employee) => {
              const initials = getInitials(employee.name);
              return (
                <div
                  key={employee._id}
                  onClick={() => setSelectedEmployee(employee)}
                  className="flex cursor-pointer flex-col rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 transition-[background-color,border-color,transform] duration-150 hover:-translate-y-0.5 hover:border-[var(--text-muted)]/40 hover:bg-[var(--bg-hover)]"
                >
                  {/* Row 1: identity — avatar left, name+role right, status top-right */}
                  <div className="flex items-start gap-3">
                    {employee.avatar ? (
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="h-9 w-9 shrink-0 rounded-full object-cover border border-[var(--border-color)]"
                      />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent)]">
                        {initials}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-medium text-[var(--text-primary)]">
                        {employee.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs capitalize text-[var(--text-muted)]">
                        {employee.role}
                      </p>
                    </div>
                    <StatusBadge status={employee.status} />
                  </div>

                  {/* Department */}
                  <p className="mt-3 flex items-center gap-1.5 truncate text-xs capitalize text-[var(--text-secondary)]">
                    <Building2 size={13} className="shrink-0 text-[var(--text-muted)]" />
                    {employee.department || "Common"}
                  </p>

                  {/* Row 2: footer — joined date, email, action menu */}
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--border-color)] pt-2.5 text-xs text-[var(--text-muted)]">
                    <span className="tabular-nums flex items-center gap-1.5">
                      <Calendar size={13} />
                      {formatJoinedDate(employee.createdAt)}
                    </span>

                    <div className="flex items-center gap-0.5">
                      <a
                        href={employee.email ? `mailto:${employee.email}` : undefined}
                        onClick={(e) => e.stopPropagation()}
                        title={`Email ${employee.name}`}
                        aria-label={`Email ${employee.name}`}
                        className="rounded-[var(--radius-sm)] p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                      >
                        <Mail size={14} />
                      </a>
                      <EmployeeAction
                        variant="plain"
                        employee={employee}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                      />
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
        pageSize={itemsPerPage}
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

