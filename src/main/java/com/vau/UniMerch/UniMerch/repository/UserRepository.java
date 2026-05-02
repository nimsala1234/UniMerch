package com.vau.UniMerch.UniMerch.repository;

import com.vau.UniMerch.UniMerch.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}