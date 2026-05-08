package com.vau.UniMerch.UniMerch.repository;

import com.vau.UniMerch.UniMerch.model.Product;
import com.vau.UniMerch.UniMerch.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
  User findByEmail(String email);

}