package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.ReportDTO;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CSVService {

    public String generateClubPerformanceCSV(List<ReportDTO> reports) {
        StringBuilder csv = new StringBuilder();
        csv.append("Club Name : ,Total Orders : ,Items Sold : ,Total Revenue\n : ");

        for (ReportDTO report : reports) {
            csv.append(report.getClubName()).append(",")
                    .append(report.getTotalOrders()).append(",")
                    .append(report.getTotalItemSold()).append(",")
                    .append(report.getTotalRevenue()).append("\n");
        }

        return csv.toString();
    }
}