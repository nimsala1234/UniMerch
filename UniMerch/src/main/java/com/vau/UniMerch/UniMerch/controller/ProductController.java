package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.model.Product;
import com.vau.UniMerch.UniMerch.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
public class ProductController {

    @Autowired
    private ProductService service;

    @PostMapping
    public Product create(@RequestBody Product data){
        return service.create(data);
    }

    @GetMapping
    public List<Product> getAll(){
        return service.getAll();
    }

    @GetMapping("/club/{clubId}")
    public List<Product>getByClub(@PathVariable String clubId){
        return service.getByClub(clubId);
    }
}
