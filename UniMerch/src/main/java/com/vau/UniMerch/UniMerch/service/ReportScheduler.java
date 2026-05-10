package com.vau.UniMerch.UniMerch.service;

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

    @Scheduled(cron = "0 0 9 1 * ?")
    public void sendMonthlyReports() {

        clubRepo.findAll().forEach(club -> {

            String clubId = club.getId();

            ReportDTO report = reportService.getReport(clubId);

            byte[] pdf = pdfService.generateReport(report);

            String recipient = club.getAdminEmail();
            if (club.getSecretaryEmail() != null) {
                recipient = club.getSecretaryEmail();
            }

            emailService.sendWithAttachment(
                    recipient,
                    "Monthly Report - " + club.getName(),
                    "Attached is your monthly report for " + club.getName(),
                    pdf
            );

        });
    }
}