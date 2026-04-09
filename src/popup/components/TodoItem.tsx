import type { Todo } from "../types/todo";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (todo: Todo) => void;
}

const formatDueDate = (dueDate: string | null): string => {
    if (!dueDate) {
        return "마감일 없음";
    }

    const parsedDate = new Date(dueDate);

    if (Number.isNaN(parsedDate.getTime())) {
        return dueDate;
    }

    return parsedDate.toLocaleDateString("ko-KR");
};

function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
    return (
        <li className={`todo-item ${todo.isCompleted ? "is-complete" : ""}`}>
            <label className="todo-main">
                <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => onToggle(todo.id)}
                />
                <span className="todo-content">{todo.content}</span>
            </label>
            <span className="todo-due-date">{formatDueDate(todo.dueDate)}</span>
            <div className="todo-actions">
                <button type="button" className="btn btn-subtle" onClick={() => onUpdate(todo)}>
                    수정
                </button>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(todo.id)}>
                    삭제
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
