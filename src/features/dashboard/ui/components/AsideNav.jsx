import React from "react";
import { NavLink } from "react-router";
import NavigationTab from "./NavigationTab";
import { ChartArea } from "lucide-react";
import { useSelector } from "react-redux";
import {
  adminNavigation,
  employeeNavigation,
} from "../../../../app/constant/navigations";

const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);

  let navigations =
    employee?.role === "admin" ? adminNavigation : employeeNavigation;

  return (
    <div>
      <div className="flex flex-col gap-2 mb-6 px-6">
        <h1 className="text-3xl font-semibold text-[#CAB8F9] ">team-sync</h1>
        <p className="text-sm  text-[var(--text-muted)]">
          Enterprise Workspace
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {navigations.map((nav) => {
          return (
            <NavigationTab path={nav.path} Icon={nav.Icon} title={nav.title} />
          );
        })}
      </div>
    </div>
  );
};

export default AsideNav;
