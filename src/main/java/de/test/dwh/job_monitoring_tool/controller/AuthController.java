package de.test.dwh.job_monitoring_tool.controller;

import de.test.dwh.job_monitoring_tool.payload.LoginRequest; // Muss noch erstellt werden!
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest) {
        
        // 1. Authentifizierungs-Versuch
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword()
            )
        );

        // 2. Sicherheitssitzung setzen (Optional, für einfache Session-Authentifizierung)
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Antwort senden (In einer echten App: JWT Token senden)
        // Wir senden hier nur eine Erfolgsmeldung und den Usernamen zurück.
        return ResponseEntity.ok("Login erfolgreich! Willkommen, " + loginRequest.getUsername());
    }
}