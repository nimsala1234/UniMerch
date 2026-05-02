package com.vau.UniMerch.UniMerch.repository;

import com.vau.UniMerch.UniMerch.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByClubId(String clubId);
}
