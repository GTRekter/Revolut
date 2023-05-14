resource "google_filestore_instance" "filestore_instance" {
  name     = var.name
  location = var.location
  tier     = var.tier
  file_shares {
    name        = var.file_shares.name
    capacity_gb = var.file_shares.capacity_gb

  }
  networks {
    network = var.networks.name
    modes   = var.networks.modes
  }
}