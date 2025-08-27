package com.management.assetservice.repository;

import com.management.assetservice.document.AssetUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AssetUserRepository extends MongoRepository<AssetUser, String> {
    AssetUser findByUsername(String username);
} 