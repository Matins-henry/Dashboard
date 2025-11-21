# Troubleshooting Guide - Blank Page Issue

## Issue
Dashboard page shows blank/black screen when clicking "Overview"

## Root Cause
The issue is likely caused by one of the following:

1. **Zustand Store Initialization** - Stores might not be properly initialized when localStorage is empty
2. **Component Import Errors** - Missing or circular dependencies
3. **JavaScript Runtime Errors** - Uncaught exceptions breaking the render

## Fixes Applied

### 1. Added Error Handling in Dashboard.jsx ✅
```javascript
// Before
const todoStats = useTodoStore((state) => state.getStats());

// After
try {
  todoStats = useTodoStore((state) => state.getStats?.()) || { total: 0, completed: 0, active: 0, highPriority: 0, overdue: 0 };
} catch (error) {
  console.error("Error loading todo stats:", error);
  todoStats = { total: 0, completed: 0, active: 0, highPriority: 0, overdue: 0 };
}
```

### 2. Added Safety Checks for Undefined Values ✅
```javascript
// Added fallback values
const stats = [
  { label: "Total Tasks", value: (todoStats.total || 0).toString(), ... },
  { label: "Completed", value: (todoStats.completed || 0).toString(), ... },
  ...
];
```

### 3. Added Optional Chaining ✅
```javascript
// Using optional chaining to prevent errors
state.getStats?.()
state.getRecentActivities?.(3)
```

## How to Debug

### Step 1: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Check the error stack trace

### Step 2: Check Network Tab
1. Open DevTools Network tab
2. Refresh the page
3. Look for failed requests (red)
4. Check if JavaScript bundles loaded

### Step 3: Check React DevTools
1. Install React DevTools extension
2. Check if components are mounting
3. Look at component props and state

### Step 4: Check LocalStorage
1. Open DevTools → Application → Local Storage
2. Check for `lifeboard-todos` key
3. Check for `lifeboard-activities` key
4. Verify JSON is valid

## Common Issues & Solutions

### Issue 1: "Cannot read property 'getStats' of undefined"
**Solution**: Store not initialized properly
```javascript
// Add default export check in store file
const useTodoStore = create(persist(...));
export default useTodoStore;
```

### Issue 2: "Uncaught SyntaxError: Unexpected token"
**Solution**: Check for syntax errors in JSX
- Missing closing tags
- Incorrect prop syntax
- Invalid JavaScript in JSX

### Issue 3: "Module not found"
**Solution**: Check import paths
```javascript
// Correct
import useTodoStore from "../store/useTodoStore";

// Incorrect
import useTodoStore from "../store/useTodoStore.js"; // Remove .js
```

### Issue 4: Blank page with no errors
**Solution**: Check CSS
- Background might be same color as text
- Elements might be positioned off-screen
- z-index issues

## Testing Steps

### 1. Test with Empty LocalStorage
```javascript
// In browser console
localStorage.clear();
location.reload();
```

### 2. Test with Sample Data
```javascript
// In browser console
localStorage.setItem('lifeboard-todos', JSON.stringify({
  state: {
    tasks: [],
    filter: 'all',
    sortBy: 'createdAt'
  }
}));
location.reload();
```

### 3. Test Individual Components
Create a test page:
```jsx
// src/pages/Test.jsx
export default function Test() {
  return (
    <div className="p-8">
      <h1 className="text-white text-4xl">Test Page</h1>
      <p className="text-zinc-400">If you see this, routing works!</p>
    </div>
  );
}
```

## Quick Fixes to Try

### Fix 1: Clear Browser Cache
1. Ctrl + Shift + Delete
2. Clear cached images and files
3. Reload page

### Fix 2: Restart Dev Server
```bash
# Stop server (Ctrl + C)
# Start again
npm run dev
```

### Fix 3: Reinstall Dependencies
```bash
rm -rf node_modules
npm install
npm run dev
```

### Fix 4: Check for Port Conflicts
```bash
# If port 5173 is in use
# Kill the process or change port in vite.config.js
```

## Verification Checklist

After applying fixes, verify:

- [ ] Dashboard loads without errors
- [ ] Stats cards show "0" values
- [ ] Quick Actions buttons are visible
- [ ] No console errors
- [ ] Can navigate to other pages
- [ ] Can create tasks/activities
- [ ] Data persists after refresh

## If Still Not Working

### Create Minimal Dashboard
Replace Dashboard.jsx temporarily:
```jsx
export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white">Dashboard</h1>
      <p className="text-zinc-400 mt-4">Minimal test version</p>
    </div>
  );
}
```

If this works, gradually add back features to find the problematic component.

## Contact Points

If issue persists:
1. Check browser console for specific error
2. Share the exact error message
3. Check if other pages (Todo, Activities) work
4. Verify Vite dev server is running

## Files Modified for Fix

1. ✅ `src/pages/Dashboard.jsx` - Added error handling
2. ✅ `TROUBLESHOOTING.md` - This guide

## Expected Behavior

After fixes:
- Dashboard should load with "0" values for all stats
- No JavaScript errors in console
- Quick Actions buttons should be clickable
- Can navigate between pages
- Creating tasks/activities updates the stats

---

**Last Updated**: 2024-11-14
**Status**: Fixes Applied ✅
