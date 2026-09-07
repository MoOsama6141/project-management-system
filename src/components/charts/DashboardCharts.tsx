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

const userData = [
  { name: "Active", value: 18 },
  { name: "Inactive", value: 7 },
];

const COLORS = ["#0a725c", "#EF4444"];

export default function DashboardCharts({ taskCount }: { taskCount: any }) {
  const taskData = [
    { status: "Todo", count: taskCount?.toDo || 0 },
    { status: "In Progress", count: taskCount?.inProgress || 0 },
    { status: "Done", count: taskCount?.done || 0 },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="rounded-[28px] bg-card p-6 shadow-sm ring-1 ring-border">
        <h2 className="mb-6 text-lg font-semibold text-foreground">
          Tasks Overview
        </h2>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taskData}>
              <XAxis dataKey="status" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
              />
              <Bar
                dataKey="count"
                fill="var(--accent-orange)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[28px] bg-card p-6 shadow-sm ring-1 ring-border">
        <h2 className="mb-6 text-lg font-semibold text-foreground">
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
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--foreground)",
                }}
              />
              <Legend wrapperStyle={{ color: "var(--foreground)" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
