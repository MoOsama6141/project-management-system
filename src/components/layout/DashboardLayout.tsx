import { motion } from "framer-motion";
import Navbar from "@/features/home/pages/Navbar";
import Sidbar from "@/features/home/pages/Sidbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed left-0 top-0 z-10 w-full bg-gray-800 text-white"
      >
        <Navbar />
      </motion.div>

      <div className="flex">
        <motion.aside
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="fixed left-0 top-16 h-screen w-40 bg-[#0E382F] text-white shadow-lg"
        >
          <Sidbar />
        </motion.aside>

        <motion.main
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
          className="ms-40 flex-1 py-0"
        >
          <Outlet />
        </motion.main>
      </div>
    </>
  );
};

export default DashboardLayout;
