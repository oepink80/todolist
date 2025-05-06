// App.tsx
import { useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import Filter from '@/components/Filter';
import Login from '@/components/Login';
import { useTodos } from '@/hooks/useTodos';
import useFilteredTodos from '@/hooks/useFilteredTodos';
import '@/App.css';

function AppContent() {
    const { isAuthenticated, logout } = useAuth(); // достаём также функцию logout

    if (!isAuthenticated) {
        return <Login />;
    }

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const { todos, addTodo, toggleTodo, deleteTodo, loading, error } = useTodos();
    const filteredTodos = useFilteredTodos(todos, filter);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message || ''}</div>;

    return (
        <div className="app">
            <h1>Todo App</h1>
            <button onClick={logout}>Выйти</button> {/* новая кнопка */}
            <AddTodo onAdd={addTodo} />
            <Filter currentFilter={filter} onFilterChange={setFilter} />
            <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
            />
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
