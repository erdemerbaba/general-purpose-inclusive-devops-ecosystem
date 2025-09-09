package com.management.userservice.document;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Document(collection = "users")
public class User {

	@Id
	private String id;
	@NotNull
	@Size(min = 3, max = 50)
	private String username;
	@NotNull
	@Size(min = 3, max = 50)
	private String password;
	@NotNull
	@Size(min = 3, max = 50)
	private String name;
	@NotNull
	@Size(min = 3, max = 50)
	private String surname;
	private String profession;
	private String role;
	private String level;
	private String team;
	private String mentor;
	private String joinDate;
	private String leaveDate;
	private String location;
	private String email;
	private String phoneNumber;
	private String birthDate;
	private String nationality;
	private String address;
	private String identityNumber;
	private String educations;
	private String experience;
	private String skills;
	private String certifications;
	private String honors;
	private String memberships;
	private String projects;
	private String links;
	private String governmentPapers;
	private String additionalNotes;

	public User() {

	}

	public User(String username, String password, String name, String surname, String profession, String role, String level, String team, String mentor, String joinDate, String leaveDate, String location, String email, String phoneNumber, String birthDate, String nationality, String address, String identityNumber, String educations, String experience, String skills, String certifications, String honors, String memberships, String projects, String links, String governmentPapers, String additionalNotes) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.profession = profession;
		this.role = role;
		this.level = level;
		this.team = team;
		this.mentor = mentor;
		this.joinDate = joinDate;
		this.leaveDate = leaveDate;
		this.location = location;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.birthDate = birthDate;
		this.nationality = nationality;
		this.address = address;
		this.identityNumber = identityNumber;
		this.educations = educations;
		this.experience = experience;
		this.skills = skills;
		this.certifications = certifications;
		this.honors = honors;
		this.memberships = memberships;
		this.projects = projects;
		this.links = links;
		this.governmentPapers = governmentPapers;
		this.additionalNotes = additionalNotes;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getTeam() {
		return team;
	}

	public void setTeam(String team) {
		this.team = team;
	}

	public String getMentor() {
		return mentor;
	}

	public void setMentor(String mentor) {
		this.mentor = mentor;
	}

	public String getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}

	public String getLeaveDate() {
		return leaveDate;
	}

	public void setLeaveDate(String leaveDate) {
		this.leaveDate = leaveDate;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getIdentityNumber() {
		return identityNumber;
	}

	public void setIdentityNumber(String identityNumber) {
		this.identityNumber = identityNumber;
	}

	public String getEducations() {
		return educations;
	}

	public void setEducations(String educations) {
		this.educations = educations;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	public String getCertifications() {
		return certifications;
	}

	public void setCertifications(String certifications) {
		this.certifications = certifications;
	}

	public String getHonors() {
		return honors;
	}

	public void setHonors(String honors) {
		this.honors = honors;
	}

	public String getMemberships() {
		return memberships;
	}

	public void setMemberships(String memberships) {
		this.memberships = memberships;
	}

	public String getProjects() {
		return projects;
	}

	public void setProjects(String projects) {
		this.projects = projects;
	}

	public String getLinks() {
		return links;
	}

	public void setLinks(String links) {
		this.links = links;
	}

	public String getGovernmentPapers() {
		return governmentPapers;
	}

	public void setGovernmentPapers(String governmentPapers) {
		this.governmentPapers = governmentPapers;
	}

	public String getAdditionalNotes() {
		return additionalNotes;
	}

	public void setAdditionalNotes(String additionalNotes) {
		this.additionalNotes = additionalNotes;
	}
}
