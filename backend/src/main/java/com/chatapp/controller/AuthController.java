package com.chatapp.controller;

import com.chatapp.dto.JwtResponse;
import com.chatapp.dto.LoginRequest;
import com.chatapp.dto.SignupRequest;
import com.chatapp.model.User;
import com.chatapp.model.UserStatus;
import com.chatapp.repository.UserRepository;
import com.chatapp.security.jwt.JwtUtils;
import com.chatapp.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // Update user status to ONLINE upon login
        userRepository.findByUsername(userDetails.getUsername()).ifPresent(user -> {
            user.setStatus(UserStatus.ONLINE);
            userRepository.save(user);
        });

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getAvatarUrl()
        ));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            Map<String, String> err = new HashMap<>();
            err.put("message", "Error: Username is already taken!");
            return ResponseEntity.badRequest().body(err);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            Map<String, String> err = new HashMap<>();
            err.put("message", "Error: Email is already in use!");
            return ResponseEntity.badRequest().body(err);
        }

        // Create new user's account using setters
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        user.setStatus(UserStatus.ONLINE); // Set online on registration/auto-login
        user.setAvatarUrl(signUpRequest.getAvatarUrl());

        userRepository.save(user);

        Map<String, String> msg = new HashMap<>();
        msg.put("message", "User registered successfully!");
        return ResponseEntity.ok(msg);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetailsImpl) {
            UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
            userRepository.findByUsername(userDetails.getUsername()).ifPresent(user -> {
                user.setStatus(UserStatus.OFFLINE);
                userRepository.save(user);
            });
        }
        SecurityContextHolder.clearContext();
        Map<String, String> msg = new HashMap<>();
        msg.put("message", "Logged out successfully!");
        return ResponseEntity.ok(msg);
    }
}
