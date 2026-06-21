package com.chatapp;

import com.chatapp.model.ChatRoom;
import com.chatapp.model.User;
import com.chatapp.model.UserStatus;
import com.chatapp.repository.ChatRoomRepository;
import com.chatapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository,
								   ChatRoomRepository chatRoomRepository,
								   PasswordEncoder passwordEncoder) {
		return args -> {
			// Seed default public chat rooms
			if (chatRoomRepository.findByName("General Chat").isEmpty()) {
				ChatRoom r = new ChatRoom();
				r.setName("General Chat");
				r.setDescription("A place for general discussion and chit-chat.");
				r.setPrivate(false);
				chatRoomRepository.save(r);
			}
			if (chatRoomRepository.findByName("Tech Talk").isEmpty()) {
				ChatRoom r = new ChatRoom();
				r.setName("Tech Talk");
				r.setDescription("Discuss programming, systems, and technology.");
				r.setPrivate(false);
				chatRoomRepository.save(r);
			}
			if (chatRoomRepository.findByName("Random Musings").isEmpty()) {
				ChatRoom r = new ChatRoom();
				r.setName("Random Musings");
				r.setDescription("Share anything interesting, funny, or random.");
				r.setPrivate(false);
				chatRoomRepository.save(r);
			}

			// Seed test users
			if (userRepository.findByUsername("john_doe").isEmpty()) {
				User u = new User();
				u.setUsername("john_doe");
				u.setEmail("john@example.com");
				u.setPassword(passwordEncoder.encode("password"));
				u.setStatus(UserStatus.OFFLINE);
				u.setAvatarUrl("linear-gradient(135deg, #667eea 0%, #764ba2 100%)");
				userRepository.save(u);
			}
			if (userRepository.findByUsername("alice_smith").isEmpty()) {
				User u = new User();
				u.setUsername("alice_smith");
				u.setEmail("alice@example.com");
				u.setPassword(passwordEncoder.encode("password"));
				u.setStatus(UserStatus.OFFLINE);
				u.setAvatarUrl("linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)");
				userRepository.save(u);
			}
			if (userRepository.findByUsername("bob_jones").isEmpty()) {
				User u = new User();
				u.setUsername("bob_jones");
				u.setEmail("bob@example.com");
				u.setPassword(passwordEncoder.encode("password"));
				u.setStatus(UserStatus.OFFLINE);
				u.setAvatarUrl("linear-gradient(135deg, #11998e 0%, #38ef7d 100%)");
				userRepository.save(u);
			}
		};
	}
}
