/**
 * Employee list derivation — sorting aur "Showing X of Y" label ki pure logic.
 * Component se bahar rakhi hai taaki plain node se test ho sake (DOM ki zaroorat nahi).
 */

const byName = (a, b) => (a.name || "").localeCompare(b.name || "");
const byDate = (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0);

// `sortBy` keys SearchFilterBar ke dropdown se match karte hain
export const sortEmployees = (employees = [], sortBy = "name-asc") => {
  // Spread — original array mutate nahi hoti
  switch (sortBy) {
    case "name-desc":
      return [...employees].sort((a, b) => byName(b, a));
    case "newest":
      return [...employees].sort((a, b) => byDate(b, a));
    case "oldest":
      return [...employees].sort(byDate);
    case "name-asc":
    default:
      return [...employees].sort(byName);
  }
};

/**
 * Single page  -> "Showing 8 of 8 employees"
 * Multi page   -> "Showing 9-16 of 20 employees"
 */
export const getShowingLabel = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 8,
}) => {
  if (Math.max(1, totalPages) <= 1) {
    return `Showing ${totalItems} of ${totalItems} employees`;
  }

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  return `Showing ${start}-${end} of ${totalItems} employees`;
};

// ---------------------------------------------------------------------------
// Display helpers — pehle EmployeeRow.jsx se export hote the. Alag plain module me
// bhej diye taaki component file sirf components export kare (react-refresh lint).
// ---------------------------------------------------------------------------

export const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const formatJoinedDate = (dateStr) => {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};