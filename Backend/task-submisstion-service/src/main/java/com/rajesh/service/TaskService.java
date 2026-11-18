package com.rajesh.service;

import com.rajesh.modal.TaskDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;

// 1. Removed the hardcoded URL. Eureka will now automatically find the TASK-SERVICE port.
@FeignClient(name = "TASK-SERVICE")
public interface TaskService {

    @GetMapping("/api/task/{id}")
    public TaskDto getTaskByID(
            @PathVariable("id") Long id, // 2. Explicitly mapped the PathVariable name
            @RequestHeader("Authorization") String jwt
    ) throws Exception;

    @PutMapping("/api/task/{id}/complete")
    public TaskDto completeTask(
            @PathVariable("id") Long id
    ) throws Exception;

}