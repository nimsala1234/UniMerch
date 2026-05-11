package com.vau.UniMerch.UniMerch.dto.req;

import lombok.Data;
import java.util.List;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private double price;
    private String category;
    private String clubId;
    private List<VariantRequest> variants;

    @Data
    public static class VariantRequest {
        private String size;
        private int stock;
    }
}