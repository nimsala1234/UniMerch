package com.vau.UniMerch.UniMerch.model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {

    private String productId;
    private String size;
    private int quantity;
}