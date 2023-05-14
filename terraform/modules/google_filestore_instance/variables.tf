variable "name" {
  description = "The name of the Filestore instance"
  type        = string
}

variable "location" {
  description = "The location of the Filestore instance"
  type        = string
}

variable "tier" {
  description = "The tier of the Filestore instance"
  type        = string
}

variable "file_shares" {
  description = "The file shares configuration"
  type        = object({
    name        = string
    capacity_gb = number
  })
}

variable "networks" {
  description = "The network configuration"
  type        = object({
    name  = string
    modes = list(string)
  })
}
