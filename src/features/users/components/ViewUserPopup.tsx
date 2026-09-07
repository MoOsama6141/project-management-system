import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import viewUser from "../api/ViewUser";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

interface ViewUserPopupProps {
  userId: string | number | null;
  open: boolean;
  onClose: () => void;
}

interface UserDetails {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  isActivated: boolean;
  group?: {
    id: number;
    name: string;
    creationDate?: string;
    modificationDate?: string;
  };
  creationDate?: string;
  modificationDate?: string;
}

function ViewUserPopup({ userId, open, onClose }: ViewUserPopupProps) {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !userId) return;

    const loadUser = async () => {
      setLoading(true);
      try {
        const data = await viewUser(String(userId));
        setUser(data);
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [open, userId]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-border bg-card shadow-[0_30px_80px_rgba(15,23,42,0.35)] ring-1 ring-border/60"
      >
        <div className="flex items-center justify-between border-b border-border bg-[linear-gradient(135deg,rgba(49,89,81,0.12),transparent)] px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              User Details
            </h2>
            <p className="text-sm text-muted-foreground">
              Detailed information about the selected user
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {loading ? (
            <div className="py-10">
              <LoadingSpinner
                size={28}
                className="py-4"
                label="Loading user details"
              />
            </div>
          ) : !user ? (
            <div className="py-10 text-center text-red-500">
              Unable to load user details.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-5 rounded-3xl border border-border bg-[linear-gradient(135deg,rgba(49,89,81,0.10),rgba(15,23,42,0.02))] p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-semibold text-primary">
                    {user.userName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {user.userName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold text-white ${
                    user.isActivated ? "bg-emerald-600" : "bg-rose-600"
                  }`}
                >
                  {user.isActivated ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </p>
                  <p className="mt-1 text-base text-foreground">
                    {user.phoneNumber || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Country
                  </p>
                  <p className="mt-1 text-base text-foreground">
                    {user.country || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Role / Group
                  </p>
                  <p className="mt-1 text-base text-foreground">
                    {user.group?.name || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    User ID
                  </p>
                  <p className="mt-1 text-base text-foreground">{user.id}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Account Dates
                </p>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Created
                    </p>
                    <p className="text-sm text-foreground">
                      {user.creationDate
                        ? new Date(user.creationDate).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Last Modified
                    </p>
                    <p className="text-sm text-foreground">
                      {user.modificationDate
                        ? new Date(user.modificationDate).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default ViewUserPopup;
