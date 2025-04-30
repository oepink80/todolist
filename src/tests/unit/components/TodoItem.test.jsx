import { render, screen } from '@testing-library/react';
import TodoItem from '@/components/TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders todo item correctly', () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});