import { useEffect, useRef } from 'react';
import { MoreVertical, Phone, Video, Trash2 } from 'lucide-react';
import { useState } from 'react';
import useMessageStore from '../../store/useMessageStore';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

export default function ChatWindow() {
  const activeConversation = useMessageStore((state) => {
    const { conversations, activeConversationId } = state;
    return conversations.find((conv) => conv.id === activeConversationId) || null;
  });
  
  const deleteConversation = useMessageStore((state) => state.deleteConversation);
  const [showMenu, setShowMenu] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white/[0.01]">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Select a conversation
          </h3>
          <p className="text-zinc-400 text-sm">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Delete conversation with ${activeConversation.name}?`)) {
      deleteConversation(activeConversation.id);
    }
    setShowMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white/[0.01]">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <img
                src={activeConversation.avatar}
                alt={activeConversation.name}
                className="w-10 h-10 rounded-full border-2 border-white/[0.06]"
              />
              {activeConversation.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0a0a0a] rounded-full" />
              )}
            </div>

            {/* Name & Status */}
            <div>
              <h3 className="text-sm font-semibold text-white">
                {activeConversation.name}
              </h3>
              <p className="text-xs text-zinc-500">
                {activeConversation.status === 'online' ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200">
              <Phone size={18} className="text-zinc-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200">
              <Video size={18} className="text-zinc-400" />
            </button>
            
            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors duration-200"
              >
                <MoreVertical size={18} className="text-zinc-400" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-12 z-20 w-48 bg-[#18181b] border border-white/[0.1] rounded-xl shadow-2xl overflow-hidden">
                    <button
                      onClick={handleDelete}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete Conversation
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {activeConversation.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-zinc-400 text-sm">
                No messages yet. Start the conversation!
              </p>
            </div>
          </div>
        ) : (
          <div>
            {activeConversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Message Input */}
      <MessageInput conversationId={activeConversation.id} />
    </div>
  );
}
