package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.User;
import com.vau.UniMerch.UniMerch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    public User Createuser(User Data){
        Data.setPassword(encoder.encode(Data.getPassword()));
        return userRepo.save(Data);
    }
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User getUserById(String id){
        return userRepo.findById(id).orElse(null);
    }

    public String delteuser(String id){
        userRepo.deleteById(id);
        return "User "+id+" Has Been Deleted !";
    }
}
