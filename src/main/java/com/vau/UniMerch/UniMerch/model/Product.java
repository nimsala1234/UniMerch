package com.vau.UniMerch.UniMerch.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    private String id;

    private String clubId;

    private String name;

    private double price;

    private boolean preorder;

    private String imageUrl;

    private List<ProductVariant> variants;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProductVariant {
        private String size;
        private int stock;
    }
}