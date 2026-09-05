"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/table/ui/dropdown-menu";
import {
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
} from "lucide-react";
import { Input } from "@/components/table/ui/input";
import { Button } from "@/components/table/ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import AddTask from "@/features/tasks/api/AddTask";
import DeleteTask from "@/features/tasks/api/DeleteTask";
import updateTask from "@/features/tasks/api/UpdateTask";
import TaskModal from "@/features/tasks/components/TaskModal";
import Swal from "sweetalert2";

interface TaskTableProps {
  data: any;
  users: any[];
  projects: any[];
}

export default function TaskTable({
  data: tasks,
  users,
  projects,
}: TaskTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create",
  );
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const queryClient = useQueryClient();

  const taskList = tasks?.data ?? [];
  const totalCount = tasks?.totalNumberOfRecords ?? taskList.length;
  const pageNumber = tasks?.pageNumber ?? 1;
  const totalPages = tasks?.totalNumberOfPages ?? 1;

  const addMutation = useMutation({
    mutationFn: (payload: {
      title: string;
      description: string;
      employeeId: string;
      projectId: string;
      status: string;
    }) => AddTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setModalOpen(false);
      toast.success("Task created successfully");
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => DeleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  const updateMutation = useMutation({
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setModalOpen(false);
      toast.success("Task updated successfully");
    },
    onError: () => {
      toast.error("Failed to update task");
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
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium text-neutral-700">Tasks</h1>

        <Button
          onClick={() => {
            setSelectedTask(null);
            setModalMode("create");
            setModalOpen(true);
          }}
        >
          Add New Task
        </Button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="p-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search By Title"
              className="pl-9 rounded-full"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-[#486F65] hover:bg-[#486F65]">
              <TableHead className="text-white">
                <div className="flex items-center gap-2">
                  Title
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>
              <TableHead className="text-white">Description</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">User</TableHead>
              <TableHead className="text-white">Project</TableHead>
              <TableHead className="text-white">Date Created</TableHead>
              <TableHead className="w-14 text-white" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskList.map((task: any, index: number) => (
              <TableRow
                key={task.id}
                className={index % 2 === 0 ? "bg-white" : "bg-neutral-50"}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell className="max-w-65">
                  <div className="text-sm text-slate-600">
                    {task.description || "-"}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {/* {task.status?.replace("_", " ") || "-"} */}
                    {task.status}
                  </span>
                </TableCell>
                <TableCell>
                  {task.employee?.userName || task.assigneeName || "-"}
                </TableCell>
                <TableCell>
                  {task.project?.title || task.projectName || "-"}
                </TableCell>
                <TableCell>{formatDate(task.creationDate)}</TableCell>
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
                          setSelectedTask(task);
                          setModalMode("view");
                          setModalOpen(true);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedTask(task);
                          setModalMode("edit");
                          setModalOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-500"
                        // onClick={() => {
                        //   const confirmed = window.confirm(
                        //     "Are you sure you want to delete this task?",
                        //   );
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
                                                        deleteMutation.mutate(String(task.id));
                                                      } else {
                                                        toast.info("Deletion canceled");
                                                      }
                                                    });
                                                  }}
                        //   if (confirmed) {
                        //     deleteMutation.mutate(String(task.id));
                        //   } else {
                        //     toast.info("Deletion canceled");
                        //   }
                        // }}
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

        <div className="flex items-center justify-end gap-8 border-t p-4 text-sm text-muted-foreground">
          <div>
            Showing <strong>{taskList.length}</strong>
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
      </div>

      <TaskModal
        open={modalOpen}
        mode={modalMode}
        task={selectedTask}
        users={users}
        projects={projects}
        onClose={() => setModalOpen(false)}
        onSubmit={(payload) => {
          if (modalMode === "edit" && selectedTask?.id) {
            updateMutation.mutate({ taskId: String(selectedTask.id), payload });
          } else if (modalMode === "create") {
            addMutation.mutate(payload);
          }
        }}
      />
    </div>
  );
}
