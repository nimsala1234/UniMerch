package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.Club;
import com.vau.UniMerch.UniMerch.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // Added for files

import java.io.IOException;
import java.util.Base64;
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
    @PutMapping("/{id}/Settings")
    public Club updateSettings(
            @PathVariable String id,
            @RequestParam(value = "bannerFile", required = false) MultipartFile file,
            @RequestParam("location") String location,
            @RequestParam("adminEmail") String adminEmail,
            @RequestParam("secretaryEmail") String secretaryEmail) throws IOException {


        Club club = service.getClubById(id);

        club.setPickupLocation(location);
        club.setAdminEmail(adminEmail);
        club.setSecretaryEmail(secretaryEmail);

        if (file != null && !file.isEmpty()) {
            club.setBannerImageUrl(file.getBytes());
        }

        return service.create(club);
    }
}