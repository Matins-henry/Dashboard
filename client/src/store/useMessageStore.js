import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Message Store with Zustand
 * Manages conversations and messages
 */
const useMessageStore = create(
  persist(
    (set, get) => ({
      // State
      conversations: [],
      activeConversationId: null,
      searchQuery: '',

      // Actions
      setActiveConversation: (id) => set({ activeConversationId: id }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),

      addConversation: (conversation) => {
        const newConversation = {
          id: Date.now().toString(),
          name: conversation.name,
          avatar: conversation.avatar,
          status: 'offline',
          messages: [],
          lastMessage: null,
          lastMessageTime: new Date().toISOString(),
          unread: 0,
        };
        set((state) => ({ 
          conversations: [newConversation, ...state.conversations],
          activeConversationId: newConversation.id,
        }));
      },

      sendMessage: (conversationId, text) => {
        const message = {
          id: Date.now().toString(),
          sender: 'me',
          text,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, message],
                  lastMessage: text,
                  lastMessageTime: message.createdAt,
                }
              : conv
          ),
        }));
      },

      receiveMessage: (conversationId, text) => {
        const message = {
          id: Date.now().toString(),
          sender: 'them',
          text,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  messages: [...conv.messages, message],
                  lastMessage: text,
                  lastMessageTime: message.createdAt,
                  unread: state.activeConversationId === conversationId ? 0 : conv.unread + 1,
                }
              : conv
          ),
        }));
      },

      markAsRead: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.map((conv) =>
            conv.id === conversationId ? { ...conv, unread: 0 } : conv
          ),
        }));
      },

      deleteConversation: (conversationId) => {
        set((state) => ({
          conversations: state.conversations.filter((conv) => conv.id !== conversationId),
          activeConversationId: state.activeConversationId === conversationId ? null : state.activeConversationId,
        }));
      },

      // Computed
      getActiveConversation: () => {
        const { conversations, activeConversationId } = get();
        return conversations.find((conv) => conv.id === activeConversationId) || null;
      },

      getFilteredConversations: () => {
        const { conversations, searchQuery } = get();
        if (!searchQuery) return conversations;
        
        return conversations.filter((conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },

      getTotalUnread: () => {
        const { conversations } = get();
        return conversations.reduce((sum, conv) => sum + conv.unread, 0);
      },
    }),
    {
      name: 'lifeboard-messages',
    }
  )
);

export default useMessageStore;
