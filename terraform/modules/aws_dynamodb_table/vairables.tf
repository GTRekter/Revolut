variable "table_name" {
  type = string
  validation {
    condition     = can(regex("^[a-zA-Z0-9_.-]+$", var.table_name))
    error_message = "table_name must be alphanumeric, dashes, underscores, or periods"
  }
}

variable "hash_key" {
  type = string
  validation {
    condition     = can(regex("^[a-zA-Z0-9_.-]+$", var.hash_key))
    error_message = "hash_key must be alphanumeric, dashes, underscores, or periods"
  }
}

variable "range_key" {
  type = string
  default = null
}

variable "billing_mode" {
  type = string
  validation {
    condition     = can(regex("PROVISIONED|PAY_PER_REQUEST", var.billing_mode))
    error_message = "billing_mode must be either PROVISIONED or PAY_PER_REQUEST"
  }
}

variable "read_capacity" {
  type = number
  validation {
    condition     = var.read_capacity >= 1
    error_message = "read_capacity must be greater than or equal to 1"
  }
}

variable "write_capacity" {
  type = number
  validation {
    condition     = var.write_capacity >= 1
    error_message = "write_capacity must be greater than or equal to 1"
  }
}

variable "stream_enabled" {
  type    = bool
  default = false
}

variable "stream_view_type" {
  type    = string
  default = null
}

variable "point_in_time_recovery" {
  type   = bool
  default = false
}

variable "server_side_encryption" {
  type = object({
    enabled       = bool
    kms_key_arn   = string
  })
  default = null
}

variable "global_secondary_index" {
  type = object({
    name               = string
    hash_key           = string
    range_key          = optional(string)
    projection_type    = string
    write_capacity     = number
    read_capacity      = number
    non_key_attributes = optional(list(string))
  })
  default = null
}

variable "local_secondary_index" {
  type = object({
    name               = string
    range_key          = string
    projection_type    = string
    non_key_attributes = optional(list(string))
  })
  default = null
}

variable "attribute" {
  type = list(object({
    name = string
    type = string
  }))
  default = []
}

variable "ttl" {
  type = object({
    attribute_name = string
    enabled        = bool
  })
  default = null
}

variable "replica" {
  type = list(object({
    region_name = string
  }))
  default = []
}

variable "tags" {
  type = map(string)
}
