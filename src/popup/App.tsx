import { useState } from "react";
import Header from "./components/Header";
import useTodos from "./hooks/useTodos";
import type { Todo } from "./types/todo";
import CreateView from "./views/CreateView";
import MainView from "./views/MainView";

type ViewMode = "main" | "create" | "update";

export default function App() {
  const { todos, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const [viewMode, setViewMode] = useState<ViewMode>("main");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCreate = () => {
    setSelectedTodo(null);
    setViewMode("create");
  };

  const handleUpdate = (todo: Todo) => {
    setSelectedTodo(todo);
    setViewMode("update");
  };

  const handleSubmit = (content: string, dueDate: string | null) => {
    if (viewMode === "update" && selectedTodo) {
      updateTodo(selectedTodo.id, content, dueDate);
    } else {
      addTodo(content, dueDate);
    }

    setSelectedTodo(null);
    setViewMode("main");
  };

  const handleCancel = () => {
    setSelectedTodo(null);
    setViewMode("main");
  };

  return (
    <>
      <Header />
      {viewMode === "main" ? (
        <MainView
          todos={todos}
          onCreate={handleCreate}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={handleUpdate}
        />
      ) : (
        <CreateView
          initialTodo={selectedTodo}
          title={viewMode === "update" ? "할 일 업데이트" : "할 일 작성"}
          submitLabel={viewMode === "update" ? "업데이트" : "작성완료"}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
