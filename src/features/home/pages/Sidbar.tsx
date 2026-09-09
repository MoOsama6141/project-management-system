import { NavLink } from "react-router-dom";
import {
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";

const AdminSidebarItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Users", to: "/users", icon: Users },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Tasks", to: "/tasks", icon: ClipboardList },
];

const employeeSidebarItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Tasks", to: "/tasks", icon: ClipboardList },
];

function Sidbar() {
  const role = useAuthStore((state) => state.role) ?? "";
  console.log(role , "rooooooooooole");
  
  const isManager = role === "manager" || role === "admin";
  const mainSideBar = isManager ? AdminSidebarItems : employeeSidebarItems;

  return (
    <aside className="min-h-screen p-2 md:p-4">
      <nav>
        <ul className="space-y-2 mt-3 md:mt-0">
          {mainSideBar.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.to} className="w-full">
                <NavLink
                  to={item.to}
                  title={item.label}
                  className={({ isActive }) =>
                    `flex w-full items-center justify-center gap-2 rounded-md p-1 md:px-2 p-1 md:py-2.5 text-white transition-colors duration-300 md:justify-start ${
                      isActive
                        ? "bg-[#F5A623] text-white"
                        : "hover:bg-[#F5A623]/80"
                    }`
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="hidden text-sm font-medium md:inline-block">
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidbar;
