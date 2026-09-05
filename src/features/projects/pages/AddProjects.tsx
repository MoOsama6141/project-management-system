import { useState, type FormEvent } from "react";
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
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="h-20 bg-white border-b flex items-center justify-between px-8">
        <h1 className="text-3xl font-semibold text-[#1f4d46]">
          Add a New Project
        </h1>

        <div className="flex items-center gap-4">
          <button className="relative" type="button">
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-500" />
            🔔
          </button>

          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Upskilling</p>
              <p className="text-xs text-gray-500">upskilling.eg@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          ← View All Projects
        </button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Name"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Description"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
                />
              </div>

              <div className="border-t" />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/projects")}
                  className="px-8 py-3 rounded-full border border-gray-500 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={addProjectMutation.isPending}
                  className="px-8 py-3 rounded-full bg-[#f4a024] text-white font-medium hover:bg-[#e29012] transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {addProjectMutation.isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjectPage;
