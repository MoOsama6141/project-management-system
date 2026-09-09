import { motion } from "framer-motion";
import DashboardCharts from "@/components/charts/DashboardCharts";
import { ClipboardList, FolderKanban, TrendingUp } from "lucide-react";
import getTaskCount from "../api/Users";
import getCurrentUser from "@/features/users/api/CurrentUser";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const { data: currentUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
  });

  const displayName =
    currentUser?.userName ??
    currentUser?.fullName ??
    currentUser?.name ??
    "User";

  const { data: taskCount } = useQuery({
    queryKey: ["taskCount"],
    queryFn: getTaskCount,
  });

  const cards = [
    {
      icon: <TrendingUp size={18} />,
      title: "Progress",
      value: "$ 7328.32",
      bg: "bg-[linear-gradient(135deg,#ecf3ff,#dfeaff)]",
      iconBg: "bg-[#CAD6FF]",
      text: "text-[#4A5D92]",
      glow: "shadow-blue-200/50",
    },
    {
      icon: <ClipboardList size={18} />,
      title: "Tasks Number",
      value: "1293",
      bg: "bg-[linear-gradient(135deg,#fff9e8,#f9f2d0)]",
      iconBg: "bg-[#F1E0A3]",
      text: "text-[#7A6D12]",
      glow: "shadow-amber-200/50",
    },
    {
      icon: <FolderKanban size={18} />,
      title: "Projects Number",
      value: "32",
      bg: "bg-[linear-gradient(135deg,#fff1f7,#f9dfe9)]",
      iconBg: "bg-[#F0C4D7]",
      text: "text-[#8B4969]",
      glow: "shadow-pink-200/50",
    },
  ];

  return (
    <div className="space-y-6 bg-background px-2 md:px-6 pb-5 pt-20">
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative h-55 overflow-hidden rounded-[30px] bg-cover bg-center shadow-sm animate-float-slow"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-[#0b1d2e]/55" />

        <div className="relative z-10 flex h-full flex-col justify-center px-10">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-light text-white"
          >
            Welcome
            <span className="ml-2 font-medium text-amber-400">
              {displayName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-[25px] md:text-2xl font-light text-white/95"
          >
            You can add project and assign tasks to your team
          </motion.p>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_1.35fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="rounded-[28px] bg-card p-6 shadow-sm ring-1 ring-border"
        >
          <h3 className="text-[30px] font-semibold text-foreground">Tasks</h3>

          <p className="mt-2 text-base text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.12 + index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`${card.bg} rounded-[22px] p-4 shadow-lg ${card.glow} ring-1 ring-white/40`}
              >
                <div
                  className={`mb-5 flex h-10 w-10 items-center justify-center rounded-full ${card.iconBg} ${card.text} shadow-sm`}
                >
                  {card.icon}
                </div>

                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>
                <h4 className="mt-2 text-[18px] font-semibold text-slate-800">
                  {card.value}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="animate-pulse-glow"
        >
          <DashboardCharts taskCount={taskCount} />
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
