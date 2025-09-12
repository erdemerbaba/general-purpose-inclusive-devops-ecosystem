terraform {
  required_providers {
 docker = {
   source  = "kreuzwerker/docker"
   version = "~> 2.0"
 }
  }
}

provider "docker" {
  host = "unix:///Users/erdemerbaba/.docker/run/docker.sock"
}

resource "docker_image" "nginx_image" {
  name = "nginx:latest"
}

resource "docker_container" "nginx_container" {
  image = docker_image.nginx_image.name
  name  = "nginx-web-server"
  ports {
 internal = 80
 external = 8080
  }
}