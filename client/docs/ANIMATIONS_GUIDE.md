# 🎬 LifeBoard Animations Guide

## Overview
This guide documents all the premium animations implemented across the LifeBoard dashboard. Every interaction is designed to feel smooth, intentional, and delightful.

---

## 🎨 Animation Philosophy

### Core Principles
1. **Purposeful** - Every animation serves a purpose (feedback, hierarchy, delight)
2. **Smooth** - 60fps performance with GPU-accelerated properties
3. **Consistent** - Unified timing and easing across the app
4. **Subtle** - Animations enhance, never distract
5. **Accessible** - Respects `prefers-reduced-motion`

### Timing Standards
- **Fast**: 180ms - Quick feedback (buttons, toggles)
- **Default**: 350ms - Standard transitions (cards, modals)
- **Slow**: 500ms - Page transitions, complex animations

### Easing Curves
- **Standard**: `cubic-bezier(0.22, 1, 0.36, 1)` - Smooth, natural
- **Fast**: `cubic-bezier(0.4, 0, 0.2, 1)` - Quick, responsive
- **Spring**: `type: 'spring', stiffness: 300, damping: 24` - Bouncy, playful

---

## 📦 Animation System

### Framer Motion Presets
Located in: `src/utils/motionPresets.js`

#### Page Transitions
```javascript
pageVariants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -8, filter: 'blur(4px)' }
}
```

**Usage**: Applied in `MainLayout.jsx` for route transitions

#### Stagger Containers
```javascript
createStaggerContainer(stagger = 0.06, delayChildren = 0)
```

**Purpose**: Animate children sequentially
**Example**: Stats cards, list items

#### Element Variants

**fadeInUp**
- Fades in while sliding up
- Perfect for: Cards, sections, content blocks

**slideInRight**
- Slides in from right
- Perfect for: Sidebar items, notifications

**scaleIn**
- Scales up with fade
- Perfect for: Modals, popovers, tooltips

**popIn**
- Spring-based scale animation
- Perfect for: Buttons, badges, alerts

---

## 🎯 Page-Specific Animations

### Dashboard
**Sequence**:
1. Header fades in (0ms)
2. Stats cards stagger in (100ms delay, 80ms between)
3. Recent activities slide in (400ms delay, 100ms between)
4. Quick actions fade in (500ms)

**Interactions**:
- Stats cards lift on hover (-4px)
- Activity items slide right on hover (4px)
- Quick action buttons scale on hover (1.02x)

### Analytics
**Sequence**:
1. Header + filters fade in (0ms)
2. KPI cards stagger in (100ms delay, 80ms between)
3. Charts stagger in (300ms delay, 120ms between)
4. Recent events slide in (500ms delay, 100ms between)

**Special Effects**:
- Chart icons rotate 360° on hover
- KPI values scale in with delay
- Chart bars animate from 0 to full width
- Pie chart segments animate with rotation

### To-Do
**Sequence**:
1. Header fades in (0ms)
2. Stats cards stagger in (80ms delay, 40ms between)
3. Filters fade in (120ms)
4. Task list staggers in (120ms delay, 40ms between)

**Interactions**:
- Task items slide right on hover (4px)
- Checkboxes scale on click
- Delete button fades in on hover
- Priority badges pulse on high priority

### Activities
**Sequence**:
1. Header fades in (0ms)
2. Stats cards stagger in (100ms delay, 80ms between)
3. Category chart scales in (200ms)
4. Chart bars animate sequentially (300ms delay, 100ms between)
5. Activity list staggers in (400ms delay, 40ms between)

**Interactions**:
- Activity items slide right on hover (4px)
- Category bars grow from 0 to full width
- Stats cards lift on hover (-4px)

---

## 🎭 Component Animations

### Cards
```jsx
<motion.div
  variants={fadeInUp}
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
```

**Effects**:
- Fade in + slide up on mount
- Lift + slight scale on hover
- Gradient overlay fades in on hover

### Buttons
```jsx
<motion.button
  whileHover={{ y: -2, scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.18 }}
>
```

**Effects**:
- Lift on hover
- Scale down on click
- Shimmer effect on gradient buttons

### Modals
```jsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
>
```

**Effects**:
- Fade + scale in
- Backdrop blur fades in
- Content staggers in after modal

