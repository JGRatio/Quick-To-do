import React from 'react';
import { CheckSquare, BarChart3, Search, Tag } from 'lucide-react';
import type { ViewType } from '../types/navigation';
import clsx from 'clsx';

interface NavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const navigationItems = [
    {
      id: 'todos' as ViewType,
      label: 'Todos',
      icon: CheckSquare,
      description: 'Manage your tasks',
    },
    {
      id: 'statistics' as ViewType,
      label: 'Statistics',
      icon: BarChart3,
      description: 'View your progress',
    },
    {
      id: 'search' as ViewType,
      label: 'Search',
      icon: Search,
      description: 'Find specific tasks',
    },
    {
      id: 'categories' as ViewType,
      label: 'Categories',
      icon: Tag,
      description: 'Manage categories',
    },
  ];

  return (
    <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={clsx(
                'flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 flex-1 min-w-0',
                isActive
                  ? 'bg-blue-600 text-white shadow-md transform scale-[1.02]'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
              title={item.description}
            >
              <Icon size={18} />
              <div className="flex flex-col items-start min-w-0">
                <span className="font-medium text-sm">{item.label}</span>
                <span className={clsx(
                  'text-xs truncate',
                  isActive ? 'text-blue-100' : 'text-gray-500'
                )}>
                  {item.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};