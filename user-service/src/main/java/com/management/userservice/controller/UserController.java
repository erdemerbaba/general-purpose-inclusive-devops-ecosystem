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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.management.userservice.document.User;
import com.management.userservice.exception.ResourceNotFoundException;
import com.management.userservice.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React app's URL (origins = "http://localhost:3000") 
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	
	@GetMapping("/users")
	public Page<User> getAllUsers(
			@RequestParam(value = "id", required = false) String id,
			@RequestParam(value = "name", required = false) String name,
			@RequestParam(value = "surname", required = false) String surname,
			@RequestParam(value = "profession", required = false) String profession,
			@RequestParam(value = "role", required = false) String role,
			@RequestParam(value = "level", required = false) String level,
			@RequestParam(value = "team", required = false) String team,
			@RequestParam(value = "mentor", required = false) String mentor,
			@RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "size", defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "_id"));

		if (id != null && !id.isEmpty()) {
			return userRepository.findByIdFuzzy(id, pageable);
		} 
		else if (name != null && !name.isEmpty()) {
			return userRepository.findByNameFuzzy(name, pageable);
		} 
		else if (surname != null && !surname.isEmpty()) {
			return userRepository.findBySurnameFuzzy(surname, pageable);
		}
		else if (profession != null && !profession.isEmpty()) {
			return userRepository.findByProfessionFuzzy(profession, pageable);
		}
		else if (role != null && !role.isEmpty()) {
			return userRepository.findByRoleFuzzy(role, pageable);
		}
		else if (level != null && !level.isEmpty()) {
			return userRepository.findByLevelFuzzy(level, pageable);
		}
		else if (team != null && !team.isEmpty()) {
			return userRepository.findByTeamFuzzy(team, pageable);
		}
		else if (mentor != null && !mentor.isEmpty()) {
			return userRepository.findByMentorFuzzy(mentor, pageable);
		}
		else {
			return userRepository.findAll(pageable);
		}
	}

	
	@PostMapping("/users")
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

	
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable String id) {
		
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		return ResponseEntity.ok(user);
	}

	
	@PutMapping("/users/{id}")
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
	    user.setGovermentPapers(userDetails.getGovermentPapers());
	    user.setAdditionalNotes(userDetails.getAdditionalNotes());

	    User updatedUser = userRepository.save(user);
	    return ResponseEntity.ok(updatedUser);
	}

	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable String id) {
		
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));

		userRepository.delete(user);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
