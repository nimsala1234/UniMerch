package com.vau.UniMerch.UniMerch.dto.req;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
