
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-title">
            <div className="header-icon">
              <CheckSquare size={32} />
            </div>
            <h1>Modern Todo</h1>
            <Sparkles size={20} style={{ color: '#764ba2' }} />
          </div>
          <p className="header-subtitle">
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
        <footer className="text-center mt-4" style={{ color: '#718096', fontSize: '0.875rem' }}>
          <div className="flex items-center justify-center gap-2">
            <span>Built with React & TypeScript</span>
            <span>•</span>
            <span>Icons by Lucide</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
