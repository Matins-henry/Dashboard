import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Activity, 
  Users, 
  Settings,
  BarChart3,
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import useUserStore from "../store/useUserStore";
import usePreferencesStore from "../store/usePreferencesStore";

// Modern design tokens
const DESIGN = {
  sidebar: {
    width: "260px",
    collapsedWidth: "72px",
  },
};

const NAV_ITEMS = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "To-Do", path: "/todo", icon: CheckSquare },
  { name: "Activities", path: "/activities", icon: Activity },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Community", path: "/community", icon: Users },
  { name: "Messages", path: "/messages", icon: MessageSquare },
];

/**
 * Modern NavItem - Clean and minimal
 */
function NavItem({ item, isActive }) {
  const Icon = item.icon;
  
  return (
    <Link to={item.path} className="group relative block">
      <motion.div
        className={`
          relative flex items-center gap-3 px-3 py-2.5 rounded-lg
          transition-all duration-200
          ${isActive 
            ? "bg-emerald-500/10 text-white" 
            : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
          }
        `}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full"
            layoutId="activeIndicator"
          />
        )}
        
        {/* Icon */}
        <Icon 
          size={20} 
          strokeWidth={isActive ? 2.5 : 2}
          className="relative z-10 flex-shrink-0"
        />
        
        {/* Label */}
        <span className={`
          relative z-10 text-sm font-medium sidebar-label
          ${isActive ? "font-semibold" : ""}
        `}>
          {item.name}
        </span>
      </motion.div>
    </Link>
  );
}

/**
 * Premium Sidebar - World-class design
 */
export default function Sidebar({ currentRoute }) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const showSidebarLabels = usePreferencesStore((state) => state.appearance.showSidebarLabels);
  
  const activeRoute = currentRoute || location.pathname;
  
  // Apply body class for sidebar toggle
  useEffect(() => {
    if (showSidebarLabels) {
      document.body.classList.remove('hide-sidebar-labels');
    } else {
      document.body.classList.add('hide-sidebar-labels');
    }
  }, [showSidebarLabels]);
  
  const isActive = (path) => {
    if (path === "/") return activeRoute === "/";
    return activeRoute.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full sidebar-content">
      {/* Logo Section - Modern */}
      <div className="px-4 py-5">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-base">L</span>
          </div>
          <div className="sidebar-label">
            <h1 className="text-base font-bold text-white">
              Life<span className="text-emerald-400">Board</span>
            </h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem 
              key={item.path}
              item={item} 
              isActive={isActive(item.path)}
            />
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-2 border-t border-white/[0.06] pt-2">
        {/* Settings */}
        <NavItem 
          item={{ name: "Settings", path: "/settings", icon: Settings }}
          isActive={isActive("/settings")}
        />
        
        {/* User profile */}
        <Link to="/settings" className="block">
          <motion.div 
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-all"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative flex-shrink-0">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0a0a0a]" />
            </div>
            <div className="flex-1 min-w-0 sidebar-label">
              <p className="text-sm font-semibold text-white truncate">{user.name}</p>
              <p className="text-xs text-zinc-500 truncate">{user.role}</p>
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-5 left-5 z-50 p-2.5 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 text-white hover:bg-zinc-800 transition-all duration-300 shadow-xl"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - Modern & Clean */}
      <aside 
        className={`
          sidebar-container sidebar-themed
          fixed left-0 top-0 h-screen flex flex-col
          backdrop-blur-2xl
          transition-all duration-300 ease-out z-40
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ 
          width: showSidebarLabels ? DESIGN.sidebar.width : DESIGN.sidebar.collapsedWidth,
        }}
      >
        <SidebarContent />
      </aside>

      {/* Desktop spacer */}
      <div 
        className="hidden md:block flex-shrink-0 transition-all duration-300 ease-out" 
        style={{ width: showSidebarLabels ? DESIGN.sidebar.width : DESIGN.sidebar.collapsedWidth }}
      />
    </>
  );
}
