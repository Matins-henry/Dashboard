import { Search, Plus } from 'lucide-react';
import { useState } from 'react';
import useMessageStore from '../../store/useMessageStore';

export default function ConversationsList() {
  const { 
    conversations, 
    activeConversationId, 
    searchQuery,
    setActiveConversation, 
    setSearchQuery,
    markAsRead,
  } = useMessageStore();

  const [showNewChat, setShowNewChat] = useState(false);

  const filteredConversations = searchQuery
    ? conversations.filter((conv) =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  const handleSelectConversation = (id) => {
    setActiveConversation(id);
    markAsRead(id);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-white/[0.02] border-r border-white/[0.06]">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Messages</h2>
          <button
            onClick={() => setShowNewChat(true)}
            className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all duration-300"
          >
            <Plus size={18} className="text-emerald-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.06]
              rounded-xl text-sm text-white placeholder-zinc-500
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
              transition-all duration-300
            "
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <Search size={24} className="text-zinc-600" />
            </div>
            <p className="text-zinc-400 text-sm">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
          </div>
        ) : (
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`
                  w-full p-3 rounded-xl text-left transition-all duration-300
                  flex items-start gap-3 mb-2
                  ${activeConversationId === conversation.id
                    ? 'bg-emerald-500/10 border border-emerald-500/30'
                    : 'hover:bg-white/[0.03] border border-transparent'
                  }
                `}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full border-2 border-white/[0.06]"
                  />
                  {conversation.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0a0a0a] rounded-full" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {conversation.name}
                    </h3>
                    <span className="text-xs text-zinc-500 flex-shrink-0 ml-2">
                      {formatTimestamp(conversation.lastMessageTime)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-400 truncate">
                      {conversation.lastMessage || 'No messages yet'}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="flex-shrink-0 ml-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
