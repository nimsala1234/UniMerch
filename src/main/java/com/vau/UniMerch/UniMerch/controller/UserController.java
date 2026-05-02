package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.User;
import com.vau.UniMerch.UniMerch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping
    public User createUser(@RequestBody User Data) {
        return service.Createuser(Data);
    }

    @GetMapping
    public List<User> getusers() {
        return service.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id){
        return service.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteuserById(@PathVariable String id){
        return service.delteuser(id);
    }
}
