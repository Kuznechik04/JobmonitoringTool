package de.test.dwh.job_monitoring_tool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendNotification(String to, String jobName, String newStatus) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("weberphilip04@gmail.com");
        message.setTo(to);
        message.setSubject("Job Status Update: " + jobName);
        message.setText(
            "Hello,\n\nThe status for the job '" + jobName + "' has changed.\n\n" +
            "New Status: " + newStatus + "\n\n" +
            "Regards,\nYour Job Monitoring Tool"
        );
        mailSender.send(message);
    }
}