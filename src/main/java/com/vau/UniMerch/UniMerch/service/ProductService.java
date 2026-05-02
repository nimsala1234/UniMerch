package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.Product;
import com.vau.UniMerch.UniMerch.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repo;

    public Product create(Product product){
        return repo.save(product);
    }

    public List<Product> getAll(){
        return repo.findAll();
    }

    public List<Product> getByClub(String clubId) {
        return repo.findByClubId(clubId);
    }
}

