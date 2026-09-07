import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ProjectModalProps {
  open: boolean;
  mode: "create" | "edit" | "view";
  project?: any;
  onClose: () => void;
  onSubmit?: (payload: { title: string; description: string }) => void;
}

function ProjectModal({
  open,
  mode,
  project,
  onClose,
  onSubmit,
}: ProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(project?.title || "");
      setDescription(project?.description || "");
    }
  }, [open, project]);

  if (!open) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ title, description });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-[30px] border border-border bg-card shadow-[0_30px_80px_rgba(15,23,42,0.35)] ring-1 ring-border/60"
      >
        <div className="flex items-center justify-between border-b border-border bg-[linear-gradient(135deg,rgba(245,158,11,0.10),transparent)] px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {mode === "create"
                ? "Create Project"
                : mode === "edit"
                  ? "Edit Project"
                  : "Project Details"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "view"
                ? "View project details"
                : "Fill in the project information below"}
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
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground transition focus:border-ring focus:ring-2 focus:ring-ring/20"
              placeholder="Project title"
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
              className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none placeholder:text-muted-foreground transition focus:border-ring focus:ring-2 focus:ring-ring/20"
              placeholder="Project description"
            />
          </div>

          {mode !== "view" && (
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-accent-orange px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
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

export default ProjectModal;
