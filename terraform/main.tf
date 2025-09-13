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
  host = "unix:///Users/erdemerbaba/.docker/run/docker.sock"
}

provider "kubernetes" {
  config_path = "~/.kube/config"
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
          name  = "zookeeper"
          image = "confluentinc/cp-zookeeper:latest"

          port {
            container_port = 2181
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