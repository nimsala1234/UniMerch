package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.Order;
import com.vau.UniMerch.UniMerch.model.OrderStatus;
import com.vau.UniMerch.UniMerch.model.Product;
import com.vau.UniMerch.UniMerch.repository.OrderRepository;
import com.vau.UniMerch.UniMerch.repository.ProductRepository;
import com.vau.UniMerch.UniMerch.service.QRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private QRService qrService;

    public Order createOrder(Order order) {
        double total = 0;

        for (Order.OrderItem item : order.getItems()) {
            Product prd = productRepo.findById(item.getProductId()).orElse(null);

            if (prd != null) {
                item.setProductName(prd.getName());
                item.setPriceAtPurchase(prd.getPrice());


                for (Product.ProductVariant v : prd.getVariants()) {
                    if (v.getSize().equals(item.getSize())) {
                        if (v.getStock() < item.getQuantity()) {
                            throw new RuntimeException("Out of stock for size: " + v.getSize());
                        }
                        v.setStock(v.getStock() - item.getQuantity());
                    }
                }

                // Save the product with updated stock
                productRepo.save(prd);

                // Calculate the running total
                total += item.getQuantity() * item.getPriceAtPurchase();
            }
        }

        order.setTotalAmount(total);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedAt(LocalDateTime.now());

        //  Save the order first to get the ID
        Order savedOrder = orderRepo.save(order);

        // Generate the QR using that ID
        String qr = qrService.generateQRCode(savedOrder.getId());
        savedOrder.setQrCode(qr);

        //  Save AGAIN to store the QR code in the database
        return orderRepo.save(savedOrder);
    }
}