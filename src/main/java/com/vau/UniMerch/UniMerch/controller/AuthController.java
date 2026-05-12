package com.vau.UniMerch.UniMerch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vau.UniMerch.UniMerch.Security.JwtUtils;
import com.vau.UniMerch.UniMerch.dto.req.LoginRequest;
import com.vau.UniMerch.UniMerch.dto.res.AuthResponse;
import com.vau.UniMerch.UniMerch.model.User;
import com.vau.UniMerch.UniMerch.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        String email = user.getEmail().toLowerCase();

        if (!email.endsWith("@stu.vau.ac.lk") && !email.endsWith("@vau.ac.lk")) {
            throw new RuntimeException("Only @stu.vau.ac.lk or @vau.ac.lk emails are allowed!");
        }

        if (userRepo.findByEmail(email) != null) {
            throw new RuntimeException("Email is already registered!");
        }

        user.setRole(User.Role.STUDENT_STAFF);
        user.setPassword(encoder.encode(user.getPassword()));

        userRepo.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginData) {

        User user = userRepo.findByEmail(loginData.getEmail());
        //usually email are case-insensitive, so we can convert it to lower case before checking
       // User user = userRepo.findByEmail(loginData.getEmail().toLowerCase());
    

        if (user != null && encoder.matches(loginData.getPassword(), user.getPassword())) {
            String token = jwtUtils.generateToken(user.getEmail());
            return new AuthResponse(token, user.getRole().toString(), user.getEmail());
        }

        throw new RuntimeException(" email or password is invalid");
    }
}