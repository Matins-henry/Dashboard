/**
 * Setting Card Component
 * Individual setting row with label, value, and action button
 */
export default function SettingCard({ label, value, action, onAction, description }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-white">
          {label}
        </p>
        {value && (
          <p className="text-xs text-zinc-500 mt-1">
            {value}
          </p>
        )}
        {description && (
          <p className="text-xs text-zinc-600 mt-1">
            {description}
          </p>
        )}
      </div>

      {action && (
        <button
          onClick={onAction}
          className="
            px-4 py-2 text-sm font-medium
            text-emerald-400 hover:text-emerald-300
            bg-emerald-500/10 hover:bg-emerald-500/20
            border border-emerald-500/20 hover:border-emerald-500/30
            rounded-lg transition-all duration-300
          "
        >
          {action}
        </button>
      )}
    </div>
  );
}
