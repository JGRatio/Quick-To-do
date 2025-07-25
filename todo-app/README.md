# Modern Todo Application

A beautiful, feature-rich todo application built with React, TypeScript, and Tailwind CSS.

![Modern Todo App](https://img.shields.io/badge/React-18.x-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-blue)

## ✨ Features

### Core Requirements ✅
- **➕ Add Tasks** - Create new todos with ease
- **✏️ Edit Tasks** - Click the edit button to modify task text
- **🗑️ Delete Tasks** - Remove unwanted tasks
- **✅ Mark as Completed** - Toggle completion status
- **🔄 Filter by Status** - View all, active, or completed tasks
- **💾 Local Storage** - Your todos persist between sessions

### Bonus Features 🚀
- **🏷️ Priority Levels** - Set tasks as low, medium, or high priority
- **📁 Categories** - Organize tasks with custom categories
- **🔍 Search** - Find tasks quickly with real-time search
- **📊 Statistics Dashboard** - Track your productivity
- **🎨 Modern UI** - Beautiful design with smooth animations
- **📱 Responsive** - Works perfectly on all screen sizes

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **clsx** - Conditional CSS classes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage Guide

### Adding Tasks
1. Type your task in the input field
2. Click "Options" to set priority and category (optional)
3. Press Enter or click "Add"

### Managing Tasks
- **Complete**: Click the circle checkbox
- **Edit**: Click the edit icon (✏️)
- **Delete**: Click the trash icon (🗑️)
- **Change Priority**: Use the dropdown in the task item

### Filtering & Search
- **Filter by Status**: Use the filter dropdown (All/Active/Completed)
- **Search**: Type in the search box to find specific tasks
- **Sort**: Choose sorting by date, priority, or alphabetical
- **Category Filter**: Select a category from the dropdown

### Statistics
The stats panel shows:
- Total tasks
- Pending tasks  
- Completed tasks
- High priority tasks
- Completion percentage with progress bar

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── TodoForm.tsx    # Add new tasks
│   ├── TodoItem.tsx    # Individual task display
│   ├── TodoFilters.tsx # Filtering and search
│   └── TodoStats.tsx   # Statistics dashboard
├── hooks/
│   └── useTodos.ts     # Custom hook for state management
├── types/
│   └── todo.ts         # TypeScript type definitions
├── App.tsx             # Main application component
├── index.css           # Global styles and Tailwind
└── main.tsx            # Application entry point
```

## 🎨 Customization

### Colors & Themes
Modify the color scheme in `src/index.css`:
- CSS custom properties for consistent theming
- Tailwind utility classes for component styling

### Adding Features
The modular architecture makes it easy to add new features:
1. Update types in `src/types/todo.ts`
2. Extend the `useTodos` hook for new functionality
3. Create new components as needed

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Component-based architecture
- Custom hooks for state management

## 📱 Browser Support

Modern browsers that support:
- ES2020+
- CSS Grid & Flexbox
- LocalStorage API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or production!

---

**Built with ❤️ using React & TypeScript**
