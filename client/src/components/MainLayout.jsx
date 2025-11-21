import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import AuroraBackground from "./AuroraBackground";
import ParticleBackground from "./ParticleBackground";
import CommandPalette from "./CommandPalette";
import FloatingActionButton from "./FloatingActionButton";
import { pageVariants } from "../utils/motionPresets";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen theme-bg-primary flex relative overflow-hidden">
      {/* Premium Background Effects */}
      <AuroraBackground />
      <ParticleBackground />
      
      {/* Sidebar - handles its own spacing */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Navbar */}
        <Navbar />
        
        {/* Page Content with animated route transitions */}
        <main className="flex-1 pt-16 overflow-hidden">
          <div className="h-full px-4 sm:px-6 lg:px-8 py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Global Components */}
      <CommandPalette />
      <FloatingActionButton 
        onNewTask={() => console.log('New task')}
        onNewActivity={() => console.log('New activity')}
      />
    </div>
  );
}
