package com.rajesh.service;


import com.rajesh.modal.Submission;
import com.rajesh.modal.TaskDto;
import com.rajesh.repository.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionServiceImpl implements SubmissionService {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private TaskService taskService;


    @Override
    public Submission submitTask(Long taskId, String githubLink, Long userId, String jwt) throws Exception {

        // FIX: We are now passing the 'jwt' string into the Feign Client
        // so the Task Service knows who is requesting it!
        TaskDto task = taskService.getTaskByID(taskId, jwt);

        if (task != null) {
            Submission submission = new Submission();
            submission.setTaskId(taskId);
            submission.setUserId(userId);
            submission.setGithubLink(githubLink);
            submission.setSubmissionTime(LocalDateTime.now());

            return submissionRepository.save(submission);
        }

        throw new Exception("Task not found with id: " + taskId);
    }

    @Override
    public Submission getTaskSubmissinById(Long submissionId) throws Exception {
        return submissionRepository.findById(submissionId)
                .orElseThrow(()->new Exception("Task submission not found with id:"+submissionId));
    }

    @Override
    public List<Submission> getAllTaskSubmissions() {
        return submissionRepository.findAll();
    }

    @Override
    public List<Submission> getTaskSubmissionsByTaskId(Long taskId) {
        return submissionRepository.findByTaskId(taskId);
    }

    @Override
    public Submission acceptedDeclineSubmission(Long id, String status) throws Exception {
        Submission submission =getTaskSubmissinById(id);
        submission.setStatus(status);
        if(status.equals("ACCEPT")){
            taskService.completeTask(submission.getTaskId());
        }
        System.out.println("THE ID BEFORE SAVING IS: " + submission.getId());
        return submissionRepository.save(submission);
    }
}
