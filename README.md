# System Information

## Repository Name
Inclusive Management Devops System

## Description
This repository contain fullstack integrated inclusive devops system. It should calls "system", due to repository does not contain only application itselves. Also include creating environment, setting configurations, monitoring, log trace tools and that kind of DevOps tools.
#############################################

# System Tech Stack Spesifications

## Sections Included
- Frontend
- Backend
- Dataservice
- Continuous Improvement
- Continuous Delivery
- Infastructure Tools
- Monitoring
- Logging
- Network
- Cluster

## Used Principle, Pattern and Techniques
- 
- Microservice Structure
- Singleton Creational Pattern
- DRY Principle
- Object Oriented Programming 
- Functional Programming
- SSL Security

## Abilities
- 
- Fullstack Web Application
- CRUD Operations
- SOLID Principle

## Included DevOps Technologies
- Swagger
- Prometheus
- Grafana
- Elastic Search
- Kibana

## Included Software Technologies
- Spring Boot (Backend Framework)
- Maven (comprehension tool)
- Node.js (JS Runtime Environment)
- React (JS Library)
- Bootstrap (Frontend Framework)
- MongoDB (NoSQL Database)
- Git (Version Control System)

## Language & Formats
- Java
- Javascript
- HTML
- CSS
- Bash
- Json
- xml

## Pages
- Main Page: http://localhost:3000/
- Get users: http://localhost:3000/users
- Add Users: http://localhost:3000/add-user/_add
- Detail Users: http://localhost:3000/view-user/
- Update Users: http://localhost:3000/add-user/userid

#############################################

# System Setup&Deploy Process

## Credentials
Website: localhost:3000
Username: admin
Password: admin

## Execute below script to get local&package&deploy or skip below section for manual 
Path

## Local Run
Database
Step 1: Enter repository folder in terminal
Step 2: Install MongoDB - https://www.mongodb.com/docs/manual/installation/
Step 3: ```mongosh```
Step 4: Use http://localhost:8070/
Backend
Step 5: Enter related folder in terminal
Step 6:  ```mvn clean install```
Step 7:  ```mvn spring-boot:run```
Step 8: Use http://localhost:8070/
Frontend
Step 9: Enter related folder in terminal
Step 10:  ```npm install```
Step 11:  ```npm start```
Step 12: Use http://localhost:3000/


## Get Package
Database
Step 1: mongosh
Backend
Step 2: mvn package
Frontend
Step 3: npm run build


## Deploy Process
Database
Step 1: mongosh
Backend
Step 2: java -jar package.jar
Frontend
Step 3: npm install -g serve
Step 4: serve -s build


## Error Handling
export NODE_OPTIONS=--openssl-legacy-provider
export SKIP_PREFLIGHT_CHECK=true
lsof -i tcp:8080
taskkill /F /PID

#############################################
# Functionality

## service names
- management-website
- employee-service
- product-service

## Page names
- Employee
- Products

## Database Parameters
- Employee
-- ID
-- Name
-- Surname
-- Profession
-- Role
-- Level
-- Team
-- Mentor
-- Join Date
-- Leave Date
-- Location
-- Email
-- Phone Number
-- Birth Date
-- Nationality
-- Address
-- Identity Number
-- Educations
-- Experience
-- Skills
-- Certifications
-- Honors
-- Memberships
-- Projects
-- Links
-- Goverment Papers
-- Additional Notes

- Products
-- ID
-- Name
-- Category
-- Description
-- Members
-- Customer Segment
-- Revenue Source
-- Cost Source
-- Customer Platforms
-- Developer Platforms
-- Tech Stacks
-- Deployments
-- Sources
-- Historic Dates
-- Performance Indicators
-- Legal Compliance
-- Financial Procedures
-- Additional Notes

Created by Era Technology Co with Erdem Erbaba 