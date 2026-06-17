import { Link } from "react-router-dom";

const sidebarItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Admin Panel", to: "/admin" },
  { label: "Projects", to: "/projects" },
  { label: "Admin Tasks", to: "/admin/tasks" },
  { label: "Tasks", to: "/tasks" },
];

function Sidbar() {
  return (
    <aside className="p-4 bg-slate-50 min-h-screen">
      <nav>
        <ul className="space-y-3">
          {sidebarItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-slate-700 hover:text-slate-900"
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
