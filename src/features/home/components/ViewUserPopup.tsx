import { useEffect, useState } from "react";
import { X } from "lucide-react";
import viewUser from "../api/ViewUser";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              User Details
            </h2>
            <p className="text-sm text-slate-500">
              Detailed information about the selected user
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {loading ? (
            <div className="py-10 text-center text-slate-500">
              Loading user details...
            </div>
          ) : !user ? (
            <div className="py-10 text-center text-red-500">
              Unable to load user details.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#486F65] text-xl font-semibold text-white">
                    {user.userName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {user.userName}
                    </h3>
                    <p className="text-sm text-slate-500">{user.email}</p>
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
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Phone Number
                  </p>
                  <p className="mt-1 text-base text-slate-800">
                    {user.phoneNumber || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">Country</p>
                  <p className="mt-1 text-base text-slate-800">
                    {user.country || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">
                    Role / Group
                  </p>
                  <p className="mt-1 text-base text-slate-800">
                    {user.group?.name || "-"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-medium text-slate-500">User ID</p>
                  <p className="mt-1 text-base text-slate-800">{user.id}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-500">
                  Account Dates
                </p>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Created
                    </p>
                    <p className="text-sm text-slate-700">
                      {user.creationDate
                        ? new Date(user.creationDate).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Last Modified
                    </p>
                    <p className="text-sm text-slate-700">
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
      </div>
    </div>
  );
}

export default ViewUserPopup;
