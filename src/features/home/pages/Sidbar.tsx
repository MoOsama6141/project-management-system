import { Link } from "react-router-dom";

const AdminSidebarItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "users", to: "/users" },
  { label: "Projects", to: "/projects" },
  { label: "Tasks", to: "/tasks" },
];
const employeeSidebarItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Projects", to: "/projects" },
  { label: "Tasks", to: "/tasks" },
];

let mainSideBar = [];

const manager = window.localStorage.getItem("role") === "Manager";

function Sidbar() {
  if (manager) mainSideBar = AdminSidebarItems;
  else mainSideBar = employeeSidebarItems;
  return (
    <aside className="p-4  min-h-screen">
      <nav>
        <ul className="space-y-3">
          {mainSideBar?.map((item) => (
            <li key={item.to} className="rounded-lg px-4 py-2 text-white hover:bg-[#F5A623] transition-colors duration-300">
              <Link
                to={item.to}
                className="  transition-colors duration-300 w-full"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidbar;
