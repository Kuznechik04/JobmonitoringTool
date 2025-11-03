package de.test.dwh.job_monitoring_tool.service;

import de.test.dwh.job_monitoring_tool.model.AppUser;
import de.test.dwh.job_monitoring_tool.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserInitializer {

    // Läuft nach dem Start der Spring-Anwendung einmalig
    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Prüfen, ob bereits Benutzer existieren
            if (userRepository.count() == 0) {
                
                // Erstellen Sie den Initial-Benutzer
                AppUser admin = new AppUser(
                    "admin",
                    "admin@example.com",
                    // Das Passwort "password" wird gehasht
                    passwordEncoder.encode("password") 
                );
                userRepository.save(admin);
                
                System.out.println("--- Initialer Admin-Benutzer erstellt: admin/password ---");
            }
        };
    }
}