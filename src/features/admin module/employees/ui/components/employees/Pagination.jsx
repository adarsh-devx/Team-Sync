import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
}) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between border-t border-[var(--border-color)] px-4 py-4 sm:px-6 mt-6 bg-[var(--bg-surface)] rounded-2xl shadow-sm">
      {/* Mobile view showing simplified count and controls */}
      <div className="flex flex-1 justify-between items-center sm:hidden">
        <span className="text-xs text-[var(--text-muted)] font-medium">
          Page {currentPage} of {totalPages} ({totalItems} total)
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            Prev
          </button>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Desktop view showing pagination numbers & total results */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[var(--text-muted)]">
            Showing Page{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {totalPages}
            </span>{" "}
            <span className="text-[var(--text-muted)]/60">
              ({totalItems} total employees)
            </span>
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-xl shadow-sm gap-1"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-xl p-2 text-[var(--text-muted)] border border-[var(--border-color)] bg-[var(--bg-main)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-colors"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft size={16} />
            </button>

            {/* Page Number Buttons */}
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`relative inline-flex items-center rounded-xl px-3.5 py-1.5 text-sm font-semibold cursor-pointer border transition-colors ${
                  currentPage === page
                    ? "z-10 bg-purple-600 border-purple-600 text-white"
                    : "text-[var(--text-muted)] border-[var(--border-color)] bg-[var(--bg-main)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-xl p-2 text-[var(--text-muted)] border border-[var(--border-color)] bg-[var(--bg-main)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-colors"
            >
              <span className="sr-only">Next</span>
              <ChevronRight size={16} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
