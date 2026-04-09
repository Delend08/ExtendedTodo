import { useEffect, useState, type FormEvent } from "react";
import type { Todo } from "../types/todo";

interface CreateViewProps {
	onSubmit: (content: string, dueDate: string | null) => void;
	onCancel: () => void;
	initialTodo?: Todo | null;
	title: string;
	submitLabel: string;
}

function CreateView({ onSubmit, onCancel, initialTodo, title, submitLabel }: CreateViewProps) {
	const [content, setContent] = useState("");
	const [dueDate, setDueDate] = useState("");

	useEffect(() => {
		setContent(initialTodo?.content ?? "");
		setDueDate(initialTodo?.dueDate ?? "");
	}, [initialTodo]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const trimmedContent = content.trim();

		if (!trimmedContent) {
			return;
		}

		onSubmit(trimmedContent, dueDate || null);
		setContent("");
		setDueDate("");
	};

	return (
		<main>
			<h2>{title}</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="todo-content">할 일 내용</label>
					<input
						id="todo-content"
						type="text"
						value={content}
						onChange={(event) => setContent(event.target.value)}
						placeholder="할 일을 입력하세요"
					/>
				</div>

				<div>
					<label htmlFor="todo-due-date">마감일</label>
					<input
						id="todo-due-date"
						type="date"
						value={dueDate}
						onChange={(event) => setDueDate(event.target.value)}
					/>
				</div>

				<button type="submit">{submitLabel}</button>
				<button type="button" onClick={onCancel}>
					취소
				</button>
			</form>
		</main>
	);
}

export default CreateView;
