package com.chatapp.controller;

import com.chatapp.dto.MessageDto;
import com.chatapp.model.ChatMessage;
import com.chatapp.model.ChatRoom;
import com.chatapp.model.User;
import com.chatapp.repository.ChatMessageRepository;
import com.chatapp.repository.ChatRoomRepository;
import com.chatapp.repository.UserRepository;
import com.chatapp.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@SuppressWarnings("null")
public class ChatMessageController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // ----------------------------------------------------
    // WebSocket STOMP messaging mapping
    // ----------------------------------------------------
    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload MessageDto messageDto, Principal principal) {
        if (principal == null) {
            return;
        }
        String senderUsername = principal.getName();
        User sender = userRepository.findByUsername(senderUsername)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setContent(messageDto.getContent());
        chatMessage.setSender(sender);

        // Case 1: Room Message
        if (messageDto.getChatRoomId() != null) {
            ChatRoom chatRoom = chatRoomRepository.findById(messageDto.getChatRoomId())
                    .orElseThrow(() -> new RuntimeException("Chat room not found"));
            chatMessage.setChatRoom(chatRoom);
            ChatMessage saved = chatMessageRepository.save(chatMessage);

            messageDto.setId(saved.getId());
            messageDto.setTimestamp(saved.getTimestamp());
            messageDto.setSenderAvatar(sender.getAvatarUrl());

            messagingTemplate.convertAndSend("/topic/room." + chatRoom.getId(), messageDto);
        }
        // Case 2: Private Direct Message
        else if (messageDto.getRecipientUsername() != null) {
            User recipient = userRepository.findByUsername(messageDto.getRecipientUsername())
                    .orElseThrow(() -> new RuntimeException("Recipient not found"));
            chatMessage.setRecipient(recipient);
            ChatMessage saved = chatMessageRepository.save(chatMessage);

            messageDto.setId(saved.getId());
            messageDto.setTimestamp(saved.getTimestamp());
            messageDto.setSenderAvatar(sender.getAvatarUrl());
            messageDto.setRead(false);

            // Send to recipient's private queue (/user/queue/messages)
            messagingTemplate.convertAndSendToUser(recipient.getUsername(), "/queue/messages", messageDto);
            // Send to sender's private queue (if they have multiple sessions/devices, they see it sync'd)
            messagingTemplate.convertAndSendToUser(sender.getUsername(), "/queue/messages", messageDto);
        }
    }

    // ----------------------------------------------------
    // REST API endpoints for history and unread status
    // ----------------------------------------------------

    @GetMapping("/api/messages/room/{roomId}")
    public ResponseEntity<List<MessageDto>> getRoomMessages(@PathVariable Long roomId) {
        List<ChatMessage> messages = chatMessageRepository.findByChatRoomIdOrderByTimestampAsc(roomId);
        List<MessageDto> dtos = messages.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/api/messages/direct/{username}")
    public ResponseEntity<List<MessageDto>> getDirectMessages(@PathVariable String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User currentUser = userRepository.findById(userDetails.getId()).orElseThrow();
            User otherUser = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Mark incoming messages as read
            chatMessageRepository.markAsRead(otherUser.getId(), currentUser.getId());

            List<ChatMessage> messages = chatMessageRepository.findDirectMessages(currentUser.getId(), otherUser.getId());
            List<MessageDto> dtos = messages.stream().map(this::convertToDto).collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        }
        return ResponseEntity.status(401).build();
    }

    @PostMapping("/api/messages/direct/{username}/read")
    public ResponseEntity<?> markMessagesAsRead(@PathVariable String username) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User currentUser = userRepository.findById(userDetails.getId()).orElseThrow();
            User otherUser = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            chatMessageRepository.markAsRead(otherUser.getId(), currentUser.getId());
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/api/messages/unread")
    public ResponseEntity<Map<String, Long>> getUnreadCounts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User currentUser = userRepository.findById(userDetails.getId()).orElseThrow();
            List<User> users = userRepository.findAll();
            Map<String, Long> unreadCounts = new HashMap<>();

            for (User user : users) {
                if (!user.getUsername().equals(currentUser.getUsername())) {
                    long count = chatMessageRepository.countUnreadMessages(user.getId(), currentUser.getId());
                    if (count > 0) {
                        unreadCounts.put(user.getUsername(), count);
                    }
                }
            }
            return ResponseEntity.ok(unreadCounts);
        }
        return ResponseEntity.status(401).build();
    }

    private MessageDto convertToDto(ChatMessage msg) {
        return MessageDto.builder()
                .id(msg.getId())
                .content(msg.getContent())
                .senderUsername(msg.getSender().getUsername())
                .senderAvatar(msg.getSender().getAvatarUrl())
                .recipientUsername(msg.getRecipient() != null ? msg.getRecipient().getUsername() : null)
                .chatRoomId(msg.getChatRoom() != null ? msg.getChatRoom().getId() : null)
                .timestamp(msg.getTimestamp())
                .isRead(msg.isRead())
                .build();
    }
}
