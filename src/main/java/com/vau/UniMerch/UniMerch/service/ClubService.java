package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.Club;
import com.vau.UniMerch.UniMerch.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {
    @Autowired
    private ClubRepository repo;

    public Club create(Club club){
        return repo.save(club);
    }

    public List<Club> getAll(){
        return repo.findAll();
    }

    public Club getClubById(String id) {
      return repo.findById(id).orElse(null);
    }
    public Club updateSettings(String id , Club updatedClub){
        Club existingClub = repo.findById(id).orElse(null);

        if(existingClub == null){
            return null;
        }
        existingClub.setName(updatedClub.getName());
        existingClub.setBannerImageUrl(updatedClub.getBannerImageUrl());
        existingClub.setPickupLocation(updatedClub.getPickupLocation());
        existingClub.setPickupDay(updatedClub.getPickupDay());
        existingClub.setSecretaryEmail(updatedClub.getSecretaryEmail());

        return repo.save(existingClub);
    }


}
