package com.rajesh.controller;

import com.rajesh.model.Task;
import com.rajesh.model.TaskStatus;
import com.rajesh.model.UserDto;
import com.rajesh.service.TaskService;
import com.rajesh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userProfile = userService.getUserProfile(jwt);
        Task createdTask = taskService.createTask(task, userProfile.getRole());
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskByID(@PathVariable Long id,
                                            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userProfile = userService.getUserProfile(jwt);
        Task task = taskService.getTaskById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Task>> getAssigedUserTask(@RequestParam(required = false) String status,
                                                         @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userProfile = userService.getUserProfile(jwt);

        // Convert the string from React, then pass TaskStatus to your service
        TaskStatus taskStatus = convertStatus(status);
        List<Task> tasks = taskService.assigenedUserTask(userProfile.getId(), taskStatus);

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(@RequestParam(required = false) String status,
                                                  @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userProfile = userService.getUserProfile(jwt);

        // Convert the string from React, then pass TaskStatus to your service
        TaskStatus taskStatus = convertStatus(status);
        List<Task> tasks = taskService.getAllTask(taskStatus);

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}/user/{userId}/assigned")
    public ResponseEntity<Task> assigenedToUser(@PathVariable Long id,
                                                @PathVariable Long userId,
                                                @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userProfile = userService.getUserProfile(jwt);
        Task tasks = taskService.assigenedToUser(userId, id);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,
                                           @RequestBody Task req,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userProfile = userService.getUserProfile(jwt);
        Task tasks = taskService.updateTask(id, req, userProfile.getId());
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable Long id) throws Exception {
        Task task = taskService.completeTask(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) throws Exception {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // HELPER METHOD: Safely stops Enum crashes from React URL parameters
    private TaskStatus convertStatus(String status) {
        if (status == null || status.equalsIgnoreCase("all") || status.equalsIgnoreCase("null") || status.equalsIgnoreCase("undefined")) {
            return null;
        }
        try {
            return TaskStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}