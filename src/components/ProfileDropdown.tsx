import { ChevronDown, LayoutDashboard, LogOut, UserCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/app/store/auth.store";
import { Button } from "@/components/table/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/table/ui/dropdown-menu";
import getCurrentUser from "@/features/users/api/CurrentUser";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const setRole = useAuthStore((state) => state.setRole);
  const { data: currentUser } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
  });
  const displayName =
    currentUser?.userName ??
    currentUser?.fullName ??
    currentUser?.name ??
    "User";
  const role = currentUser?.group?.name ?? "employee";
  const normalizedRole = role.trim().toLowerCase() as
    | "manager"
    | "employee"
    | "admin"
    | "user";

  useEffect(() => {
    setRole(normalizedRole);
    window.localStorage.setItem("role", normalizedRole);
  }, [normalizedRole, setRole]);


  const handleLogout = () => {
    useAuthStore.getState().setToken(null);
    useAuthStore.getState().setEmail(null);
    useAuthStore.getState().setRole("employee");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-full  px-1 py-2 text-foreground  transition-colors hover:bg-muted"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {/* {initials} */}
            <img src="/avatar.png" alt="avatar" />
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium leading-none text-foreground">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 border border-border bg-popover text-popover-foreground shadow-lg"
      >
        <DropdownMenuLabel className="font-normal text-foreground">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{displayName}</p>
            {/* <p className="text-xs text-muted-foreground">{role}</p> */}
            {/* <p className="text-[11px] text-muted-foreground">{email}</p> */}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => navigate("/profile")}
          className="text-foreground"
        >
          <UserCircle className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => navigate("/dashboard")}
          className="text-foreground"
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
