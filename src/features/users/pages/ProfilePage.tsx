import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarDays,
  UserRound,
  BadgeCheck,
} from "lucide-react";

import getCurrentUser from "@/features/users/api/CurrentUser";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ErrorState from "@/components/shared/ErrorState";

const ProfilePage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
  });

  const user = data ?? {};
  const roleName = user?.group?.name ?? "User";
  const isActivated = user?.isActivated ? "Active" : "Inactive";

  if (isPending) {
    return (
      <main className="min-h-screen px-6 py-20">
        <div className="flex min-h-62.5 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
          <LoadingSpinner size={32} label="Loading profile" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen px-6 py-20">
        <ErrorState title="Profile could not be loaded" />
      </main>
    );
  }

  return (
    <main className="bg-background px-6 py-8 mt-20">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-[28px] border border-border bg-card shadow-sm"
        >
          <div className="flex flex-col gap-6 border-b border-border px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Profile
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-foreground">
                My Account
              </h1>
            </div>

            <div className="flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <BadgeCheck size={16} />
              {isActivated}
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 lg:grid-cols-[320px_1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: -14 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-3xl bg-linear-to-br from-[#0f766e] via-[#0e3b37] to-[#0f172a] p-6 text-white shadow-md"
            >
              <div className="flex items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/40 bg-white/10 text-3xl font-bold shadow-lg">
                  {user?.userName?.charAt(0)?.toUpperCase() ?? "U"}
                </div>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold">
                  {user?.userName ?? "Unknown User"}
                </h2>
                <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white/90">
                  <ShieldCheck size={15} />
                  {roleName}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="space-y-5"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <InfoCard
                  icon={<UserRound size={18} />}
                  label="Username"
                  value={user?.userName ?? "-"}
                />
                <InfoCard
                  icon={<Mail size={18} />}
                  label="Email"
                  value={user?.email ?? "-"}
                />
                <InfoCard
                  icon={<Phone size={18} />}
                  label="Phone"
                  value={user?.phoneNumber ?? "-"}
                />
                <InfoCard
                  icon={<MapPin size={18} />}
                  label="Country"
                  value={user?.country ?? "-"}
                />
                <InfoCard
                  icon={<ShieldCheck size={18} />}
                  label="Role"
                  value={roleName}
                />
                <InfoCard
                  icon={<CalendarDays size={18} />}
                  label="Member Since"
                  value={
                    user?.creationDate
                      ? new Date(user.creationDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )
                      : "-"
                  }
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const InfoCard = ({ icon, label, value }: InfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35 }}
    whileHover={{ y: -3, scale: 1.01 }}
    className="rounded-2xl border border-border bg-muted/30 p-4"
  >
    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
      {icon}
      {label}
    </div>
    <div className="text-base font-semibold text-foreground">{value}</div>
  </motion.div>
);

export default ProfilePage;
