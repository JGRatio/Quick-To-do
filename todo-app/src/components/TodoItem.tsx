import React, { useState } from 'react';
import { Check, Edit3, Trash2, Flag, X, Save } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Todo['priority']) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onUpdatePriority,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const getPriorityColor = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return '#f56565';
      case 'medium':
        return '#ed8936';
      case 'low':
        return '#48bb78';
      default:
        return '#a0aec0';
    }
  };

  const todoClasses = [
    'todo-item',
    todo.completed ? 'completed' : '',
    `priority-${todo.priority}`
  ].filter(Boolean).join(' ');

  return (
    <div className={todoClasses}>
      <div className="todo-content">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        >
          {todo.completed && <Check size={12} />}
        </button>

        {/* Todo Text */}
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="form-input"
              style={{ fontSize: '0.875rem', padding: '0.5rem' }}
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </span>
              {todo.category && (
                <span className="todo-category">
                  {todo.category}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Priority Flag */}
        <Flag size={16} style={{ color: getPriorityColor(todo.priority) }} />
      </div>

      {/* Actions */}
      <div className="todo-actions">
        {/* Priority Selector */}
        <select
          value={todo.priority}
          onChange={(e) => onUpdatePriority(todo.id, e.target.value as Todo['priority'])}
          className="form-select"
          style={{ fontSize: '0.75rem', padding: '0.25rem' }}
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>

        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="action-btn"
              title="Save"
              style={{ color: '#48bb78' }}
            >
              <Save size={14} />
            </button>
            <button
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(false);
              }}
              className="action-btn"
              title="Cancel"
              style={{ color: '#a0aec0' }}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="action-btn edit"
              title="Edit"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="action-btn delete"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};