import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoForm } from '../components/TodoForm';
import { TodoItem } from '../components/TodoItem';
import type { Todo, TodoFilters } from '../types/todo';

interface TodosViewProps {
  todos: Todo[];
  filters: TodoFilters;
  categories: string[];
  onAdd: (text: string, priority: Todo['priority'], category?: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Todo['priority']) => void;
  totalCount: number;
}

export const TodosView: React.FC<TodosViewProps> = ({
  todos,
  filters,
  categories,
  onAdd,
  onToggle,
  onDelete,
  onEdit,
  onUpdatePriority,
  totalCount,
}) => {
  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <CheckSquare size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">My Todos</h2>
        </div>
        <p className="text-gray-600">Add, edit, and manage your daily tasks</p>
      </div>

      {/* Add Todo Form */}
      <TodoForm onAdd={onAdd} categories={categories} />

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <CheckSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filters.filter === 'all' && !filters.search && !filters.category
                  ? 'No todos yet'
                  : 'No todos match your current filters'}
              </h3>
              <p className="text-gray-500">
                {filters.filter === 'all' && !filters.search && !filters.category
                  ? 'Add your first todo above to get started!'
                  : 'Try adjusting your filters in the Search view or add a new todo.'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Showing {todos.length} of {totalCount} todo{totalCount === 1 ? '' : 's'}
                {filters.filter !== 'all' && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {filters.filter}
                  </span>
                )}
              </p>
              {(filters.search || filters.category) && (
                <div className="flex items-center space-x-2 text-sm">
                  {filters.search && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Search: "{filters.search}"
                    </span>
                  )}
                  {filters.category && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      Category: {filters.category}
                    </span>
                  )}
                </div>
              )}
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