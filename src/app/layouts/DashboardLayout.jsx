import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import TopNav from "../../features/dashboard/ui/components/TopNav";

const DashboardLayout = () => {
  let { mode } = useSelector((store) => store.theme);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-main)]">
      <TopNav />

      {/* Content: full-width paper, centred max-width container.
          Sidebar rail hata diya, isliye horizontal breathing room badh gayi. */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
        <div className="mx-auto w-full max-w-[1600px] px-6 py-6 lg:px-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;