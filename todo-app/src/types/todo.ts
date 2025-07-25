export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

export type FilterType = 'all' | 'active' | 'completed';
export type SortType = 'createdAt' | 'priority' | 'alphabetical';

export interface TodoFilters {
  filter: FilterType;
  sort: SortType;
  category?: string;
  search?: string;
}