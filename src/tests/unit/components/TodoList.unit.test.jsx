// src/tests/unit/components/TodoList.unit.test.jsx

import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '@/components/TodoList';
import AddTodo from "@/components/AddTodo";



// Интерфейс для структуры to-do
const Todo = {
    id: 1,
    text: 'Learn React',
    completed: false
};

// Mock функции для обработчиков
const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

describe('TodoList', () => {
    it('renders "No todos found" when todos array is empty', () => {
        render(<TodoList todos={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        expect(screen.getByTestId('empty-list')).toHaveTextContent('No todos found');
    });

    it('renders todos when todos array is not empty', () => {
        const todos = [
            { id: 1, text: 'Learn React', completed: false },
            { id: 2, text: 'Write tests', completed: false },
        ];
        render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        expect(screen.getByTestId('todo-list')).toBeInTheDocument();
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Write tests')).toBeInTheDocument();
    });

    it('добавляет новую задачу при вводе текста и нажатии кнопки', () => {
        const mockOnAdd = jest.fn();

        render(<AddTodo onAdd={mockOnAdd} />);

        const inputField = screen.getByTestId('todo-input');
        const submitButton = screen.getByTestId('add-button');

        // Вводим текст в поле
        fireEvent.change(inputField, { target: { value: 'Купить хлеб' } });

        // Кликаем по кнопке "Добавить"
        fireEvent.click(submitButton);

        // Проверяем, что обработчик был вызван с правильным текстом
        expect(mockOnAdd).toHaveBeenCalledWith('Купить хлеб');
    });

    it('calls onToggle when a todo item is toggled', () => {
        const todos = [
            { id: 1, text: 'Learn React', completed: false },
        ];
        const { container } = render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        // Выводим отрендеренный HTML в консоль
        const toggleCheckbox = screen.getByTestId('toggle-1');
        fireEvent.click(toggleCheckbox);
        expect(mockOnToggle).toHaveBeenCalledWith(1);
    });

    it('calls onDelete when a todo item is deleted', () => {
        const todos = [
            { id: 1, text: 'Learn React', completed: false },
        ];
        render(<TodoList todos={todos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);
        expect(mockOnDelete).toHaveBeenCalledWith(1);
    });
});
