package com.agorhash.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.agorhash"})
public class AgorhashApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgorhashApplication.class, args);
	}

}
