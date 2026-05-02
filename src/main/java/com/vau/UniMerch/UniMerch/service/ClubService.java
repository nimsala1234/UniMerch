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

}
