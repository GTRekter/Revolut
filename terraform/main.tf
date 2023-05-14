terraform {
  backend "gcs" {
    credentials = var.credentials_file_path
    bucket      = "devopscube-states"
    prefix      = "demo"
  }
}

provider "google" {
  credentials = "${file(var.credentials_file_path)}"
  project     = var.config.project
  region      = var.config.region
  zone        = var.config.zone
}

module "app_engine_applications" {
  source   = "./modules/google_app_engine_application"
  for_each = { for app_engine_application in var.app_engine_applications : app_engine_application.name => app_engine_application }

  project       = var.config.project
  location_id   = each.value.location_id
  database_type = each.value.database_type
}