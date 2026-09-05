import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TaskModalProps {
  open: boolean;
  mode: "create" | "edit" | "view";
  task?: any;
  users: any[];
  projects: any[];
  onClose: () => void;
  onSubmit?: (payload: {
    title: string;
    description: string;
    employeeId: string;
    projectId: string;
    status: string;
  }) => void;
}

function TaskModal({
  open,
  mode,
  task,
  users,
  projects,
  onClose,
  onSubmit,
}: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (open) {
      setTitle(task?.title || "");
      setDescription(task?.description || "");
      setProjectId(task?.projectId || projects[0]?.id || "");
      setAssigneeId(task?.assigneeId || users[0]?.id || "");
      setStatus(task?.status || "todo");
    }
  }, [open, task, projects, users]);

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({
        title,
        description,
        projectId,
        employeeId: assigneeId,
        status,
      });
      console.log(status, "ststus.......");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {mode === "create"
                ? "Create Task"
                : mode === "edit"
                  ? "Edit Task"
                  : "Task Details"}
            </h2>
            <p className="text-sm text-slate-500">
              {mode === "view"
                ? "View task details"
                : "Fill in the task information below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={mode === "view"}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#F5A623]"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={mode === "view"}
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#F5A623]"
              placeholder="Task description"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                User
              </label>
              <select
                value={assigneeId}
                onChange={(event) => setAssigneeId(event.target.value)}
                disabled={mode === "view"}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#F5A623]"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userName || user.name || user.email}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project
              </label>
              <select
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                disabled={mode === "view"}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#F5A623]"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title || project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              disabled={mode === "view"}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#F5A623]"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div> */}

          {mode !== "view" && (
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-[#F5A623] px-5 py-2.5 text-sm font-medium text-white"
              >
                {mode === "create" ? "Create" : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
