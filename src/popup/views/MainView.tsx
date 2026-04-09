import type { Todo } from "../types/todo";
import TodoList from "../components/TodoList";

interface MainViewProps {
	todos: Todo[];
	onCreate: () => void;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
	onUpdate: (todo: Todo) => void;
}

function MainView({ todos, onCreate, onToggle, onDelete, onUpdate }: MainViewProps) {
	return (
		<main className="view view-main">
			<TodoList
				todos={todos}
				onToggle={onToggle}
				onDelete={onDelete}
				onUpdate={onUpdate}
			/>
			<button type="button" className="btn btn-primary" onClick={onCreate}>
				할 일 작성하기
			</button>
		</main>
	);
}

export default MainView;    
