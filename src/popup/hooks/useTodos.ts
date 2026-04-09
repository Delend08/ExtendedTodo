import { useEffect, useState } from "react";
import type { Todo } from "../types/todo";
import { loadTodos, saveTodos } from "../storage/chromeStorage";

function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    
    useEffect(() => {
        const init = async () => {
            const todos = await loadTodos();
            setTodos(todos);
            setIsLoaded(true);
        };
        init();
    }, []);

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        void saveTodos(todos);
    }, [isLoaded, todos]);

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