import React from 'react';
import { CheckCircle, Clock, AlertTriangle, ListTodo } from 'lucide-react';
import type { TodoStats as Stats } from '../types/todo';

interface TodoStatsProps {
  stats: Stats;
}

export const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Total',
      value: stats.total,
      icon: ListTodo,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'High Priority',
      value: stats.highPriority,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ];

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">{completionRate}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                </div>
                <Icon size={24} className={item.color} />
              </div>
            </div>
          );
        })}
      </div>

      {stats.total === 0 && (
        <div className="text-center py-8">
          <ListTodo size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">No todos yet. Add your first todo above!</p>
        </div>
      )}
    </div>
  );
};