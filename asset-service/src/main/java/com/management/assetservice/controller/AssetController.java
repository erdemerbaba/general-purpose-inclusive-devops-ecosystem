package com.management.assetservice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.management.assetservice.document.Asset;
import com.management.assetservice.exception.ResourceNotFoundException;
import com.management.assetservice.repository.AssetRepository;

@CrossOrigin(origins = "*", maxAge = 5800)
@RestController
@RequestMapping("/api/v1")
public class AssetController {
    @Autowired
    private AssetRepository assetRepository;

    @GetMapping("/assets")
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
        } else if (name != null && !name.isEmpty()) {
            return assetRepository.findByNameFuzzy(name, pageable);
        } else if (type != null && !type.isEmpty()) {
            return assetRepository.findByTypeFuzzy(type, pageable);
        } else if (serialNumber != null && !serialNumber.isEmpty()) {
            return assetRepository.findBySerialNumberFuzzy(serialNumber, pageable);
        } else if (department != null && !department.isEmpty()) {
            return assetRepository.findByDepartmentFuzzy(department, pageable);
        } else if (assignedTo != null && !assignedTo.isEmpty()) {
            return assetRepository.findByAssignedToFuzzy(assignedTo, pageable);
        } else if (technicalSpecs != null && !technicalSpecs.isEmpty()) {
            return assetRepository.findByTechnicalSpecsFuzzy(technicalSpecs, pageable);
        } else if (value != null && !value.isEmpty()) {
            return assetRepository.findByValueFuzzy(value, pageable);
        } else if (purchaseDate != null && !purchaseDate.isEmpty()) {
            return assetRepository.findByPurchaseDateFuzzy(purchaseDate, pageable);
        } else {
            return assetRepository.findAll(pageable);
        }
    }

    @PostMapping("/assets")
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

    @GetMapping("/assets/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable String id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not exist with id :" + id));
        return ResponseEntity.ok(asset);
    }

    @PutMapping("/assets/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable String id, @RequestBody Asset assetDetails) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not exist with id :" + id));

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

    @DeleteMapping("/assets/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAsset(@PathVariable String id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asset not exist with id :" + id));

        assetRepository.delete(asset);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
