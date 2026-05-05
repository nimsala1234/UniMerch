package com.vau.UniMerch.UniMerch.dto.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDTO {
    private double tRevanue;
    private int orderPending;
    private int orderCompleted;
}

