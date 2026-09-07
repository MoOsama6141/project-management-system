import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AddProject from "../api/AddProject";

const AddProjectPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addProjectMutation = useMutation({
    mutationFn: (payload: { title: string; description: string }) =>
      AddProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Project added successfully");
      navigate("/projects");
    },
    onError: () => {
      toast.error("Failed to add project");
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in both title and description");
      return;
    }

    addProjectMutation.mutate({
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex h-20 items-center justify-between border-b border-border bg-card px-8 shadow-sm"
      >
        <h1 className="text-3xl font-semibold text-foreground">
          Add a New Project
        </h1>

        <div className="flex items-center gap-4">
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-muted"
            type="button"
            aria-label="Notifications"
          >
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-orange" />
            <Bell size={16} />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-border bg-background px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              U
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Upskilling</p>
              <p className="text-xs text-muted-foreground">
                upskilling.eg@gmail.com
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="px-8 py-6">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} />
          View All Projects
        </button>

        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-[28px] border border-border bg-card p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Plus size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Create
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                  New Project
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Name"
                  className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-foreground">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Description"
                  className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
              </div>

              <div className="border-t border-border" />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  className="rounded-full border border-border bg-background px-8 py-3 font-medium text-foreground transition hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addProjectMutation.isPending}
                  className="rounded-full bg-accent-orange px-8 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {addProjectMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;
