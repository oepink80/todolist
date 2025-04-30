import React from 'react';

// Интерфейс для свойств компонента
interface Props {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

// Массив возможных фильтров
const FILTERS: readonly string[] = ['all', 'active', 'completed'] as const;

// Компонент Filter
const Filter: React.FunctionComponent<Props> = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="filter" data-testid="filter">
            {FILTERS.map((filter) => (
                <button
                    key={filter}
                    onClick={() => {
                        if (currentFilter !== filter) {
                            onFilterChange(filter); // Вызываем обработчик только при смене фильтра
                        }
                    }}
                    className={`${currentFilter === filter ? 'active' : ''}`}
                    data-testid={`filter-${filter}`}
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default Filter;