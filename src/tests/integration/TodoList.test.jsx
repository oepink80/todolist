
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '@/components/TodoList.tsx';
import TodoItem from '@/components/TodoItem.tsx';

describe('TodoList', () => {
    test('renders a list of tasks correctly', async () => {
        // Подготовленные данные
        const mockTodos = [
            { id: 1, text: 'Task 1', completed: false },
            { id: 2, text: 'Task 2', completed: true },
        ];

        // Заглушки функций обратного вызова
        const mockOnToggle = jest.fn();
        const mockOnDelete = jest.fn();

        // Рендеринг компонента
        render(
            <TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />
        );

        // Проверяем наличие элементов
        expect(screen.getByTestId('todo-list')).toBeInTheDocument(); // Основная оболочка списка должна присутствовать
        expect(screen.queryAllByText(/Task 1|Task 2/)).toHaveLength(mockTodos.length); // Все задачи должны быть видны

        // Доступ к чекбоксам по data-testid
        expect(screen.getByTestId('toggle-1')).not.toBeChecked(); // Первая задача не отмечена
        expect(screen.getByTestId('toggle-2')).toBeChecked();     // Вторая задача отмечена
    });

    test('updates the state when task is toggled or deleted', async () => {
        // Данные для тестирования
        const mockTodos = [{ id: 1, text: 'Task 1', completed: false }];
        const mockOnToggle = jest.fn();
        const mockOnDelete = jest.fn();

        // Рендерим компонент
        render(<TodoList todos={mockTodos} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        // Получаем чекбокс первой задачи
        const checkbox = screen.getByRole('checkbox');

        // Кликаем по чекбоксу
        await userEvent.click(checkbox);

        // Убеждаемся, что функция onToggle была вызвана один раз
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenLastCalledWith(1); // Должна передаваться идентификатор задачи

        // Теперь проверим удаление задачи
        const deleteButton = screen.getByRole('button', { name: /delete/i });
        await userEvent.click(deleteButton);

        // Функция удаления должна быть вызвана ровно один раз
        expect(mockOnDelete).toHaveBeenCalledTimes(1);
        expect(mockOnDelete).toHaveBeenLastCalledWith(1); // Передается идентификатор удаленной задачи
    });
});
