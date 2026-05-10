package com.vau.UniMerch.UniMerch.repository;

import com.vau.UniMerch.UniMerch.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findByUserId(String userId);
}