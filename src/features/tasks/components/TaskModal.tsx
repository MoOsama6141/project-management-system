import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-border bg-[var(--card)] shadow-[0_30px_80px_rgba(15,23,42,0.35)] ring-1 ring-border/60"
      >
        <div className="flex items-center justify-between border-b border-border bg-[linear-gradient(135deg,rgba(59,130,246,0.10),transparent)] px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === "create"
                ? "Create Task"
                : mode === "edit"
                  ? "Edit Task"
                  : "Task Details"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "view"
                ? "View task details"
                : "Fill in the task information below"}
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

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Title
            </label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={mode === "view"}
              className="w-full rounded-2xl border border-border bg-[var(--background)] px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground transition focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/20"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={mode === "view"}
              rows={5}
              className="w-full resize-none rounded-2xl border border-border bg-[var(--background)] px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground transition focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/20"
              placeholder="Task description"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                User
              </label>
              <select
                value={assigneeId}
                onChange={(event) => setAssigneeId(event.target.value)}
                disabled={mode === "view"}
                className="w-full rounded-2xl border border-border bg-[var(--background)] px-4 py-3 text-foreground outline-none transition focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/20"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userName || user.name || user.email}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Project
              </label>
              <select
                value={projectId}
                onChange={(event) => setProjectId(event.target.value)}
                disabled={mode === "view"}
                className="w-full rounded-2xl border border-border bg-[var(--background)] px-4 py-3 text-foreground outline-none transition focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/20"
              >
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title || project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {mode !== "view" && (
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-border bg-[var(--background)] px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-[var(--accent-orange)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
              >
                {mode === "create" ? "Create" : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default TaskModal;
