package microservice.music_web.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import microservice.music_web.service.AuthService;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")  // cho phép frontend gọi
public class AuthController {
      private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String result = authService.register(request.get("username"), request.get("password"));
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String token = authService.login(request.get("username"), request.get("password"));
        return ResponseEntity.ok(Map.of("token", token));
    }
}
