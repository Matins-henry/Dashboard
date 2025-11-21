import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, AlertTriangle, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Danger Zone Card Component
function DangerZoneCard({ label, value, action, onAction, isAccountDelete = false }) {
  return (
    <motion.div 
      className="flex items-center justify-between p-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 hover:border-red-500/30 rounded-xl transition-all duration-300 group"
      whileHover={{ x: 2 }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Trash2 size={16} className="text-red-400" />
          <p className="text-sm font-semibold text-white">
            {label}
          </p>
        </div>
        <p className="text-xs text-zinc-400 mt-1">
          {value}
        </p>
      </div>

      <motion.button
        onClick={onAction}
        className={`
          px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300
          ${isAccountDelete 
            ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/25' 
            : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
          }
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {action}
      </motion.button>
    </motion.div>
  );
}
import ProfileHeader from '../components/settings/ProfileHeader';
import SettingSection from '../components/settings/SettingSection';
import SettingCard from '../components/settings/SettingCard';
import Toggle from '../components/settings/Toggle';
import AvatarUpload from '../components/settings/AvatarUpload';
import ExportDataModal from '../components/settings/ExportDataModal';
import LanguageSelector from '../components/settings/LanguageSelector';
import EditNameModal from '../components/settings/EditNameModal';
import EditEmailModal from '../components/settings/EditEmailModal';
import EditBioModal from '../components/settings/EditBioModal';
import EditLocationModal from '../components/settings/EditLocationModal';
import ConfirmationModal from '../components/settings/ConfirmationModal';
import DangerConfirmationModal from '../components/settings/DangerConfirmationModal';
import useUserStore from '../store/useUserStore';
import usePreferencesStore from '../store/usePreferencesStore';
import useTodoStore from '../store/useTodoStore';
import useActivityStore from '../store/useActivityStore';
import { useToast } from '../components/Toast';

export default function Settings() {
  // User store
  const { user, updateName, updateEmail, updateBio, updateLocation, updateAvatar } = useUserStore();
  
  // Preferences store
  const { notifications, appearance, privacy, data, updateNotifications, updateAppearance, updatePrivacy, updateData } = usePreferencesStore();
  
  // Data stores - safe access
  const todoStore = useTodoStore();
  const activityStore = useActivityStore();
  
  // Toast notifications
  const { addToast } = useToast();

  // Apply appearance preferences on mount
  useEffect(() => {
    // Apply compact layout
    if (appearance.compactLayout) {
      document.body.classList.add('compact-layout');
    } else {
      document.body.classList.remove('compact-layout');
    }
    
    // Apply animations preference
    if (!appearance.animations) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
    
    // Apply sidebar labels preference
    if (!appearance.showSidebarLabels) {
      document.body.classList.add('hide-sidebar-labels');
    } else {
      document.body.classList.remove('hide-sidebar-labels');
    }
  }, [appearance.compactLayout, appearance.animations, appearance.showSidebarLabels]);
  
  // Modal states
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditBio, setShowEditBio] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [confirmDeleteTasks, setConfirmDeleteTasks] = useState(false);
  const [confirmDeleteActivities, setConfirmDeleteActivities] = useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);

  // Handlers
  const handleSaveAvatar = (newAvatar) => {
    updateAvatar(newAvatar);
    setShowAvatarUpload(false);
    addToast('Avatar updated successfully!', 'success');
  };

  const handleSaveName = (newName) => {
    updateName(newName);
    setShowEditName(false);
    addToast('Name updated successfully!', 'success');
  };

  const handleSaveEmail = (newEmail) => {
    updateEmail(newEmail);
    setShowEditEmail(false);
    addToast('Email updated successfully!', 'success');
  };

  const handleSaveBio = (newBio) => {
    updateBio(newBio);
    setShowEditBio(false);
    addToast('Bio updated successfully!', 'success');
  };

  const handleSaveLocation = (newLocation) => {
    updateLocation(newLocation);
    setShowEditLocation(false);
    addToast('Location updated successfully!', 'success');
  };

  const handleSaveLanguage = (newLanguage) => {
    updateAppearance('language', newLanguage);
    addToast('Language preference saved!', 'success');
  };

  const handleDeleteAllTasks = () => {
    try {
      // Backup tasks for undo
      const backup = useTodoStore.getState().tasks;
      
      // Delete tasks
      useTodoStore.setState({ tasks: [] });
      
      // Show success with undo option
      addToast('All tasks deleted successfully', 'success');
      
      // Store backup temporarily for undo (5 seconds)
      const undoTimeout = setTimeout(() => {
        // Clear backup after 5 seconds
      }, 5000);
      
      // Optional: Add undo functionality
      window.__taskBackup = { data: backup, timeout: undoTimeout };
      
    } catch (error) {
      console.error('Error deleting tasks:', error);
      addToast('Error deleting tasks', 'error');
    }
  };

  const handleDeleteAllActivities = () => {
    try {
      // Backup activities for undo
      const backup = useActivityStore.getState().activities;
      
      // Delete activities
      useActivityStore.setState({ activities: [] });
      
      // Show success
      addToast('All activities deleted successfully', 'success');
      
      // Store backup temporarily for undo (5 seconds)
      const undoTimeout = setTimeout(() => {
        // Clear backup after 5 seconds
      }, 5000);
      
      // Optional: Add undo functionality
      window.__activityBackup = { data: backup, timeout: undoTimeout };
      
    } catch (error) {
      console.error('Error deleting activities:', error);
      addToast('Error deleting activities', 'error');
    }
  };

  const handleDeleteAccount = () => {
    try {
      // Clear all data
      localStorage.clear();
      
      // Show success message
      addToast('Account deleted. Redirecting to login...', 'success');
      
      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      console.error('Error deleting account:', error);
      addToast('Error deleting account', 'error');
    }
  };

  const handleClearCache = () => {
    // Clear non-essential data
    const keysToKeep = ['lifeboard-user', 'lifeboard-preferences'];
    const allKeys = Object.keys(localStorage);
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    addToast('Cache cleared successfully!', 'success');
  };

  const getLanguageName = (code) => {
    const languages = {
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      pt: 'Portuguese',
      ru: 'Russian',
      ja: 'Japanese',
      ko: 'Korean',
      zh: 'Chinese',
    };
    return languages[code] || 'English';
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <SettingsIcon size={32} className="text-emerald-400" />
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Settings
          </h1>
          <p className="text-zinc-400 mt-1 text-[15px]">
            Manage your account and preferences
          </p>
        </div>
      </div>

      {/* Profile Header */}
      <ProfileHeader 
        name={user.name}
        email={user.email}
        avatar={user.avatar}
        onChangeAvatar={() => setShowAvatarUpload(true)}
      />

      {/* Profile Settings */}
      <SettingSection 
        title="Profile Information"
        description="Update your personal details and contact information"
      >
        <SettingCard 
          label="Display Name" 
          value={user.name} 
          action="Edit" 
          onAction={() => setShowEditName(true)}
        />
        <SettingCard 
          label="Email Address" 
          value={user.email} 
          action="Change" 
          onAction={() => setShowEditEmail(true)}
        />
        <SettingCard 
          label="Bio" 
          value={user.bio} 
          action="Edit" 
          onAction={() => setShowEditBio(true)}
        />
        <SettingCard 
          label="Location" 
          value={user.location} 
          action="Update" 
          onAction={() => setShowEditLocation(true)}
        />
      </SettingSection>

      {/* Notifications */}
      <SettingSection 
        title="Notifications"
        description="Choose what updates you want to receive"
      >
        <Toggle 
          label="Email Notifications" 
          description="Receive email updates about your activity" 
          defaultChecked={notifications.email}
          onChange={(value) => {
            updateNotifications('email', value);
            addToast(
              value ? 'Email notifications enabled' : 'Email notifications disabled', 
              'success'
            );
          }}
        />
        <Toggle 
          label="Push Notifications" 
          description="Get push notifications on your devices" 
          defaultChecked={notifications.push}
          onChange={(value) => {
            updateNotifications('push', value);
            addToast(
              value ? 'Push notifications enabled' : 'Push notifications disabled', 
              'success'
            );
          }}
        />
        <Toggle 
          label="Weekly Reports" 
          description="Receive a weekly summary of your activity" 
          defaultChecked={notifications.weeklyReports}
          onChange={(value) => {
            updateNotifications('weeklyReports', value);
            addToast(
              value ? 'Weekly reports enabled' : 'Weekly reports disabled', 
              'success'
            );
          }}
        />
        <Toggle 
          label="Task Reminders" 
          description="Get reminded about upcoming tasks" 
          defaultChecked={notifications.taskReminders}
          onChange={(value) => {
            updateNotifications('taskReminders', value);
            addToast(
              value ? 'Task reminders enabled' : 'Task reminders disabled', 
              'success'
            );
          }}
        />
        <Toggle 
          label="Community Updates" 
          description="Stay updated with community posts" 
          defaultChecked={notifications.communityUpdates}
          onChange={(value) => {
            updateNotifications('communityUpdates', value);
            addToast(
              value ? 'Community updates enabled' : 'Community updates disabled', 
              'success'
            );
          }}
        />
      </SettingSection>

      {/* Appearance */}
      <SettingSection 
        title="Appearance"
        description="Customize how the dashboard looks"
      >
        <Toggle 
          label="Dark Mode" 
          description="Use dark theme across the dashboard" 
          defaultChecked={appearance.darkMode}
          onChange={(value) => {
            updateAppearance('darkMode', value);
            addToast(
              value ? 'Dark mode enabled' : 'Light mode enabled', 
              'success'
            );
            if (!value) {
              // Show info that light mode is coming
              setTimeout(() => {
                addToast('Light mode will be available in a future update', 'info');
              }, 1000);
            }
          }}
        />
        <Toggle 
          label="Compact Layout" 
          description="Reduce spacing for a denser view" 
          defaultChecked={appearance.compactLayout}
          onChange={(value) => {
            updateAppearance('compactLayout', value);
            addToast(
              value ? 'Compact layout enabled' : 'Standard layout enabled', 
              'success'
            );
            // Apply compact class to body
            if (value) {
              document.body.classList.add('compact-layout');
            } else {
              document.body.classList.remove('compact-layout');
            }
          }}
        />
        <Toggle 
          label="Animations" 
          description="Enable smooth transitions and animations" 
          defaultChecked={appearance.animations}
          onChange={(value) => {
            updateAppearance('animations', value);
            addToast(
              value ? 'Animations enabled' : 'Animations disabled', 
              'success'
            );
            // Apply no-animations class to body
            if (!value) {
              document.body.classList.add('no-animations');
            } else {
              document.body.classList.remove('no-animations');
            }
          }}
        />
        <Toggle 
          label="Show Sidebar Labels" 
          description="Display text labels in the sidebar" 
          defaultChecked={appearance.showSidebarLabels}
          onChange={(value) => {
            updateAppearance('showSidebarLabels', value);
            addToast(
              value ? 'Sidebar labels shown' : 'Sidebar labels hidden', 
              'success'
            );
            // Apply class to control sidebar labels
            if (!value) {
              document.body.classList.add('hide-sidebar-labels');
            } else {
              document.body.classList.remove('hide-sidebar-labels');
            }
          }}
        />
        <SettingCard 
          label="Language" 
          value={getLanguageName(appearance.language)} 
          action="Change" 
          description="Select your preferred language"
          onAction={() => setShowLanguageSelector(true)}
        />
      </SettingSection>

      {/* Privacy & Security */}
      <SettingSection 
        title="Privacy & Security"
        description="Manage your security settings and privacy"
      >
        <SettingCard 
          label="Password" 
          value="••••••••" 
          action="Update" 
          description="Last changed 3 months ago"
          onAction={() => addToast('Password change coming soon!', 'info')}
        />
        <SettingCard 
          label="Two-Factor Authentication" 
          value={privacy.twoFactorEnabled ? 'Enabled' : 'Disabled'} 
          action={privacy.twoFactorEnabled ? 'Disable' : 'Enable'} 
          description="Add an extra layer of security"
          onAction={() => {
            updatePrivacy('twoFactorEnabled', !privacy.twoFactorEnabled);
            addToast(`2FA ${!privacy.twoFactorEnabled ? 'enabled' : 'disabled'}!`, 'success');
          }}
        />
        <Toggle 
          label="Profile Visibility" 
          description="Make your profile visible to other users" 
          defaultChecked={privacy.profileVisible}
          onChange={(value) => {
            updatePrivacy('profileVisible', value);
            addToast(
              value ? 'Profile is now visible to others' : 'Profile is now private', 
              'success'
            );
          }}
        />
        <Toggle 
          label="Activity Status" 
          description="Show when you're online" 
          defaultChecked={privacy.activityStatus}
          onChange={(value) => {
            updatePrivacy('activityStatus', value);
            addToast(
              value ? 'Activity status is now visible' : 'Activity status is now hidden', 
              'success'
            );
          }}
        />
      </SettingSection>

      {/* Data & Storage */}
      <SettingSection 
        title="Data & Storage"
        description="Manage your data and storage preferences"
      >
        <SettingCard 
          label="Export Data" 
          value="Download all your data in JSON or CSV" 
          action="Export" 
          onAction={() => setShowExportModal(true)}
        />
        <SettingCard 
          label="Clear Cache" 
          value="Free up storage space" 
          action="Clear"
          onAction={handleClearCache}
        />
        <Toggle 
          label="Auto-Save" 
          description="Automatically save your work" 
          defaultChecked={data.autoSave}
          onChange={(value) => {
            updateData('autoSave', value);
            addToast(
              value ? 'Auto-save enabled' : 'Auto-save disabled', 
              'success'
            );
          }}
        />
        <Toggle 
          label="Sync Across Devices" 
          description="Keep your data synced on all devices" 
          defaultChecked={data.syncDevices}
          onChange={(value) => {
            updateData('syncDevices', value);
            addToast(
              value ? 'Device sync enabled (requires backend)' : 'Device sync disabled', 
              value ? 'info' : 'success'
            );
          }}
        />
      </SettingSection>

      {/* Danger Zone */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Red glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-500/10 to-red-500/20 rounded-3xl blur-xl opacity-50" />
        
        <div className="relative bg-white/[0.03] border-2 border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white tracking-tight">
                Danger Zone
              </h2>
              <p className="text-red-400 text-sm font-medium">
                Irreversible actions - proceed with extreme caution
              </p>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <DangerZoneCard 
              label="Delete All Tasks" 
              value={`Permanently remove all ${todoStore?.tasks?.length || 0} tasks`}
              action="Delete"
              onAction={() => setConfirmDeleteTasks(true)}
            />
            <DangerZoneCard 
              label="Delete All Activities" 
              value={`Permanently remove all ${activityStore?.activities?.length || 0} activities`}
              action="Delete"
              onAction={() => setConfirmDeleteActivities(true)}
            />
            <DangerZoneCard 
              label="Delete Account" 
              value="Permanently delete your account and ALL data"
              action="Delete Account"
              onAction={() => setConfirmDeleteAccount(true)}
              isAccountDelete
            />
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="pt-8 pb-4 border-t border-white/[0.06]">
        <p className="text-center text-xs text-zinc-600">
          LifeBoard Dashboard v1.0.0 • Last updated: November 2024
        </p>
      </div>

      {/* Modals */}
      {showAvatarUpload && (
        <AvatarUpload
          currentAvatar={user.avatar}
          onSave={handleSaveAvatar}
          onClose={() => setShowAvatarUpload(false)}
        />
      )}

      {showExportModal && (
        <ExportDataModal
          onClose={() => setShowExportModal(false)}
        />
      )}

      {showLanguageSelector && (
        <LanguageSelector
          currentLanguage={appearance.language}
          onSave={handleSaveLanguage}
          onClose={() => setShowLanguageSelector(false)}
        />
      )}

      {showEditName && (
        <EditNameModal
          currentName={user.name}
          onSave={handleSaveName}
          onClose={() => setShowEditName(false)}
        />
      )}

      {showEditEmail && (
        <EditEmailModal
          currentEmail={user.email}
          onSave={handleSaveEmail}
          onClose={() => setShowEditEmail(false)}
        />
      )}

      {showEditBio && (
        <EditBioModal
          currentBio={user.bio}
          onSave={handleSaveBio}
          onClose={() => setShowEditBio(false)}
        />
      )}

      {showEditLocation && (
        <EditLocationModal
          currentLocation={user.location}
          onSave={handleSaveLocation}
          onClose={() => setShowEditLocation(false)}
        />
      )}

      {/* Danger Confirmation Modals */}
      <DangerConfirmationModal
        isOpen={confirmDeleteTasks}
        title="Delete All Tasks?"
        message="⚠️ This will permanently delete ALL your tasks. This action cannot be undone. All task data including titles, descriptions, priorities, and due dates will be lost forever."
        confirmText="DELETE"
        actionLabel="Delete All Tasks"
        itemCount={todoStore?.tasks?.length || 0}
        onConfirm={handleDeleteAllTasks}
        onClose={() => setConfirmDeleteTasks(false)}
      />

      <DangerConfirmationModal
        isOpen={confirmDeleteActivities}
        title="Delete All Activities?"
        message="⚠️ This will permanently delete ALL your activities. This action cannot be undone. All activity data including titles, categories, durations, and dates will be lost forever."
        confirmText="DELETE"
        actionLabel="Delete All Activities"
        itemCount={activityStore?.activities?.length || 0}
        onConfirm={handleDeleteAllActivities}
        onClose={() => setConfirmDeleteActivities(false)}
      />

      <DangerConfirmationModal
        isOpen={confirmDeleteAccount}
        title="Delete Account Permanently?"
        message="🚨 CRITICAL: This will permanently delete your ENTIRE account and ALL data including tasks, activities, posts, messages, and preferences. You will be logged out immediately. This action is IRREVERSIBLE and cannot be undone under any circumstances."
        confirmText="DELETE MY ACCOUNT"
        actionLabel="Delete My Account Forever"
        onConfirm={handleDeleteAccount}
        onClose={() => setConfirmDeleteAccount(false)}
      />
    </motion.div>
  );
}
