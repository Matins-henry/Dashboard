import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, SortAsc, CheckCircle2, Circle, ListTodo, AlertCircle } from 'lucide-react';
import useTodoStore from '../store/useTodoStore';
import CreateTaskModal from '../components/CreateTaskModal';
import TaskItem from '../components/TaskItem';
import { createStaggerContainer, fadeInUp, slideInRight } from '../utils/motionPresets';

const pageContainer = createStaggerContainer(0.06, 0.02);
const statsContainer = createStaggerContainer(0.04, 0.08);
const listContainer = createStaggerContainer(0.04, 0.12);

export default function Todo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks: allTasks, filter, setFilter, sortBy, setSortBy } = useTodoStore();
  
  // Filter and sort tasks locally
  let tasks = allTasks || [];
  if (filter === 'active') {
    tasks = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    tasks = tasks.filter(task => task.completed);
  }
  
  // Sort tasks
  tasks = [...tasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  
  // Compute stats locally
  const stats = {
    total: allTasks.length,
    completed: allTasks.filter(t => t.completed).length,
    active: allTasks.filter(t => !t.completed).length,
    highPriority: allTasks.filter(t => t.priority === 'high' && !t.completed).length,
    overdue: allTasks.filter(t => {
      if (t.completed || !t.dueDate) return false;
      return new Date(t.dueDate) < new Date();
    }).length,
  };

  const FILTERS = [
    { value: 'all', label: 'All Tasks', icon: ListTodo },
    { value: 'active', label: 'Active', icon: Circle },
    { value: 'completed', label: 'Completed', icon: CheckCircle2 },
  ];

  const SORT_OPTIONS = [
    { value: 'createdAt', label: 'Recent' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={pageContainer}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div 
        className="flex items-start justify-between"
        variants={fadeInUp}
      >
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            To-Do List
          </h1>
          <p className="text-zinc-400 mt-2 text-[15px]">
            Manage your tasks and stay productive.
          </p>
        </div>
        
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="
            group relative px-5 py-3
            bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500
            text-white font-semibold
            rounded-xl
            shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40
            transition-all duration-300
            overflow-hidden
          "
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <div className="relative flex items-center gap-2">
            <Plus size={18} strokeWidth={2.5} />
            <span>New Task</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
        variants={statsContainer}
      >
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">Total</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </motion.div>
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">Active</p>
          <p className="text-2xl font-bold text-white">{stats.active}</p>
        </motion.div>
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">Completed</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.completed}</p>
        </motion.div>
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">High Priority</p>
          <p className="text-2xl font-bold text-red-400">{stats.highPriority}</p>
        </motion.div>
        <motion.div
          className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4"
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-zinc-500 text-xs font-medium mb-1">Overdue</p>
          <p className="text-2xl font-bold text-orange-400">{stats.overdue}</p>
        </motion.div>
      </motion.div>

      {/* Filters & Sort */}
      <motion.div 
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        variants={fadeInUp}
      >
        {/* Filter tabs */}
        <div className="flex gap-2">
          {FILTERS.map((filterOption) => {
            const Icon = filterOption.icon;
            return (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${
                    filter === filterOption.value
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/[0.03] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.05]'
                  }
                `}
              >
                <Icon size={16} />
                <span>{filterOption.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          <SortAsc size={16} className="text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="
              px-3 py-2 
              bg-white/[0.03] hover:bg-white/[0.05]
              border border-white/[0.06] hover:border-white/10
              text-zinc-300 text-sm font-medium
              rounded-xl outline-none cursor-pointer
              transition-all duration-300
            "
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="bg-zinc-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <motion.div 
            className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-12"
            variants={fadeInUp}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                {filter === 'completed' ? (
                  <CheckCircle2 size={24} className="text-zinc-600" strokeWidth={2} />
                ) : (
                  <AlertCircle size={24} className="text-zinc-600" strokeWidth={2} />
                )}
              </div>
              <p className="text-zinc-400 text-sm">
                {filter === 'all' && 'No tasks yet. Create your first task to get started!'}
                {filter === 'active' && 'No active tasks. Great job!'}
                {filter === 'completed' && 'No completed tasks yet.'}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-3"
            variants={listContainer}
          >
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                variants={fadeInUp}
                initial="hidden"
                animate="show"
                transition={{
                  duration: 0.35,
                  delay: 0.12 + index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ x: 4 }}
              >
                <TaskItem task={task} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}
