package com.vau.UniMerch.UniMerch.dto.req;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private String userEmail;
    private String clubId;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private String productId;
        private String size;
        private int quantity;
    }
}