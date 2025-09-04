resource "kubernetes_manifest" "keda_user_service" {
  manifest = {
    "apiVersion" = "keda.sh/v1alpha1"
    "kind" = "ScaledObject"
    "metadata" = {
      "name" = "user-service-scaledobject"
      "namespace" = "default"
    }
    "spec" = {
      "scaleTargetRef" = {
        "name" = "user-service"
      }
      "triggers" = [
        {
          "type" = "kafka"
          "metadata" = {
            "bootstrapServers" = "kafka:9092"
            "topic" = "user-events"
            "consumerGroup" = "user-service-group"
            "lagThreshold" = "10"
          }
        }
      ]
    }
  }
}

resource "kubernetes_manifest" "keda_product_service" {
  manifest = {
    "apiVersion" = "keda.sh/v1alpha1"
    "kind" = "ScaledObject"
    "metadata" = {
      "name" = "product-service-scaledobject"
      "namespace" = "default"
    }
    "spec" = {
      "scaleTargetRef" = {
        "name" = "product-service"
      }
      "triggers" = [
        {
          "type" = "kafka"
          "metadata" = {
            "bootstrapServers" = "kafka:9092"
            "topic" = "product-events"
            "consumerGroup" = "product-service-group"
            "lagThreshold" = "10"
          }
        }
      ]
    }
  }
}

resource "kubernetes_manifest" "keda_asset_service" {
  manifest = {
    "apiVersion" = "keda.sh/v1alpha1"
    "kind" = "ScaledObject"
    "metadata" = {
      "name" = "asset-service-scaledobject"
      "namespace" = "default"
    }
    "spec" = {
      "scaleTargetRef" = {
        "name" = "asset-service"
      }
      "triggers" = [
        {
          "type" = "kafka"
          "metadata" = {
            "bootstrapServers" = "kafka:9092"
            "topic" = "asset-events"
            "consumerGroup" = "asset-service-group"
            "lagThreshold" = "10"
          }
        }
      ]
    }
  }
}

resource "kubernetes_manifest" "keda_management_app" {
  manifest = {
    "apiVersion" = "keda.sh/v1alpha1"
    "kind" = "ScaledObject"
    "metadata" = {
      "name" = "management-app-scaledobject"
      "namespace" = "default"
    }
    "spec" = {
      "scaleTargetRef" = {
        "name" = "management-app"
      }
      "triggers" = [
        {
          "type" = "cpu"
          "metadata" = {
            "type" = "Utilization"
            "value" = "50"
          }
        }
      ]
    }
  }
}
