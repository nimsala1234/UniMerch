package com.vau.UniMerch.UniMerch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class UniMerchApplication {

	public static void main(String[] args) {
		SpringApplication.run(UniMerchApplication.class, args);
	}

}
