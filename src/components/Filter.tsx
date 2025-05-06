// components/Filter.tsx
import React from 'react';

interface Props {
    currentFilter: 'all' | 'active' | 'completed';
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

function Filter({ currentFilter, onFilterChange }: Props) {
    return (
        <div>
            <label htmlFor="filter-select">Filter:</label>
            <select
                id="filter-select"
                value={currentFilter}
                onChange={(event) => onFilterChange(event.target.value as 'all' | 'active' | 'completed')}
            >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
}

export default Filter;
