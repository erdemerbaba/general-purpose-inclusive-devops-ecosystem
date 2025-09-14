# General Purpose Inclusive DevOps Ecosystem
Inclusive Devops Ecosystem is general purpose environment for maintain both fullstack and devops projects. This ecosystem offer configureable management web application with provides a devops environment that can be calibrated and used for other projects such as maintaining, monitoring,infastructure practices of this web application.

<p align="center">
<img width="1209" height="552" alt="gepidethumbnailwideful" src="https://github.com/user-attachments/assets/50ffcd4f-a5a3-4f70-b98b-49298cf3c995" />
</p>

# Index
<table>
  <tr>
    <td width="33%" valign="top">
      <ul>
        <li>1. Ecosystem Summary</li>
        <li>2. Architecture Overview</li>
        <li>3. Technology Stacks</li>
        <li>4. Project Structure</li>
        <li>5. Infos of Services</li>
        <li>6. Local Setup</li>
        <li>- 6.1.  With Container</li>
        <li> - 6.2.  With Manual</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <ul>
        <li> 7. Get packages</li>
        <li> - 7.1.  With Container</li>
        <li>- 7.2.  With Manual</li>
        <li>8. Deployment Operation</li>
        <li>- 8.1.  With Kubernetes</li>
        <li>- 8.2.  With Container</li>
        <li>- 8.3.  With Manual</li>
        <li>- 8.4.  Error Handling</li>
     </ul>
    </td>
    <td width="33%" valign="top">
      <ul>
        <li>9. Database Parameters</li>
        <li>10. Contributing</li>
        <li>11. License</li>
       <li> 12. Support</li>
       <li> 13. Donate</li>
     </ul>
    </td>
  </tr>
</table>

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
<img width="807" height="507" alt="gepideschema" src="https://github.com/user-attachments/assets/226a80d9-f334-404e-8e20-0afdeb37237a" />
</p>
   
# 3. Technology Stacks
<table>
  <tr>
    <td width="33%" valign="top">
      <h3>3.1 Backend</h3>
      <ul>
        <li>Framework: Spring Boot 2.7.0</li>
        <li>Language: Java 17</li>
        <li>Security: Spring Security + JWT</li>
        <li>Validation: Bean Validation (JSR-303)</li>
        <li>Logging: SLF4J + Logback</li>
        <li>Monitoring: Spring Boot Actuator + Prometheus</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>3.2 Frontend</h3>
      <ul>
        <li>Framework: React 17</li>
        <li>**Language: JavaScript/JSX</li>
        <li>Styling: Bootstrap 4.5</li>
        <li>HTTP Client: Axios</li>
        <li>Routing: React Router DOM</li>
        <li>State Management: Context API</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>3.3 dataservice</h3>
      <ul>
         <li>Framework: MongoDB</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>3.4. Container Tools</h3>
      <ul>
         <li>Containerization: Docker-ready</li>
        <li>Monitoring: Health checks, metrics</li>
        <li>Configuration: Environment-based configuration</li>
        <li>Logging: Structured logging with rotation</li>
      </ul>
    </td>
        <td width="33%" valign="top">
      <h3>3.6 Kubernetes Tools</h3>
      <ul>
         <li>Infastructure: Terraform</li>
        <li>Configuration: Ansible</li>
        <li>Environment: Istio</li>
        <li>Maintenance: Rancher</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>3.5 Automation Tools</h3>
      <ul>
         <li>Continuous Delivery: Jenkins</li>
      </ul>
    </td>
  </tr>
</table>

## 4 Project Structure

