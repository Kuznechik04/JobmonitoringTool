package de.test.dwh.job_monitoring_tool.payload;

public class LoginRequest {
    private String username;
    private String password;

    // Standard-Konstruktor
    public LoginRequest() {
    }

    // Getter und Setter
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}