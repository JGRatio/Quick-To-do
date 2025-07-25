import React from 'react';
import { Search, Filter, SortAsc, Trash2, X } from 'lucide-react';
import { TodoItem } from '../components/TodoItem';
import type { TodoFilters, FilterType, SortType, Todo } from '../types/todo';

interface SearchViewProps {
  todos: Todo[];
  allTodos: Todo[];
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
  categories: string[];
  onClearCompleted: () => void;
  completedCount: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Todo['priority']) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  todos,
  allTodos,
  filters,
  onFiltersChange,
  categories,
  onClearCompleted,
  completedCount,
  onToggle,
  onDelete,
  onEdit,
  onUpdatePriority,
}) => {
  const updateFilter = (key: keyof TodoFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      filter: 'all',
      sort: 'createdAt',
      search: '',
      category: undefined,
    });
  };

  const filterOptions: { value: FilterType; label: string; description: string }[] = [
    { value: 'all', label: 'All Tasks', description: 'Show all your tasks' },
    { value: 'active', label: 'Active Tasks', description: 'Show only pending tasks' },
    { value: 'completed', label: 'Completed Tasks', description: 'Show only finished tasks' },
  ];

  const sortOptions: { value: SortType; label: string; description: string }[] = [
    { value: 'createdAt', label: 'Date Created', description: 'Newest first' },
    { value: 'priority', label: 'Priority Level', description: 'High priority first' },
    { value: 'alphabetical', label: 'Alphabetical', description: 'A-Z order' },
  ];

  const hasActiveFilters = filters.search || filters.category || filters.filter !== 'all';

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Search size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Search & Filter</h2>
        </div>
        <p className="text-gray-600">Find and filter your tasks with advanced options</p>
      </div>

      {/* Search Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Controls</h3>
        
        <div className="space-y-4">
          {/* Main Search Bar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Tasks
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={filters.search || ''}
                onChange={(e) => updateFilter('search', e.target.value)}
                placeholder="Type to search tasks..."
                className="w-full pl-9 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {filters.search && (
                <button
                  onClick={() => updateFilter('search', '')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {filters.search && (
              <p className="text-xs text-gray-500 mt-1">
                Found {todos.length} task{todos.length === 1 ? '' : 's'} matching "{filters.search}"
              </p>
            )}
          </div>

          {/* Filter Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter size={14} className="inline mr-1" />
                Task Status
              </label>
              <select
                value={filters.filter}
                onChange={(e) => updateFilter('filter', e.target.value as FilterType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {filterOptions.find(opt => opt.value === filters.filter)?.description}
              </p>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SortAsc size={14} className="inline mr-1" />
                Sort Order
              </label>
              <select
                value={filters.sort}
                onChange={(e) => updateFilter('sort', e.target.value as SortType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {sortOptions.find(opt => opt.value === filters.sort)?.description}
              </p>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Filter
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => updateFilter('category', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {categories.length} categor{categories.length === 1 ? 'y' : 'ies'} available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters & Actions */}
      {hasActiveFilters && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-blue-900">Active Filters</h4>
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              Clear all filters
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.filter !== 'all' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Status: {filterOptions.find(opt => opt.value === filters.filter)?.label}
              </span>
            )}
            {filters.category && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                Category: {filters.category}
              </span>
            )}
            {filters.search && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Search: "{filters.search}"
              </span>
            )}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>
              Showing {todos.length} of {allTodos.length} total task{allTodos.length === 1 ? '' : 's'}
            </span>
            {filters.sort !== 'createdAt' && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                Sorted by {sortOptions.find(opt => opt.value === filters.sort)?.label}
              </span>
            )}
          </div>
          
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm"
            >
              <Trash2 size={14} />
              <span>Clear {completedCount} completed</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {hasActiveFilters ? 'No tasks match your search' : 'No tasks to display'}
              </h3>
              <p className="text-gray-500 mb-4">
                {hasActiveFilters 
                  ? 'Try adjusting your search terms or filters above.'
                  : 'Add some tasks first in the Todos view.'
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Search Results ({todos.length})
              </h3>
            </div>

            {/* Todo Items */}
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onUpdatePriority={onUpdatePriority}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};