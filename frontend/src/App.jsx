import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import { Plus, X } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('rooms'); // 'rooms' or 'users'
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDesc, setNewRoomDesc] = useState('');
  const [modalError, setModalError] = useState('');

  const stompClientRef = useRef(null);
  const currentChatRef = useRef(null);

  // Keep ref updated to avoid stale closures in Stomp message callbacks
  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      handleLoginSuccess(parsedUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    
    // Fetch initial directories
    fetchRooms();
    fetchUsers();
    fetchUnreadCounts();

    // Establish WebSocket Connection
    connectWebSocket(userData);
  };

  // Fetch Rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error('Failed to fetch rooms', err);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/users');
      setActiveUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  };

  // Fetch Unread message counts
  const fetchUnreadCounts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/messages/unread');
      setUnreadCounts(res.data);
    } catch (err) {
      console.error('Failed to fetch unread counts', err);
    }
  };

  // Fetch Conversation History
  useEffect(() => {
    if (!currentChat || !user) return;

    const fetchHistory = async () => {
      try {
        if (currentChat.type === 'room') {
          const res = await axios.get(`http://localhost:8080/api/messages/room/${currentChat.id}`);
          setMessages(res.data);
        } else {
          const res = await axios.get(`http://localhost:8080/api/messages/direct/${currentChat.username}`);
          setMessages(res.data);
          
          // Clear local unread count for this user
          setUnreadCounts(prev => {
            const next = { ...prev };
            delete next[currentChat.username];
            return next;
          });
        }
      } catch (err) {
        console.error('Failed to fetch messages history', err);
      }
    };

    fetchHistory();
  }, [currentChat, user]);

  // Connect WebSocket
  const connectWebSocket = (userData) => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
    }

    const client = new Client({
      brokerURL: `ws://localhost:8080/ws`,
      connectHeaders: {
        Authorization: `Bearer ${userData.token}`
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });

    client.onConnect = () => {
      console.log('Connected to Stomp broker');
      stompClientRef.current = client;

      // 1. Subscribe to User-Specific Direct Messages
      client.subscribe('/user/queue/messages', (message) => {
        const msg = JSON.parse(message.body);
        const activeChat = currentChatRef.current;

        // If the message is from/to the active DM peer, append to active conversation
        if (
          activeChat &&
          activeChat.type === 'direct' &&
          (msg.senderUsername === activeChat.username || msg.recipientUsername === activeChat.username)
        ) {
          setMessages((prev) => [...prev, msg]);
          // Mark it as read immediately since we are viewing this chat
          if (msg.senderUsername === activeChat.username) {
            axios.post(`http://localhost:8080/api/messages/direct/${activeChat.username}/read`).catch(console.error);
          }
        } else {
          // Increment unread count for the sender
          if (msg.senderUsername !== userData.username) {
            setUnreadCounts((prev) => ({
              ...prev,
              [msg.senderUsername]: (prev[msg.senderUsername] || 0) + 1
            }));
          }
        }
      });

      // 2. Subscribe to Presence Updates
      client.subscribe('/topic/presence', (message) => {
        const presenceMsg = JSON.parse(message.body);
        setActiveUsers((prev) =>
          prev.map((u) =>
            u.username === presenceMsg.senderUsername
              ? { ...u, status: presenceMsg.content }
              : u
          )
        );
      });
    };

    client.onDisconnect = () => {
      console.log('Disconnected from Stomp broker');
    };

    client.onStompError = (frame) => {
      console.error('STOMP protocol error: ', frame.headers['message']);
    };

    client.activate();
  };

  // Subscribe to Room Specific channel when chat switches
  useEffect(() => {
    if (!stompClientRef.current || !currentChat || currentChat.type !== 'room') return;

    const subscription = stompClientRef.current.subscribe(
      `/topic/room.${currentChat.id}`,
      (message) => {
        const msg = JSON.parse(message.body);
        setMessages((prev) => [...prev, msg]);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [currentChat]);

  // Send Message
  const handleSendMessage = (content) => {
    if (!stompClientRef.current || !currentChat) return;

    const payload = {
      content,
      chatRoomId: currentChat.type === 'room' ? currentChat.id : null,
      recipientUsername: currentChat.type === 'direct' ? currentChat.username : null
    };

    stompClientRef.current.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(payload)
    });
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout');
    } catch (e) {
      console.error('Error logging out from server', e);
    }

    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
      stompClientRef.current = null;
    }

    setUser(null);
    setCurrentChat(null);
    setMessages([]);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Create Chat Room
  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setModalError('');
    if (!newRoomName.trim()) return;

    try {
      const res = await axios.post('http://localhost:8080/api/rooms', {
        name: newRoomName.trim(),
        description: newRoomDesc.trim()
      });
      setRooms((prev) => [...prev, res.data]);
      setCurrentChat({ type: 'room', ...res.data });
      
      // Close modal
      setIsCreateRoomOpen(false);
      setNewRoomName('');
      setNewRoomDesc('');
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to create chat room.');
    }
  };

  if (!user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      <div className="chat-layout">
        {/* Sidebar */}
        <Sidebar
          user={user}
          rooms={rooms}
          activeUsers={activeUsers}
          unreadCounts={unreadCounts}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          onLogout={handleLogout}
          onCreateRoomClick={() => setIsCreateRoomOpen(true)}
        />

        {/* Messaging Area */}
        <ChatPanel
          user={user}
          currentChat={currentChat}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Create Room Modal */}
      {isCreateRoomOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span className="modal-title">Create New Room</span>
              <button className="modal-close-btn" onClick={() => setIsCreateRoomOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            {modalError && <div className="auth-error">{modalError}</div>}

            <form onSubmit={handleCreateRoom}>
              <div className="form-group">
                <label className="form-label">Room Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="e.g., Gaming Zone"
                  required
                  maxLength={50}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-input"
                  value={newRoomDesc}
                  onChange={(e) => setNewRoomDesc(e.target.value)}
                  placeholder="e.g., Discuss gaming events and matches"
                  maxLength={100}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsCreateRoomOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
