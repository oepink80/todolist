// src/tests/integration/TodoList.test.jsx
import { render, screen, act, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node'; // Обратите внимание, что используется 'msw/node'
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';

// Настраиваем глобальные обработчики запросов
const server = setupServer(
    ({ method, url }) => {
        if (method === 'GET' && url.pathname === '/todos') {
            return { json: [{ id: 1, title: 'Buy milk' }, { id: 2, title: 'Walk dog' }], delay: 10 };
        }

        if (method === 'POST' && url.pathname === '/todos') {
            return { json: { id: 3, title: 'New Task' }, delay: 10 };
        }
    }
);

beforeAll(() => server.listen()); // Начинаем прослушивание сервера
afterAll(() => server.close()); // Закрываем сервер после завершения тестов

it('renders initial todos successfully', async () => {
    render(<TodoList />);

    await waitFor(() => screen.getByText('Buy milk'));
    await waitFor(() => screen.getByText('Walk dog'));

    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('Walk dog')).toBeInTheDocument();
});

it('adds a new todo by clicking Add button', async () => {
    render(<TodoList />);

    await waitFor(() => screen.getByText('Buy milk'));

    // Кликаем по кнопке "Add"
    await act(async () => {
        screen.getByRole('button').click();
    });

    await waitFor(() => screen.getByText('New Task'));

    expect(screen.getByText('New Task')).toBeInTheDocument();
});
