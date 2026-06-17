// layouts/DashboardLayout.tsx

import { Outlet } from "react-router-dom";
import Sidbar from "../../pages/Sidbar";
import Navbar from "../../pages/Navbar";

const DashboardLayout = () => {
  return (
    <>
    <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-10">
        <Navbar />
    </div>


    <div className="flex">
      <aside className="fixed left-0 top-15 h-screen w-40">
        <Sidbar />
      </aside>

      <main className="ms-40 py-20 flex-1 px-6">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default DashboardLayout;
