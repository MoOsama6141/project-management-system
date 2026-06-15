export interface Task {
  id: string;
  title: string;
  projectId: string;
  assigneeId: string;
  status: 'todo' | 'in_progress' | 'done';
}
