import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '@/components/TodoItem';

describe('TodoItem', () => {
    let mockOnToggle;
    let mockOnDelete;
    let todo;

    beforeEach(() => {
        mockOnToggle = jest.fn();
        mockOnDelete = jest.fn();
        todo = { id: 1, text: 'Buy milk', completed: false };
    });

    it('renders the item content correctly', () => {
        render(<TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        expect(screen.getByText('Buy milk')).toBeInTheDocument();
        expect(screen.getByTestId('toggle-1')).not.toBeChecked();
        expect(screen.getByTestId('delete-1')).toBeInTheDocument();
    });

    it('marks the item as complete when checkbox is toggled', () => {
        render(<TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        fireEvent.click(screen.getByTestId('toggle-1')); // Кликнем на чекбокс
        expect(mockOnToggle).toHaveBeenCalledWith(1);     // Должен вызвать обработчик onToggle
    });

    it('removes the item when delete button is pressed', () => {
        render(<TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        fireEvent.click(screen.getByTestId('delete-1')); // Кликнем на кнопку удалить
        expect(mockOnDelete).toHaveBeenCalledWith(1);    // Должен вызвать обработчик onDelete
    });

    it('applies appropriate styles for completed items', () => {
        todo.completed = true;
        render(<TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        expect(screen.getByTestId('todo-text-1').closest('.completed')).toBeTruthy(); // проверим класс "completed"
    });

    it('should not change if clicking outside of input or button', () => {
        render(<TodoItem todo={todo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        fireEvent.click(document.body); // Кликаем вне компонентов
        expect(mockOnToggle).not.toHaveBeenCalled();       // Ничего не должно произойти
        expect(mockOnDelete).not.toHaveBeenCalled();      // Удаление тоже не должно инициироваться
    });
});
