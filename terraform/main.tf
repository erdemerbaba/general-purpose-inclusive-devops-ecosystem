provider "docker" {}

resource "docker_network" "app_network" {
  name = "app_network"
}

resource "docker_container" "zookeeper" {
  image = "bitnami/zookeeper:latest"
  name  = "zookeeper"
  ports {
    internal = 2181
    external = 2181
  }
}

resource "docker_container" "kafka" {
  image = "bitnami/kafka:latest"
  name  = "kafka"
  ports {
    internal = 9092
    external = 9092
  }
  depends_on = [docker_container.zookeeper]
}

resource "docker_container" "mongodb" {
  image = "mongo:latest"
  name  = "mongodb"
  ports {
    internal = 27017
    external = 27017
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
}

resource "docker_container" "redis" {
  image = "redis:latest"
  name  = "redis"
  ports {
    internal = 6379
    external = 6379
  }
}

resource "docker_container" "eureka_server" {
  image = "eureka-server:latest"
  name  = "eureka-server"
  ports {
    internal = 8761
    external = 8761
  }
}

resource "docker_container" "gateway" {
  image = "gateway:latest"
  name  = "gateway"
  ports {
    internal = 8080
    external = 8080
  }
}

resource "docker_container" "user_service" {
  image = "user-service:latest"
  name  = "user-service"
  ports {
    internal = 8081
    external = 8081
  }
  networks_advanced {
    name = docker_network.app_network.name
  }
}

resource "docker_container" "product_service" {
  image = "product-service:latest"
  name  = "product-service"
  ports {
    internal = 8082
    external = 8082
  }
}

resource "docker_container" "asset_service" {
  image = "asset-service:latest"
  name  = "asset-service"
  ports {
    internal = 8083
    external = 8083
  }
}

resource "docker_container" "management_app" {
  image = "management-app:latest"
  name  = "management-app"
  ports {
    internal = 80
    external = 3000
  }
}

resource "docker_container" "swagger_ui" {
  image = "swaggerapi/swagger-ui"
  name  = "swagger-ui"
  ports {
    internal = 8080
    external = 8090
  }
}

resource "docker_container" "sonarqube" {
  image = "sonarqube:latest"
  name  = "sonarqube"
  ports {
    internal = 9000
    external = 9000
  }
}

resource "docker_container" "jenkins" {
  image = "jenkins/jenkins:lts"
  name  = "jenkins"
  ports {
    internal = 8080
    external = 8443
  }
  ports {
    internal = 50000
    external = 50000
  }
}

resource "docker_container" "elasticsearch" {
  image = "docker.elastic.co/elasticsearch/elasticsearch:7.17.10"
  name  = "elasticsearch"
  ports {
    internal = 9200
    external = 9200
  }
  ports {
    internal = 9300
    external = 9300
  }
  env = {
    discovery.type = "single-node"
  }
}

resource "docker_container" "prometheus" {
  image = "prom/prometheus:latest"
  name  = "prometheus"
  ports {
    internal = 9090
    external = 9090
  }
  volumes {
    host_path      = "./prometheus.yml"
    container_path = "/etc/prometheus/prometheus.yml"
  }
}

resource "kubernetes_deployment" "zookeeper" {
  metadata {
    name      = "zookeeper"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "zookeeper"
      }
    }
    template {
      metadata {
        labels = {
          app = "zookeeper"
        }
      }
      spec {
        container {
          image = "bitnami/zookeeper:latest"
          name  = "zookeeper"
          port {
            container_port = 2181
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "kafka" {
  metadata {
    name      = "kafka"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "kafka"
      }
    }
    template {
      metadata {
        labels = {
          app = "kafka"
        }
      }
      spec {
        container {
          image = "bitnami/kafka:latest"
          name  = "kafka"
          port {
            container_port = 9092
          }
          env {
            name  = "KAFKA_BROKER_ID"
            value = "1"
          }
          env {
            name  = "KAFKA_ZOOKEEPER_CONNECT"
            value = "zookeeper:2181"
          }
          env {
            name  = "KAFKA_ADVERTISED_LISTENERS"
            value = "PLAINTEXT://localhost:9092"
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "mongodb" {
  metadata {
    name      = "mongodb"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "mongodb"
      }
    }
    template {
      metadata {
        labels = {
          app = "mongodb"
        }
      }
      spec {
        container {
          image = "mongo:latest"
          name  = "mongodb"
          port {
            container_port = 27017
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "redis" {
  metadata {
    name      = "redis"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "redis"
      }
    }
    template {
      metadata {
        labels = {
          app = "redis"
        }
      }
      spec {
        container {
          image = "redis:latest"
          name  = "redis"
          port {
            container_port = 6379
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "eureka_server" {
  metadata {
    name      = "eureka-server"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "eureka-server"
      }
    }
    template {
      metadata {
        labels = {
          app = "eureka-server"
        }
      }
      spec {
        container {
          image = "eureka-server:latest"
          name  = "eureka-server"
          port {
            container_port = 8761
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "gateway" {
  metadata {
    name      = "gateway"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "gateway"
      }
    }
    template {
      metadata {
        labels = {
          app = "gateway"
        }
      }
      spec {
        container {
          image = "gateway:latest"
          name  = "gateway"
          port {
            container_port = 8080
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "management_app" {
  metadata {
    name      = "management-app"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "management-app"
      }
    }
    template {
      metadata {
        labels = {
          app = "management-app"
        }
      }
      spec {
        container {
          image = "management-app:latest"
          name  = "management-app"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "swagger_ui" {
  metadata {
    name      = "swagger-ui"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "swagger-ui"
      }
    }
    template {
      metadata {
        labels = {
          app = "swagger-ui"
        }
      }
      spec {
        container {
          image = "swaggerapi/swagger-ui"
          name  = "swagger-ui"
          port {
            container_port = 8080
          }
          env {
            name  = "SWAGGER_JSON"
            value = "/app/swagger.json"
          }
          volume_mount {
            name       = "swagger-volume"
            mount_path = "/app"
          }
        }
        volume {
          name = "swagger-volume"
          host_path {
            path = "./swagger"
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "sonarqube" {
  metadata {
    name      = "sonarqube"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "sonarqube"
      }
    }
    template {
      metadata {
        labels = {
          app = "sonarqube"
        }
      }
      spec {
        container {
          image = "sonarqube:latest"
          name  = "sonarqube"
          port {
            container_port = 9000
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "user_service" {
  metadata {
    name      = "user-service"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "user-service"
      }
    }
    template {
      metadata {
        labels = {
          app = "user-service"
        }
      }
      spec {
        container {
          image = "user-service:latest"
          name  = "user-service"
          port {
            container_port = 8081
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "product_service" {
  metadata {
    name      = "product-service"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "product-service"
      }
    }
    template {
      metadata {
        labels = {
          app = "product-service"
        }
      }
      spec {
        container {
          image = "product-service:latest"
          name  = "product-service"
          port {
            container_port = 8082
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "asset_service" {
  metadata {
    name      = "asset-service"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "asset-service"
      }
    }
    template {
      metadata {
        labels = {
          app = "asset-service"
        }
      }
      spec {
        container {
          image = "asset-service:latest"
          name  = "asset-service"
          port {
            container_port = 8083
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "jenkins" {
  metadata {
    name      = "jenkins"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "jenkins"
      }
    }
    template {
      metadata {
        labels = {
          app = "jenkins"
        }
      }
      spec {
        container {
          image = "jenkins/jenkins:lts"
          name  = "jenkins"
          port {
            container_port = 8443
          }
          port {
            container_port = 50000
          }
          volume_mount {
            name       = "jenkins-home"
            mount_path = "/var/jenkins_home"
          }
        }
        volume {
          name = "jenkins-home"
          host_path {
            path = "/var/jenkins_home"
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "elasticsearch" {
  metadata {
    name      = "elasticsearch"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "elasticsearch"
      }
    }
    template {
      metadata {
        labels = {
          app = "elasticsearch"
        }
      }
      spec {
        container {
          image = "docker.elastic.co/elasticsearch/elasticsearch:7.17.10"
          name  = "elasticsearch"
          port {
            container_port = 9200
          }
          port {
            container_port = 9300
          }
          env {
            name  = "discovery.type"
            value = "single-node"
          }
        }
      }
    }
  }
}

resource "kubernetes_deployment" "prometheus" {
  metadata {
    name      = "prometheus"
    namespace = "default"
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "prometheus"
      }
    }
    template {
      metadata {
        labels = {
          app = "prometheus"
        }
      }
      spec {
        container {
          image = "prom/prometheus:latest"
          name  = "prometheus"
          port {
            container_port = 9090
          }
          volume_mount {
            name       = "prometheus-config"
            mount_path = "/etc/prometheus/prometheus.yml"
            sub_path   = "prometheus.yml"
          }
        }
        volume {
          name = "prometheus-config"
          config_map {
            name = "prometheus-config"
          }
        }
      }
    }
  }
}
