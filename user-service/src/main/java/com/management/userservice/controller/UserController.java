package com.management.userservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.management.userservice.document.User;
import com.management.userservice.exception.ResourceNotFoundException;
import com.management.userservice.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private static final int DEFAULT_PAGE = 0;
    private static final int DEFAULT_SIZE = 10;

    @GetMapping
    public Page<User> getAllUsers(
            @RequestParam(value = "id", required = false) String id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "surname", required = false) String surname,
            @RequestParam(value = "profession", required = false) String profession,
            @RequestParam(value = "role", required = false) String role,
            @RequestParam(value = "level", required = false) String level,
            @RequestParam(value = "team", required = false) String team,
            @RequestParam(value = "mentor", required = false) String mentor,
            @RequestParam(value = "page", defaultValue = "" + DEFAULT_PAGE) int page,
            @RequestParam(value = "size", defaultValue = "" + DEFAULT_SIZE) int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "_id"));

        if (id != null && !id.isEmpty()) return userRepository.findByIdFuzzy(id, pageable);
        if (name != null && !name.isEmpty()) return userRepository.findByNameFuzzy(name, pageable);
        if (surname != null && !surname.isEmpty()) return userRepository.findBySurnameFuzzy(surname, pageable);
        if (profession != null && !profession.isEmpty()) return userRepository.findByProfessionFuzzy(profession, pageable);
        if (role != null && !role.isEmpty()) return userRepository.findByRoleFuzzy(role, pageable);
        if (level != null && !level.isEmpty()) return userRepository.findByLevelFuzzy(level, pageable);
        if (team != null && !team.isEmpty()) return userRepository.findByTeamFuzzy(team, pageable);
        if (mentor != null && !mentor.isEmpty()) return userRepository.findByMentorFuzzy(mentor, pageable);

        return userRepository.findAll(pageable);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        List<User> allUsers = userRepository.findAll();
        long maxId = allUsers.stream()
                .mapToLong(u -> {
                    try {
                        return Long.parseLong(u.getId().replace("USER", ""));
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .max()
                .orElse(0);
        user.setId("USER" + (maxId + 1));
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        user.setName(userDetails.getName());
        user.setSurname(userDetails.getSurname());
        user.setProfession(userDetails.getProfession());
        user.setRole(userDetails.getRole());
        user.setLevel(userDetails.getLevel());
        user.setTeam(userDetails.getTeam());
        user.setMentor(userDetails.getMentor());
        user.setJoinDate(userDetails.getJoinDate());
        user.setLeaveDate(userDetails.getLeaveDate());
        user.setLocation(userDetails.getLocation());
        user.setEmail(userDetails.getEmail());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setBirthDate(userDetails.getBirthDate());
        user.setNationality(userDetails.getNationality());
        user.setAddress(userDetails.getAddress());
        user.setIdentityNumber(userDetails.getIdentityNumber());
        user.setEducations(userDetails.getEducations());
        user.setExperience(userDetails.getExperience());
        user.setSkills(userDetails.getSkills());
        user.setCertifications(userDetails.getCertifications());
        user.setHonors(userDetails.getHonors());
        user.setMemberships(userDetails.getMemberships());
        user.setProjects(userDetails.getProjects());
        user.setLinks(userDetails.getLinks());
        user.setGovernmentPapers(userDetails.getGovernmentPapers());
        user.setAdditionalNotes(userDetails.getAdditionalNotes());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
