package com.management.productservice.controller;

import com.management.productservice.document.Product;
import com.management.productservice.exception.ResourceNotFoundException;
import com.management.productservice.repository.ProductRepository;
import com.management.productservice.service.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Product Management", description = "Operations related to product management")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RedisService redisService;

    @Operation(summary = "Get all products", description = "Retrieve a list of products based on filters")
    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(value = "id", required = false) String id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "members", required = false) String members,
            @RequestParam(value = "customerSegment", required = false) String customerSegment,
            @RequestParam(value = "revenueSource", required = false) String revenueSource,
            @RequestParam(value = "costSource", required = false) String costSource,
            @RequestParam(value = "customerPlatforms", required = false) String customerPlatforms,
            @RequestParam(value = "developerPlatforms", required = false) String developerPlatforms,
            @RequestParam(value = "techStacks", required = false) String techStacks,
            @RequestParam(value = "deployments", required = false) String deployments,
            @RequestParam(value = "sources", required = false) String sources,
            @RequestParam(value = "historicDates", required = false) String historicDates,
            @RequestParam(value = "performanceIndicators", required = false) String performanceIndicators,
            @RequestParam(value = "legalCompliance", required = false) String legalCompliance,
            @RequestParam(value = "financialProcedures", required = false) String financialProcedures,
            @RequestParam(value = "additionalNotes", required = false) String additionalNotes) {

        Sort sort = Sort.by(Sort.Direction.DESC, "_id");

        if (id != null && !id.isEmpty()) {
            return productRepository.findByIdFuzzy(id, sort);
        }
        if (name != null && !name.isEmpty()) {
            return productRepository.findByNameFuzzy(name, sort);
        }
        if (category != null && !category.isEmpty()) {
            return productRepository.findByCategoryFuzzy(category, sort);
        }
        if (description != null && !description.isEmpty()) {
            return productRepository.findByDescriptionFuzzy(description, sort);
        }
        if (members != null && !members.isEmpty()) {
            return productRepository.findByMembersFuzzy(members, sort);
        }
        if (customerSegment != null && !customerSegment.isEmpty()) {
            return productRepository.findByCustomerSegmentFuzzy(customerSegment, sort);
        }
        if (revenueSource != null && !revenueSource.isEmpty()) {
            return productRepository.findByRevenueSourceFuzzy(revenueSource, sort);
        }
        if (costSource != null && !costSource.isEmpty()) {
            return productRepository.findByCostSourceFuzzy(costSource, sort);
        }
        if (customerPlatforms != null && !customerPlatforms.isEmpty()) {
            return productRepository.findByCustomerPlatformsFuzzy(customerPlatforms, sort);
        }
        if (developerPlatforms != null && !developerPlatforms.isEmpty()) {
            return productRepository.findByDeveloperPlatformsFuzzy(developerPlatforms, sort);
        }
        if (techStacks != null && !techStacks.isEmpty()) {
            return productRepository.findByTechStacksFuzzy(techStacks, sort);
        }
        if (deployments != null && !deployments.isEmpty()) {
            return productRepository.findByDeploymentsFuzzy(deployments, sort);
        }
        if (sources != null && !sources.isEmpty()) {
            return productRepository.findBySourcesFuzzy(sources, sort);
        }
        if (historicDates != null && !historicDates.isEmpty()) {
            return productRepository.findByHistoricDatesFuzzy(historicDates, sort);
        }
        if (performanceIndicators != null && !performanceIndicators.isEmpty()) {
            return productRepository.findByPerformanceIndicatorsFuzzy(performanceIndicators, sort);
        }
        if (legalCompliance != null && !legalCompliance.isEmpty()) {
            return productRepository.findByLegalComplianceFuzzy(legalCompliance, sort);
        }
        if (financialProcedures != null && !financialProcedures.isEmpty()) {
            return productRepository.findByFinancialProceduresFuzzy(financialProcedures, sort);
        }
        if (additionalNotes != null && !additionalNotes.isEmpty()) {
            return productRepository.findByAdditionalNotesFuzzy(additionalNotes, sort);
        }

        return productRepository.findAll(sort);
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        List<Product> allProducts = productRepository.findAll();
        long maxId = allProducts.stream()
                .mapToLong(t -> {
                    try {
                        return Long.parseLong(t.getId().replace("PRODUCT", ""));
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .max()
                .orElse(0);
        product.setId("PRODUCT" + (maxId + 1));
        return productRepository.save(product);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id: " + id));
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id: " + id));
        product.setName(productDetails.getName());
        product.setCategory(productDetails.getCategory());
        product.setDescription(productDetails.getDescription());
        product.setMembers(productDetails.getMembers());
        product.setCustomerSegment(productDetails.getCustomerSegment());
        product.setRevenueSource(productDetails.getRevenueSource());
        product.setCostSource(productDetails.getCostSource());
        product.setCustomerPlatforms(productDetails.getCustomerPlatforms());
        product.setDeveloperPlatforms(productDetails.getDeveloperPlatforms());
        product.setTechStacks(productDetails.getTechStacks());
        product.setDeployments(productDetails.getDeployments());
        product.setSources(productDetails.getSources());
        product.setHistoricDates(productDetails.getHistoricDates());
        product.setPerformanceIndicators(productDetails.getPerformanceIndicators());
        product.setLegalCompliance(productDetails.getLegalCompliance());
        product.setFinancialProcedures(productDetails.getFinancialProcedures());
        product.setAdditionalNotes(productDetails.getAdditionalNotes());

        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not exist with id: " + id));

        productRepository.delete(product);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cache")
    public ResponseEntity<String> cacheProduct(@RequestBody Product product) {
        redisService.saveData(product.getId(), product.toString());
        return ResponseEntity.ok("Product cached successfully");
    }

    @GetMapping("/cache/{id}")
    public ResponseEntity<String> getCachedProduct(@PathVariable String id) {
        String cachedProduct = redisService.getData(id);
        if (cachedProduct == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cachedProduct);
    }
}
