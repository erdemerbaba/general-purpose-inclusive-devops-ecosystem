package com.management.assetservice.controller;

import com.management.assetservice.document.Asset;
import com.management.assetservice.repository.AssetRepository;
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

public class AssetControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AssetRepository assetRepository;

    @InjectMocks
    private AssetController assetController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(assetController).build();
    }

    @Test
    void testGetAssetById() throws Exception {
        Asset asset = new Asset();
        asset.setId("ASSET3");
        asset.setName("Asset C");

        when(assetRepository.findById("ASSET3")).thenReturn(Optional.of(asset));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/assets/ASSET3")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("ASSET3"))
                .andExpect(jsonPath("$.name").value("Asset C"));

        verify(assetRepository, times(1)).findById("ASSET3");
    }

    @Test
    void testCreateAsset() throws Exception {
        Asset asset = new Asset();
        asset.setId("ASSET4");
        asset.setName("Asset D");

        when(assetRepository.save(any(Asset.class))).thenReturn(asset);

        String assetJson = "{\"name\":\"Asset D\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/assets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(assetJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("ASSET4"))
                .andExpect(jsonPath("$.name").value("Asset D"));

        verify(assetRepository, times(1)).save(any(Asset.class));
    }

    @Test
    void testUpdateAsset() throws Exception {
        Asset existingAsset = new Asset();
        existingAsset.setId("ASSET5");
        existingAsset.setName("Old Asset");

        Asset updatedAsset = new Asset();
        updatedAsset.setId("ASSET5");
        updatedAsset.setName("Updated Asset");

        when(assetRepository.findById("ASSET5")).thenReturn(Optional.of(existingAsset));
        when(assetRepository.save(any(Asset.class))).thenReturn(updatedAsset);

        String assetJson = "{\"name\":\"Updated Asset\"}";

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/assets/ASSET5")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(assetJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("ASSET5"))
                .andExpect(jsonPath("$.name").value("Updated Asset"));

        verify(assetRepository, times(1)).findById("ASSET5");
        verify(assetRepository, times(1)).save(any(Asset.class));
    }

    @Test
    void testDeleteAsset() throws Exception {
        Asset asset = new Asset();
        asset.setId("ASSET6");

        when(assetRepository.findById("ASSET6")).thenReturn(Optional.of(asset));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/assets/ASSET6")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.deleted").value(true));

        verify(assetRepository, times(1)).findById("ASSET6");
        verify(assetRepository, times(1)).delete(asset);
    }

    @Test
    void testGetAssetNotFound() throws Exception {
        when(assetRepository.findById("ASSET7")).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/assets/ASSET7")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(assetRepository, times(1)).findById("ASSET7");
    }
}
