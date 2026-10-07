import { Plus, SearchX, Users } from "lucide-react";
import Button from "../Button";

/**
 * Do alag empty states — brief ke mutabik inko mix nahi karna:
 *  - "empty"    : organization me hi koi employee nahi  -> onboarding CTA
 *  - "filtered" : search/filter se zero match           -> clear filters CTA
 */
const EmptyState = ({ variant = "filtered", onClearFilters, onAddEmployee }) => {
  const isOrgEmpty = variant === "empty";
  const Icon = isOrgEmpty ? Users : SearchX;

  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--bg-hover)] text-[var(--text-muted)]">
        <Icon size={20} strokeWidth={1.75} />
      </div>

      <h2 className="font-display mt-4 text-base font-semibold text-[var(--text-primary)]">
        {isOrgEmpty ? "No employees yet" : "No employees found"}
      </h2>

      <p className="mt-1 max-w-xs text-sm text-[var(--text-muted)]">
        {isOrgEmpty
          ? "Add your first employee to get started."
          : "No employees match your current search or filters."}
      </p>

      <div className="mt-5">
        {isOrgEmpty ? (
          <Button variant="primary" icon={Plus} onClick={onAddEmployee}>
            Add Employee
          </Button>
        ) : (
          <Button variant="secondary" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