### Lists
```jsx
{items.map((item, index) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.04 }}
    whileHover={{ x: 4 }}
  >
))}
```

**Effects**:
- Stagger in from left
- Slide right on hover
- Smooth exit animation

---

## 🎨 CSS Animations

### Shimmer Effect
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

**Usage**: Loading skeletons, gradient buttons

### Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
  50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.4); }
}
```

**Usage**: Active states, notifications, alerts

### Slide In Up
```css
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Usage**: Page content, sections

---

## 🚀 Performance Optimization

### GPU-Accelerated Properties
✅ **Use these** (60fps):
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness)

❌ **Avoid these** (janky):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Best Practices
1. **Use `will-change` sparingly** - Only for animations in progress
2. **Limit simultaneous animations** - Max 10-15 elements at once
3. **Use `AnimatePresence`** - For exit animations
4. **Debounce scroll animations** - Prevent performance issues
5. **Test on low-end devices** - Ensure smooth experience

---

## 🎯 Hover Interactions

### Lift Effect
```jsx
whileHover={{ y: -4 }}
transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
```

**Used on**: Cards, buttons, list items

### Scale Effect
```jsx
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.18 }}
```

**Used on**: Buttons, icons, badges

### Slide Effect
```jsx
whileHover={{ x: 4 }}
transition={{ duration: 0.2 }}
```

**Used on**: List items, links, navigation

### Glow Effect
```jsx
whileHover={{ 
  boxShadow: '0 18px 45px rgba(16, 185, 129, 0.28)' 
}}
```

**Used on**: Primary buttons, CTAs

---

## 📱 Responsive Animations

### Mobile Considerations
- **Reduce motion** - Simpler animations on mobile
- **Faster timing** - 200ms instead of 350ms
- **Fewer effects** - Skip blur, complex transforms
- **Touch feedback** - Scale down on tap

### Implementation
```jsx
const isMobile = window.innerWidth < 768;

<motion.div
  animate={{ 
    y: isMobile ? 0 : -4,
    filter: isMobile ? 'none' : 'blur(0px)'
  }}
>
```

---

## 🎬 Loading States

### Skeleton Loaders
Located in: `src/components/LoadingSkeleton.jsx`

**Components**:
- `SkeletonCard` - Card placeholder
- `SkeletonStat` - Stat card placeholder
- `SkeletonList` - List placeholder

**Features**:
- Shimmer animation
- Staggered appearance
- Matches actual content layout

### Usage
```jsx
{isLoading ? (
  <SkeletonList count={5} />
) : (
  <ActivityList items={activities} />
)}
```

---

## 🎨 Chart Animations

### Recharts Configuration
```jsx
<Bar
  animationDuration={1000}
  animationBegin={0}
  animationEasing="ease-out"
/>
```

**Timing**:
- Bars: 1000ms
- Lines: 1500ms
- Pies: 1200ms

**Stagger**:
- Multiple bars: 200ms delay between
- Chart elements: Sequential animation

---

## 🔮 Future Enhancements

### Planned Animations
- [ ] Scroll-triggered animations
- [ ] Parallax effects on dashboard
- [ ] Confetti on task completion
- [ ] Ripple effect on buttons
- [ ] Morphing transitions between views
- [ ] Particle effects on hover
- [ ] 3D card flip animations
- [ ] Liquid loading animations

### Advanced Features
- [ ] `prefers-reduced-motion` support
- [ ] Animation speed controls
- [ ] Custom animation presets
- [ ] Animation playground
- [ ] Performance monitoring

---

## 📚 Resources

### Documentation
- [Framer Motion Docs](https://www.framer.com/motion/)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

### Inspiration
- [Linear](https://linear.app) - Smooth, purposeful animations
- [Vercel](https://vercel.com) - Subtle, elegant transitions
- [Stripe](https://stripe.com) - Polished, professional effects
- [Arc Browser](https://arc.net) - Playful, delightful interactions

---

## 🎯 Quick Reference

### Common Patterns

**Stagger List**:
```jsx
<motion.div variants={createStaggerContainer(0.04, 0.2)}>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Hover Card**:
```jsx
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
```

**Button Press**:
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
>
```

**Modal**:
```jsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
  )}
</AnimatePresence>
```

---

**Built with motion. Designed for delight.** ✨
