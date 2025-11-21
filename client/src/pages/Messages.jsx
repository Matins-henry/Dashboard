import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import ConversationsList from '../components/messages/ConversationsList';
import ChatWindow from '../components/messages/ChatWindow';
import useMessageStore from '../store/useMessageStore';
import { mockConversations } from '../services/mockData';

export default function Messages() {
  const conversations = useMessageStore((state) => state.conversations);
  const [localConversations, setLocalConversations] = useState([]);

  // Auto-load mock data if store is empty
  useEffect(() => {
    if (conversations.length === 0) {
      const store = useMessageStore.getState();
      store.conversations = mockConversations;
      store.selectedConversation = mockConversations[0]?.id || null;
      useMessageStore.setState({ 
        conversations: mockConversations,
        selectedConversation: mockConversations[0]?.id || null
      });
      setLocalConversations(mockConversations);
    } else {
      setLocalConversations(conversations);
    }
  }, [conversations]);

  const handleLoadMockData = () => {
    const store = useMessageStore.getState();
    store.conversations = mockConversations;
    store.selectedConversation = mockConversations[0]?.id || null;
    useMessageStore.setState({ 
      conversations: mockConversations,
      selectedConversation: mockConversations[0]?.id || null
    });
    setLocalConversations(mockConversations);
  };

  // Show load button if no conversations (shouldn't happen with auto-load)
  if (localConversations.length === 0 && conversations.length === 0) {
    return (
      <div className="h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
            <svg className="w-10 h-10 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            No conversations yet
          </h3>
          <p className="text-zinc-400 mb-6">
            Load demo conversations to see the messaging interface in action
          </p>
          <button
            onClick={handleLoadMockData}
            className="px-6 py-3 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl font-medium hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <Sparkles size={18} />
            Load Demo Conversations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] flex gap-0 -m-8">
      {/* Left Panel - Conversations List */}
      <div className="w-80 flex-shrink-0">
        <ConversationsList />
      </div>

      {/* Right Panel - Chat Window */}
      <ChatWindow />
    </div>
  );
}
