import React from 'react';
import { MessageSquare, Users, LogOut, Plus, Hash } from 'lucide-react';

export default function Sidebar({
  user,
  rooms,
  activeUsers,
  unreadCounts,
  activeTab,
  setActiveTab,
  currentChat,
  setCurrentChat,
  onLogout,
  onCreateRoomClick
}) {
  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="app-logo">
          <MessageSquare className="app-logo-icon" size={24} />
          <h1>Pulse Chat</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="sidebar-menu">
        <button
          className={`menu-tab ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          <MessageSquare size={16} />
          Rooms
        </button>
        <button
          className={`menu-tab ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={16} />
          Direct
        </button>
      </div>

      {/* Content Area */}
      <div className="sidebar-content">
        {activeTab === 'rooms' ? (
          <div>
            <div className="section-title">
              <span>Public Rooms</span>
              <button className="create-room-btn" onClick={onCreateRoomClick} title="Create public room">
                <Plus size={16} />
              </button>
            </div>
            <div className="list-container">
              {rooms.map((room) => {
                const isActive = currentChat && currentChat.type === 'room' && currentChat.id === room.id;
                return (
                  <div
                    key={room.id}
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                    onClick={() => setCurrentChat({ type: 'room', ...room })}
                  >
                    <div
                      className="item-avatar"
                      style={{
                        background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                      }}
                    >
                      <Hash size={18} />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{room.name}</div>
                      <div className="item-subtitle">{room.description || 'No description'}</div>
                    </div>
                  </div>
                );
              })}
              {rooms.length === 0 && (
                <div style={{ padding: '8px', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center' }}>
                  No rooms available.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="section-title">
              <span>Users</span>
            </div>
            <div className="list-container">
              {activeUsers
                .filter((u) => u.username !== user.username)
                .map((u) => {
                  const isActive = currentChat && currentChat.type === 'direct' && currentChat.username === u.username;
                  const unreadCount = unreadCounts[u.username] || 0;
                  const initials = u.username.substring(0, 2).toUpperCase();
                  
                  return (
                    <div
                      key={u.id}
                      className={`sidebar-item ${isActive ? 'active' : ''}`}
                      onClick={() => setCurrentChat({ type: 'direct', ...u })}
                    >
                      <div className="item-avatar-wrapper">
                        <div
                          className="item-avatar"
                          style={{ background: u.avatarUrl || 'linear-gradient(135deg, #6b7280, #374151)' }}
                        >
                          {initials}
                        </div>
                        <div className={`status-dot ${u.status === 'ONLINE' ? 'online' : 'offline'}`} />
                      </div>
                      <div className="item-details">
                        <div className="item-name">{u.username}</div>
                        <div className="item-subtitle">
                          {u.status === 'ONLINE' ? 'online' : 'offline'}
                        </div>
                      </div>
                      {unreadCount > 0 && (
                        <div className="badge-pulse">{unreadCount}</div>
                      )}
                    </div>
                  );
                })}
              {activeUsers.filter((u) => u.username !== user.username).length === 0 && (
                <div style={{ padding: '8px', color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center' }}>
                  No users online.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Profile Footer */}
      <div className="sidebar-footer">
        <div className="item-avatar-wrapper" style={{ width: '40px', height: '40px' }}>
          <div
            className="item-avatar"
            style={{ background: user.avatarUrl || 'linear-gradient(135deg, #6b7280, #374151)', width: '100%', height: '100%' }}
          >
            {user.username.substring(0, 2).toUpperCase()}
          </div>
          <div className="status-dot online" />
        </div>
        <div className="profile-info">
          <div className="profile-username">{user.username}</div>
          <div className="profile-email">{user.email}</div>
        </div>
        <button className="logout-btn" onClick={onLogout} title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
