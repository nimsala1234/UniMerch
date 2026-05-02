package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.Cart;
import com.vau.UniMerch.UniMerch.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService service;

    @PostMapping
    public Cart saveItem(@PathVariable Cart cart){
        return service.save(cart);
    }
}
