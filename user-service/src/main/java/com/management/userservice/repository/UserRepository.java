package com.management.userservice.repository;

import com.management.userservice.document.User;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);
    

    @Query("{ 'id' : { $regex: ?0, $options: 'i' } }")
    List<User> findByIdFuzzy(String id);

    @Query("{ 'name' : { $regex: ?0, $options: 'i' } }")
    List<User> findByNameFuzzy(String name, Sort sort);

    @Query("{ 'surname' : { $regex: ?0, $options: 'i' } }")
    List<User> findBySurnameFuzzy(String surname, Sort sort);

    @Query("{ 'profession' : { $regex: ?0, $options: 'i' } }")
    List<User> findByProfessionFuzzy(String profession, Sort sort);

    @Query("{ 'role' : { $regex: ?0, $options: 'i' } }")
    List<User> findByRoleFuzzy(String role, Sort sort);

    @Query("{ 'level' : { $regex: ?0, $options: 'i' } }")
    List<User> findByLevelFuzzy(String level, Sort sort);

    @Query("{ 'team' : { $regex: ?0, $options: 'i' } }")
    List<User> findByTeamFuzzy(String team, Sort sort);

    @Query("{ 'mentor' : { $regex: ?0, $options: 'i' } }")
    List<User> findByMentorFuzzy(String mentor, Sort sort);

    @Query("{ 'joinDate' : { $regex: ?0, $options: 'i' } }")
    List<User> findByJoinDateFuzzy(String joinDate, Sort sort);

    @Query("{ 'leaveDate' : { $regex: ?0, $options: 'i' } }")
    List<User> findByLeaveDateFuzzy(String leaveDate, Sort sort);

    @Query("{ 'location' : { $regex: ?0, $options: 'i' } }")
    List<User> findByLocationFuzzy(String location, Sort sort);

    @Query("{ 'email' : { $regex: ?0, $options: 'i' } }")
    List<User> findByEmailFuzzy(String email, Sort sort);

    @Query("{ 'phoneNumber' : { $regex: ?0, $options: 'i' } }")
    List<User> findByPhoneNumberFuzzy(String phoneNumber, Sort sort);

    @Query("{ 'birthDate' : { $regex: ?0, $options: 'i' } }")
    List<User> findByBirthDateFuzzy(String birthDate, Sort sort);

    @Query("{ 'nationality' : { $regex: ?0, $options: 'i' } }")
    List<User> findByNationalityFuzzy(String nationality, Sort sort);

    @Query("{ 'address' : { $regex: ?0, $options: 'i' } }")
    List<User> findByAddressFuzzy(String address, Sort sort);

    @Query("{ 'identityNumber' : { $regex: ?0, $options: 'i' } }")
    List<User> findByIdentityNumberFuzzy(String identityNumber, Sort sort);

    @Query("{ 'educations' : { $regex: ?0, $options: 'i' } }")
    List<User> findByEducationsFuzzy(String educations, Sort sort);

    @Query("{ 'experience' : { $regex: ?0, $options: 'i' } }")
    List<User> findByExperienceFuzzy(String experience, Sort sort);

    @Query("{ 'skills' : { $regex: ?0, $options: 'i' } }")
    List<User> findBySkillsFuzzy(String skills, Sort sort);

    @Query("{ 'certifications' : { $regex: ?0, $options: 'i' } }")
    List<User> findByCertificationsFuzzy(String certifications, Sort sort);

    @Query("{ 'honors' : { $regex: ?0, $options: 'i' } }")
    List<User> findByHonorsFuzzy(String honors, Sort sort);

    @Query("{ 'memberships' : { $regex: ?0, $options: 'i' } }")
    List<User> findByMembershipsFuzzy(String memberships, Sort sort);

    @Query("{ 'projects' : { $regex: ?0, $options: 'i' } }")
    List<User> findByProjectsFuzzy(String projects, Sort sort);

    @Query("{ 'links' : { $regex: ?0, $options: 'i' } }")
    List<User> findByLinksFuzzy(String links, Sort sort);

    @Query("{ 'governmentPapers' : { $regex: ?0, $options: 'i' } }")
    List<User> findByGovernmentPapersFuzzy(String governmentPapers, Sort sort);

    @Query("{ 'additionalNotes' : { $regex: ?0, $options: 'i' } }")
    List<User> findByAdditionalNotesFuzzy(String additionalNotes);

    @Query("{ 'id' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByIdFuzzy(String id, Pageable pageable);

    @Query("{ 'name' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByNameFuzzy(String name, Pageable pageable);

    @Query("{ 'surname' : { $regex: ?0, $options: 'i' } }")
    Page<User> findBySurnameFuzzy(String surname, Pageable pageable);

    @Query("{ 'profession' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByProfessionFuzzy(String profession, Pageable pageable);

    @Query("{ 'role' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByRoleFuzzy(String role, Pageable pageable);

    @Query("{ 'level' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByLevelFuzzy(String level, Pageable pageable);

    @Query("{ 'team' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByTeamFuzzy(String team, Pageable pageable);

    @Query("{ 'mentor' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByMentorFuzzy(String mentor, Pageable pageable);

    @Query("{ 'joinDate' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByJoinDateFuzzy(String joinDate, Pageable pageable);

    @Query("{ 'leaveDate' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByLeaveDateFuzzy(String leaveDate, Pageable pageable);

    @Query("{ 'location' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByLocationFuzzy(String location, Pageable pageable);

    @Query("{ 'email' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByEmailFuzzy(String email, Pageable pageable);

    @Query("{ 'phoneNumber' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByPhoneNumberFuzzy(String phoneNumber, Pageable pageable);

    @Query("{ 'birthDate' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByBirthDateFuzzy(String birthDate, Pageable pageable);

    @Query("{ 'nationality' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByNationalityFuzzy(String nationality, Pageable pageable);

    @Query("{ 'address' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByAddressFuzzy(String address, Pageable pageable);

    @Query("{ 'identityNumber' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByIdentityNumberFuzzy(String identityNumber, Pageable pageable);

    @Query("{ 'educations' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByEducationsFuzzy(String educations, Pageable pageable);

    @Query("{ 'experience' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByExperienceFuzzy(String experience, Pageable pageable);

    @Query("{ 'skills' : { $regex: ?0, $options: 'i' } }")
    Page<User> findBySkillsFuzzy(String skills, Pageable pageable);

    @Query("{ 'certifications' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByCertificationsFuzzy(String certifications, Pageable pageable);

    @Query("{ 'honors' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByHonorsFuzzy(String honors, Pageable pageable);

    @Query("{ 'memberships' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByMembershipsFuzzy(String memberships, Pageable pageable);

    @Query("{ 'projects' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByProjectsFuzzy(String projects, Pageable pageable);

    @Query("{ 'links' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByLinksFuzzy(String links, Pageable pageable);

    @Query("{ 'governmentPapers' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByGovernmentPapersFuzzy(String governmentPapers, Pageable pageable);

    @Query("{ 'additionalNotes' : { $regex: ?0, $options: 'i' } }")
    Page<User> findByAdditionalNotesFuzzy(String additionalNotes, Pageable pageable);
}
