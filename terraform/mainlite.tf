terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "docker" {
  # The Docker host will be determined by the DOCKER_HOST environment variable, or defaults to unix:///var/run/docker.sock
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

provider "helm" {
  kubernetes = {
    config_path = "~/.kube/config"
  }
}

resource "kubernetes_namespace" "gepide" {
  metadata {
    name = "gepide"
  }
}

resource "kubernetes_namespace" "keda" {
  metadata {
    name = "keda"
  }
}

resource "kubernetes_namespace" "flagger" {
  metadata {
    name = "flagger"
  }
}

resource "kubernetes_namespace" "istio_system" {
  metadata {
    name = "istio-system"
  }
}

resource "kubernetes_deployment" "zookeeper" {
  metadata {
    name      = "zookeeper"
    namespace = "gepide"
  }

  depends_on = [kubernetes_namespace.gepide]

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
          name  = "zookeeper"
          image = "confluentinc/cp-zookeeper:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 2181
          }

          env {
            name  = "ZOOKEEPER_CLIENT_PORT"
            value = "2181"
          }

          env {
            name  = "ZOOKEEPER_TICK_TIME"
            value = "2000"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "zookeeper" {
  metadata {
    name      = "zookeeper"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "zookeeper"
    }

    port {
      name       = "client"
      protocol   = "TCP"
      port       = 2181
      target_port = 2181
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "kafka" {
  metadata {
    name      = "kafka"
    namespace = "gepide"
  }

  depends_on = [kubernetes_namespace.gepide] 

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
          name  = "kafka"
          image = "confluentinc/cp-kafka:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 9092
          }

          port {
            container_port = 9093
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
            name  = "KAFKA_CONTROLLER_LISTENER_NAMES"
            value = "CONTROLLER"
          }

          env {
            name  = "KAFKA_ADVERTISED_LISTENERS"
            value = "PLAINTEXT://kafka:9092,CONTROLLER://kafka:9093"
          }

          env {
            name  = "KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR"
            value = "1"
          }

          env {
            name  = "KAFKA_PROCESS_ROLES"
            value = "broker,controller"
          }

          env {
            name  = "KAFKA_CONTROLLER_QUORUM_VOTERS"
            value = "1@kafka:9093"
          }

          env {
            name  = "CLUSTER_ID"
            value = "cluster-gepide"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "kafka" {
  metadata {
    name      = "kafka"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "kafka"
    }

    port {
      name       = "kafka-port-9092"
      protocol   = "TCP"
      port       = 9092
      target_port = 9092
    }

    port {
      name       = "kafka-port-9093"
      protocol   = "TCP"
      port       = 9093
      target_port = 9093
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "kafdrop" {
  metadata {
    name      = "kafdrop"
    namespace = "gepide"
  }

  depends_on = [kubernetes_namespace.gepide]

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "kafdrop"
      }
    }

    template {
      metadata {
        labels = {
          app = "kafdrop"
        }
      }

      spec {
        container {
          name  = "kafdrop"
          image = "obsidiandynamics/kafdrop:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 9000
          }

          env {
            name  = "KAFKA_BROKERCONNECT"
            value = "kafka:9092"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "kafdrop" {
  metadata {
    name = "kafdrop"
  }

  spec {
    selector = {
      app = "kafdrop"
    }

    port {
      port        = 9000
      target_port = 9000
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "mongodb" {
  metadata {
    name      = "mongodb"
    namespace = "gepide"
  }

  depends_on = [kubernetes_namespace.gepide] 

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
          name  = "mongodb"
          image = "mongo:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 27017
          }

          env {
            name  = "MONGO_INITDB_DATABASE"
            value = "userdb"
          }

          volume_mount {
            name       = "mongo-init-volume"
            mount_path = "/docker-entrypoint-initdb.d/mongo-init.js"
            sub_path   = "mongo-init.js"
          }
        }

        volume {
          name = "mongo-init-volume"

          config_map {
            name = kubernetes_config_map.mongo_init_config.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "mongodb" {
  metadata {
    name      = "mongodb"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "mongodb"
    }

    port {
      protocol   = "TCP"
      port       = 27017
      target_port = 27017
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_config_map" "mongo_init_config" {
  metadata {
    name      = "mongo-init-config"
    namespace = "gepide"
  }

  data = {
    "mongo-init.js" = file("../mongo-init.js")
  }
}

resource "kubernetes_deployment" "redis" {
  metadata {
    name      = "redis"
    namespace = "gepide"
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
          name  = "redis"
          image = "redis:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 6379
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "redis" {
  metadata {
    name = "redis"
  }

  spec {
    selector = {
      app = "redis"
    }

    port {
      port        = 6379
      target_port = 6379
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_config_map" "eureka_server_env" {
  metadata {
    name      = "eureka-server-env"
    namespace = "gepide"
  }

  data = {
    SPRING_SECURITY_USER_NAME     = "admin"
    SPRING_SECURITY_USER_PASSWORD = "admin"
  }
}

resource "kubernetes_deployment" "eureka_server" {
  metadata {
    name      = "eureka-server"
    namespace = "gepide"
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
          name  = "eureka-server"
          image = "gepide-eureka-server:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 8761
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.eureka_server_env.metadata[0].name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "eureka_server" {
  metadata {
    name      = "eureka-server"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "eureka-server"
    }

    port {
      port        = 8761
      target_port = 8761
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_config_map" "gateway_env" {
  metadata {
    name      = "gateway-env"
    namespace = "gepide"
  }

  data = {
    SPRING_SECURITY_USER_NAME     = "admin"
    SPRING_SECURITY_USER_PASSWORD = "admin"
  }
}

resource "kubernetes_deployment" "gateway" {
  metadata {
    name      = "gateway"
    namespace = "gepide"
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
          name  = "gateway"
          image = "gepide-gateway:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 8080
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.gateway_env.metadata[0].name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "gateway" {
  metadata {
    name      = "gateway"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "gateway"
    }

    port {
      port        = 8080
      target_port = 8080
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_config_map" "user_service_env" {
  metadata {
    name      = "user-service-env"
    namespace = "gepide"
  }

  data = {
    SPRING_SECURITY_USER_NAME       = "admin"
    SPRING_SECURITY_USER_PASSWORD   = "admin"
    SPRING_REDIS_HOST               = "redis"
    SPRING_REDIS_PORT               = "6379"
    SPRING_KAFKA_BOOTSTRAP_SERVERS  = "kafka:9092"
  }
}

resource "kubernetes_deployment" "user_service" {
  metadata {
    name      = "user-service"
    namespace = "gepide"
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
          name  = "user-service"
          image = "gepide-user-service:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 8081
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.user_service_env.metadata[0].name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "user_service" {
  metadata {
    name      = "user-service"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "user-service"
    }

    port {
      port        = 8081
      target_port = 8081
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_config_map" "product_service_env" {
  metadata {
    name      = "product-service-env"
    namespace = "gepide"
  }

  data = {
    SPRING_SECURITY_USER_NAME       = "admin"
    SPRING_SECURITY_USER_PASSWORD   = "admin"
    SPRING_REDIS_HOST               = "redis"
    SPRING_REDIS_PORT               = "6379"
    SPRING_KAFKA_BOOTSTRAP_SERVERS  = "kafka:9092"
  }
}

resource "kubernetes_deployment" "product_service" {
  metadata {
    name      = "product-service"
    namespace = "gepide"
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
          name  = "product-service"
          image = "gepide-product-service:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 8082
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.product_service_env.metadata[0].name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "product_service" {
  metadata {
    name      = "product-service"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "product-service"
    }

    port {
      port        = 8082
      target_port = 8082
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_config_map" "asset_service_env" {
  metadata {
    name      = "asset-service-env"
    namespace = "gepide"
  }

  data = {
    SPRING_SECURITY_USER_NAME       = "admin"
    SPRING_SECURITY_USER_PASSWORD   = "admin"
    SPRING_REDIS_HOST               = "redis"
    SPRING_REDIS_PORT               = "6379"
    SPRING_KAFKA_BOOTSTRAP_SERVERS  = "kafka:9092"
  }
}

resource "kubernetes_deployment" "asset_service" {
  metadata {
    name      = "asset-service"
    namespace = "gepide"
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
          name  = "asset-service"
          image = "gepide-asset-service:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 8083
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.asset_service_env.metadata[0].name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "asset_service" {
  metadata {
    name      = "asset-service"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "asset-service"
    }

    port {
      port        = 8083
      target_port = 8083
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "management_app" {
  metadata {
    name      = "management-app"
    namespace = "gepide"
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
          name  = "management-app"
          image = "gepide-management-app:latest"
          image_pull_policy = "IfNotPresent"

          port {
            container_port = 80
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "management_app" {
  metadata {
    name      = "management-app"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "management-app"
    }

    port {
      port        = 3000
      target_port = 80
    }

    type = "ClusterIP"
  }
}