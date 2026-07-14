import { ChartArea } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const NavigationTab = ({ path, title, Icon }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex gap-3 pl-6 py-2   ${isActive ? "border-r-4 border-[var(--bg-primary)] bg-[var(--secondary)]" : ""}`
      }
      to={path}
      end="/"
    >
      {Icon}
      {title}
    </NavLink>
  );
};

export default NavigationTab;
