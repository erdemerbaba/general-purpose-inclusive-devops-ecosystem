# General Purpose Inclusive DevOps Ecosystem
Inclusive Devops Ecosystem is general purpose environment for maintain both fullstack and devops projects. This ecosystem offer configureable management web application with provides a devops environment that can be calibrated and used for other projects such as maintaining, monitoring,infastructure practices of this web application.

<p align="center">
  <img width="607" height="607" alt="image" src="https://github.com/user-attachments/assets/c7f75900-3b50-4638-ae96-a6885ac10a7f" />
</p>

# Index
1. Ecosystem Summary
2. Architecture Overview
3. Technology Stacks
4. Project Structure
5. Informations of Services
6. Local Setup
7. Get packages
8. Deployment Operation
9. Database Parameters
10. Contributing
11. License
12. Support
13. Donate

# 1 Ecosystem Summary 
Configurable web application for a calibratable devops enironment. Devops Ecosystem is general purpose environment for maintain both fullstack and devops projects. This ecosystem offer configureable management web application with provides a devops environment that can be calibrated and used for other projects such as maintaining, monitoring,infastructure practices of this web application.


<h2>2 Architecture Overview</h2>

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>2.1 General Sections of Ecosystem</h3>
      <ul>
        <li>Continuous Development</li>
        <li>Continuous Integration</li>
        <li>Continuous Testing</li>
        <li>Continuous Deployment</li>
        <li>Continuous Delivery</li>
        <li>Continuous Monitoring</li>
        <li>Continuous Feedback</li>
        <li>Continuous Operations</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>2.2 Sector Summary of Ecosystem</h3>
      <ul>
        <li>Frontend</li>
        <li>Backend</li>
        <li>Dataservice</li>
        <li>Gateway</li>
        <li>Docker</li>
        <li>Kubernetes</li>
        <li>Pipeline</li>
        <li>Infrastructure</li>
        <li>Monitoring</li>
        <li>Logging</li>
        <li>Network</li>
        <li>Security</li>
        <li>Traffic Management</li>
        <li>Scalability</li>
        <li>Upgradeability</li>
        <li>Migration</li>
      </ul>
    </td>
  </tr>
</table>


<p align="center">
<img width="1154" height="577" alt="k8s" src="https://github.com/user-attachments/assets/4243b4b9-1bdc-4290-9e53-1c0e959d495f" />
</p>
   
# 3. Technology Stacks
## 3.1 Backend
- **Framework**: Spring Boot 2.7.0
- **Language**: Java 17
- **Security**: Spring Security + JWT
- **Validation**: Bean Validation (JSR-303)
- **Logging**: SLF4J + Logback
- **Monitoring**: Spring Boot Actuator + Prometheus

## 3.2 Frontend
- **Framework**: React 17
- **Language**: JavaScript/JSX
- **Styling**: Bootstrap 4.5
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **State Management**: Context API

## 3.3 dataservice
- **Framework**: MongoDB

## 3.4. Container Tools
- **Containerization**: Docker-ready
- **Monitoring**: Health checks, metrics
- **Configuration**: Environment-based configuration
- **Logging**: Structured logging with rotation

## 3.5 Automation Tools
- **Continuous Delivery**: Jenkins

## 3.6 Kubernetes Tools
- **Infastructure**: Terraform
- **Configuration**: Ansible
- **Environment**: Istio
- **Maintenance**: Rancher


## 4 Project Structure

```
general_purpose_inclusive_devops_ecosystem/
├── user-service/                 # User management microservice
│   ├── src/main/java/
│   │   ├── controller/          # REST controllers
│   │   ├── service/             # Business logic layer
│   │   ├── repository/          # Data access layer
│   │   ├── dto/                 # Data transfer objects
│   │   ├── document/            # MongoDB entities
│   │   ├── config/              # Configuration classes
│   │   └── exception/           # Custom exceptions
│   └── src/main/resources/
│       └── application.yml      # Externalized configuration
├── product-service/              # Product management microservice
│   ├── src/main/java/
│   │   ├── controller/          # REST controllers
│   │   ├── service/             # Business logic layer
│   │   ├── repository/          # Data access layer
│   │   ├── dto/                 # Data transfer objects
│   │   ├── document/            # MongoDB entities
│   │   ├── config/              # Configuration classes
│   │   └── exception/           # Custom exceptions
│   └── src/main/resources/
│       └── application.yml      # Externalized configuration
├── management-app/               # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── services/            # API service layer
│   │   ├── context/             # React context providers
│   │   └── pages/               # Page components
│   └── package.json             # Node.js dependencies
└── deployment/                   # Deployment configurations
```

<p align="center">
   <img width="2392" height="858" alt="frontendlayout" src="https://github.com/user-attachments/assets/1b8fdf39-abf3-4fca-a64d-b922e9a61729" />
</p>

## 4.1 Used Principle, Pattern and Techniques
### 4.1.1 SOLID Principles for maintainable and extensible code
    **Single Responsibility Principle (SRP)**: Controllers handle only HTTP requests/responses
    **Open/Closed Principle (OCP)**: Service interfaces allow extension without modification
    **Liskov Substitution Principle (LSP)**: Service implementations are interchangeable
    **Interface Segregation Principle (ISP)**: Focused service interfaces
    *Dependency Inversion Principle (DIP)**: Controllers depend on service interfaces
### 4.1.2 12-Factor App methodology for cloud-native applications
    **Codebase**: Single repository for all services
    **Dependencies**: Maven/Node.js dependency management
    **Config**: Externalized configuration via environment variables
    **Backing Services**: MongoDB as backing service
    **Build, Release, Run**: Maven build process
    **Processes**: Stateless services
    **Port Binding**: Configurable ports via environment
    **Concurrency**: Horizontal scaling support
    **Disposability**: Graceful shutdown handling
    **Dev/Prod Parity**: Consistent environments
    **Logs**: Structured logging with SLF4J
    **Admin Processes**: Health check endpoints
