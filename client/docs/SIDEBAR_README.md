# Sidebar Component Documentation

## Overview
Production-grade sidebar navigation component built with React, React Router, and TailwindCSS.

## Features

### 🎨 Design
- **Width**: 260px (configurable via THEME constant)
- **Dark theme** with emerald/green accents
- **Modern typography** with tight tracking and proper font weights
- **Smooth transitions** on all interactive elements
- **Glass morphism effects** on user card

### 🎯 Active States
- **Left accent bar** in emerald green (#22c55e)
- **Background tint**: rgba(16, 185, 129, 0.15)
- **Bold text** and increased icon stroke width
- **Scale animation** on icon (110%)

### 🖱️ Hover States
- **Subtle background**: rgba(255, 255, 255, 0.05)
- **Text color transition** to white
- **Icon scale**: 105%
- **Smooth opacity transitions**

### 📱 Responsive
- **Mobile**: Slide-out drawer with backdrop overlay
- **Desktop**: Fixed sidebar
- **Breakpoint**: 768px (md)
- **Mobile toggle** button in top-left

## Architecture

### Component Structure
```
Sidebar (main component)
├── SidebarContent (shared between mobile/desktop)
│   ├── Logo/Brand Section
│   ├── Navigation Section
│   │   ├── Section Header
│   │   └── NavItem (x6)
│   └── Bottom Section
│       ├── Settings NavItem
│       └── User Info Card
└── Mobile Controls
    ├── Menu Button
    └── Overlay
```

### NavItem Component
Reusable navigation item with:
- Icon + Label layout
- Active/inactive states
- Hover animations
- React Router Link integration

## Theme Tokens

```javascript
const THEME = {
  sidebar: {
    bg: "#0f1012",
    border: "#1f2937",
    width: "260px",
  },
  nav: {
    active: {
      bg: "rgba(16, 185, 129, 0.15)",
      text: "#10b981",
      accent: "#22c55e",
    },
    hover: {
      bg: "rgba(255, 255, 255, 0.05)",
    },
    inactive: {
      text: "#9ca3af",
    },
  },
};
```

## Usage

### Basic
```jsx
import Sidebar from './components/sidebar';

function Layout() {
  return <Sidebar />;
}
```

### With Custom Route
```jsx
<Sidebar currentRoute="/dashboard" />
```

## Navigation Items

Current navigation structure:
1. Overview (/)
2. To-Do (/todo)
3. Activities (/activities)
4. Analytics (/analytics)
5. Community (/community)
6. Messages (/messages)
7. Settings (/settings) - bottom section

## Customization

### Adding New Navigation Items
Edit `NAVIGATION_ITEMS` array in sidebar.jsx:

```javascript
const NAVIGATION_ITEMS = [
  { name: "New Page", path: "/new-page", icon: IconComponent },
  // ...
];
```

### Changing Colors
Update the `THEME` constant at the top of the file.

### Adjusting Width
Change `THEME.sidebar.width` and update corresponding values in:
- MainLayout.jsx
- Navbar.jsx (left offset)

## Dependencies
- react
- react-router-dom
- lucide-react (icons)
- tailwindcss

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- No unnecessary re-renders
- Efficient hover states with CSS
- Lazy icon loading via lucide-react
- Optimized transitions (GPU-accelerated)

## Accessibility
- Semantic HTML (nav, aside)
- ARIA labels on buttons
- Keyboard navigation support
- Focus states on all interactive elements
- Screen reader friendly

## Future Enhancements
- [ ] Collapsible sidebar
- [ ] Nested navigation groups
- [ ] Badge/notification indicators
- [ ] Keyboard shortcuts
- [ ] Dark/light theme toggle integration
- [ ] Animation preferences (prefers-reduced-motion)
