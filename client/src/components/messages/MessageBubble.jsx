export default function MessageBubble({ message }) {
  const isSent = message.sender === 'me';

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div className={`max-w-[70%] ${isSent ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`
            px-4 py-3 rounded-2xl
            ${isSent
              ? 'bg-emerald-500/20 border border-emerald-500/30 text-white rounded-br-md'
              : 'bg-white/[0.05] border border-white/[0.06] text-zinc-200 rounded-bl-md'
            }
          `}
        >
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
        </div>
        <span className="text-xs text-zinc-500 mt-1 px-2">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
