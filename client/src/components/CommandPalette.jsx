import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Activity, BarChart3, MessageSquare, Settings, LogOut, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Command Palette (Cmd+K / Ctrl+K)
 * Quick navigation and actions
 */
export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const commands = [
    { icon: Plus, label: 'New Task', action: () => console.log('New task'), shortcut: 'N' },
    { icon: Activity, label: 'Log Activity', action: () => console.log('Log activity'), shortcut: 'L' },
    { icon: BarChart3, label: 'View Analytics', action: () => navigate('/analytics'), shortcut: 'A' },
    { icon: MessageSquare, label: 'Messages', action: () => navigate('/messages'), shortcut: 'M' },
    { icon: Settings, label: 'Settings', action: () => navigate('/settings'), shortcut: 'S' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommand = (action) => {
    action();
    setIsOpen(false);
    setSearch('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                <Search size={20} className="text-zinc-500" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none text-sm"
                  autoFocus
                />
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Command size={12} />
                  <span>K</span>
                </div>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 text-sm">
                    No commands found
                  </div>
                ) : (
                  filteredCommands.map((cmd, index) => {
                    const Icon = cmd.icon;
                    return (
                      <motion.button
                        key={cmd.label}
                        onClick={() => handleCommand(cmd.action)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                          <Icon size={16} className="text-emerald-400" />
                        </div>
                        <span className="flex-1 text-sm text-white font-medium">
                          {cmd.label}
                        </span>
                        {cmd.shortcut && (
                          <kbd className="px-2 py-1 text-xs text-zinc-400 bg-white/5 border border-white/10 rounded">
                            {cmd.shortcut}
                          </kbd>
                        )}
                      </motion.button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-zinc-500">
                <span>Navigate with ↑↓</span>
                <span>Select with ↵</span>
                <span>Close with ESC</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
