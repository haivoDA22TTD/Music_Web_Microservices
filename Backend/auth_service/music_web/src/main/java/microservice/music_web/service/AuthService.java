package microservice.music_web.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import microservice.music_web.model.Role;
import microservice.music_web.model.User;
import microservice.music_web.repository.UserRepository;
import microservice.music_web.security.JwtUtil;

@Service
public class AuthService {
     private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String register(String username, String password) {
        if (userRepo.findByUsername(username).isPresent()) {
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Set.of(Role.ROLE_USER)); // mặc định

        userRepo.save(user);
        return "Đăng ký thành công";
    }

    public String login(String username, String password) {
        Optional<User> userOpt = userRepo.findByUsername(username);
        if (userOpt.isEmpty()) throw new RuntimeException("Sai tài khoản");

        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu");
        }

        return jwtUtil.generateToken(user);
    }
}
