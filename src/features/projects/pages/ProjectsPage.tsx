import ProjectTable from "@/components/table/ProjectTable";
import getProjects from "../api/GetProjects";
import { useQuery } from "@tanstack/react-query";

export default function ProjectsPage() {
  const {
    data: projects,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => getProjects(),
  });
  return (
    <main className="bg-[#f5f5f5] min-h-screen pb-5 pt-20 px-6">
      <ProjectTable
        data={projects}
        isPending={isPending}
        isError={isError}
      />
    </main>
  );
}
