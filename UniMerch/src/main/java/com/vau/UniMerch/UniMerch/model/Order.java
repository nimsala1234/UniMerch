package com.vau.UniMerch.UniMerch.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Order {
    @Id
    private String id;
    private String userId;
    private String clubId;
    private List<OrderItem> items;
    private Double totalAmount;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private String qrCode;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItem{
        private String productId;
        private String productName;
        private Integer quantity;
        private String size;
        private Double priceAtPurchase;


    }
}
