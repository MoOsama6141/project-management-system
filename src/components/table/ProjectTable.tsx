"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "sonner";
import DeleteProject from "@/features/projects/api/DeleteProject";
import updateProject from "@/features/projects/api/UpdateProject";
import ProjectModal from "@/features/projects/components/ProjectModal";

export default function ProjectTable({ data: projects, ismanager }: any) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create",
  );
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const queryClient = useQueryClient();

  const projectList = projects?.data ?? [];
  const totalCount = projects?.totalNumberOfRecords ?? projectList.length;
  const pageNumber = projects?.pageNumber ?? 1;
  const totalPages = projects?.totalNumberOfPages ?? 1;

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) => DeleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Project deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      projectId,
      payload,
    }: {
      projectId: string;
      payload: { title: string; description: string };
    }) => updateProject(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      setModalOpen(false);
      toast.success("Project updated successfully");
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        });
  };

  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium" style={{ color: "var(--text)" }}>
          Projects
        </h1>

        {ismanager && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/projects/add-project")}
            className="flex h-10 w-45 items-center justify-center gap-2 rounded-full px-4 py-2 transition-colors duration-300"
            style={{
              background: "var(--accent-orange)",
              color: "var(--surface)",
            }}
          >
            <Plus className="h-4 w-4" />
            Add New Project
          </motion.button>
        )}
      </div>

      {/* Table Card */}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-xl border shadow-sm"
        style={{ background: "var(--surface)", color: "var(--text)" }}
      >
        {/* Search */}

        <div className="p-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search By Title"
              className="pl-9 rounded-full"
            />
          </div>
        </div>

        {/* Table */}

        <Table>
          <TableHeader>
            <TableRow className="bg-[#0a725c] ">
              <TableHead style={{ color: "var(--surface)" }}>
                <div className="flex items-center gap-2">
                  Title
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead style={{ color: "var(--surface)" }}>
                <div className="flex items-center gap-2  ">
                  Description
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead style={{ color: "var(--surface)" }}>
                <div className="flex items-center gap-2">
                  Manager
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead style={{ color: "var(--surface)" }}>
                <div className="flex items-center gap-2">
                  Date Created
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead className="w-14" style={{ color: "var(--surface)" }} />
            </TableRow>
          </TableHeader>

          <TableBody>
            {projectList.map((project: any, index: number) => (
              <TableRow
                key={project.id}
                style={{
                  background:
                    index % 2 === 0 ? "transparent" : "rgba(0,0,0,0.03)",
                }}
              >
                <TableCell>{project.title}</TableCell>

                <TableCell className="max-w-60">
                  <div className="text-sm text-muted-foreground truncate">
                    {project.description || "-"}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-sm text-muted-foreground">
                    {project.manager?.userName || "-"}
                  </div>
                </TableCell>

                <TableCell>{formatDate(project.creationDate)}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProject(project);
                          setModalMode("view");
                          setModalOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedProject(project);
                          setModalMode("edit");
                          setModalOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={() => {
                          Swal.fire({
                            title: "Delete project?",
                            text: "This action cannot be undone.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "Cancel",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              deleteMutation.mutate(String(project.id));
                            } else {
                              toast.info("Deletion canceled");
                            }
                          });
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer */}

        <div className="flex items-center justify-end gap-8 border-t p-4 text-sm text-muted-foreground">
          <div>
            Showing <strong>{projectList.length}</strong>
          </div>

          <div>of {totalCount} Results</div>

          <div>
            Page {pageNumber} of {totalPages}
          </div>

          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <ChevronLeft size={16} />
            </Button>

            <Button size="icon" variant="ghost">
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </motion.div>

      <ProjectModal
        open={modalOpen}
        mode={modalMode}
        project={selectedProject}
        onClose={() => setModalOpen(false)}
        onSubmit={(payload) => {
          if (selectedProject?.id) {
            updateMutation.mutate({
              projectId: String(selectedProject.id),
              payload,
            });
          }
        }}
      />
    </div>
  );
}
