package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.Cart;
import com.vau.UniMerch.UniMerch.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {
    @Autowired
    private CartRepository repo;

    public Cart save(Cart cart){
        return repo.save(cart);
    }

    public Cart get(String userId){
        return repo.findByUserId(userId);
    }
}
