// App.tsx
import {useEffect, useState} from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import Filter from '@/components/Filter';
import { useTodos } from '@/hooks/useTodos';
import useFilteredTodos from '@/hooks/useFilteredTodos';
import { useNavigate } from 'react-router-dom';
import '@/App.css';

function AppContent() {
    const { isAuthenticated, logout, canPerform, userRole, username } = useAuth(); // достаём также функцию logout

    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/login');
    }

    useEffect(() => {
        console.log({ isAuthenticated, userRole, username }); // Наблюдение за переменами
    }, [isAuthenticated, userRole, username]);

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const { todos, addTodo, toggleTodo, deleteTodo, loading, error } = useTodos();
    const filteredTodos = useFilteredTodos(todos, filter);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error?.message || ''}</div>;

    return (
        <div className="app">
            <h1>Todo App</h1>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <span>{username && `${username}, добро пожаловать!`}</span> {/* выводим приветствие */}
                <button onClick={logout} style={{marginLeft: '10px'}}>Выйти</button>
                {/* оставляем кнопку выхода */}
            </div>
            {canPerform('write') ? <AddTodo onAdd={addTodo}/> : null}
            <Filter currentFilter={filter} onFilterChange={setFilter}/>
            <TodoList
                todos={filteredTodos}
                onToggle={toggleTodo}
                onDelete={canPerform('delete') ? deleteTodo : undefined}
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
