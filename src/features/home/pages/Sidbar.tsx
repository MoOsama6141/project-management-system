import { NavLink } from "react-router-dom";

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

const role = window.localStorage.getItem("role")?.toLowerCase();
const manager = role === "manager" || role === "admin";

function Sidbar() {
  if (manager) mainSideBar = AdminSidebarItems;
  else mainSideBar = employeeSidebarItems;

  return (
    <aside className="p-4 min-h-screen">
      <nav>
        <ul className="">
          {mainSideBar?.map((item) => (
            <li
              key={item.to}
              className="rounded-lg w-full px-1 py-2 text-white transition-colors duration-300"
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-md px-2 py-2 transition-colors duration-300  w-full ${
                    isActive ? "bg-[#F5A623] text-white" : "hover:bg-[#F5A623]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidbar;
