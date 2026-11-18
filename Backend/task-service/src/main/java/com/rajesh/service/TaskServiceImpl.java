package com.rajesh.service;

import com.rajesh.model.Task;
import com.rajesh.model.TaskStatus;
import com.rajesh.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task, String requsterRole) throws Exception {
        if(!requsterRole.equals("ROLE_ADMIN")){
            throw new Exception("only admin can create a task");
        }
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskById(Long id) throws Exception {
        return taskRepository.findById(id).orElseThrow(()-> new Exception("task not found with id "+id));
    }

    @Override
    public List<Task> getAllTask(TaskStatus status) {
        List<Task> allTasks = taskRepository.findAll();
        return allTasks.stream().filter(task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString())).collect(Collectors.toList());
    }

    @Override
    public Task updateTask(Long id, Task updatedTask, Long userId) throws Exception {
        Task exsitingTask = getTaskById(id);
        if(updatedTask.getTitle() != null){
            exsitingTask.setTitle(updatedTask.getTitle());
        }
        if(updatedTask.getImage() != null){
            exsitingTask.setImage(updatedTask.getImage());
        }
        if(updatedTask.getDescription() != null){
            exsitingTask.setDescription(updatedTask.getDescription());
        }
        if(updatedTask.getStatus() != null){
            exsitingTask.setStatus(updatedTask.getStatus());
        }
        if(updatedTask.getDeadLine() != null){
            exsitingTask.setDeadLine(updatedTask.getDeadLine());
        }
        return taskRepository.save(exsitingTask);
    }

    @Override
    public void deleteTask(Long id) throws Exception {
        getTaskById(id);
        taskRepository.deleteById(id);
    }

    @Override
    public Task assigenedToUser(Long userId, Long taskId) throws Exception {
        Task task = getTaskById(taskId);
        task.setAssignedUserId(userId);

        // This keeps the tasks visible for assigned users!
        task.setStatus(TaskStatus.ASSIGNED);

        return taskRepository.save(task);
    }

    @Override
    public List<Task> assigenedUserTask(Long userId, TaskStatus status) {
        List<Task> tasks = taskRepository.findByAssignedUserId(userId);
        return tasks.stream().filter(task -> status == null || task.getStatus().name().equalsIgnoreCase(status.toString())).collect(Collectors.toList());
    }

    @Override
    public Task completeTask(Long taskId) throws Exception {
        Task task = getTaskById(taskId);
        task.setStatus(TaskStatus.DONE);
        return taskRepository.save(task);
    }
}