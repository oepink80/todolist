import React, { useState } from 'react';

interface Props {
    onAdd: (text: string) => void;
}

const AddTodo: React.FunctionComponent<Props> = ({ onAdd }) => {
    const [text, setText] = useState<string>('');
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add new todo..."
                data-testid="todo-input"
            />
            <button type="submit" data-testid="add-button">Add</button>
        </form>
    );
};

export default AddTodo;
