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
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => onToggle(todo.id)}
                />
                <span>{todo.content}</span>
            </label>
            <span>{formatDueDate(todo.dueDate)}</span>
            <button type="button" onClick={() => onUpdate(todo)}>
                수정
            </button>
            <button type="button" onClick={() => onDelete(todo.id)}>
                삭제
            </button>
        </li>
    );
}

export default TodoItem;
