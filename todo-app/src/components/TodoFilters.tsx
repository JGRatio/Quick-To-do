import React from 'react';
import { Search, Filter, SortAsc, Trash2 } from 'lucide-react';
import type { TodoFilters as Filters, FilterType, SortType } from '../types/todo';

interface TodoFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  categories: string[];
  onClearCompleted: () => void;
  completedCount: number;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filters,
  onFiltersChange,
  categories,
  onClearCompleted,
  completedCount,
}) => {
  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const filterOptions: { value: FilterType; label: string; color: string }[] = [
    { value: 'all', label: 'All', color: 'text-gray-700' },
    { value: 'active', label: 'Active', color: 'text-blue-600' },
    { value: 'completed', label: 'Completed', color: 'text-green-600' },
  ];

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'priority', label: 'Priority' },
    { value: 'alphabetical', label: 'Alphabetical' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            placeholder="Search todos..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Filter Type */}
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filters.filter}
            onChange={(e) => updateFilter('filter', e.target.value as FilterType)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="relative">
          <SortAsc size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value as SortType)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2">
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilter('category', e.target.value || undefined)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="btn-danger flex items-center space-x-1 text-sm whitespace-nowrap"
              title={`Clear ${completedCount} completed todo${completedCount === 1 ? '' : 's'}`}
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Clear ({completedCount})</span>
              <span className="sm:hidden">{completedCount}</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Indicator */}
      {(filters.search || filters.category || filters.filter !== 'all') && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Active filters:</span>
            {filters.filter !== 'all' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                {filterOptions.find(opt => opt.value === filters.filter)?.label}
              </span>
            )}
            {filters.category && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                {filters.category}
              </span>
            )}
            {filters.search && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                "{filters.search}"
              </span>
            )}
            <button
              onClick={() => onFiltersChange({
                filter: 'all',
                sort: filters.sort,
                search: '',
                category: undefined,
              })}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};