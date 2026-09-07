import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GripVertical } from "lucide-react";
import { toast } from "sonner";

import TaskTable from "@/features/tasks/components/TaskTable";
import getTasks from "@/features/tasks/api/GetTasks";
import getUsers from "@/features/users/api/Users";
import getProjects from "@/features/projects/api/GetProjects";
import getEmployeeProjectes from "@/features/projects/api/GetEmployeeProjects";
import getProjectTasks from "@/features/tasks/api/GetProjectTasks";
import updateTask from "@/features/tasks/api/UpdateTask";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const boardColumns = [
  {
    id: "todo",
    title: "To Do",
    accent: "#f59e0b",
    soft: "rgba(245, 158, 11, 0.16)",
    gradient: "linear-gradient(135deg,#f8b64a,#f29b00)",
  },
  {
    id: "in_progress",
    title: "In progress",
    accent: "#3b82f6",
    soft: "rgba(59, 130, 246, 0.15)",
    gradient: "linear-gradient(135deg,#60a5fa,#2563eb)",
  },
  {
    id: "done",
    title: "Done",
    accent: "#10b981",
    soft: "rgba(16, 185, 129, 0.16)",
    gradient: "linear-gradient(135deg,#34d399,#059669)",
  },
];

const normalizeTaskStatus = (status?: string | null) => {
  const value = (status ?? "todo").trim().toLowerCase();

  if (value === "todo" || value === "to do") return "todo";
  if (
    value === "inprogress" ||
    value === "in_progress" ||
    value === "in progress"
  )
    return "in_progress";
  if (value === "done") return "done";

  return "todo";
};

const apiStatusValue = (status: string) => {
  const normalized = normalizeTaskStatus(status);

  if (normalized === "todo") return "ToDo";
  if (normalized === "in_progress") return "InProgress";
  if (normalized === "done") return "Done";

  return "ToDo";
};

