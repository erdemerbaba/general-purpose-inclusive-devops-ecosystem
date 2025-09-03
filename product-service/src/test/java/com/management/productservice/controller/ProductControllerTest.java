package com.management.productservice.controller;

import com.management.productservice.document.Product;
import com.management.productservice.repository.ProductRepository;
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

public class ProductControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(productController).build();
    }

    @Test
    void testGetProductById() throws Exception {
        Product product = new Product();
        product.setId("PRODUCT3");
        product.setName("Product C");

        when(productRepository.findById("PRODUCT3")).thenReturn(Optional.of(product));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/products/PRODUCT3")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("PRODUCT3"))
                .andExpect(jsonPath("$.name").value("Product C"));

        verify(productRepository, times(1)).findById("PRODUCT3");
    }

    @Test
    void testCreateProduct() throws Exception {
        Product product = new Product();
        product.setId("PRODUCT4");
        product.setName("Product D");

        when(productRepository.save(any(Product.class))).thenReturn(product);

        String productJson = "{\"name\":\"Product D\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("PRODUCT4"))
                .andExpect(jsonPath("$.name").value("Product D"));

        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testUpdateProduct() throws Exception {
        Product existingProduct = new Product();
        existingProduct.setId("PRODUCT5");
        existingProduct.setName("Old Product");

        Product updatedProduct = new Product();
        updatedProduct.setId("PRODUCT5");
        updatedProduct.setName("Updated Product");

        when(productRepository.findById("PRODUCT5")).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        String productJson = "{\"name\":\"Updated Product\"}";

        mockMvc.perform(MockMvcRequestBuilders.put("/api/v1/products/PRODUCT5")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("PRODUCT5"))
                .andExpect(jsonPath("$.name").value("Updated Product"));

        verify(productRepository, times(1)).findById("PRODUCT5");
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void testDeleteProduct() throws Exception {
        Product product = new Product();
        product.setId("PRODUCT6");

        when(productRepository.findById("PRODUCT6")).thenReturn(Optional.of(product));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/v1/products/PRODUCT6")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.deleted").value(true));

        verify(productRepository, times(1)).findById("PRODUCT6");
        verify(productRepository, times(1)).delete(product);
    }

    @Test
    void testGetProductNotFound() throws Exception {
        when(productRepository.findById("PRODUCT7")).thenReturn(Optional.empty());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/products/PRODUCT7")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(productRepository, times(1)).findById("PRODUCT7");
    }
}
