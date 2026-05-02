package com.vau.UniMerch.UniMerch.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("clubs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Club {

    @Id
    private String id;
    private String adminEmail;
    private String name;
    private String description;

    private String adminId;
    private String logoUrl;
}