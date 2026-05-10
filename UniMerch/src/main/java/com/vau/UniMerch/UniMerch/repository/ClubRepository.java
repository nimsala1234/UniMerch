package com.vau.UniMerch.UniMerch.repository;

import com.vau.UniMerch.UniMerch.model.Club;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClubRepository extends MongoRepository<Club,String> {
}
