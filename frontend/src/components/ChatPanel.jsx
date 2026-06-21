import React, { useEffect, useRef, useState } from 'react';
import { Send, MessageSquare, Hash } from 'lucide-react';

export default function ChatPanel({
  user,
  currentChat,
  messages,
  onSendMessage
}) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText.trim());
    setInputText('');
  };

  // Helper to format timestamps nicely
  const formatTime = (timestampStr) => {
    if (!timestampStr) return '';
    try {
      const date = new Date(timestampStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  if (!currentChat) {
    return (
      <div className="welcome-screen">
        <div className="welcome-icon-wrapper">
          <MessageSquare size={40} />
        </div>
        <h2>Welcome to Pulse Chat</h2>
        <p>Select a room or start a direct private message to begin chatting.</p>
      </div>
    );
  }

  const isRoom = currentChat.type === 'room';
  const avatarBg = isRoom
    ? 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)'
    : currentChat.avatarUrl || 'linear-gradient(135deg, #6b7280, #374151)';

  return (
    <div className="chat-screen">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-title-wrapper">
          <div
            className="message-avatar"
            style={{
              background: avatarBg,
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}
          >
            {isRoom ? <Hash size={18} /> : currentChat.username.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="chat-title">{isRoom ? currentChat.name : currentChat.username}</div>
            <div className="chat-subtitle">
              {isRoom ? (
                currentChat.description || 'Public Room'
              ) : (
                <>
                  <span className={`status-dot ${currentChat.status === 'ONLINE' ? 'online' : 'offline'}`} style={{ position: 'relative', border: 'none', width: '8px', height: '8px' }} />
                  {currentChat.status === 'ONLINE' ? 'online' : 'offline'}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((msg, index) => {
          const isSentByMe = msg.senderUsername === user.username;
          const initials = msg.senderUsername.substring(0, 2).toUpperCase();
          const avatar = msg.senderAvatar || 'linear-gradient(135deg, #6b7280, #374151)';

          return (
            <div key={msg.id || index} className={`message-wrapper ${isSentByMe ? 'sent' : 'received'}`}>
              <div className="message-avatar" style={{ background: avatar }}>
                {initials}
              </div>
              <div className="message-bubble-wrapper">
                {!isSentByMe && <span className="message-sender-name">{msg.senderUsername}</span>}
                <div className="message-bubble">
                  {msg.content}
                </div>
                <span className="message-time">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar */}
      <div className="chat-input-area">
        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            className="chat-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isRoom ? `Send a message to #${currentChat.name}...` : `Message ${currentChat.username}...`}
            maxLength={1000}
          />
          <button type="submit" className="chat-input-btn" disabled={!inputText.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
