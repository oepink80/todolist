import React from 'react';
import TodoItem from './TodoItem'; // Импортируем типизированный компонент TodoItem
import { Todo } from '../interfaces';

// Интерфейс для props компонента
interface Props {
  todos: Todo[];
  onToggle: (id: string | number) => void;
  onDelete: (id: string | number) => void;
}

// Компонент TodoList
const TodoList: React.FunctionComponent<Props> = ({ todos = [], onToggle, onDelete }) => {

  if (todos.length === 0) {
    return <div data-testid="empty-list">No todos found</div>;
  }
  return (
      <div className="todo-list" data-testid="todo-list">
        {todos.map((todo) => (
            <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
            />
        ))}
      </div>
  );
};

export default TodoList;
