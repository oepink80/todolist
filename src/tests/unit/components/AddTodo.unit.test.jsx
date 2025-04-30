// __tests__/AddTodo.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTodo from '@/components/AddTodo'; // Подставьте правильный путь к вашему файлу

describe('AddTodo', () => {
    it('renders input field with correct placeholder', () => {
        render(<AddTodo onAdd={() => {}} />); // передаем пустой колбэк для тестирования рендеринга
        expect(screen.getByPlaceholderText(/Add new todo/i)).toBeInTheDocument(); // Проверяем наличие поля ввода
    });

    it('triggers add callback when submitting a valid text', async () => {
        const mockOnAdd = jest.fn(); // Создаем моковскую функцию-колбэк
        render(<AddTodo onAdd={mockOnAdd} />);

        await userEvent.type(screen.getByTestId("todo-input"), "New Todo"); // Заполняем поле ввода текстом
        await userEvent.click(screen.getByRole("button")); // Кликаем на кнопку отправки

        expect(mockOnAdd).toHaveBeenCalledWith("New Todo"); // Проверяем, была ли вызвана функция-обработчик
    });

    it('does not trigger add callback for empty or whitespace-only inputs', async () => {
        const mockOnAdd = jest.fn();
        render(<AddTodo onAdd={mockOnAdd} />);

        await userEvent.type(screen.getByTestId("todo-input"), "   "); // Пробелы
        await userEvent.click(screen.getByRole("button"));

        expect(mockOnAdd).not.toHaveBeenCalled(); // Функция не должна вызвать обработчик для пустых значений
    });

    it('clears the input after successful submission', async () => {
        const mockOnAdd = jest.fn();
        render(<AddTodo onAdd={mockOnAdd} />);

        await userEvent.type(screen.getByTestId("todo-input"), "Valid Todo");
        await userEvent.click(screen.getByRole("button"));

        expect(screen.getByTestId("todo-input")).toHaveValue(""); // Поле должно очиститься после успешной отправки
    });
});
