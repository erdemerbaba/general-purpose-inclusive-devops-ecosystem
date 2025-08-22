package com.management.productservice.repository;

import com.management.productservice.document.ProductUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductUserRepository extends MongoRepository<ProductUser, String> {
    ProductUser findByUsername(String username);
} 