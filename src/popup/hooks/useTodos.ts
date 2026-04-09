import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { loadTodos } from "../storage/chromeStorage";

function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    
    useEffect(() => {
        const init = async () => {
            const todos = await loadTodos();
            setTodos(todos);
        };
        init();
    }, []);

    const addTodo = (content: string, dueDate: string | null) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            content,
            dueDate,
            isCompleted: false,
            createdAt: new Date().toISOString(),
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }

    const toggleTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    }

    const updateTodo = (id: string, content: string, dueDate: string | null) => {
        setTodos((prevTodos) => prevTodos.map((todo) => todo.id === id ? { ...todo, content, dueDate } : todo));
    }

    const deleteTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter(todos => todos.id !== id));
    }


    return {
        todos,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo
    }
};

export default useTodos;