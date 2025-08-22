package com.management.productservice.repository;

import com.management.productservice.document.Product;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {


    @Query("{ 'id' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByIdFuzzy(String id, Sort sort);

    @Query("{ 'name' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByNameFuzzy(String name, Sort sort);

    @Query("{ 'category' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByCategoryFuzzy(String category, Sort sort);

    @Query("{ 'description' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByDescriptionFuzzy(String description, Sort sort);

    @Query("{ 'members' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByMembersFuzzy(String members, Sort sort);

    @Query("{ 'customerSegment' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByCustomerSegmentFuzzy(String customerSegment, Sort sort);

    @Query("{ 'revenueSource' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByRevenueSourceFuzzy(String revenueSource, Sort sort);

    @Query("{ 'costSource' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByCostSourceFuzzy(String costSource, Sort sort);

    @Query("{ 'customerPlatforms' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByCustomerPlatformsFuzzy(String customerPlatforms, Sort sort);

    @Query("{ 'developerPlatforms' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByDeveloperPlatformsFuzzy(String developerPlatforms, Sort sort);

    @Query("{ 'techStacks' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByTechStacksFuzzy(String techStacks, Sort sort);

    @Query("{ 'deployments' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByDeploymentsFuzzy(String deployments, Sort sort);

    @Query("{ 'sources' : { $regex: ?0, $options: 'i' } }")
    List<Product> findBySourcesFuzzy(String sources, Sort sort);

    @Query("{ 'historicDates' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByHistoricDatesFuzzy(String historicDates, Sort sort);

    @Query("{ 'performanceIndicators' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByPerformanceIndicatorsFuzzy(String performanceIndicators, Sort sort);

    @Query("{ 'legalCompliance' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByLegalComplianceFuzzy(String legalCompliance, Sort sort);

    @Query("{ 'financialProcedures' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByFinancialProceduresFuzzy(String financialProcedures, Sort sort);

    @Query("{ 'additionalNotes' : { $regex: ?0, $options: 'i' } }")
    List<Product> findByAdditionalNotesFuzzy(String additionalNotes, Sort sort);
}
