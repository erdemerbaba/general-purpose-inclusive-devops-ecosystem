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

resource "kubernetes_deployment" "zookeeper" {
  metadata {
    name      = "zookeeper"
    namespace = "gepide"
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
          name  = "zookeeper"
          image = "confluentinc/cp-zookeeper:latest"

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
    name = "zookeeper"
  }

  spec {
    selector = {
      app = "zookeeper"
    }

    port {
      port        = 2181
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
    name = "kafka"
  }

  spec {
    selector = {
      app = "kafka"
    }

    port {
      name        = "port-9092"
      port        = 9092
      target_port = 9092
    }

    port {
      name        = "port-9093"
      port        = 9093
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
            name = "mongo-init-config"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "mongodb" {
  metadata {
    name = "mongodb"
  }

  spec {
    selector = {
      app = "mongodb"
    }

    port {
      port        = 27017
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
    "mongo-init.js" = file("${path.module}/../mongo-init.js")
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
          image = "eureka-server:latest"

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
          image = "gateway:latest"

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
          image = "user-service:latest"

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
          image = "product-service:latest"

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
          image = "asset-service:latest"

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
          image = "management-app:latest"

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

resource "kubernetes_config_map" "sonarqube_env" {
  metadata {
    name      = "sonarqube-env"
    namespace = "gepide"
  }

  data = {
    SONAR_ES_BOOTSTRAP_CHECKS_DISABLE = "true"
    SONAR_WEB_HOST                    = "0.0.0.0"
    SONAR_WEB_PORT                    = "9000"
  }
}

resource "kubernetes_deployment" "sonarqube" {
  metadata {
    name      = "sonarqube"
    namespace = "gepide"
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
          name  = "sonarqube"
          image = "sonarqube:latest"

          port {
            container_port = 9000
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.sonarqube_env.metadata[0].name
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "sonarqube" {
  metadata {
    name      = "sonarqube"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "sonarqube"
    }

    port {
      port        = 9000
      target_port = 9000
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_job" "sonarqube_setup" {
  metadata {
    name      = "sonarqube-setup"
    namespace = "gepide"
  }

  spec {
    template {
      metadata {
        labels = {
          job = "sonarqube-setup"
        }
      }

      spec {
        restart_policy = "OnFailure"

        container {
          name  = "sonarqube-setup"
          image = "curlimages/curl:latest"

          command = ["sh", "-c"]

          args = [
            <<EOT
            until curl -s http://sonarqube:9000 | grep 'data-server-status="UP"'; do
              echo 'Waiting for SonarQube to return HTTP 200...';
              sleep 3;
            done &&
            curl -u admin:admin -X POST 'http://sonarqube:9000/api/users/change_password' \
            -H 'Content-Type: application/x-www-form-urlencoded' \
            -d 'login=admin&password=Adminadmin.1&previousPassword=admin' | grep -q 'errors' &&
            echo 'credentials changed' || true && sleep 6 &&
            curl -u admin:Adminadmin.1 -X POST "http://sonarqube:9000/api/projects/create" \
            -H "Content-Type: application/x-www-form-urlencoded" \
            -d "creationMode=manual&monorepo=false&project=user-service&name=user-service&mainBranch=main"&&
            echo 'project done' || true && sleep 6 &&
            curl -u admin:Adminadmin.1 -X POST "http://sonarqube:9000/api/projects/create" \
            -H "Content-Type: application/x-www-form-urlencoded" \
            -d "creationMode=manual&monorepo=false&project=product-service&name=product-service&mainBranch=main"&&
            echo 'project done' || true && sleep 6 &&
            curl -u admin:Adminadmin.1 -X POST "http://sonarqube:9000/api/projects/create" \
            -H "Content-Type: application/x-www-form-urlencoded" \
            -d "creationMode=manual&monorepo=false&project=asset-service&name=asset-service&mainBranch=main"
            EOT
          ]
        }
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "jenkins_pvc" {
  metadata {
    name      = "jenkins-pvc"
    namespace = "gepide"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "10Gi"
      }
    }
  }
}

resource "kubernetes_deployment" "jenkins" {
  metadata {
    name      = "jenkins"
    namespace = "gepide"
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
          name  = "jenkins"
          image = "jenkins/jenkins:lts"

          port {
            container_port = 8443
          }

          port {
            container_port = 8080
          }

          port {
            container_port = 50000
          }

          volume_mount {
            name       = "jenkins-data"
            mount_path = "/var/jenkins_home"
          }

          volume_mount {
            name       = "jenkins-init"
            mount_path = "/var/jenkins_home/init.groovy.d"
          }
        }

        volume {
          name = "jenkins-data"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.jenkins_pvc.metadata[0].name
          }
        }

        volume {
          name = "jenkins-init"

          host_path {
            path = "./jenkins/init.groovy"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "jenkins" {
  metadata {
    name      = "jenkins"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "jenkins"
    }

    port {
      port        = 8443
      target_port = 8443
    }

    port {
      port        = 8080
      target_port = 8080
    }

    port {
      port        = 50000
      target_port = 50000
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "elasticsearch" {
  metadata {
    name      = "elasticsearch"
    namespace = "gepide"
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
          name  = "elasticsearch"
          image = "docker.elastic.co/elasticsearch/elasticsearch:7.17.10"

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

resource "kubernetes_service" "elasticsearch" {
  metadata {
    name      = "elasticsearch"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "elasticsearch"
    }

    port {
      port        = 9200
      target_port = 9200
    }

    port {
      port        = 9300
      target_port = 9300
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "logstash" {
  metadata {
    name      = "logstash"
    namespace = "gepide"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "logstash"
      }
    }

    template {
      metadata {
        labels = {
          app = "logstash"
        }
      }

      spec {
        container {
          name  = "logstash"
          image = "docker.elastic.co/logstash/logstash:7.17.10"

          port {
            container_port = 5044
          }

          port {
            container_port = 9600
          }

          volume_mount {
            name       = "logstash-config"
            mount_path = "/usr/share/logstash/pipeline/logstash.conf"
            sub_path   = "logstash.conf"
          }
        }

        volume {
          name = "logstash-config"

          config_map {
            name = "logstash-config"
          }
        }
      }
    }
  }
}

resource "kubernetes_config_map" "logstash_config" {
  metadata {
    name      = "logstash-config"
    namespace = "gepide"
  }

  data = {
    "logstash.conf" = file("../logstash.conf")
  }
}

resource "kubernetes_service" "logstash" {
  metadata {
    name      = "logstash"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "logstash"
    }

    port {
      port        = 5044
      target_port = 5044
    }

    port {
      port        = 9600
      target_port = 9600
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "filebeat" {
  metadata {
    name      = "filebeat"
    namespace = "gepide"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "filebeat"
      }
    }

    template {
      metadata {
        labels = {
          app = "filebeat"
        }
      }

      spec {
        container {
          name  = "filebeat"
          image = "docker.elastic.co/beats/filebeat:7.17.10"

          security_context {
            run_as_user = 0
          }

          volume_mount {
            name       = "filebeat-config"
            mount_path = "/usr/share/filebeat/filebeat.yml"
            sub_path   = "filebeat.yml"
            read_only  = true
          }

          volume_mount {
            name       = "docker-containers"
            mount_path = "/var/lib/docker/containers"
            read_only  = true
          }

          volume_mount {
            name       = "docker-sock"
            mount_path = "/var/run/docker.sock"
            read_only  = true
          }
        }

        volume {
          name = "filebeat-config"

          config_map {
            name = "filebeat-config"
          }
        }

        volume {
          name = "docker-containers"

          host_path {
            path = "/var/lib/docker/containers"
          }
        }

        volume {
          name = "docker-sock"

          host_path {
            path = "/var/run/docker.sock"
          }
        }
      }
    }
  }
}

resource "kubernetes_config_map" "filebeat_config" {
  metadata {
    name      = "filebeat-config"
    namespace = "gepide"
  }

  data = {
    "filebeat.yml" = file("../filebeat.yml")
  }
}

resource "kubernetes_deployment" "kibana" {
  metadata {
    name      = "kibana"
    namespace = "gepide"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "kibana"
      }
    }

    template {
      metadata {
        labels = {
          app = "kibana"
        }
      }

      spec {
        container {
          name  = "kibana"
          image = "docker.elastic.co/kibana/kibana:7.17.10"

          port {
            container_port = 5601
          }

          env {
            name  = "ELASTICSEARCH_HOSTS"
            value = "http://elasticsearch:9200"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "kibana" {
  metadata {
    name      = "kibana"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "kibana"
    }

    port {
      port        = 5601
      target_port = 5601
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_job" "kibana_setup" {
  metadata {
    name      = "kibana-setup"
    namespace = "gepide"
  }

  spec {
    template {
      metadata {
        labels = {
          app = "kibana-setup"
        }
      }

      spec {
        container {
          name  = "kibana-setup"
          image = "curlimages/curl:latest"

          command = ["sh", "-c"]

          args = [
            "until curl -X POST 'http://kibana:5601/api/saved_objects/index-pattern/filebeat-*' \\",
            "-H 'Content-Type: application/json' \\",
            "-H 'kbn-xsrf: true' \\",
            "-d '{\"attributes\": {\"title\": \"filebeat-*\", \"timeFieldName\": \"@timestamp\"}}'; do ",
            "echo 'Waiting for Kibana...'; ",
            "sleep 5; ",
            "done"
          ]
        }

        restart_policy = "Never"
      }
    }
  }
}

resource "kubernetes_config_map" "prometheus_config" {
  metadata {
    name      = "prometheus-config"
    namespace = "gepide"
  }

  data = {
    "prometheus.yml" = file("../prometheus.yml")
  }
}

resource "kubernetes_deployment" "prometheus" {
  metadata {
    name      = "prometheus"
    namespace = "gepide"
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
          name  = "prometheus"
          image = "prom/prometheus:latest"

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

resource "kubernetes_service" "prometheus" {
  metadata {
    name      = "prometheus"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "prometheus"
    }

    port {
      port        = 9090
      target_port = 9090
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_config_map" "grafana_provisioning" {
  metadata {
    name      = "grafana-provisioning"
    namespace = "gepide"
  }

  data = {
    "provisioning.yaml" = file("../grafana/provisioning/dashboards.yml")
  }
}

resource "kubernetes_deployment" "grafana" {
  metadata {
    name      = "grafana"
    namespace = "gepide"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "grafana"
      }
    }

    template {
      metadata {
        labels = {
          app = "grafana"
        }
      }

      spec {
        container {
          name  = "grafana"
          image = "grafana/grafana:latest"

          port {
            container_port = 3000
          }

          env {
            name  = "GF_SECURITY_ADMIN_USER"
            value = "admin"
          }

          env {
            name  = "GF_SECURITY_ADMIN_PASSWORD"
            value = "admin"
          }

          volume_mount {
            name       = "grafana-provisioning"
            mount_path = "/etc/grafana/provisioning"
          }
        }

        volume {
          name = "grafana-provisioning"

          config_map {
            name = "grafana-provisioning"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "grafana" {
  metadata {
    name      = "grafana"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "grafana"
    }

    port {
      port        = 3000
      target_port = 3000
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_persistent_volume_claim" "postgre_pvc" {
  metadata {
    name      = "postgre-pvc"
    namespace = "gepide"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "10Gi"
      }
    }
  }
}

resource "kubernetes_deployment" "postgre" {
  metadata {
    name      = "postgre"
    namespace = "gepide"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "postgre"
      }
    }

    template {
      metadata {
        labels = {
          app = "postgre"
        }
      }

      spec {
        container {
          name  = "postgre"
          image = "postgres:13"

          port {
            container_port = 5432
          }

          env {
            name  = "POSTGRES_USER"
            value = "jirauser"
          }

          env {
            name  = "POSTGRES_PASSWORD"
            value = "jirapassword"
          }

          env {
            name  = "POSTGRES_DB"
            value = "jiradb"
          }

          volume_mount {
            name       = "postgre-data"
            mount_path = "/var/lib/postgresql/data"
          }
        }

        volume {
          name = "postgre-data"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.postgre_pvc.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "postgre" {
  metadata {
    name      = "postgre"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "postgre"
    }

    port {
      port        = 5432
      target_port = 5432
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_persistent_volume_claim" "jira_pvc" {
  metadata {
    name      = "jira-pvc"
    namespace = "gepide"
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "10Gi"
      }
    }
  }
}

resource "kubernetes_deployment" "jira" {
  metadata {
    name      = "jira"
    namespace = "gepide"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "jira"
      }
    }

    template {
      metadata {
        labels = {
          app = "jira"
        }
      }

      spec {
        container {
          name  = "jira"
          image = "atlassian/jira-software:latest"

          port {
            container_port = 8080
          }

          env {
            name  = "ATL_JDBC_URL"
            value = "jdbc:postgresql://postgre:5432/jiradb"
          }

          env {
            name  = "ATL_JDBC_USER"
            value = "jirauser"
          }

          env {
            name  = "ATL_JDBC_PASSWORD"
            value = "jirapassword"
          }

          volume_mount {
            name       = "jira-data"
            mount_path = "/var/atlassian/application-data/jira"
          }
        }

        volume {
          name = "jira-data"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.jira_pvc.metadata[0].name
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "jira" {
  metadata {
    name      = "jira"
    namespace = "gepide"
  }

  spec {
    selector = {
      app = "jira"
    }

    port {
      port        = 8080
      target_port = 8080
    }

    type = "ClusterIP"
  }
}

resource "helm_release" "keda" {
  name       = "keda"
  namespace  = "keda"
  chart      = "keda"
  repository = "https://kedacore.github.io/charts"
  version    = "2.10.2"

  set = [
    {
      name  = "watchNamespace"
      value = "gepide"
    },
    {
      name  = "replicaCount"
      value = "2"
    }
  ]
}

resource "helm_release" "flagger" {
  name       = "flagger"
  namespace  = "flagger"
  chart      = "flagger"
  repository = "https://flagger.app"
  version    = "1.25.0"

  set = [
    {
      name  = "meshProvider"
      value = "istio"
    },
    {
      name  = "metricsServer"
      value = "enabled"
    }
  ]
}

resource "helm_release" "rancher" {
  name       = "rancher"
  namespace  = "cattle-system"
  chart      = "rancher"
  repository = "https://releases.rancher.com/server-charts/latest"
  version    = "2.7.0"

  set = [
    {
      name  = "hostname"
      value = "rancher.local"
    },
    {
      name  = "replicaCount"
      value = "1"
    }
  ]
}

resource "helm_release" "istio" {
  name       = "istio-base"
  namespace  = "istio-system"
  chart      = "base"
  repository = "https://istio-release.storage.googleapis.com/charts"
  version    = "1.18.0"
}

resource "helm_release" "istio_discovery" {
  name       = "istiod"
  namespace  = "istio-system"
  chart      = "istiod"
  repository = "https://istio-release.storage.googleapis.com/charts"
  version    = "1.18.0"

  depends_on = [helm_release.istio]
}

resource "helm_release" "istio_ingress" {
  name       = "istio-ingress"
  namespace  = "istio-system"
  chart      = "gateway"
  repository = "https://istio-release.storage.googleapis.com/charts"
  version    = "1.18.0"

  depends_on = [helm_release.istio]
}

resource "helm_release" "trivy" {
  name       = "trivy"
  namespace  = "trivy-system"
  chart      = "trivy-operator"
  repository = "https://aquasecurity.github.io/helm-charts"
  version    = "0.13.0"

  set = [
    {
      name  = "trivyOperator"
      value = "enabled"
    }
  ]
}

