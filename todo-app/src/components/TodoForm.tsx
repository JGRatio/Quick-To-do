import React, { useState } from 'react';
import { Plus, Tag, Flag } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoFormProps {
  onAdd: (text: string, priority: Todo['priority'], category?: string) => void;
  categories: string[];
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd, categories }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const selectedCategory = newCategory.trim() || category || undefined;
    onAdd(text.trim(), priority, selectedCategory);
    
    setText('');
    setNewCategory('');
    setCategory('');
    setPriority('medium');
    setShowAdvanced(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        {/* Main Input */}
        <div className="flex gap-4 mb-4">
          <div style={{ flex: 1 }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Add a new todo..."
              className="form-input"
              autoFocus
            />
          </div>
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`btn btn-secondary ${showAdvanced ? 'active' : ''}`}
            style={showAdvanced ? { background: '#bee3f8', color: '#2b6cb0' } : {}}
          >
            <Tag size={16} />
            <span>Options</span>
          </button>
          <button
            type="submit"
            disabled={!text.trim()}
            className="btn btn-primary"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="filter-grid" style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            {/* Priority Selection */}
            <div className="form-group">
              <label className="form-label">
                <Flag size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                className="form-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            {/* Existing Category Selection */}
            <div className="form-group">
              <label className="form-label">
                <Tag size={14} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value) setNewCategory('');
                }}
                className="form-select"
              >
                <option value="">Select category...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* New Category Input */}
            <div className="form-group">
              <label className="form-label">
                New Category
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  if (e.target.value) setCategory('');
                }}
                placeholder="Create new category..."
                className="form-input"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};