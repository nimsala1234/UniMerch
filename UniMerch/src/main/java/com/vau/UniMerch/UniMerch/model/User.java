package com.vau.UniMerch.UniMerch.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    private String id;

    private String fullName;
    private String email;
    private String password;
    private Role role;

    public enum Role {
        STUDENT_STAFF,
        CLUB_ADMIN,
        UNI_ADMIN
    }
}