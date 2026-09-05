import { useEffect, useState } from "react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {mode === "create"
                ? "Create Project"
                : mode === "edit"
                  ? "Edit Project"
                  : "Project Details"}
            </h2>
            <p className="text-sm text-slate-500">
              {mode === "view"
                ? "View project details"
                : "Fill in the project information below"}
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
              placeholder="Project title"
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
              placeholder="Project description"
            />
          </div>

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

export default ProjectModal;
