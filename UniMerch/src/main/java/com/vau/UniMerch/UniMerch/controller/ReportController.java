package com.vau.UniMerch.UniMerch.controller;

import com.vau.UniMerch.UniMerch.dto.res.DashboardStatsDTO;
import com.vau.UniMerch.UniMerch.model.ReportDTO;
import com.vau.UniMerch.UniMerch.repository.ClubRepository;
import com.vau.UniMerch.UniMerch.service.CSVService;
import com.vau.UniMerch.UniMerch.service.PDFService;
import com.vau.UniMerch.UniMerch.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private PDFService pdfService;

    @Autowired
    private CSVService csvService;

    @Autowired
    private ClubRepository clubRepo;

    @GetMapping("/club/{clubId}")
    public ReportDTO getReport(@PathVariable String clubId) {
        return reportService.getReport(clubId);
    }

    @GetMapping("/club/{clubId}/pdf")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable String clubId) {
        ReportDTO report = reportService.getReport(clubId);
        byte[] pdf = pdfService.generateReport(report);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=report.pdf")
                .body(pdf);
    }

    @GetMapping("/club/{clubId}/stats")
    public DashboardStatsDTO getDashboardStats(@PathVariable String clubId) {
        return reportService.getDashBoardStates(clubId);
    }

    @GetMapping("/all-clubs/csv")
    public ResponseEntity <byte[]> downloadAllClubsCSV() {
        List<ReportDTO> allReports = clubRepo.findAll().stream()
                .map(club -> reportService.getReport(club.getId()))
                .toList();

        String csvData = csvService.generateClubPerformanceCSV(allReports);
        byte[] out = csvData.getBytes();

        //downloadble file eka
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=all_clubs_report.csv")
                .body(out);
    }
}