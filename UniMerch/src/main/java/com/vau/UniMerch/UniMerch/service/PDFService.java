package com.vau.UniMerch.UniMerch.service;

import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.vau.UniMerch.UniMerch.model.ReportDTO;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;


@Service
public class PDFService {
    public byte[] generateReport(ReportDTO theReport){
        try{
            Document theDoc = new Document();
            ByteArrayOutputStream outReport = new ByteArrayOutputStream();

            PdfWriter.getInstance(theDoc,outReport);
            theDoc.open();

            theDoc.add(new Paragraph("The Daily Report UnimerCh"));
            theDoc.add(new Paragraph("The Club Id :"+theReport.getClubId()));
            theDoc.add(new Paragraph("The Club name :"+theReport.getClubName()));
            theDoc.add(new Paragraph("The Total Revenue :"+theReport.getTotalOrders()));
            theDoc.add(new Paragraph("The total Orders "+theReport.getTotalOrders()));
            theDoc.add(new Paragraph("Items Sold"+theReport.getTotalItemSold()));

            theDoc.close();
            return outReport.toByteArray();

        } catch (RuntimeException e) {
            throw new RuntimeException("Something went wrong In PDF generating");
        }
    }
}
