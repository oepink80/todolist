// src/tests/integration/TodoList.test.jsx
import { render, screen, act, waitFor } from '@testing-library/react';
import TodoList from '@/components/TodoList';
import { useTodos } from '@/hooks/useTodos';

it('renders initial todos successfully', async () => {
    render(<TodoList />);
    await waitFor(() => screen.getByText('Buy milk'), { timeout: 500 });
    await waitFor(() => screen.getByText('Walk dog'), { timeout: 500 });
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
