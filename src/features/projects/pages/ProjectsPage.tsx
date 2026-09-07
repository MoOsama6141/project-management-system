import ProjectTable from "@/components/table/ProjectTable";
import getProjects from "../api/GetProjects";
import { useQuery } from "@tanstack/react-query";
import getEmployeeProjectes from "../api/GetEmployeeProjects";

export default function ProjectsPage() {
  const role = localStorage.getItem("role")?.toLowerCase();
  const isManager = role === "manager";

  const {
    data: projects,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => {
      if (isManager) return getProjects();
      return getEmployeeProjectes();
    },
  });

  return (
    <main className=" min-h-screen pb-5 pt-20 px-6">
      <ProjectTable data={projects} isPending={isPending} isError={isError} ismanager={isManager} />
    </main>
  );
}
