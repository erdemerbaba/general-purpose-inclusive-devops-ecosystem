package com.management.assetservice.controller;

import com.management.assetservice.document.Asset;
import com.management.assetservice.exception.ResourceNotFoundException;
import com.management.assetservice.repository.AssetRepository;
import com.management.assetservice.service.RedisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
@RestController
@RequestMapping("/api/v1/assets")
@Tag(name = "Asset Management", description = "Operations related to asset management")
public class AssetController {

    private final AssetRepository assetRepository;
    private final RedisService redisService;

    private static final String ASSET_NOT_FOUND = "Asset not exist with id: ";

    @Autowired
    public AssetController(AssetRepository assetRepository, RedisService redisService) {
        this.assetRepository = assetRepository;
        this.redisService = redisService;
    }

    @Operation(summary = "Get all assets", description = "Retrieve a paginated list of assets based on filters")
    @GetMapping
    public Page<Asset> getAllAssets(
            @RequestParam(value = "id", required = false) String id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "serialNumber", required = false) String serialNumber,
            @RequestParam(value = "department", required = false) String department,
            @RequestParam(value = "assignedTo", required = false) String assignedTo,
            @RequestParam(value = "technicalSpecs", required = false) String technicalSpecs,
            @RequestParam(value = "value", required = false) String value,
            @RequestParam(value = "purchaseDate", required = false) String purchaseDate,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "_id"));

        if (id != null && !id.isEmpty()) {
            return assetRepository.findByIdFuzzy(id, pageable);
        }
        if (name != null && !name.isEmpty()) {
            return assetRepository.findByNameFuzzy(name, pageable);
        }
        if (type != null && !type.isEmpty()) {
            return assetRepository.findByTypeFuzzy(type, pageable);
        }
        if (serialNumber != null && !serialNumber.isEmpty()) {
            return assetRepository.findBySerialNumberFuzzy(serialNumber, pageable);
        }
        if (department != null && !department.isEmpty()) {
            return assetRepository.findByDepartmentFuzzy(department, pageable);
        }
        if (assignedTo != null && !assignedTo.isEmpty()) {
            return assetRepository.findByAssignedToFuzzy(assignedTo, pageable);
        }
        if (technicalSpecs != null && !technicalSpecs.isEmpty()) {
            return assetRepository.findByTechnicalSpecsFuzzy(technicalSpecs, pageable);
        }
        if (value != null && !value.isEmpty()) {
            return assetRepository.findByValueFuzzy(value, pageable);
        }
        if (purchaseDate != null && !purchaseDate.isEmpty()) {
            return assetRepository.findByPurchaseDateFuzzy(purchaseDate, pageable);
        }

        return assetRepository.findAll(pageable);
    }

    @PostMapping
    public Asset createAsset(@RequestBody Asset asset) {
        List<Asset> allAssets = assetRepository.findAll();
        long maxId = allAssets.stream()
                .mapToLong(t -> {
                    try {
                        return Long.parseLong(t.getId().replace("ASSET", ""));
                    } catch (NumberFormatException e) {
                        return 0;
                    }
                })
                .max()
                .orElse(0);
        asset.setId("ASSET" + (maxId + 1));
        return assetRepository.save(asset);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable String id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ASSET_NOT_FOUND + id));
        return ResponseEntity.ok(asset);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable String id, @RequestBody Asset assetDetails) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ASSET_NOT_FOUND + id));

        asset.setId(assetDetails.getId());
        asset.setName(assetDetails.getName());
        asset.setType(assetDetails.getType());
        asset.setSerialNumber(assetDetails.getSerialNumber());
        asset.setDepartment(assetDetails.getDepartment());
        asset.setAssignedTo(assetDetails.getAssignedTo());
        asset.setTechnicalSpecs(assetDetails.getTechnicalSpecs());
        asset.setValue(assetDetails.getValue());
        asset.setPurchaseDate(assetDetails.getPurchaseDate());

        Asset updatedAsset = assetRepository.save(asset);
        return ResponseEntity.ok(updatedAsset);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAsset(@PathVariable String id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(ASSET_NOT_FOUND + id));

        assetRepository.delete(asset);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/cache")
    public ResponseEntity<String> cacheAsset(@RequestBody Asset asset) {
        redisService.saveData(asset.getId(), asset.toString());
        return ResponseEntity.ok("Asset cached successfully");
    }

    @GetMapping("/cache/{id}")
    public ResponseEntity<String> getCachedAsset(@PathVariable String id) {
        String cachedAsset = redisService.getData(id);
        if (cachedAsset == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cachedAsset);
    }
}
