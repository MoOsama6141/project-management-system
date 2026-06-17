import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const taskData = [
  { status: "Todo", count: 20 },
  { status: "In Progress", count: 15 },
  { status: "Done", count: 35 },
];

const userData = [
  { name: "Active", value: 18 },
  { name: "Inactive", value: 7 },
];

const COLORS = ["#22C55E", "#EF4444"];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Bar Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-slate-800">
          Tasks Overview
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taskData}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#f59e0b"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-slate-800">
          Users Status
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                label
              >
                {userData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}