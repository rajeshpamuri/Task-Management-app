package com.rajesh.controller;

import com.rajesh.modal.Submission;
import com.rajesh.modal.UserDto;
import com.rajesh.service.SubmissionService;
import com.rajesh.service.TaskService;
import com.rajesh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private TaskService taskService;


    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Submission> submitTask(
            @RequestParam Long taskId,
            @RequestParam String githubLink,
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        Submission submission = submissionService.submitTask(taskId, githubLink, user.getId(), jwt);
        return new ResponseEntity<>(submission, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        Submission taskSubmissinById = submissionService.getTaskSubmissinById(id);
        return new ResponseEntity<>(taskSubmissinById, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<Submission>> getAllSubmissions(
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        List<Submission> taskSubmissionsns = submissionService.getAllTaskSubmissions();
        return new ResponseEntity<>(taskSubmissionsns, HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>> getAllSubmissionsByTaskId(
            @PathVariable Long taskId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        List<Submission> taskSubmissionsById = submissionService.getTaskSubmissionsByTaskId(taskId);
        return new ResponseEntity<>(taskSubmissionsById, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Submission> acceptedDeclineSubmission(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt,
            @RequestParam("status") String status
    ) throws Exception{
        UserDto user = userService.getUserProfile(jwt);
        Submission taskSubmission = submissionService.acceptedDeclineSubmission(id,status);
        return new ResponseEntity<>(taskSubmission, HttpStatus.OK);
    }


}
