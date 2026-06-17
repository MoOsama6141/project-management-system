import { ClipboardList, FolderKanban, TrendingUp } from "lucide-react";
import DashboardCharts from "../components/charts/DashboardCharts";

const HomePage = () => {
  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <section
        className="relative h-[220px] overflow-hidden rounded-3xl bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full flex-col justify-center px-10">
          <h1 className="text-5xl font-light text-white">
            Welcome <span className="font-medium text-amber-400">Omar</span>
          </h1>

          <p className="mt-5 text-2xl font-light text-white/95">
            You can add project and assign tasks to your team
          </p>
        </div>
      </section>

      {/* Statistics + Chart */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-800">Tasks</h3>

          <p className="mb-6 text-sm text-slate-400">
            Lorem ipsum dolor sit amet, consectetur
          </p>

          <div className="grid grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="rounded-2xl bg-indigo-100 p-4">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200">
                <TrendingUp size={18} />
              </div>

              <p className="text-sm text-slate-500">Progress</p>

              <h4 className="mt-1 text-2xl font-semibold">$ 7328.32</h4>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-yellow-100 p-4">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-200">
                <ClipboardList size={18} />
              </div>

              <p className="text-sm text-slate-500">Tasks Number</p>

              <h4 className="mt-1 text-2xl font-semibold">1293</h4>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-pink-100 p-4">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-200">
                <FolderKanban size={18} />
              </div>

              <p className="text-sm text-slate-500">Projects Number</p>

              <h4 className="mt-1 text-2xl font-semibold">32</h4>
            </div>
          </div>
        </div>

        {/* Chart */}
        <DashboardCharts />
      </section>
    </div>
  );
};

export default HomePage;
