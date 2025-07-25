import React from 'react';
import { CheckSquare, BarChart3, Search, Tag } from 'lucide-react';
import type { ViewType } from '../types/navigation';

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
    <nav className="navigation">
      <div className="nav-grid">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`nav-button ${isActive ? 'active' : ''}`}
              title={item.description}
            >
              <Icon size={18} />
              <div className="nav-content">
                <span className="nav-label">{item.label}</span>
                <span className="nav-description">
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