package com.vau.UniMerch.UniMerch.repository;

import com.vau.UniMerch.UniMerch.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order,String> {
}