```
general_purpose_inclusive_devops_ecosystem/
├── user-service/                # User management microservice
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
├── product-service/             # Product management microservice
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
├── asset-service/               # asset management microservice
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
├── management-app/              # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── services/            # API service layer
│   │   ├── context/             # React context providers
│   │   └── pages/               # Page components
│   └── package.json             # Node.js dependencies
├── mongo-init.js                # mongodb configurations
├── eureka-server/               # eureka configurations
└── gateway/                     # gateway configurations
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

<p align="center">
<img width="900" height="300" alt="gepideports" src="https://github.com/user-attachments/assets/a3a8a13b-302d-4d73-b592-036ead937084" />
</p>


<table>
  <tr>
    <td width="33%" valign="top">
      <h3>5.1 Zookeper</h3>
      <ul>
          <li>* image: bitnami/zookeeper:latest</li>
          <li>* container_name: zookeeper</li>
          <li>* ports: "2181"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.2 kafka</h3>
      <ul>
          <li> image: bitnami/kafka:latest</li>
          <li> container_name: kafka</li>
          <li> ports: "9093,9092"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3> 5.3 kafdrop</h3>
      <ul>
          <li> image: obsidiandynamics/kafdrop:latest </li>
          <li> container_name: kafdrop</li>
          <li> ports: "9099"</li>
      </ul>
    </td>

  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3> 5.4 Mongodb</h3>
      <ul>
          <li> image: mongo:latest </li>
          <li> container_name: mongodb</li>
          <li> ports: "27017"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.5 redis</h3>
      <ul>
        <li>image: redis:latest</li>
        <li>container_name: redis</li>
        <li>ports:"6379"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.6 eureka</h3>
      <ul>
         <li>image: local</li>
        <li>container_name: eureka-server</li>
        <li>Eports: "8761"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>5.7 gateway</h3>
      <ul>
         <li>image: local</li>
         <li>container_name: gateway</li>
         <li>ports: "8080"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.8 user service</h3>
      <ul>
         <li>image: local</li>
        <li>container_name: user-service</li>
        <li>ports: "8081"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.9 product service</h3>
      <ul>
         <li>image: local</li>
         <li>container_name: product-service</li>
         <li>ports: "8082"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>5.10 asset service</h3>
      <ul>
         <li>image: local</li>
         <li>container_name: asset-service</li>
         <li>ports: "8083"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.11 management app</h3>
      <ul>
         <li>image: local</li>
        <li>container_name: management-app</li>
        <li>ports: "3000"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.12 sonarqube</h3>
      <ul>
         <li>image: sonarqube:latest</li>
         <li>container_name: sonarqube</li>
         <li>ports: "9000"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>5.13 jenkins</h3>
      <ul>
         <li>mage: jenkins/jenkins:lts</li>
         <li>container_name: jenkins</li>
         <li>ports: "8443,8043,50000"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.14 elastic search</h3>
      <ul>
         <li>image: elasticsearch/elasticsearch:7.17.10</li>
        <li>container_name: elasticsearch</li>
        <li>ports: "9200,9300"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.15 logstash</h3>
      <ul>
         <li>image: logstash/logstash:7.17.10</li>
         <li>container_name: logstash</li>
         <li>ports: "5044,9600"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>5.16 filebeat</h3>
      <ul>
         <li>mage: beats/filebeat:7.17.10</li>
         <li>container_name: filebeat</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.17 kibana</h3>
      <ul>
         <li>image: kibana/kibana:7.17.10</li>
        <li>container_name: kibana</li>
        <li>ports: "5601"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.18 prometheus</h3>
      <ul>
         <li>image: prom/prometheus:latest</li>
         <li>container_name: prometheus</li>
         <li>ports: "9090"</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>5.19 grafana</h3>
      <ul>
         <li>mage: grafana/grafana:latest</li>
         <li>container_name: grafana</li>
        <li>ports: "3001"</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.20 postgre</h3>
      <ul>
         <li>image: postgres:13</li>
        <li>container_name: jira_db</li>
      </ul>
    </td>
    <td width="33%" valign="top">
      <h3>5.21 jira</h3>
      <ul>
         <li>image: atlassian/jira-software:latest</li>
         <li>container_name: jira</li>
         <li>ports: "8090"</li>
      </ul>
    </td>
  </tr>
</table>

# 6. Local Setup
User can run whole project with docker and kubernetes but if want to run manual please read 6.3 instructions.

## 6.1 Prerequisites
<table>
  <tr>
    <td width="50%" valign="top">
      <ul>
          <li>16 core 2.5 ghz cpu</li>
          <li>16 gb ram</li>
          <li>50 gb disk space</li>
          <li>Docker</li>
          <li>minikube</li>
          <li>terraform</li>
          <li>python pip kubernetes</li>
          <li>ansible</li>
      </ul>
    <td width="50%" valign="top">
      <ul>
          <li> if do not use docker then:</li>
          <li> Java 17+</li>
          <li> Maven 3.6+</li>
          <li> Node.js 14+</li>
          <li> MongoDB 4.4+</li>
          <li> python 3.12+</li>
          <li> also should download related tools that inside of docker compose</li>
      </ul>
    </td>
  </tr>
</table>

<p align="center">
   <img width="900" height="500" alt="image" src="https://github.com/user-attachments/assets/77265eec-adf4-4e1f-a733-fcefacae0197" />
</p>

## 6.2 Run Services with container

### 6.2.1 install docker
   ```bash
   https://docs.docker.com/desktop/
   ```

### 6.2.2 locate to project pat
   ```bash
    cd general-purpose-inclusive-devops-ecosystem/
   ```
### 6.2.3 execute docker compose
   ```bash
    docker compose up -d --build
   ```

### 6.2.4 take a tea and wait a while after that check statusses with different terminal 
   ```bash
    docker images
    docker ps
   ```

### 6.2.5 you are read to go for check services
   ```bash
    curl http://localhost:3000
    Website: http://localhost:3000
   ```

### 6.2.5 if you want to down all the compose
   ```bash
    docker compose down
   ```

## 6.3 Run Services with old school style (non-container)

### 6.3.1 Configure Environment Variables
   ```bash
   export MONGODB_HOST=localhost
   export MONGODB_PORT=27017
   export MONGODB_DATABASE=management
   export JWT_SECRET=your-secret-key
   ```

### 6.3.2 Start MongoDB
   ```bash
    mongod --dbpath 
   ```
 
### 6.3.3 Build and Run User Service
   ```bash
   cd user-service
   mvn clean install
   mvn spring-boot:run
   ```

### 6.3.4 Build and Run Product Service**
   ```bash
   cd product-service
   mvn clean install
   mvn spring-boot:run
   ```

### 6.3.5 Build and Run Product Service**
   ```bash
   cd asset-service
   mvn clean install
   mvn spring-boot:run
   ```

### 6.3.6 Install Dependencies
   ```bash
   cd management-app
   npm install
   npm start
   ```

### 6.3.7 Enter Web app
Website: localhost:3000

# 7 Get Package
User can run whole project with docker and kubernetes but if want to run manual please read 7.2 instructions.

<p align="center">
<img width="1252" height="706" alt="dockercontainers" src="https://github.com/user-attachments/assets/a28f2b8e-9b58-4425-a68b-1975540eafe5" />
</p>

## 7.1 Get package with container
### 7.1.1 login docker
   ```bash
   docker login
   ```

### 7.1.2 build compose
   ```bash
   docker compose build
   ```

### 7.1.3 push to docker hub
   ```bash
   docker compose push
   ```

### 7.1.3.1 if you get package with offline environment
   ```bash
   docker compose images --quiet | xargs -n1 docker save -o <name>.tar
   ```

## 7.2 Get package with old school style (non-container)
### 7.2.1 Database
   ```bash
    mongosh
   ```

### 7.2.2 Backend
   ```bash
    mvn package
   ```

### 7.2.3 Frontend
   ```bash
    npm run build
   ```

# 8 Deployment Operation
User can run whole project with docker and kubernetes but if want to run manuel please read 8.3 instructions. Firstly, Enter related machine to deploy process.

<p align="center">
<img width="1345" height="801" alt="gepidekubernetes" src="https://github.com/user-attachments/assets/f55c7bb3-b8e5-4e09-a914-cebc612a00b1" />
</p>

## 8.1 Deploy with kubernetes
### 8.2.1 Install Terraform
```bash
https://developer.hashicorp.com/terraform/install
```
### 8.2.2 locate file and execute init
```bash
terraform init
```

### 8.2.3 apply teraform environment 
```bash
terraform apply
```

### 8.2.4 now take a time to terraform handle process and you can see the status with paralel terminal
```bash
kubectl get all -A
```

### 8.2.5 Install Ansible
```bash
https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html
```

### 8.2.6 Install python kubernetes lib
```bash
pip install kubernetes
```

### 8.2.7 Change what required in spesific tool yml file
```bash
ansible-playbook -i inventory.ini site.yml
```

### 8.2.8 Take a rest and look environment if something changed or not
```bash
kubectl describe pod -n <namespace> <choosen pod>
```

### 8.2.4 To down services execute below command in environment
```bash
kubectl delete namespace gepide
```

## 8.2 Deploy with docker

### 8.2.1 send docker compose to related machine
```bash
scp docker-compose.yml root:<ipadress>:/home/docker-compose.yml
```

### 8.2.2 enter machine, locate file and execute compose
```bash
docker compose up -d --build
```

### 8.2.2.1 if environment offline, locate file then enter machine and execute below rpm command
```bash
docker load -i all-images.tar
```

### 8.2.2 stop the services if needed
```bash
docker compose down
```

## 8.3 Deploy with local

### 8.3.1 Database
    mongosh

### 8.3.2 Backend
    java -jar package.jar

### 8.3.3 Frontend
    npm install -g serve
    serve -s build

## 8.4 Error Handling
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
-- Government Papers
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
