package com.chatapp.repository;

import com.chatapp.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByChatRoomIdOrderByTimestampAsc(Long chatRoomId);

    @Query("SELECT m FROM ChatMessage m WHERE " +
           "(m.sender.id = :u1 AND m.recipient.id = :u2) OR " +
           "(m.sender.id = :u2 AND m.recipient.id = :u1) " +
           "ORDER BY m.timestamp ASC")
    List<ChatMessage> findDirectMessages(@Param("u1") Long u1, @Param("u2") Long u2);

    @Query("SELECT COUNT(m) FROM ChatMessage m WHERE " +
           "m.sender.id = :senderId AND m.recipient.id = :recipientId AND m.isRead = false")
    long countUnreadMessages(@Param("senderId") Long senderId, @Param("recipientId") Long recipientId);

    @Modifying
    @Transactional
    @Query("UPDATE ChatMessage m SET m.isRead = true WHERE " +
           "m.sender.id = :senderId AND m.recipient.id = :recipientId AND m.isRead = false")
    void markAsRead(@Param("senderId") Long senderId, @Param("recipientId") Long recipientId);
}
