package com.xebia.userservice;

import com.xebia.userservice.model.User;
import com.xebia.userservice.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserService userService;

    public DataSeeder(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        List<User> existing = userService.getAllUsers();
        if (existing.isEmpty()) {
            System.out.println("Seeding demo users...");
            List<User> demoUsers = List.of(
                createUser("usr_1", "Mritunjai", "mritunjai@xebia.com", "teacher", "Engineering", "https://i.pravatar.cc/150?u=mritunjai"),
                createUser("usr_2", "Manish", "manish@xebia.com", "teacher", "Engineering", "https://i.pravatar.cc/150?u=manish"),
                createUser("usr_3", "Vijay", "vijay@xebia.com", "student", "Computer Science", "https://i.pravatar.cc/150?u=vijay"),
                createUser("usr_4", "Abhijeet", "abhijeet@xebia.com", "student", "Computer Science", "https://i.pravatar.cc/150?u=abhijeet"),
                createUser("usr_5", "Vinit", "vinit@xebia.com", "student", "Computer Science", "https://i.pravatar.cc/150?u=vinit")
            );
            UserService.BulkResult result = userService.createUsersBulk(demoUsers);
            System.out.println("Seeded " + result.getSuccessCount() + " users, " + result.getFailCount() + " failed");
        } else {
            System.out.println("Users already exist (" + existing.size() + "). Skipping seed.");
        }
    }

    private User createUser(String name, String email, String role, String department, String avatar) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setRole(role);
        user.setDepartment(department);
        user.setAvatar(avatar);
        return user;
    }
}
