export interface Todo {
  id: string;
  content: string;
  dueDate: string | null;
  isCompleted: boolean;
  createdAt: string;
}
