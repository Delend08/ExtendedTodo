import type { Todo } from "../types/todo";

// TODO: loadTodos, saveTodos 구현
export const loadTodos = async (): Promise<Todo[]> => {
  const result = await chrome.storage.local.get(["todos"]);

  return Array.isArray(result.todos) ? result.todos : [] as Todo[];
};

export const saveTodos = async (todos: Todo[]): Promise<void> => {
  await chrome.storage.local.set({ todos });
};