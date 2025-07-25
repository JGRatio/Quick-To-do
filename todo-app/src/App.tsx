
import { CheckSquare, Sparkles } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';

function App() {
  const {
    todos,
    stats,
    categories,
    filters,
    setFilters,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    updatePriority,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <CheckSquare size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Todo
            </h1>
            <Sparkles size={20} className="text-purple-500" />
          </div>
          <p className="text-gray-600 text-lg">
            Organize your tasks with style and efficiency
          </p>
        </header>

        {/* Stats */}
        <TodoStats stats={stats} />

        {/* Add Todo Form */}
        <TodoForm onAdd={addTodo} categories={categories} />

        {/* Filters */}
        <TodoFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          onClearCompleted={clearCompleted}
          completedCount={stats.completed}
        />

        {/* Todo List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <CheckSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {filters.filter === 'all' && !filters.search && !filters.category
                    ? 'No todos yet'
                    : 'No todos match your filters'}
                </h3>
                <p className="text-gray-500">
                  {filters.filter === 'all' && !filters.search && !filters.category
                    ? 'Add your first todo above to get started!'
                    : 'Try adjusting your filters or add a new todo.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Showing {todos.length} of {stats.total} todo{stats.total === 1 ? '' : 's'}
                </p>
                {filters.filter !== 'all' && (
                  <button
                    onClick={() => setFilters({ ...filters, filter: 'all' })}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Show all
                  </button>
                )}
              </div>

              {/* Todo Items */}
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  onUpdatePriority={updatePriority}
                />
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <span>Built with React & TypeScript</span>
            <span>•</span>
            <span>Styled with Tailwind CSS</span>
            <span>•</span>
            <span>Icons by Lucide</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
