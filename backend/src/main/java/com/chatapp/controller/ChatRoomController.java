package com.chatapp.controller;

import com.chatapp.model.ChatRoom;
import com.chatapp.repository.ChatRoomRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class ChatRoomController {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @GetMapping
    public ResponseEntity<List<ChatRoom>> getAllRooms() {
        List<ChatRoom> rooms = chatRoomRepository.findAllByOrderByNameAsc();
        return ResponseEntity.ok(rooms);
    }

    @PostMapping
    public ResponseEntity<?> createRoom(@Valid @RequestBody ChatRoom chatRoom) {
        if (chatRoomRepository.findByName(chatRoom.getName()).isPresent()) {
            Map<String, String> err = new HashMap<>();
            err.put("message", "Error: Room name already exists!");
            return ResponseEntity.badRequest().body(err);
        }
        
        chatRoom.setPrivate(false); // Make sure it's public through REST API creation
        ChatRoom savedRoom = chatRoomRepository.save(chatRoom);
        return ResponseEntity.ok(savedRoom);
    }
}
