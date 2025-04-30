import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filter from '@/components/Filter';

describe('Filter', () => {
    let mockOnFilterChange;

    beforeEach(() => {
        mockOnFilterChange = jest.fn();
    });

    it('renders all filter buttons', () => {
        render(<Filter currentFilter='all' onFilterChange={mockOnFilterChange} />);

        const expectedFilters = ['all', 'active', 'completed'];
        expectedFilters.forEach((filter) => {
            expect(screen.getByText(filter)).toBeInTheDocument();
        });
    });

    it('highlights active filter', () => {
        render(<Filter currentFilter='active' onFilterChange={mockOnFilterChange} />);

        expect(screen.getByTestId('filter-active')).toHaveClass('active');
        expect(screen.getByTestId('filter-all')).not.toHaveClass('active');
        expect(screen.getByTestId('filter-completed')).not.toHaveClass('active');
    });

    it('triggers onFilterChange when different button is clicked', () => {
        render(<Filter currentFilter='all' onFilterChange={mockOnFilterChange} />);

        fireEvent.click(screen.getByTestId('filter-active'));
        expect(mockOnFilterChange).toHaveBeenCalledWith('active');

        fireEvent.click(screen.getByTestId('filter-completed'));
        expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
    });

    it('ignores clicks on currently active filter', () => {
        render(<Filter currentFilter='active' onFilterChange={mockOnFilterChange} />);
        fireEvent.click(screen.getByTestId('filter-active'));
        expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it('has proper accessibility attributes', () => {
        render(<Filter currentFilter='all' onFilterChange={mockOnFilterChange} />);

        const expectedFilters = ['all', 'active', 'completed'];
        expectedFilters.forEach((filter) => {
            expect(screen.getByTestId(`filter-${filter}`)).toBeInTheDocument();
        });
    });
});