import React, { useState } from 'react';
import { Check, Edit3, Trash2, Flag, X, Save } from 'lucide-react';
import type { Todo } from '../types/todo';
import clsx from 'clsx';

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
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  const getPriorityBg = (priority: Todo['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div
      className={clsx(
        'todo-item group',
        todo.completed && 'completed',
        getPriorityBg(todo.priority)
      )}
    >
      <div className="flex items-center space-x-3 flex-1">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={clsx(
            'flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-200',
            todo.completed
              ? 'bg-blue-500 border-blue-500 text-white'
              : 'border-gray-300 hover:border-blue-400'
          )}
        >
          {todo.completed && <Check size={12} />}
        </button>

        {/* Todo Text */}
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <div className="flex items-center space-x-2">
              <span
                className={clsx(
                  'text-sm',
                  todo.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-900'
                )}
              >
                {todo.text}
              </span>
              {todo.category && (
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {todo.category}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Priority Flag */}
        <Flag
          size={16}
          className={clsx('transition-colors', getPriorityColor(todo.priority))}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Priority Selector */}
        <select
          value={todo.priority}
          onChange={(e) => onUpdatePriority(todo.id, e.target.value as Todo['priority'])}
          className="text-xs border border-gray-300 rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>

        {isEditing ? (
          <div className="flex space-x-1">
            <button
              onClick={handleEdit}
              className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
              title="Save"
            >
              <Save size={14} />
            </button>
            <button
              onClick={() => {
                setEditText(todo.text);
                setIsEditing(false);
              }}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Cancel"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
              title="Edit"
            >
              <Edit3 size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};