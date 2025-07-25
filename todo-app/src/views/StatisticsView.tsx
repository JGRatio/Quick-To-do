import React from 'react';
import { BarChart3, TrendingUp, Calendar, Target } from 'lucide-react';
import { TodoStats } from '../components/TodoStats';
import type { TodoStats as Stats, Todo } from '../types/todo';

interface StatisticsViewProps {
  stats: Stats;
  todos: Todo[];
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({ stats, todos }) => {
  // Calculate additional statistics
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  
  // Priority distribution
  const priorityStats = todos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Category distribution
  const categoryStats = todos.reduce((acc, todo) => {
    if (todo.category) {
      acc[todo.category] = (acc[todo.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Recent activity (last 7 days)
  const recentTodos = todos.filter(todo => {
    const daysDiff = (Date.now() - todo.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  });

  const productivityScore = stats.total > 0 ? Math.round(
    (stats.completed * 0.6 + (stats.total - stats.pending) * 0.3 + (stats.total - stats.highPriority) * 0.1) / stats.total * 100
  ) : 0;

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-2">
          <BarChart3 size={24} className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Statistics & Analytics</h2>
        </div>
        <p className="text-gray-600">Track your productivity and progress over time</p>
      </div>

      {/* Main Stats */}
      <TodoStats stats={stats} />

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Score */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target size={20} className="text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Productivity Score</h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray={`${productivityScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-green-600">{productivityScore}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Based on completion rate, pending tasks, and priorities</p>
              <p className="text-xs text-gray-500">
                {productivityScore >= 80 ? 'Excellent!' : 
                 productivityScore >= 60 ? 'Good progress' : 
                 productivityScore >= 40 ? 'Keep going' : 'Room for improvement'}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tasks added (7 days)</span>
              <span className="text-sm font-medium">{recentTodos.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average per day</span>
              <span className="text-sm font-medium">{(recentTodos.length / 7).toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Completion rate</span>
              <span className="text-sm font-medium">{completionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority & Category Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp size={20} className="text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Priority Distribution</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(priorityStats).map(([priority, count]) => {
              const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
              const colors = {
                high: 'bg-red-500',
                medium: 'bg-yellow-500',
                low: 'bg-green-500'
              };
              
              return (
                <div key={priority} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{priority}</span>
                      <span className="text-sm text-gray-600">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[priority as keyof typeof colors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {Object.keys(priorityStats).length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No tasks yet</p>
          )}
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-5 h-5 bg-indigo-600 rounded" />
            <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(categoryStats)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([category, count]) => {
                const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                
                return (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 truncate flex-1 mr-2">{category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{count}</span>
                      <span className="text-xs text-gray-500">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
          </div>
          {Object.keys(categoryStats).length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No categories yet</p>
          )}
          {Object.keys(categoryStats).length > 5 && (
            <p className="text-xs text-gray-500 mt-2">
              +{Object.keys(categoryStats).length - 5} more categories
            </p>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Productivity Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Keep your high-priority tasks under 3-5 per day for better focus</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Aim for 70%+ completion rate to maintain momentum</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Use categories to organize different areas of your life</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Review your statistics weekly to identify patterns</span>
          </div>
        </div>
      </div>
    </div>
  );
};