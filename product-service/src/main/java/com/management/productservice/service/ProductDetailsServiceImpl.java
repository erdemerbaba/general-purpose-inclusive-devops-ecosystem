package com.management.productservice.service;

import com.management.productservice.repository.ProductUserRepository;
import com.management.productservice.document.ProductUser;
import com.management.productservice.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class ProductDetailsServiceImpl implements UserDetailsService {

    private final ProductUserRepository productUserRepository;

    @Autowired
    public ProductDetailsServiceImpl(ProductUserRepository productUserRepository) {
        this.productUserRepository = productUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ProductUser user = productUserRepository.findByUsername(username);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), new ArrayList<>()
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    public ProductUser save(ProductDTO productDTO) {
        ProductUser newUser = new ProductUser();
        newUser.setUsername(productDTO.getUsername());
        newUser.setPassword(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode(productDTO.getPassword()));
        return productUserRepository.save(newUser);
    }
} 