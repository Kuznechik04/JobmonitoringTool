package de.test.dwh.job_monitoring_tool.service;

import de.test.dwh.job_monitoring_tool.model.AppUser;
import de.test.dwh.job_monitoring_tool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AppUser createUser(AppUser user) {
        // Hier würde die Validierung und ggf. das Hashen des Passworts erfolgen.
        return userRepository.save(user);
    }

    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }
    
    public void deleteUser(Long id) {
         userRepository.deleteById(id);
    }
}