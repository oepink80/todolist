import React from 'react';

interface Todo {
    id: number | string;
    text: string;
    completed: boolean;
}

interface Props {
    todo: Todo;
    onToggle: (id: number | string) => void;
    onDelete: (id: number | string) => void;
}

const TodoItem: React.FunctionComponent<Props> = ({ todo, onToggle, onDelete }) => {
    const { id, text, completed } = todo;

    return (
        <div className={`todo-item ${completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                data-testid={`toggle-${id}`}
            />
            <span data-testid={`todo-text-${id}`}>{text}</span>
            <button
                onClick={() => onDelete(id)}
                data-testid={`delete-${id}`}
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;