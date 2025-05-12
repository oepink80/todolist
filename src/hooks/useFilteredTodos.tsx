// hooks/useFilteredTodos.ts
import { useMemo } from 'react';

interface TodoType {
    id: number | string;
    text: string;
    completed: boolean;
}

type FilterOption = 'all' | 'active' | 'completed';

const useFilteredTodos = (todos: TodoType[], filter: string) => {
    return useMemo<TodoType[]>(() => {
        switch (filter) {
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'completed':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }, [todos, filter]);
};

export default useFilteredTodos;
