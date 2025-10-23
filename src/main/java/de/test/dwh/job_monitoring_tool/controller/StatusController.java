package de.test.dwh.job_monitoring_tool.controller;

import org.springframework.web.bind.annotation.CrossOrigin; // 1. Diesen Import hinzufügen
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/status")
@CrossOrigin(origins = "http://localhost:5173") // 2. DIESE ZEILE HINZUFÜGEN
public class StatusController {

    @GetMapping
    public String getStatus() {
        return "Job Monitoring Backend ist betriebsbereit!";
    }
}

