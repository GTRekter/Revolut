variable "name" {
  type        = string
  description = "The name of the application, must be unique within your account."
  validation {
    condition     = length(var.name) <= 100
    error_message = "The name of the application must be less than or equal to 100 characters in length."
  }
}

variable "description" {
  type        = string
  description = "Short description of the application"
  default     = null
}

variable "service_role" {
  type        = string
  description = "The ARN of an IAM service role under which the application version is deleted. Elastic Beanstalk must have permission to assume this role."
}

variable "max_count" {
  type        = number
  description = "The maximum number of application versions to retain (not delete)."
  default     = null
}

variable "max_age_in_days" {
  type        = number
  description = "The number of days to retain an application version."
  default     = null
}

variable "delete_source_from_s3" {
  type        = bool
  description = "Set to true to delete a version's source bundle from S3 when the application version is deleted."
  default     = null
}

variable "tags" {
  type        = map(string)
  description = "A mapping of tags to assign to the resource."
}

variable "environments" {
  type = list(object({
    name                = string
    application         = string
    solution_stack_name = optional(string)
    cname_prefix        = optional(string)
    description         = optional(string)
    tier                = optional(string)
    setting             = optional(string)
    template_name       = optional(string)
    plantform_arn       = optional(string)
    wait_for_ready_timeout = optional(string)
    pool_interval          = optional(string)
    version_label          = optional(string)
    tags                   = map(string)
  }))
}