// src/main/java/de/test/dwh/job_monitoring_tool/controller/TestController.java
package de.test.dwh.job_monitoring_tool.controller;

import de.test.dwh.job_monitoring_tool.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/send-email")
    public String testEmail() {
        try {
            // Replace with your test recipient email address
            String testRecipient = "philipweber04@icloud.com";
            emailService.sendNotification(testRecipient, "Test Job", "FEHLER");
            return "Test email sent successfully to " + testRecipient;
        } catch (Exception e) {
            // Log the full error to your server console for debugging
            e.printStackTrace();
            return "Error sending email: " + e.getMessage();
        }
    }
}