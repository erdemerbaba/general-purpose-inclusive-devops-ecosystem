resource "kubernetes_manifest" "flagger_user_service" {
  manifest = {
    "apiVersion" = "flagger.app/v1beta1"
    "kind" = "Canary"
    "metadata" = {
      "name" = "user-service"
      "namespace" = "default"
    }
    "spec" = {
      "targetRef" = {
        "apiVersion" = "apps/v1"
        "kind" = "Deployment"
        "name" = "user-service"
      }
      "service" = {
        "port" = 8081
      }
      "analysis" = {
        "interval" = "1m"
        "threshold" = 5
        "maxWeight" = 50
        "stepWeight" = 10
        "metrics" = [
          {
            "name" = "request-success-rate"
            "threshold" = 99
          },
          {
            "name" = "request-duration"
            "threshold" = 500
          }
        ]
      }
    }
  }
}

resource "kubernetes_manifest" "flagger_product_service" {
  manifest = {
    "apiVersion" = "flagger.app/v1beta1"
    "kind" = "Canary"
    "metadata" = {
      "name" = "product-service"
      "namespace" = "default"
    }
    "spec" = {
      "targetRef" = {
        "apiVersion" = "apps/v1"
        "kind" = "Deployment"
        "name" = "product-service"
      }
      "service" = {
        "port" = 8082
      }
      "analysis" = {
        "interval" = "1m"
        "threshold" = 5
        "maxWeight" = 50
        "stepWeight" = 10
        "metrics" = [
          {
            "name" = "request-success-rate"
            "threshold" = 99
          },
          {
            "name" = "request-duration"
            "threshold" = 500
          }
        ]
      }
    }
  }
}

resource "kubernetes_manifest" "flagger_asset_service" {
  manifest = {
    "apiVersion" = "flagger.app/v1beta1"
    "kind" = "Canary"
    "metadata" = {
      "name" = "asset-service"
      "namespace" = "default"
    }
    "spec" = {
      "targetRef" = {
        "apiVersion" = "apps/v1"
        "kind" = "Deployment"
        "name" = "asset-service"
      }
      "service" = {
        "port" = 8083
      }
      "analysis" = {
        "interval" = "1m"
        "threshold" = 5
        "maxWeight" = 50
        "stepWeight" = 10
        "metrics" = [
          {
            "name" = "request-success-rate"
            "threshold" = 99
          },
          {
            "name" = "request-duration"
            "threshold" = 500
          }
        ]
      }
    }
  }
}

resource "kubernetes_manifest" "flagger_management_app" {
  manifest = {
    "apiVersion" = "flagger.app/v1beta1"
    "kind" = "Canary"
    "metadata" = {
      "name" = "management-app"
      "namespace" = "default"
    }
    "spec" = {
      "targetRef" = {
        "apiVersion" = "apps/v1"
        "kind" = "Deployment"
        "name" = "management-app"
      }
      "service" = {
        "port" = 3000
      }
      "analysis" = {
        "interval" = "1m"
        "threshold" = 5
        "maxWeight" = 50
        "stepWeight" = 10
        "metrics" = [
          {
            "name" = "request-success-rate"
            "threshold" = 99
          },
          {
            "name" = "request-duration"
            "threshold" = 500
          }
        ]
      }
    }
  }
}
