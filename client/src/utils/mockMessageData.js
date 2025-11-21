/**
 * Mock Message Data Generator
 * Creates realistic conversations for the messages screen
 */

const CONTACTS = [
  { name: 'Sarah Chen', seed: 'SC', status: 'online' },
  { name: 'Alex Johnson', seed: 'AJ', status: 'offline' },
  { name: 'Maya Patel', seed: 'MP', status: 'online' },
  { name: 'David Kim', seed: 'DK', status: 'offline' },
  { name: 'Emma Wilson', seed: 'EW', status: 'online' },
  { name: 'James Rodriguez', seed: 'JR', status: 'offline' },
];

const CONVERSATION_TEMPLATES = [
  {
    messages: [
      { sender: 'them', text: 'Hey! How are you doing?' },
      { sender: 'me', text: 'I\'m great! Just finished a big project. How about you?' },
      { sender: 'them', text: 'That\'s awesome! I\'ve been working on the new dashboard features.' },
      { sender: 'me', text: 'Nice! Would love to see what you\'ve built.' },
      { sender: 'them', text: 'I\'ll send you a demo link soon!' },
    ],
  },
  {
    messages: [
      { sender: 'them', text: 'Did you see the latest React updates?' },
      { sender: 'me', text: 'Yes! The new hooks are amazing.' },
      { sender: 'them', text: 'Totally agree. Server components are game-changing.' },
    ],
  },
  {
    messages: [
      { sender: 'me', text: 'Quick question about the API endpoint' },
      { sender: 'them', text: 'Sure, what\'s up?' },
      { sender: 'me', text: 'Should we use REST or GraphQL for the new feature?' },
      { sender: 'them', text: 'I think GraphQL would be better for this use case.' },
      { sender: 'me', text: 'Makes sense. I\'ll set it up.' },
    ],
  },
  {
    messages: [
      { sender: 'them', text: 'Coffee tomorrow morning?' },
      { sender: 'me', text: 'Sounds good! 9 AM at the usual place?' },
      { sender: 'them', text: 'Perfect! See you then 😊' },
    ],
  },
  {
    messages: [
      { sender: 'them', text: 'The deployment went smoothly!' },
      { sender: 'me', text: 'Excellent! Any issues so far?' },
      { sender: 'them', text: 'None at all. Everything is running perfectly.' },
      { sender: 'me', text: 'Great work! 🎉' },
    ],
  },
  {
    messages: [
      { sender: 'me', text: 'Thanks for the code review!' },
      { sender: 'them', text: 'No problem! Your implementation was really clean.' },
      { sender: 'me', text: 'Appreciate the feedback 🙏' },
    ],
  },
];

export function generateMockConversations() {
  const conversations = [];
  const now = new Date();

  CONTACTS.forEach((contact, index) => {
    const template = CONVERSATION_TEMPLATES[index % CONVERSATION_TEMPLATES.length];
    const messages = [];

    // Create messages with timestamps
    template.messages.forEach((msg, msgIndex) => {
      const date = new Date(now);
      date.setHours(date.getHours() - (CONTACTS.length - index));
      date.setMinutes(date.getMinutes() - (template.messages.length - msgIndex) * 5);

      messages.push({
        id: `msg-${index}-${msgIndex}`,
        sender: msg.sender,
        text: msg.text,
        createdAt: date.toISOString(),
      });
    });

    const lastMessage = messages[messages.length - 1];
    const unread = contact.status === 'online' && lastMessage.sender === 'them' ? Math.floor(Math.random() * 3) : 0;

    conversations.push({
      id: `conv-${index}`,
      name: contact.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.seed}`,
      status: contact.status,
      messages,
      lastMessage: lastMessage.text,
      lastMessageTime: lastMessage.createdAt,
      unread,
    });
  });

  // Sort by last message time (newest first)
  return conversations.sort((a, b) => 
    new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
  );
}

export function loadMockConversations(messageStore) {
  const mockConversations = generateMockConversations();
  
  // Set conversations in store
  messageStore.setState({ 
    conversations: mockConversations,
    activeConversationId: mockConversations[0]?.id || null,
  });
}
