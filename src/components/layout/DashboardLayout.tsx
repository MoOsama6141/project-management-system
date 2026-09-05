// layouts/DashboardLayout.tsx

import Navbar from "@/features/home/pages/Navbar";
import Sidbar from "@/features/home/pages/Sidbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-10">
        <Navbar />
    </div>


    <div className="flex">
      <aside className="fixed left-0 top-12 h-screen w-40 bg-[#0E382F] text-white">
        <Sidbar />
      </aside>

      <main className="ms-40 py-0 flex-1 ">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default DashboardLayout;
