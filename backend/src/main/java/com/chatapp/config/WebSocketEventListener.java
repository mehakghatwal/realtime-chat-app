package com.chatapp.config;

import com.chatapp.dto.MessageDto;
import com.chatapp.model.UserStatus;
import com.chatapp.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import java.security.Principal;
import java.time.LocalDateTime;

@Component
@SuppressWarnings("null")
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal principal = headerAccessor.getUser();
        if (principal != null) {
            String username = principal.getName();
            logger.info("User connected: {}", username);
            userRepository.findByUsername(username).ifPresent(user -> {
                user.setStatus(UserStatus.ONLINE);
                userRepository.save(user);

                // Broadcast presence update to all clients
                MessageDto presenceMessage = MessageDto.builder()
                        .content("ONLINE")
                        .senderUsername(username)
                        .timestamp(LocalDateTime.now())
                        .build();
                messagingTemplate.convertAndSend("/topic/presence", presenceMessage);
            });
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal principal = headerAccessor.getUser();
        if (principal != null) {
            String username = principal.getName();
            logger.info("User disconnected: {}", username);

            userRepository.findByUsername(username).ifPresent(user -> {
                user.setStatus(UserStatus.OFFLINE);
                userRepository.save(user);

                // Broadcast presence update to all clients
                MessageDto presenceMessage = MessageDto.builder()
                        .content("OFFLINE")
                        .senderUsername(username)
                        .timestamp(LocalDateTime.now())
                        .build();
                messagingTemplate.convertAndSend("/topic/presence", presenceMessage);
            });
        }
    }
}
