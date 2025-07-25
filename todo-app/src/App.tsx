
import { useState } from 'react';
import { CheckSquare, Sparkles } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { Navigation } from './components/Navigation';
import { TodosView } from './views/TodosView';
import { StatisticsView } from './views/StatisticsView';
import { SearchView } from './views/SearchView';
import { CategoriesView } from './views/CategoriesView';
import type { ViewType } from './types/navigation';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('todos');
  
  const {
    todos,
    allTodos,
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
    updateCategory,
    deleteCategory,
  } = useTodos();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'todos':
        return (
          <TodosView
            todos={todos}
            filters={filters}
            categories={categories}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onUpdatePriority={updatePriority}
            totalCount={allTodos.length}
          />
        );
      
      case 'statistics':
        return (
          <StatisticsView
            stats={stats}
            todos={allTodos}
          />
        );
      
      case 'search':
        return (
          <SearchView
            todos={todos}
            allTodos={allTodos}
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            onClearCompleted={clearCompleted}
            completedCount={stats.completed}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onUpdatePriority={updatePriority}
          />
        );
      
      case 'categories':
        return (
          <CategoriesView
            categories={categories}
            todos={allTodos}
            onUpdateCategory={updateCategory}
            onDeleteCategory={deleteCategory}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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

        {/* Navigation */}
        <Navigation currentView={currentView} onViewChange={setCurrentView} />

        {/* Current View */}
        <main>
          {renderCurrentView()}
        </main>

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
