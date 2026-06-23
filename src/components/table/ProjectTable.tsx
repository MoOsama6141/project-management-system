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

const projects = [
  {
    id: 1,
    title: "Food Management",
    status: "Public",
    users: 10,
    tasks: 30,
    createdAt: "09-23-2023",
  },
  {
    id: 2,
    title: "Project Management",
    status: "Public",
    users: 15,
    tasks: 10,
    createdAt: "09-23-2023",
  },
  {
    id: 3,
    title: "Project",
    status: "Public",
    users: 3,
    tasks: 15,
    createdAt: "09-23-2023",
  },
  {
    id: 4,
    title: "Project",
    status: "Public",
    users: 5,
    tasks: 5,
    createdAt: "09-23-2023",
  },
  {
    id: 5,
    title: "Project",
    status: "Public",
    users: 5,
    tasks: 4,
    createdAt: "09-23-2023",
  },
];
export default function ProjectTable() {
  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-medium text-neutral-700">Projects</h1>

        <a href="/projects/add-project" className="rounded-full bg-[#F5A623] hover:bg-[#e79b1e]">
          <Plus className="h-4 w-4" />
          Add New Project
        </a>
      </div>

      {/* Table Card */}

      <div className="rounded-xl border bg-white shadow-sm">
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
            <TableRow className="bg-[#486F65] hover:bg-[#486F65]">
              <TableHead className="text-white">
                <div className="flex items-center gap-2">
                  Title
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead className="text-white">
                <div className="flex items-center gap-2">
                  Status
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead className="text-white">
                <div className="flex items-center gap-2">
                  Num Users
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead className="text-white">
                <div className="flex items-center gap-2">
                  Num Tasks
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead className="text-white">
                <div className="flex items-center gap-2">
                  Date Created
                  <ChevronsUpDown size={14} />
                </div>
              </TableHead>

              <TableHead className="w-14 text-white" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project, index) => (
              <TableRow
                key={project.id}
                className={index % 2 === 0 ? "bg-white" : "bg-neutral-50"}
              >
                <TableCell>{project.title}</TableCell>

                <TableCell>
                  <span className="inline-flex rounded-full bg-[#486F65] px-3 py-1 text-xs text-white">
                    {project.status}
                  </span>
                </TableCell>

                <TableCell>{project.users}</TableCell>

                <TableCell>{project.tasks}</TableCell>

                <TableCell>{project.createdAt}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem className="text-red-500">
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
            Showing <strong>10</strong>
          </div>

          <div>of 102 Results</div>

          <div>Page 1 of 10</div>

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
    </div>
  );
}
