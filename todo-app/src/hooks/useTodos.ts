import { useState, useEffect, useCallback } from 'react';
import type { Todo, TodoFilters, TodoStats } from '../types/todo';

const STORAGE_KEY = 'modern-todo-app';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({
    filter: 'all',
    sort: 'createdAt',
    search: '',
  });

  // Load todos from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedTodos = JSON.parse(stored).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Failed to parse stored todos:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string, priority: Todo['priority'] = 'medium', category?: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority,
      category,
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, text: text.trim(), updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const updatePriority = useCallback((id: string, priority: Todo['priority']) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, priority, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  // Filter and sort todos based on current filters
  const filteredTodos = todos
    .filter(todo => {
      if (filters.filter === 'active') return !todo.completed;
      if (filters.filter === 'completed') return todo.completed;
      return true;
    })
    .filter(todo => {
      if (filters.search) {
        return todo.text.toLowerCase().includes(filters.search.toLowerCase());
      }
      return true;
    })
    .filter(todo => {
      if (filters.category) {
        return todo.category === filters.category;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'createdAt':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  // Calculate stats
  const stats: TodoStats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    highPriority: todos.filter(todo => todo.priority === 'high' && !todo.completed).length,
  };

  // Get unique categories
  const categories = Array.from(new Set(todos.map(todo => todo.category).filter(Boolean))) as string[];

  return {
    todos: filteredTodos,
    allTodos: todos,
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
  };
};