import { NavLink } from "react-router";

// Top-bar ke liye horizontal nav pill. AsideNav (retired) isi ko vertical
// ink-sidebar style me use karta tha; ab shell me sirf top bar hai.
const NavigationTab = ({ path, title, Icon }) => {
  return (
    <NavLink
      to={path}
      end={path === "/home"}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors ${
          isActive
            ? "bg-[var(--accent-soft)] text-[var(--accent)]"
            : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
        }`
      }
    >
      <span className="[&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">{Icon}</span>
      {title}
    </NavLink>
  );
};

export default NavigationTab;