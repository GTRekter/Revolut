variable "project" {
  description = "The ID of the Google Cloud project"
  type        = string
}

variable "location_id" {
  description = "The location ID for the App Engine application"
  type        = string
}

variable "database_type" {
  description = "The type of database for the App Engine application"
  type        = string
}