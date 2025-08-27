package com.management.assetservice.repository;

import com.management.assetservice.document.Asset;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends MongoRepository<Asset, String> {

    @Query("{ 'id' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByIdFuzzy(String id, Sort sort);

    @Query("{ 'name' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByNameFuzzy(String name, Sort sort);

    @Query("{ 'type' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByTypeFuzzy(String type, Sort sort);

    @Query("{ 'serialNumber' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findBySerialNumberFuzzy(String serialNumber, Sort sort);

    @Query("{ 'department' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByDepartmentFuzzy(String department, Sort sort);

    @Query("{ 'assignedTo' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByAssignedToFuzzy(String assignedTo, Sort sort);

    @Query("{ 'technicalSpecs' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByTechnicalSpecsFuzzy(String technicalSpecs, Sort sort);

    @Query("{ 'value' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByValueFuzzy(String value, Sort sort);

    @Query("{ 'purchaseDate' : { $regex: ?0, $options: 'i' } }")
    List<Asset> findByPurchaseDateFuzzy(String purchaseDate, Sort sort);
}
