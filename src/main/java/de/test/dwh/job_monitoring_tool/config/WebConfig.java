package de.test.dwh.job_monitoring_tool.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Konfiguriert globale CORS-Einstellungen für die gesamte Anwendung.
     * Dies wird VOR Spring Security ausgeführt.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Gilt für alle Pfade (/api/..., /api/auth/...)
            .allowedOrigins("http://localhost:5173") // Erlaube dein Frontend
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Erlaube alle Methoden
            .allowedHeaders("*") // Erlaube alle Header
            .allowCredentials(true); // Erlaube das Senden von Credentials
    }
}