### 4.1.3 Service-Oriented Architecture (SOAP) principles for loose coupling
    **Service Abstraction**: Clear service boundaries
    **Loose Coupling**: Services communicate via well-defined interfaces
    **Service Reusability**: Services can be reused across different contexts
    **Service Autonomy**: Services operate independently
    

# 5 Information of Services
## 5.1 User Service (`user-service`)
- **Backend Port**: 8081
- **Frontend URLs**:
  * Get : http://localhost:3000/users
  * Add : http://localhost:3000/add-user/_add
  * Detail : http://localhost:3000/view-user/
  * Update : http://localhost:3000/add-user/userid
- **Purpose**: User management and authentication
- **Features**: CRUD operations, search, pagination, validation

## 5.2 Product Service (`product-service`)
- **Port**: 8082
- **Frontend URLs**:
  * Get : http://localhost:3000/products
  * Add : http://localhost:3000/add-product/_add
  * Detail : http://localhost:3000/view-product/
  * Update : http://localhost:3000/add-product/productid
- **Purpose**: Product lifecycle management
- **Features**: CRUD operations, search, pagination, validation

## 5.2 Asset Service (`asset-service`)
- **Port**: 8083
- **Frontend URLs**:
  * Get : http://localhost:3000/assets
  * Add : http://localhost:3000/add-assets/_add
  * Detail : http://localhost:3000/view-asset/
  * Update : http://localhost:3000/add-asset/assetid
- **Purpose**: Product lifecycle management
- **Features**: CRUD operations, search, pagination, validation

## 5.3 Management App (`management-app`)
- **Port**: 3000
- **Frontend URLs**:
  * Get : http://localhost:3000
- **Purpose**: React-based frontend application
- **Features**: Modern UI, responsive design, state management

## 5.4 eureka


## 5.5 gateway


## 5.6 swagger


## 5.7 jenkins


## 5.8 jenkins


## 5.9 prometheus


## 5.10 grafana


## 5.11 elastic search


## 5.12 logstash


## 5.13 kibana


## 5.14 rancher



# 6. Local Setup
User can run whole project with docker and kubernetes but if want to run manuel please read instructions.

<p align="center">
   <img width="1024" height="1003" alt="image" src="https://github.com/user-attachments/assets/77265eec-adf4-4e1f-a733-fcefacae0197" />
</p>

## 6.1 Prerequisites
- Java 17+
- Maven 3.6+
- Node.js 14+
- MongoDB 4.4+
- Docker (optional)

## 6.2 Run Services

### 6.2.1 Configure Environment Variables
   ```bash
   export MONGODB_HOST=localhost
   export MONGODB_PORT=27017
   export MONGODB_DATABASE=management
   export JWT_SECRET=your-secret-key
   ```

### 6.2.2 Start MongoDB
   ```bash
    mongod --dbpath 
   ```
 
### 6.2.3 Build and Run User Service
   ```bash
   cd user-service
   mvn clean install
   mvn spring-boot:run
   ```

### 6.2.4 Build and Run Product Service**
   ```bash
   cd product-service
   mvn clean install
   mvn spring-boot:run
   ```

### 6.2.5 Build and Run Product Service**
   ```bash
   cd asset-service
   mvn clean install
   mvn spring-boot:run
   ```

### 6.2.6 Install Dependencies
   ```bash
   cd management-app
   npm install
   npm start
   ```

### 6.2.7 Enter Web app
Website: localhost:3000
Username: admin
Password: admin

# 7 Get Package
User can run whole project with docker and kubernetes but if want to run manuel please read instructions.

## 7.1 Database
    mongosh

## 7.2 Backend
    mvn package

## 7.3 Frontend
    npm run build

# 8 Deployment Operation
User can run whole project with docker and kubernetes but if want to run manuel please read instructions. Firstly, Enter related machine install requirements.

## 8.1 Database
    mongosh

## 8.2 Backend
    java -jar package.jar

## 8.3 Frontend
    npm install -g serve
    serve -s build

## 8.4 Docker Deployment
```bash
# Build images
docker build -t user-service ./user-service
docker build -t product-service ./product-service

# Run containers
docker run -p 8081:8081 user-service
docker run -p 8082:8082 product-service
```

## 8.5 Kubernetes Deployment
- Deployment manifests in `deployment/` directory
- Service configurations
- Ingress rules

<p align="center">
<img width="1154" height="577" alt="k8s" src="https://github.com/user-attachments/assets/4243b4b9-1bdc-4290-9e53-1c0e959d495f" />
</p>

## 8.6 Error Handling
export NODE_OPTIONS=--openssl-legacy-provider
export SKIP_PREFLIGHT_CHECK=true
lsof -i tcp:8080
taskkill /F /PID

# 9 Database Parameters
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

- Assets
-- ID
-- Name
-- Type
-- SerialNumber
-- Department
-- AssignedTo
-- TechnicalSpecs
-- PurchaseDate
-- Value


# 10 Contributing
1. Follow the established architecture patterns
2. Maintain SOLID principles
3. Add comprehensive tests
4. Update documentation
5. Follow the coding standards

# 11 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# 12 Support
For support and questions:
- Create an issue in the repository
- Review the documentation
- Check the health endpoints

# 13 Donate
**Buy me a coffee if you want to donate** 
https://www.buymeacoffee.com/erdemerbaba/
---

**Built with ❤️ by Era Technology Co aka Erdem Erbaba** 
