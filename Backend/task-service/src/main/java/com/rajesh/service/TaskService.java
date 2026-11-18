package com.rajesh.service;

import com.rajesh.model.Task;
import com.rajesh.model.TaskStatus;
import java.util.List;

public interface TaskService {
    Task createTask(Task task, String requsterRole) throws Exception;
    Task getTaskById(Long id) throws Exception;
    List<Task> getAllTask(TaskStatus status);
    Task updateTask(Long id, Task updatedTask, Long userId) throws Exception;
    void deleteTask(Long id) throws Exception;
    Task assigenedToUser(Long userId, Long taskId) throws Exception;
    List<Task> assigenedUserTask(Long userId, TaskStatus status);
    Task completeTask(Long taskId) throws Exception;
}