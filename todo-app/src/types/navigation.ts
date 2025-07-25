export type ViewType = 'todos' | 'statistics' | 'search' | 'categories';

export interface NavigationItem {
  id: ViewType;
  label: string;
  icon: string;
  description: string;
}