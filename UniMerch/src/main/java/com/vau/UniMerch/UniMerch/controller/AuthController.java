package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.Security.JwtUtils;
import com.vau.UniMerch.UniMerch.dto.req.LoginRequest;
import com.vau.UniMerch.UniMerch.dto.res.AuthResponse;
import com.vau.UniMerch.UniMerch.model.User;
import com.vau.UniMerch.UniMerch.repository.UserRepository;
import com.vau.UniMerch.UniMerch.Security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginData) {
        User user = userRepo.findByEmail(loginData.getEmail());

        // Compare the raw password from request with hashed password in DB
        if (user != null && encoder.matches(loginData.getPassword(), user.getPassword())) {
            String token = jwtUtils.generateToken(user.getEmail());
            return new AuthResponse(token, user.getRole().toString(), user.getEmail());
        }

        throw new RuntimeException("Invalid email  password");
    }
}