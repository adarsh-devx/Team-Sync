import { ChevronLeft, ChevronRight } from "lucide-react";
import { getShowingLabel } from "../../../utils/employeeList";

/**
 * Footer bar — brief ke mutabik hamesha visible rehta hai (1 page par bhi),
 * kyunki "Showing 8 of 8 employees" hi user ko total count batata hai.
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
  pageSize = 8,
}) => {
  const safeTotalPages = Math.max(1, totalPages);
  const showingLabel = getShowingLabel({ currentPage, totalPages, totalItems, pageSize });

  const navBtn =
    "inline-flex cursor-pointer items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-main)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav
      aria-label="Employee pagination"
      className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-color)] pt-4"
    >
      <p className="tabular-nums text-xs text-[var(--text-muted)]">{showingLabel}</p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className={navBtn}
        >
          <ChevronLeft size={15} />
        </button>

        {Array.from({ length: safeTotalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
            className={`tabular-nums min-w-[30px] cursor-pointer rounded-[var(--radius-sm)] border px-2 py-1.5 text-xs font-semibold transition-colors ${
              currentPage === page
                ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                : "border-[var(--border-color)] bg-[var(--bg-main)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= safeTotalPages}
          aria-label="Next page"
          className={navBtn}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
