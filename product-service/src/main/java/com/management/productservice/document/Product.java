package com.management.productservice.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "products")
public class Product {

    @Id
    private String id;
    private String name;
    private String category;
    private String description;
    private String members;
    private String customerSegment;
    private String revenueSource;
    private String costSource;
    private String customerPlatforms;
    private String developerPlatforms;
    private String techStacks;
    private String deployments;
    private String sources;
    private String historicDates;
    private String performanceIndicators;
    private String legalCompliance;
    private String financialProcedures;
    private String additionalNotes;

    public Product() {
    }

    public Product(String name, String category, String description, String members, 
                String customerSegment, String revenueSource, String costSource, 
                String customerPlatforms, String developerPlatforms, String techStacks, 
                String deployments, String sources, String historicDates, 
                String performanceIndicators, String legalCompliance, 
                String financialProcedures, String additionalNotes) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.members = members;
        this.customerSegment = customerSegment;
        this.revenueSource = revenueSource;
        this.costSource = costSource;
        this.customerPlatforms = customerPlatforms;
        this.developerPlatforms = developerPlatforms;
        this.techStacks = techStacks;
        this.deployments = deployments;
        this.sources = sources;
        this.historicDates = historicDates;
        this.performanceIndicators = performanceIndicators;
        this.legalCompliance = legalCompliance;
        this.financialProcedures = financialProcedures;
        this.additionalNotes = additionalNotes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMembers() {
        return members;
    }

    public void setMembers(String members) {
        this.members = members;
    }

    public String getCustomerSegment() {
        return customerSegment;
    }

    public void setCustomerSegment(String customerSegment) {
        this.customerSegment = customerSegment;
    }

    public String getRevenueSource() {
        return revenueSource;
    }

    public void setRevenueSource(String revenueSource) {
        this.revenueSource = revenueSource;
    }

    public String getCostSource() {
        return costSource;
    }

    public void setCostSource(String costSource) {
        this.costSource = costSource;
    }

    public String getCustomerPlatforms() {
        return customerPlatforms;
    }

    public void setCustomerPlatforms(String customerPlatforms) {
        this.customerPlatforms = customerPlatforms;
    }

    public String getDeveloperPlatforms() {
        return developerPlatforms;
    }

    public void setDeveloperPlatforms(String developerPlatforms) {
        this.developerPlatforms = developerPlatforms;
    }

    public String getTechStacks() {
        return techStacks;
    }

    public void setTechStacks(String techStacks) {
        this.techStacks = techStacks;
    }

    public String getDeployments() {
        return deployments;
    }

    public void setDeployments(String deployments) {
        this.deployments = deployments;
    }

    public String getSources() {
        return sources;
    }

    public void setSources(String sources) {
        this.sources = sources;
    }

    public String getHistoricDates() {
        return historicDates;
    }

    public void setHistoricDates(String historicDates) {
        this.historicDates = historicDates;
    }

    public String getPerformanceIndicators() {
        return performanceIndicators;
    }

    public void setPerformanceIndicators(String performanceIndicators) {
        this.performanceIndicators = performanceIndicators;
    }

    public String getLegalCompliance() {
        return legalCompliance;
    }

    public void setLegalCompliance(String legalCompliance) {
        this.legalCompliance = legalCompliance;
    }

    public String getFinancialProcedures() {
        return financialProcedures;
    }

    public void setFinancialProcedures(String financialProcedures) {
        this.financialProcedures = financialProcedures;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    
}
