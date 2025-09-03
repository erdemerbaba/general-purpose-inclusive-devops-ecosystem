package com.management.userservice.controller;

import com.management.userservice.document.User;
import com.management.userservice.repository.UserRepository;
import com.management.userservice.service.UserDetailsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testGetUserById() throws Exception {
        User user = new User();
        user.setId("USER1");
        user.setName("John");
        user.setSurname("Doe");

        when(userRepository.findById("USER1")).thenReturn(Optional.of(user));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/USER1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("USER1"))
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.surname").value("Doe"));

        verify(userRepository, times(1)).findById("USER1");
    }

    @Test
    void testCreateUser() throws Exception {
        User user = new User();
        user.setId("USER2");
        user.setName("Jane");
        user.setSurname("Smith");

        when(userRepository.save(any(User.class))).thenReturn(user);

        String userJson = "{\"name\":\"Jane\",\"surname\":\"Smith\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("USER2"))
                .andExpect(jsonPath("$.name").value("Jane"))
                .andExpect(jsonPath("$.surname").value("Smith"));

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testDeleteUser() throws Exception {
        User user = new User();
        user.setId("USER3");

        when(userRepository.findById("USER3")).thenReturn(Optional.of(user));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/users/USER3")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.deleted").value(true));

        verify(userRepository, times(1)).findById("USER3");
        verify(userRepository, times(1)).delete(user);
    }

    @Test
    void testUpdateUser() throws Exception {
        User existingUser = new User();
        existingUser.setId("USER4");
        existingUser.setName("OldName");
        existingUser.setSurname("OldSurname");

        User updatedUser = new User();
        updatedUser.setId("USER4");
        updatedUser.setName("NewName");
        updatedUser.setSurname("NewSurname");

        when(userRepository.findById("USER4")).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        String userJson = "{\"name\":\"NewName\",\"surname\":\"NewSurname\"}";

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/users/USER4")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("USER4"))
                .andExpect(jsonPath("$.name").value("NewName"))
                .andExpect(jsonPath("$.surname").value("NewSurname"));

        verify(userRepository, times(1)).findById("USER4");
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testGetUserNotFound() throws Exception {
        when(userRepository.findById("USER7")).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/users/USER7")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(userRepository, times(1)).findById("USER7");
    }
}
