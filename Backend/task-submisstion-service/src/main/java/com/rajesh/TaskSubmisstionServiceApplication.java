package com.rajesh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TaskSubmisstionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskSubmisstionServiceApplication.class, args);
	}

}
