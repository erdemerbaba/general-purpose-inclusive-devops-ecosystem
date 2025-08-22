package com.management.userservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
	public List<User> getAllUsers(@RequestParam(value = "id", required = false) String id,
                             @RequestParam(value = "name", required = false) String name,
                             @RequestParam(value = "surname", required = false) String surname,
                             @RequestParam(value = "profession", required = false) String profession,
                             @RequestParam(value = "role", required = false) String role,
                             @RequestParam(value = "level", required = false) String level,
                             @RequestParam(value = "team", required = false) String team,
                             @RequestParam(value = "mentor", required = false) String mentor,
                             @RequestParam(value = "joinDate", required = false) String joinDate,
                             @RequestParam(value = "leaveDate", required = false) String leaveDate,
                             @RequestParam(value = "location", required = false) String location,
                             @RequestParam(value = "email", required = false) String email,
                             @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
                             @RequestParam(value = "birthDate", required = false) String birthDate,
                             @RequestParam(value = "nationality", required = false) String nationality,
                             @RequestParam(value = "address", required = false) String address,
                             @RequestParam(value = "identityNumber", required = false) String identityNumber,
                             @RequestParam(value = "educations", required = false) String educations,
                             @RequestParam(value = "experience", required = false) String experience,
                             @RequestParam(value = "skills", required = false) String skills,
                             @RequestParam(value = "certifications", required = false) String certifications,
                             @RequestParam(value = "honors", required = false) String honors,
                             @RequestParam(value = "memberships", required = false) String memberships,
                             @RequestParam(value = "projects", required = false) String projects,
                             @RequestParam(value = "links", required = false) String links,
                             @RequestParam(value = "governmentPapers", required = false) String governmentPapers,
                             @RequestParam(value = "additionalNotes", required = false) String additionalNotes) {
	    if (id != null && !id.isEmpty()) {
			return userRepository.findByIdFuzzy(id);
		}
		else if (name != null && !name.isEmpty()) {
			return userRepository.findByNameFuzzy(name, Sort.by(Sort.Direction.DESC, "id"));
		} 
		else if (surname != null && !surname.isEmpty()) {
			return userRepository.findBySurnameFuzzy(surname, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (profession != null && !profession.isEmpty()) {
			return userRepository.findByProfessionFuzzy(profession, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (role != null && !role.isEmpty()) {
			return userRepository.findByRoleFuzzy(role, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (level != null && !level.isEmpty()) {
			return userRepository.findByLevelFuzzy(level, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (team != null && !team.isEmpty()) {
			return userRepository.findByTeamFuzzy(team, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (mentor != null && !mentor.isEmpty()) {
			return userRepository.findByMentorFuzzy(mentor, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (joinDate != null && !joinDate.isEmpty()) {
			return userRepository.findByJoinDateFuzzy(joinDate, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (leaveDate != null && !leaveDate.isEmpty()) {
			return userRepository.findByLeaveDateFuzzy(leaveDate, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (location != null && !location.isEmpty()) {
			return userRepository.findByLocationFuzzy(location, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (email != null && !email.isEmpty()) {
			return userRepository.findByEmailFuzzy(email, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (phoneNumber != null && !phoneNumber.isEmpty()) {
			return userRepository.findByPhoneNumberFuzzy(phoneNumber, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (birthDate != null && !birthDate.isEmpty()) {
			return userRepository.findByBirthDateFuzzy(birthDate, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (nationality != null && !nationality.isEmpty()) {
			return userRepository.findByNationalityFuzzy(nationality, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (address != null && !address.isEmpty()) {
			return userRepository.findByAddressFuzzy(address, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (identityNumber != null && !identityNumber.isEmpty()) {
			return userRepository.findByIdentityNumberFuzzy(identityNumber, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (educations != null && !educations.isEmpty()) {
			return userRepository.findByEducationsFuzzy(educations, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (experience != null && !experience.isEmpty()) {
			return userRepository.findByExperienceFuzzy(experience, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (skills != null && !skills.isEmpty()) {
			return userRepository.findBySkillsFuzzy(skills, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (certifications != null && !certifications.isEmpty()) {
			return userRepository.findByCertificationsFuzzy(certifications, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (honors != null && !honors.isEmpty()) {
			return userRepository.findByHonorsFuzzy(honors, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (memberships != null && !memberships.isEmpty()) {
			return userRepository.findByMembershipsFuzzy(memberships, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (projects != null && !projects.isEmpty()) {
			return userRepository.findByProjectsFuzzy(projects, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (links != null && !links.isEmpty()) {
			return userRepository.findByLinksFuzzy(links, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (governmentPapers != null && !governmentPapers.isEmpty()) {
			return userRepository.findByGovernmentPapersFuzzy(governmentPapers, Sort.by(Sort.Direction.DESC, "id"));
		}
		else if (additionalNotes != null && !additionalNotes.isEmpty()) {
			return userRepository.findByAdditionalNotesFuzzy(additionalNotes);
		}
		else {
			return userRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
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
