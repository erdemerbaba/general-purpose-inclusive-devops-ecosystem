import jenkins.model.*
import hudson.security.*

// Get Jenkins instance
def instance = Jenkins.getInstance()

// Disable the setup wizard
// Alternative approach to bypass the setup wizard
System.setProperty("jenkins.install.state", "INITIAL_SETUP_COMPLETED")

// Create an admin user
def hudsonRealm = new HudsonPrivateSecurityRealm(false)
if (hudsonRealm.getUser("admin") == null) {
    hudsonRealm.createAccount("admin", "admin123")
}
instance.setSecurityRealm(hudsonRealm)

// Reset admin credentials
hudsonRealm.createAccount("admin", "admin")

// Set authorization strategy
def strategy = new FullControlOnceLoggedInAuthorizationStrategy()
strategy.setAllowAnonymousRead(false)
instance.setAuthorizationStrategy(strategy)

// Create a pipeline job
def jobName = "ProjectPipeline"
def pipelineScript = """
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh 'docker-compose build'
                sh 'docker-compose push'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
"""

// Check if the pipeline job already exists
if (instance.getItem(jobName) == null) {
    def job = instance.createProject(org.jenkinsci.plugins.workflow.job.WorkflowJob, jobName)
    job.setDefinition(new org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition(pipelineScript, true))
    println "Pipeline job '${jobName}' created successfully."
} else {
    println "Pipeline job '${jobName}' already exists. Skipping creation."
}

instance.save()
