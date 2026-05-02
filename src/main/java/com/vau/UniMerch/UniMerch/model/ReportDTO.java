package com.vau.UniMerch.UniMerch.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReportDTO {
    private String clubId;
    private String clubName;
    private double totalRevenue;
    private int totalOrders;
    private int totalItemSold;
}
