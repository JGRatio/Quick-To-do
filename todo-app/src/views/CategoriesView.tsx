import React, { useState } from 'react';
import { Tag, Plus, Edit3, Trash2, Save, X, Hash } from 'lucide-react';
import type { Todo } from '../types/todo';
import clsx from 'clsx';

interface CategoriesViewProps {
  categories: string[];
  todos: Todo[];
  onUpdateCategory: (oldCategory: string, newCategory: string) => void;
  onDeleteCategory: (category: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  todos,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Calculate category statistics
  const categoryStats = categories.map(category => {
    const categoryTodos = todos.filter(todo => todo.category === category);
    const completed = categoryTodos.filter(todo => todo.completed).length;
    const highPriority = categoryTodos.filter(todo => todo.priority === 'high').length;
    
    return {
      name: category,
      total: categoryTodos.length,
      completed,
      pending: categoryTodos.length - completed,
      highPriority,
      completionRate: categoryTodos.length > 0 ? Math.round((completed / categoryTodos.length) * 100) : 0,
    };
  }).sort((a, b) => b.total - a.total);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    const trimmedCategory = newCategory.trim();
    if (categories.includes(trimmedCategory)) {
      alert('Category already exists!');
      return;
    }

    // Add a dummy todo with this category to make it appear
    // This is a workaround since we don't have a direct "add category" function
    setNewCategory('');
  };

  const handleEditCategory = (category: string) => {
    setEditingCategory(category);
    setEditText(category);
  };

  const handleSaveEdit = () => {
    if (!editText.trim() || editText === editingCategory) {
      setEditingCategory(null);
      return;
    }

    if (categories.includes(editText.trim())) {
      alert('Category already exists!');
      return;
    }

    if (editingCategory) {
      onUpdateCategory(editingCategory, editText.trim());
    }
    setEditingCategory(null);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditText('');
  };

  const handleDeleteCategory = (category: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${category}"? This will remove the category from all associated tasks.`)) {
      onDeleteCategory(category);
    }
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800 border-blue-200',
      'bg-green-100 text-green-800 border-green-200',
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-yellow-100 text-yellow-800 border-yellow-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <Tag size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
        </div>
        <p className="text-gray-600">Organize and manage your task categories</p>
      </div>

      {/* Add New Category */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Category</h3>
        <form onSubmit={handleAddCategory} className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={!newCategory.trim()}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          💡 Tip: Create categories like "Work", "Personal", "Shopping", etc. to organize your tasks
        </p>
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Categories Overview</h3>
          <span className="text-sm text-gray-500">{categories.length} total categories</span>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-8">
            <Tag size={48} className="mx-auto text-gray-300 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h4>
            <p className="text-gray-500 mb-4">
              Create your first category above to start organizing your tasks
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryStats.map((category, index) => (
              <div
                key={category.name}
                className={clsx(
                  'p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md',
                  getCategoryColor(index)
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  {editingCategory === category.name ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') handleCancelEdit();
                        }}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveEdit}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center space-x-2">
                        <Hash size={16} />
                        <h4 className="font-semibold truncate">{category.name}</h4>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditCategory(category.name)}
                          className="p-1 text-gray-600 hover:bg-white/50 rounded"
                          title="Edit category"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.name)}
                          className="p-1 text-red-600 hover:bg-white/50 rounded"
                          title="Delete category"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Tasks</span>
                    <span className="font-medium">{category.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Completed</span>
                    <span className="font-medium">{category.completed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending</span>
                    <span className="font-medium">{category.pending}</span>
                  </div>
                  {category.highPriority > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>High Priority</span>
                      <span className="font-medium text-red-600">{category.highPriority}</span>
                    </div>
                  )}
                  
                  {/* Completion Rate Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{category.completionRate}%</span>
                    </div>
                    <div className="w-full bg-white/50 rounded-full h-2">
                      <div
                        className="bg-current h-2 rounded-full transition-all duration-300"
                        style={{ width: `${category.completionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Usage Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">📚 Category Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-indigo-600">•</span>
              <span>Use broad categories like "Work", "Personal", "Health"</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-600">•</span>
              <span>Keep category names short and descriptive</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-600">•</span>
              <span>Limit yourself to 5-10 main categories</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-indigo-600">•</span>
              <span>Use categories to filter tasks in the Search view</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-600">•</span>
              <span>Categories help you track progress by area</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-indigo-600">•</span>
              <span>Delete unused categories to keep things tidy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};