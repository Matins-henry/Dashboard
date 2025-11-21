/**
 * Setting Section Component
 * Groups related settings with a title and clean container
 */
export default function SettingSection({ title, description, children }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-zinc-400 mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="bg-white/[0.03] rounded-2xl p-6 space-y-4 border border-white/[0.06] hover:border-white/[0.08] transition-all duration-300">
        {children}
      </div>
    </section>
  );
}
