import { useSelector } from "react-redux";
import NavigationTab from "./NavigationTab";
import {
  adminNavigation,
  employeeNavigation,
} from "../../../../app/constant/navigations";

const AsideNav = () => {
  let { employee } = useSelector((store) => store.auth);

  let navigations =
    employee?.role === "admin" ? adminNavigation : employeeNavigation;

  return (
    <div className="flex h-full flex-col">
      {/* Brand: accent mark + display wordmark — pehli nazar me identity */}
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-7">
        <img src="/logo.webp" alt="team-sync" className="h-7 w-7 shrink-0 object-contain" />
        <span className="font-display text-lg font-semibold tracking-tight text-[var(--text-ink)]">
          team-sync
        </span>
      </div>

      {/* Section label — chhota uppercase, typographic contrast */}
      <p className="label px-5 pb-2 text-[var(--text-ink-muted)]">
        Workspace
      </p>

      <nav className="flex flex-col gap-0.5 px-3">
        {navigations.map((nav) => {
          return (
            <NavigationTab key={nav.path} path={nav.path} Icon={nav.Icon} title={nav.title} />
          );
        })}
      </nav>

      {/* Footer: version chip — chhoti detail, bada authenticity signal */}
      <div className="mt-auto border-t border-[var(--border-ink)] px-5 py-4">
        <p className="text-xs text-[var(--text-ink-muted)]">
          team-sync · v0.1.0
        </p>
      </div>
    </div>
  );
};

export default AsideNav;
