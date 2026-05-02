package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.Order;
import com.vau.UniMerch.UniMerch.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping
    public Order create(@RequestBody Order order){
        return service.createOrder(order);
    }
}
