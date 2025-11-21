# Theme System Documentation

## Overview
The LifeBoard dashboard now features a complete light/dark theme system with seamless transitions and no errors. The theme system is built with CSS variables, React hooks, and Zustand state management.

## Features

### ✨ Seamless Theme Switching
- Smooth transitions between light and dark modes (300ms)
- No flash or jarring changes
- All components update automatically
- Persistent theme preference (saved to localStorage)

### 🎨 Theme-Aware Components
All major components adapt to the current theme:
- Sidebar
- Navbar
- Cards and surfaces
- Inputs and forms
- Modals and overlays
- Buttons and interactive elements
- Aurora background effects
- Particle animations

### 🔧 Implementation Details

#### CSS Variables
The theme system uses CSS custom properties defined in `src/index.css`:

**Dark Theme (Default)**
- Background: `#0a0a0a` → `#242424`
- Text: `#ffffff` → `#52525b`
- Borders: `rgba(255, 255, 255, 0.06-0.10)`

**Light Theme**
- Background: `#ffffff` → `#f3f4f6`
- Text: `#0a0a0a` → `#a1a1aa`
- Borders: `rgba(0, 0, 0, 0.08-0.15)`

#### Theme Configuration
Located in `src/utils/themeConfig.js`:
- `themes` object with complete color palettes
- `getTheme(isDark)` - Returns theme object
- `applyTheme(isDark)` - Applies theme to DOM

#### Theme Hook
Located in `src/hooks/useTheme.js`:
```javascript
const { isDark, toggleTheme } = useTheme();
```

#### State Management
Theme preference is stored in Zustand:
```javascript
const darkMode = usePreferencesStore((state) => state.appearance.darkMode);
const updateAppearance = usePreferencesStore((state) => state.updateAppearance);
```

## Usage

### Toggle Theme
Users can toggle between light and dark modes in Settings:
1. Navigate to Settings
2. Go to "Appearance" section
3. Toggle "Dark Mode" switch

### For Developers

#### Using Theme Variables in CSS
```css
.my-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}
```

#### Using Theme Classes
```jsx
<div className="theme-bg-surface theme-text-primary theme-border">
  Content
</div>
```

#### Accessing Theme in Components
```javascript
import usePreferencesStore from '../store/usePreferencesStore';

function MyComponent() {
  const darkMode = usePreferencesStore((state) => state.appearance.darkMode);
  
  return (
    <div style={{ opacity: darkMode ? 1 : 0.8 }}>
      {/* Content */}
    </div>
  );
}
```

## Theme-Aware Components

### Sidebar
- Automatically adjusts background gradient
- Border colors adapt to theme
- Text colors update seamlessly

### Navbar
- Matches sidebar theme
- Search input adapts colors
- Notification badges maintain visibility

### Aurora Background
- Reduced opacity in light mode (0.08 vs 0.15)
- Maintains visual appeal in both themes
- Smooth opacity transitions

### Particle Background
- Lighter particles in light mode
- Reduced overall opacity (0.25 vs 0.4)
- Maintains interactivity

### Cards & Surfaces
- Use `card-themed` class for automatic theming
- Hover states work in both themes
- Borders remain visible and elegant

## CSS Utility Classes

### Background Classes
- `.theme-bg-primary` - Main background
- `.theme-bg-secondary` - Secondary background
- `.theme-bg-surface` - Card/surface background
- `.theme-bg-surface-hover` - Hover state

### Text Classes
- `.theme-text-primary` - Primary text
- `.theme-text-secondary` - Secondary text
- `.theme-text-tertiary` - Tertiary text

### Border Classes
- `.theme-border` - Standard border
- `.theme-border-hover` - Hover border

### Component Classes
- `.sidebar-themed` - Sidebar styling
- `.navbar-themed` - Navbar styling
- `.card-themed` - Card styling
- `.input-themed` - Input styling
- `.modal-themed` - Modal styling
- `.dropdown-themed` - Dropdown styling

## Transition Behavior

All theme transitions use:
```css
transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
```

Animations and transforms are preserved:
```css
*[class*="animate-"],
*[class*="motion-"] {
  transition-property: background-color, border-color, color, transform, opacity;
}
```

## Browser Support
- Modern browsers with CSS custom properties support
- Fallback to dark theme for older browsers
- Smooth transitions in all supported browsers

## Performance
- CSS variables provide instant updates
- No re-renders required for theme changes
- Minimal JavaScript overhead
- GPU-accelerated transitions

## Future Enhancements
- [ ] Custom theme colors
- [ ] System theme detection (prefers-color-scheme)
- [ ] Multiple theme presets
- [ ] Per-component theme overrides
- [ ] Theme scheduling (auto-switch based on time)

## Troubleshooting

### Theme not applying
1. Check if `applyTheme()` is called in App.jsx
2. Verify CSS variables are defined in index.css
3. Ensure body class is being set correctly

### Transitions not smooth
1. Check if element has transition property
2. Verify no conflicting CSS
3. Ensure animations are not disabled in preferences

### Components not updating
1. Verify component uses CSS variables or theme classes
2. Check if component reads from preferences store
3. Ensure component re-renders on theme change

## Testing
To test the theme system:
1. Toggle dark mode in Settings
2. Verify all components update smoothly
3. Check for any visual glitches
4. Test with animations enabled/disabled
5. Verify localStorage persistence (refresh page)

## Credits
Built with ❤️ using:
- React 18
- Zustand (state management)
- Framer Motion (animations)
- Tailwind CSS (utility classes)
- CSS Custom Properties (theming)
