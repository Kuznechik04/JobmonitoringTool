package de.test.dwh.job_monitoring_tool.repository;

import de.test.dwh.job_monitoring_tool.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Long> {
    // Spring Data JPA generiert automatisch CRUD-Methoden (Create, Read, Update, Delete)
    // und bietet einfache Suchfunktionen (z.B. findByUsername)
    Optional<AppUser> findByUsername(String username);
}