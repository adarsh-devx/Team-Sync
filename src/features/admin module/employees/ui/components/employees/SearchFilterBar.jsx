import { useState, useRef, useEffect } from "react";
import { Search, Grid, List, Check, ChevronDown } from "lucide-react";

// Custom dropdown — native <select> ka blue highlight browser-controlled hota hai,
// isliye apna dropdown banaya: highlight sirf hover pe, theme tokens ke saath.
const FilterDropdown = ({ value, onChange, options, className = "w-full sm:w-44" }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Bahar click pe dropdown band
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-main)] py-2 pl-3.5 pr-3 text-sm text-[var(--text-primary)] outline-none transition-colors hover:border-[var(--text-muted)]/50 focus-visible:border-[var(--accent)]"
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-30 mt-1.5 w-full min-w-[10rem] rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-surface)] py-1 shadow-[var(--shadow-md)]"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between px-3.5 py-2 text-left text-[13px] transition-colors ${
                opt.value === value
                  ? "font-medium text-[var(--accent)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="truncate">{opt.label}</span>
              {opt.value === value && <Check size={13} className="shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchFilterBar = ({
  search,
  setSearch,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  departments = [],
}) => {
  // NOTE: inhi `sortBy` keys ko Employee.jsx ki sorting switch handle karti hai —
  // value badli to dono jagah badalni padegi.
  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "newest", label: "Newest first" },
    { value: "oldest", label: "Oldest first" },
  ];

  const toggleBtn = (active) =>
    `cursor-pointer rounded-[var(--radius-sm)] p-1.5 transition-colors ${
      active
        ? "bg-[var(--accent)] text-white"
        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
    }`;

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Left: search + dropdown filters */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-72 lg:w-80">
          <label htmlFor="employee-search" className="sr-only">
            Search employees
          </label>
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            id="employee-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or department..."
            className="w-full rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-main)] py-2 pl-10 pr-3 text-sm text-[var(--text-primary)] outline-none transition-colors placeholder:text-[var(--text-muted)] focus-visible:border-[var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <FilterDropdown
            value={departmentFilter}
            onChange={setDepartmentFilter}
            options={[
              { value: "all", label: "All Departments" },
              ...departments.map((dept) => ({
                value: dept,
                label: dept.charAt(0).toUpperCase() + dept.slice(1),
              })),
            ]}
          />

          <FilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "All Statuses" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
        </div>
      </div>

      {/* Right: view toggle + sort */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
        <div
          role="group"
          aria-label="View mode"
          className="inline-flex items-center gap-1 self-start rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-main)] p-1"
        >
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            title="Grid view"
            className={toggleBtn(viewMode === "grid")}
          >
            <Grid size={15} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            title="List view"
            className={toggleBtn(viewMode === "list")}
          >
            <List size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-[var(--text-muted)] sm:inline">Sort by</span>
          <FilterDropdown
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
            className="w-full sm:w-40"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;