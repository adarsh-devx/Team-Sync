import React from "react";
import { Search, Grid, List, SlidersHorizontal, ChevronDown } from "lucide-react";

const SearchFilterBar = ({
  search,
  setSearch,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  departments = [],
}) => {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] mb-6 shadow-sm">
      {/* 1. Compact Search Bar (Max width limited to md) */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none focus:border-purple-500 transition-colors"
        />
      </div>

      {/* 2. Filters & View Toggles Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        {/* Filters Group (Left aligned) */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
            <SlidersHorizontal size={14} className="text-purple-400" />
            <span>Filters:</span>
          </div>

          {/* Department filter selection */}
          <div className="relative">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 text-sm rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-purple-500/40 text-[var(--text-primary)] outline-none focus:border-purple-500 hover:bg-[var(--bg-hover)] transition-all cursor-pointer shadow-sm w-full"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
            />
          </div>

          {/* Status filter selection */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 text-sm rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] hover:border-purple-500/40 text-[var(--text-primary)] outline-none focus:border-purple-500 hover:bg-[var(--bg-hover)] transition-all cursor-pointer shadow-sm w-full"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
            />
          </div>
        </div>

        {/* View Mode Toggle switches (Right aligned) */}
        <div className="flex items-center bg-[var(--bg-main)] border border-[var(--border-color)] rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "grid"
                ? "bg-purple-600 text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            title="Grid View"
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              viewMode === "list"
                ? "bg-purple-600 text-white"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
            title="List View"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
