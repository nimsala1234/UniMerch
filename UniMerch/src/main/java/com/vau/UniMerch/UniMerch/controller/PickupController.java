package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.Order;
import com.vau.UniMerch.UniMerch.model.OrderStatus;
import com.vau.UniMerch.UniMerch.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/pickup")
public class PickupController {

    @Autowired
    private OrderRepository orderRepo;

    @PostMapping("/verify/{orderId}")
    public String verifyPickUp(@PathVariable String orderId){
        Order newOreder = orderRepo.findById(orderId).orElse(null);
        if (newOreder != null) {
            newOreder.setStatus(OrderStatus.COMPLETED);
            orderRepo.save(newOreder);
            return "Pickup Verified successfully";
        }
        throw new RuntimeException("Order not found");
    }
}
