package com.management.assetservice.service;

import com.management.assetservice.repository.AssetUserRepository;
import com.management.assetservice.document.AssetUser;
import com.management.assetservice.dto.AssetDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class AssetDetailsServiceImpl implements UserDetailsService {

    private final AssetUserRepository assetUserRepository;

    @Autowired
    public AssetDetailsServiceImpl(AssetUserRepository assetUserRepository) {
        this.assetUserRepository = assetUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AssetUser user = assetUserRepository.findByUsername(username);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), new ArrayList<>()
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    public AssetUser save(AssetDTO assetDTO) {
        AssetUser newUser = new AssetUser();
        newUser.setUsername(assetDTO.getUsername());
        newUser.setPassword(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode(assetDTO.getPassword()));
        return assetUserRepository.save(newUser);
    }
} 