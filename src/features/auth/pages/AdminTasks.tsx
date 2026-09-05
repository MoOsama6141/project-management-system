import ProjectTable from "@/components/table/ProjectTable";
import adminTasks from "@/features/admin/api/Tasks";
import { useQuery } from "@tanstack/react-query";

function AdminTasks() {
  const {data:tasks , isPending,isError} = useQuery({
    queryKey: ["admin-tasks"],
    queryFn:() => adminTasks()
  })
  console.log(tasks, "tasks from admin tasks page");
  return (
    <div>
      <main className="p-6">
        <h1 className="text-3xl font-semibold">Admin Tasks</h1>
        <p className="mt-4 text-slate-600">View and manage your tasks here.</p>
      </main>
      <div>
        <ProjectTable data={tasks} isPending={isPending} isError={isError} />
      </div>
    </div>
  );
}

export default AdminTasks;
