resource "google_app_engine_application" "app_engine_application" {
  project       = var.project
  location_id   = var.location_id
  database_type = var.database_type
}