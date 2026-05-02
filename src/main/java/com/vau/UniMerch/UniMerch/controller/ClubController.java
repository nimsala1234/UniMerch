package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.Club;
import com.vau.UniMerch.UniMerch.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
public class ClubController {

    @Autowired
    private ClubService service;

    @PostMapping
    public Club create(@RequestBody Club club){
        return service.create(club);
    }

    @GetMapping
    public List<Club> getAll(){
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Club getClubById(@PathVariable String id){
        return service.getClubById(id);
    }

}
