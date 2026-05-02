package com.vau.UniMerch.UniMerch.service;

import com.vau.UniMerch.UniMerch.model.Club;
import com.vau.UniMerch.UniMerch.model.ReportDTO;
import com.vau.UniMerch.UniMerch.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class ReportScheduler {

    @Autowired
    private ReportService reportService;

    @Autowired
    private PDFService pdfService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ClubRepository clubRepo;
    //         fixed rate is for testing purpose only
    @Scheduled(fixedRate = 10000) // every 1st day of month at 9 AM @Scheduled(cron = "0 0 9 1 * ?")
    public void sendMonthlyReports() {

        // all club send email
        clubRepo.findAll().forEach(club -> {

            String clubId = club.getId();

            ReportDTO report = reportService.getReport(clubId);

            byte[] pdf = pdfService.generateReport(report);

            emailService.sendWithAttachment(
                    club.getAdminEmail(),
                    "Monthly Report - " + club.getName(),
                    "Attached is your monthly report",
                    pdf
            );

        });
    }
}