import { useState } from 'react';

/**
 * Toggle Component
 * Premium switch with smooth animation
 */
export default function Toggle({ label, description, defaultChecked = false, onChange }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
      <div className="flex-1">
        <label htmlFor={label} className="text-sm font-medium text-white cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-zinc-500 mt-1">
            {description}
          </p>
        )}
      </div>

      <button
        id={label}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        className={`
          relative w-11 h-6 rounded-full transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
          ${checked 
            ? 'bg-emerald-500' 
            : 'bg-white/[0.1]'
          }
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
            transition-transform duration-300 ease-in-out shadow-lg
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}
