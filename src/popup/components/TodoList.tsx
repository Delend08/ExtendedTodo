import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (todo: Todo) => void;
}

function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
    if (todos.length === 0) {
        return <p className="empty-state">아직 등록된 할 일이 없어요.</p>;
    }

    const getDueTimestamp = (dueDate: string | null): number => {
        if (!dueDate) {
            return Number.POSITIVE_INFINITY;
        }
        const dueTimestamp = new Date(dueDate).getTime();
        return Number.isNaN(dueTimestamp) ? Number.POSITIVE_INFINITY : dueTimestamp;
    };
    const orderedTodos = [...todos].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return Number(a.isCompleted) - Number(b.isCompleted);
        }
        return getDueTimestamp(a.dueDate) - getDueTimestamp(b.dueDate);
    });

    return (
        <ul className="todo-list">
            {orderedTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </ul>
    );
}

export default TodoList;