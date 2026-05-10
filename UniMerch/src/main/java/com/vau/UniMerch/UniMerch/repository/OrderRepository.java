package com.vau.UniMerch.UniMerch.repository;

import com.vau.UniMerch.UniMerch.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order,String> {
    List<Order> findByClubId(String clubId);
}
