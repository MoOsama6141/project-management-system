import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUsers from "../api/Users";
import { Button } from "@/components/table/ui/button";
import { Input } from "@/components/table/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/table/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Eye,
  Slash,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import ViewUserPopup from "../components/ViewUserPopup";
import ToggleUser from "../api/ToggleUser";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const normalizeUsers = (response: any) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.users)) return response.users;
  return [];
};

const formatCreatedAt = (value: any) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
};

const getUserName = (user: any) => {
  return (
    user?.name || user?.userName || user?.fullName || user?.user || "Unknown"
  );
};

const getPhoneNumber = (user: any) => {
  return user?.phoneNumber || user?.phone || "-";
};

const getEmail = (user: any) => {
  return user?.email || user?.userEmail || "-";
};

const getStatusLabel = (user: any) => {
  if (typeof user?.status === "string") return user.status;
  if (typeof user?.isActivated === "boolean")
    return user.isActivated ? "Active" : "Not Active";
  return "Unknown";
};

const isActiveStatus = (user: any) => {
  const status = getStatusLabel(user).toLowerCase();
  return status === "active" || status === "active";
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | number | null>(
    null,
  );
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["users-list", pageNumber],
    queryFn: () => getUsers(pageNumber, 10),
  });

  const toggleUserMutation = useMutation({
    mutationFn: (userId: string) => ToggleUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users-list"] });
      toast.success("User status updated successfully");
    },
  });

  const users = useMemo(() => {
    const list = normalizeUsers(data);
    if (!searchTerm) return list;

    const normalizedSearch = searchTerm.toLowerCase();
    return list.filter((user: any) => {
      return [
        getUserName(user),
        getEmail(user),
        getPhoneNumber(user),
        getStatusLabel(user),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [data, searchTerm]);

  const totalCount =
    data?.totalNumberOfRecords ??
    data?.totalCount ??
    data?.count ??
    users.length;
  const currentPage = data?.pageNumber ?? pageNumber;
  const pageSize = data?.pageSize ?? 10;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const handleToggleUserStatus = (userId: string | number) => {
    toggleUserMutation.mutate(String(userId));
  };

  return (
    <main className="bg-background min-h-screen pb-5 pt-20 px-6">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-foreground">Users</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage all users and view the latest account details.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, email, or phone"
                className="pl-9 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-4 sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Users
                </p>
                <p className="text-base text-foreground">
                  Latest accounts from your organization
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                {isLoading || isFetching ? (
                  <LoadingSpinner
                    size={18}
                    className="justify-start"
                    label="Loading"
                  />
                ) : isError ? (
                  "Unable to load users."
                ) : (
                  `${users.length} users shown`
                )}
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-[#0a725c] ">
                <TableHead className="text-primary-foreground">
                  <div className="flex items-center gap-2">
                    User Name
                    <ChevronsUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="text-primary-foreground">
                  <div className="flex items-center gap-2">
                    Status
                    <ChevronsUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="text-primary-foreground">
                  <div className="flex items-center gap-2">
                    Phone Number
                    <ChevronsUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="text-primary-foreground">
                  <div className="flex items-center gap-2">
                    Email
                    <ChevronsUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="text-primary-foreground">
                  <div className="flex items-center gap-2">
                    Date Created
                    <ChevronsUpDown size={14} />
                  </div>
                </TableHead>
                <TableHead className="w-14 text-primary-foreground" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow className="bg-card">
                  <TableCell colSpan={6} className="py-12">
                    <LoadingSpinner
                      size={28}
                      className="py-2"
                      label="Loading users"
                    />
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow className="bg-neutral-50">
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-red-500"
                  >
                    Failed to load users.
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow className="bg-neutral-50">
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-slate-500"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any, index: number) => {
                  const statusLabel = getStatusLabel(user);
                  const active = isActiveStatus(user);

                  return (
                    <TableRow
                      key={user.id || user._id || `${index}`}
                      className={index % 2 === 0 ? "bg-card" : "bg-muted/40"}
                    >
                      <TableCell className="text-foreground">
                        {getUserName(user)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                            active ? "bg-emerald-600" : "bg-rose-600"
                          }`}
                        >
                          {statusLabel}
                        </span>
                      </TableCell>
                      <TableCell className="text-foreground">
                        {getPhoneNumber(user)}
                      </TableCell>
                      <TableCell className="max-w-55 truncate text-muted-foreground">
                        {getEmail(user)}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {formatCreatedAt(user.creationDate)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreVertical size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-40 bg-white"
                          >
                            <DropdownMenuItem
                              className="text-slate-700 hover:bg-slate-100"
                              onClick={() => {
                                setSelectedUserId(user.id || user._id || null);
                                setIsViewModalOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 hover:bg-red-100"
                              onClick={() =>
                                handleToggleUserStatus(user.id || user._id)
                              }
                            >
                              <Slash className="mr-2 h-4 w-4" />
                              Block
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">
              Showing <strong>{users.length}</strong> of{" "}
              <strong>{totalCount}</strong> Results
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={currentPage <= 1 || isFetching}
                  onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
                >
                  <ChevronLeft size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  disabled={currentPage >= totalPages || isFetching}
                  onClick={() => setPageNumber((prev) => prev + 1)}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ViewUserPopup
        userId={selectedUserId}
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </main>
  );
}