const TasksPage = () => {
  const role = localStorage.getItem("role")?.toLowerCase() ?? "";
  const isUserRole = role === "user" || role === "employee";
  const queryClient = useQueryClient();
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const {
    data: tasks,
    isPending: isTasksPending,
    isError: isTasksError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
    enabled: !isUserRole,
  });

  const {
    data: users,
    isPending: isUsersPending,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    enabled: !isUserRole,
  });

  const {
    data: projects,
    isPending: isProjectsPending,
    isError: isProjectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    enabled: !isUserRole,
  });

  const {
    data: userProjectsData,
    isPending: isUserProjectsPending,
    isError: isUserProjectsError,
  } = useQuery({
    queryKey: ["user-projects"],
    queryFn: () => getEmployeeProjectes(),
    enabled: isUserRole,
  });

  const userProjects = userProjectsData?.data ?? [];

  useEffect(() => {
    if (!isUserRole) return;
    if (!userProjects.length) {
      setSelectedProjectId("");
      return;
    }

    if (
      !selectedProjectId ||
      !userProjects.some((project: any) => project.id === selectedProjectId)
    ) {
      setSelectedProjectId(userProjects[0].id);
    }
  }, [isUserRole, userProjects, selectedProjectId]);

  const {
    data: projectTasks,
    isPending: isProjectTasksPending,
    isError: isProjectTasksError,
  } = useQuery({
    queryKey: ["project-tasks", selectedProjectId],
    queryFn: () => getProjectTasks(selectedProjectId),
    enabled: isUserRole && Boolean(selectedProjectId),
  });

  const boardTasks = Array.isArray(projectTasks)
    ? projectTasks
    : (projectTasks?.data ?? []);

  const columnTasksFor = (columnId: string) =>
    (boardTasks ?? []).filter((task: any) => {
      const taskStatus = normalizeTaskStatus(task?.status);
      return taskStatus === columnId;
    });

  const moveTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      payload,
    }: {
      taskId: string;
      payload: {
        title: string;
        description: string;
        employeeId: string;
        projectId: string;
        status: string;
      };
    }) => updateTask(taskId, payload),
    onSuccess: (_, { taskId, payload }) => {
      queryClient.setQueryData(
        ["project-tasks", selectedProjectId],
        (current: any) => {
          if (!current) return current;

          const items = Array.isArray(current) ? current : (current.data ?? []);

          return {
            ...(Array.isArray(current) ? {} : current),
            data: items.map((task: any) =>
              String(task.id) === String(taskId)
                ? { ...task, status: payload.status }
                : task,
            ),
          };
        },
      );

      toast.success("Task moved successfully");
    },
    onError: () => {
      toast.error("Failed to move task");
    },
  });

  const handleDrop = (status: string) => {
    if (!draggedTaskId) return;

    const task = boardTasks.find(
      (item: any) => String(item.id) === String(draggedTaskId),
    );
    if (!task) return;

    moveTaskMutation.mutate({
      taskId: String(task.id),
      payload: {
        title: task.title ?? "",
        description: task.description ?? "",
        employeeId: task.employeeId ?? task.employee?.id ?? "",
        projectId: task.projectId ?? selectedProjectId,
        status: apiStatusValue(status),
      },
    });

    setDraggedTaskId(null);
  };

  const loading = isTasksPending || isUsersPending || isProjectsPending;
  const error = isTasksError || isUsersError || isProjectsError;

  if (isUserRole) {
    return (
      <main className="min-h-screen px-6 pb-5 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-6 flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Workflow
            </p>
            <h1
              className="mt-2 text-3xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              Task Board
            </h1>
          </div>
        </motion.div>

        {isUserProjectsPending ? (
          <div className="mt-6 flex min-h-50 items-center justify-center">
            <LoadingSpinner size={30} label="Loading project tasks" />
          </div>
        ) : isUserProjectsError ? (
          <div className="mt-6 text-red-500">Failed to load your projects.</div>
        ) : userProjects.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-card p-6 text-center text-muted-foreground">
            No projects assigned yet.
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap gap-3">
              {userProjects.map((project: any, index: number) => (
                <motion.button
                  key={project.id}
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedProjectId === project.id
                      ? "bg-[#f5a623] text-white shadow-md shadow-amber-500/30"
                      : "bg-card text-foreground ring-1 ring-border hover:bg-muted"
                  }`}
                >
                  {project.name || project.title}
                </motion.button>
              ))}
            </div>

            {isProjectTasksPending ? (
              <div className="mt-6 flex min-h-55 items-center justify-center">
                <LoadingSpinner size={30} label="Loading tasks" />
              </div>
            ) : isProjectTasksError ? (
              <div className="mt-6 text-red-500">
                Failed to load task board.
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                {boardColumns.map((column, columnIndex) => {
                  const columnTasks = columnTasksFor(column.id);

                  return (
                    <motion.div
                      key={column.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: columnIndex * 0.08 }}
                      className="min-w-0"
                    >
                      <div
                        className="mb-4 flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm ring-1 ring-border"
                        style={{ borderColor: column.accent + "66" }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: column.accent }}
                          />
                          <h2
                            className="text-lg font-semibold"
                            style={{ color: "var(--text)" }}
                          >
                            {column.title}
                          </h2>
                        </div>
                        <span
                          className="rounded-full px-2.5 py-1 text-xs font-semibold"
                          style={{
                            backgroundColor: column.soft,
                            color: column.accent,
                          }}
                        >
                          {columnTasks.length}
                        </span>
                      </div>

                      <div
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => handleDrop(column.id)}
                        className="min-h-104 rounded-[22px] border border-dashed p-3 shadow-inner shadow-black/5 transition-all duration-200"
                        style={{
                          borderColor: column.accent + "66",
                          background: `linear-gradient(180deg, ${column.soft}, var(--card))`,
                        }}
                      >
                        <div className="space-y-3">
                          {columnTasks.length > 0 ? (
                            columnTasks.map((task: any, index: number) => (
                              <motion.div
                                key={task.id}
                                draggable
                                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                                whileHover={{ y: -4, scale: 1.01 }}
                                whileDrag={{ scale: 1.03 }}
                                onDragStart={() =>
                                  setDraggedTaskId(String(task.id))
                                }
                                className="flex cursor-grab items-center justify-between rounded-2xl px-3 py-3 text-left text-white shadow-md ring-1 ring-black/5 active:cursor-grabbing"
                                style={{ background: column.gradient }}
                              >
                                <span className="text-base font-medium">
                                  {task.title}
                                </span>
                                <GripVertical className="h-4 w-4 opacity-80" />
                              </motion.div>
                            ))
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-border bg-white/5 text-sm text-muted-foreground"
                            >
                              No tasks
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    );
  }

  return (
    <main className="pb-5 pt-20 px-6">
      {loading ? (
        <div className="mt-6 flex min-h-50 items-center justify-center">
          <LoadingSpinner size={30} label="Loading" />
        </div>
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
