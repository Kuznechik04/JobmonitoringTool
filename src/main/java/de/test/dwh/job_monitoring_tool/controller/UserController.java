package de.test.dwh.job_monitoring_tool.controller;

import de.test.dwh.job_monitoring_tool.model.AppUser;
import de.test.dwh.job_monitoring_tool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
// Erlaubt den Zugriff von deinem Frontend auf http://localhost:5173
@CrossOrigin(origins = "http://localhost:5173") 
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // POST-Endpoint: Erstellt einen neuen Benutzer
    @PostMapping
    public ResponseEntity<AppUser> createUser(@RequestBody AppUser user) {
        AppUser newUser = userService.createUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    // GET-Endpoint: Ruft alle Benutzer ab
    @GetMapping
    public List<AppUser> getAllUsers() {
        return userService.getAllUsers();
    }

    // DELETE-Endpoint: Löscht einen Benutzer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}