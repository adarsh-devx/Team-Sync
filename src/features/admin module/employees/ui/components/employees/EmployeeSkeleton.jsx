// Skeletons ki dimensions asli components se match karti hain
// (StatCard: p-5 + 11x11 icon box, Card: p-4 + 9x9 avatar)
// taaki data aane pe layout shift na ho.

const StatCardSkeleton = () => (
  <div className="flex items-start gap-4 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
    <div className="skeleton h-11 w-11 shrink-0 rounded-lg" />
    <div className="flex-1 space-y-2.5 pt-0.5">
      <div className="skeleton h-2.5 w-24" />
      <div className="skeleton h-5 w-10" />
      <div className="skeleton h-2.5 w-28" />
    </div>
  </div>
);

const EmployeeCardSkeleton = () => (
  <div className="flex flex-col rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
    <div className="flex items-start gap-3">
      <div className="skeleton h-9 w-9 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-2 pt-0.5">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-2.5 w-16" />
      </div>
      <div className="skeleton h-4 w-14 shrink-0 rounded-full" />
    </div>

    <div className="skeleton mt-3 h-2.5 w-20" />

    <div className="mt-3 flex items-center justify-between border-t border-[var(--border-color)] pt-2.5">
      <div className="skeleton h-2.5 w-24" />
      <div className="skeleton h-3.5 w-14" />
    </div>
  </div>
);

// Poora loading view: stats row + card grid, dono real layout ke grid par
const EmployeeSkeleton = ({ statCount = 4, cardCount = 8 }) => (
  <div role="status" aria-live="polite" className="flex flex-1 flex-col gap-6">
    <span className="sr-only">Loading team members...</span>

    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: statCount }, (_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: cardCount }, (_, i) => (
        <EmployeeCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default EmployeeSkeleton;
