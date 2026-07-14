import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import AsideNav from "../../features/dashboard/ui/components/AsideNav";
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
    <div className="h-screen grid grid-cols-[1fr_7fr] overflow-hidden">
      {/* Sidebar: scrollable but visual scrollbar is hidden */}
      <div className="border-r border-gray-500 py-4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
        <AsideNav />
      </div>
      
      {/* Right panel: TopNav fixed at top */}
      <div className="flex flex-col gap-5 px-6 py-4 h-full overflow-hidden">
        <TopNav />
        {/* Content Area: scrolls smoothly but scrollbar track is completely invisible */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
