import { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import useMessageStore from '../../store/useMessageStore';

export default function MessageInput({ conversationId }) {
  const sendMessage = useMessageStore((state) => state.sendMessage);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    sendMessage(conversationId, message.trim());
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-white/[0.06] bg-white/[0.02]">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Emoji Button (Placeholder) */}
        <button
          type="button"
          className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] transition-all duration-300 flex-shrink-0"
          title="Emoji (coming soon)"
        >
          <Smile size={20} className="text-zinc-400" />
        </button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="
              w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06]
              rounded-xl text-white placeholder-zinc-500 resize-none
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50
              transition-all duration-300 max-h-32
            "
            style={{
              minHeight: '48px',
              maxHeight: '128px',
            }}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim()}
          className={`
            p-3 rounded-xl flex-shrink-0 transition-all duration-300
            ${message.trim()
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-lg shadow-emerald-500/20'
              : 'bg-white/[0.03] border border-white/[0.06] cursor-not-allowed'
            }
          `}
        >
          <Send 
            size={20} 
            className={message.trim() ? 'text-white' : 'text-zinc-600'} 
          />
        </button>
      </form>
      
      <p className="text-xs text-zinc-600 mt-2 text-center">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
}
