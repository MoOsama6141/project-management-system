import TaskTable from "@/features/tasks/components/TaskTable";
import getTasks from "@/features/tasks/api/GetTasks";
import getUsers from "@/features/users/api/Users";
import getProjects from "@/features/projects/api/GetProjects";
import { useQuery } from "@tanstack/react-query";

const TasksPage = () => {
  const {
    data: tasks,
    isPending: isTasksPending,
    isError: isTasksError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  const {
    data: users,
    isPending: isUsersPending,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const {
    data: projects,
    isPending: isProjectsPending,
    isError: isProjectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  const loading = isTasksPending || isUsersPending || isProjectsPending;
  const error = isTasksError || isUsersError || isProjectsError;

  return (
    <main className="pb-5 pt-20 px-6">
      {loading ? (
        <div className="mt-6">Loading...</div>
      ) : error ? (
        <div className="mt-6 text-red-500">Failed to load data.</div>
      ) : (
        <div className="">
          <TaskTable
            data={tasks}
            users={users?.data ?? []}
            projects={projects?.data ?? []}
          />
        </div>
      )}
    </main>
  );
};

export default TasksPage;
