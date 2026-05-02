package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.Club;
import com.vau.UniMerch.UniMerch.model.Order;
import com.vau.UniMerch.UniMerch.model.ReportDTO;
import com.vau.UniMerch.UniMerch.repository.ClubRepository;
import com.vau.UniMerch.UniMerch.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ClubRepository clubRepo;

    public ReportDTO getReport(String clubId) {

        List<Order> orders = orderRepo.findAll()
                .stream()
                .filter(o -> o.getClubId() != null && o.getClubId().equals(clubId))
                .toList();

        double revenue = 0;
        int items = 0;

        Club clubData = clubRepo.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Invalid clubId"));

        String clubName = clubData.getName();

        for (Order o : orders) {
            revenue += o.getTotalAmount();

            for (Order.OrderItem i : o.getItems()) {
                items += i.getQuantity();
            }
        }for (Order o : orders) {

            if (o.getTotalAmount() != null) {
                revenue += o.getTotalAmount();
            }

            for (Order.OrderItem i : o.getItems()) {
                items += i.getQuantity();
            }
        }

        return new ReportDTO(
                clubId,
                clubName,
                revenue,
                orders.size(),
                items
        );
    }
}