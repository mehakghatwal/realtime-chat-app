package com.chatapp.dto;

import java.time.LocalDateTime;

public class MessageDto {
    private Long id;
    private String content;
    private String senderUsername;
    private String senderAvatar;
    private String recipientUsername;
    private Long chatRoomId;
    private LocalDateTime timestamp;
    private boolean isRead;

    public MessageDto() {}

    public MessageDto(Long id, String content, String senderUsername, String senderAvatar, String recipientUsername, Long chatRoomId, LocalDateTime timestamp, boolean isRead) {
        this.id = id;
        this.content = content;
        this.senderUsername = senderUsername;
        this.senderAvatar = senderAvatar;
        this.recipientUsername = recipientUsername;
        this.chatRoomId = chatRoomId;
        this.timestamp = timestamp;
        this.isRead = isRead;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public String getSenderAvatar() {
        return senderAvatar;
    }

    public void setSenderAvatar(String senderAvatar) {
        this.senderAvatar = senderAvatar;
    }

    public String getRecipientUsername() {
        return recipientUsername;
    }

    public void setRecipientUsername(String recipientUsername) {
        this.recipientUsername = recipientUsername;
    }

    public Long getChatRoomId() {
        return chatRoomId;
    }

    public void setChatRoomId(Long chatRoomId) {
        this.chatRoomId = chatRoomId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    // Manual builder pattern to keep compatibility with existing builder calls
    public static class MessageDtoBuilder {
        private final MessageDto dto = new MessageDto();

        public MessageDtoBuilder id(Long id) {
            dto.setId(id);
            return this;
        }

        public MessageDtoBuilder content(String content) {
            dto.setContent(content);
            return this;
        }

        public MessageDtoBuilder senderUsername(String senderUsername) {
            dto.setSenderUsername(senderUsername);
            return this;
        }

        public MessageDtoBuilder senderAvatar(String senderAvatar) {
            dto.setSenderAvatar(senderAvatar);
            return this;
        }

        public MessageDtoBuilder recipientUsername(String recipientUsername) {
            dto.setRecipientUsername(recipientUsername);
            return this;
        }

        public MessageDtoBuilder chatRoomId(Long chatRoomId) {
            dto.setChatRoomId(chatRoomId);
            return this;
        }

        public MessageDtoBuilder timestamp(LocalDateTime timestamp) {
            dto.setTimestamp(timestamp);
            return this;
        }

        public MessageDtoBuilder isRead(boolean isRead) {
            dto.setRead(isRead);
            return this;
        }

        public MessageDto build() {
            return dto;
        }
    }

    public static MessageDtoBuilder builder() {
        return new MessageDtoBuilder();
    }
}
