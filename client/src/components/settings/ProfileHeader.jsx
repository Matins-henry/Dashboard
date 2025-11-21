import { Camera } from 'lucide-react';

/**
 * Profile Header Component
 * Avatar and basic profile info at the top of settings
 */
export default function ProfileHeader({ name, email, avatar, onChangeAvatar }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="relative group">
          <img
            src={avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=MH'}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white/[0.06]"
          />
          <button
            onClick={onChangeAvatar}
            className="
              absolute inset-0 flex items-center justify-center
              bg-black/60 rounded-full opacity-0 group-hover:opacity-100
              transition-opacity duration-300 cursor-pointer
            "
          >
            <Camera size={24} className="text-white" />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">
            {name || 'Matins Henry'}
          </h2>
          <p className="text-zinc-400 text-sm mb-4">
            {email || 'matins@example.com'}
          </p>
          <div className="flex gap-3">
            <button className="
              px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20
              text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/30
              rounded-lg text-sm font-medium transition-all duration-300
            ">
              Edit Profile
            </button>
            <button
              onClick={onChangeAvatar}
              className="
                px-4 py-2 bg-white/[0.03] hover:bg-white/[0.05]
                text-zinc-300 border border-white/[0.06] hover:border-white/[0.08]
                rounded-lg text-sm font-medium transition-all duration-300
              "
            >
              Change Avatar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
