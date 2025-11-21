import { Search, Bell, Sparkles, Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "../store/useUserStore";
import usePreferencesStore from "../store/usePreferencesStore";

export default function Navbar() {
  const [notifications] = useState(3);
  const [showSearch, setShowSearch] = useState(false);
  const user = useUserStore((state) => state.user);
  const showSidebarLabels = usePreferencesStore((state) => state.appearance.showSidebarLabels);

  return (
    <header 
      className={`
        navbar-themed
        h-16 backdrop-blur-2xl fixed top-0 right-0 left-0 z-30 
        transition-all duration-500 ease-out
        ${showSidebarLabels ? 'md:ml-[280px]' : 'md:ml-[72px]'}
      `}
    >
      {/* Subtle glow effect on bottom edge */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px opacity-50"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) 50%, transparent 100%)',
        }}
      />
      
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4 relative z-10">
        {/* Left Section - Logo/Title on mobile */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button - Only visible on mobile */}
          <button 
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
            aria-label="Menu"
          >
            <Menu size={22} strokeWidth={2} />
          </button>
          
          {/* Page title - Only on mobile */}
          <h1 className="md:hidden text-lg font-bold text-white">Dashboard</h1>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative group w-full">
            <Search 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" 
              size={18} 
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search anything..."
              className="
                w-full h-10 pl-11 pr-4
                bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08]
                text-white text-sm placeholder:text-zinc-500
                border border-white/[0.06] hover:border-white/10 focus:border-emerald-500/30
                rounded-xl outline-none
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Search button - Mobile only */}
          <motion.button 
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
            whileTap={{ scale: 0.95 }}
          >
            <Search size={20} strokeWidth={2} />
          </motion.button>

          {/* AI Assistant - Always visible */}
          <motion.button 
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={20} strokeWidth={2} />
            <motion.div 
              className="absolute top-1 right-1 w-2 h-2 bg-purple-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>

          {/* Notifications */}
          <motion.button
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={20} strokeWidth={2} />
            {notifications > 0 && (
              <motion.div 
                className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-1 bg-emerald-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {notifications}
              </motion.div>
            )}
          </motion.button>

          {/* User Avatar */}
          <motion.button 
            className="flex items-center gap-2 p-1.5 hover:bg-white/[0.06] rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0a0a0a]" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
              <p className="text-xs text-zinc-500">{user.role}</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 p-4 navbar-themed border-t border-white/[0.06]"
          >
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" 
                size={18} 
                strokeWidth={2}
              />
              <input
                type="text"
                placeholder="Search anything..."
                autoFocus
                className="
                  w-full h-11 pl-11 pr-4
                  bg-white/[0.03] focus:bg-white/[0.08]
                  text-white text-sm placeholder:text-zinc-500
                  border border-white/[0.06] focus:border-emerald-500/30
                  rounded-xl outline-none
                  transition-all duration-300
                "
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
