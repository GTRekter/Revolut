variable "name" {
  type        = string
  description = "A unique name for this Environment. This name is used in the application URL"
  validation {
    condition     = length(var.name) <= 23
    error_message = "The name must be between 4 and 23 characters in length"
  }
}
variable "application" {
  type        = string
  description = "Name of the application that contains the version to be deployed"
}
variable "solution_stack_name" {
  type        = string
  description = "A solution stack to base your environment off of. Example stacks can be found in the Amazon API documentation"
}
variable "cname_prefix" {
  type        = string
  description = "If specified, the environment attempts to use this value as the prefix for the CNAME. If not specified, the CNAME is generated automatically by appending a random alphanumeric string to the environment name"
  default     = null
}
variable "description" {
  type        = string
  description = "Short description of the Environment"
  default     = null
}
variable "tier" {
  type        = string
  description = "A map of custom environment tier settings"
}
variable "setting" {
  type        = map(string)
  description = "A map of custom configuration settings for the environment"
  default     = null
}
variable "template_name" {
  type        = string
  description = "The name of the Elastic Beanstalk configuration template to use in deployment"
  default     = null
}
variable "platform_arn" {
  type        = string
  description = "The ARN of the platform version"
  default     = null
}
variable "wait_for_ready_timeout" {
  type        = string
  description = "The maximum duration that Terraform should wait for an Elastic Beanstalk Environment to be in a ready state before timing out"
  default     = null
}
variable "poll_interval" {
  type        = string
  description = "The time between polling the service to check if changes have been applied. Use this to adjust the rate of API calls for any throttling issues"
  default     = null
}
variable "version_label" {
  type        = string
  description = "A label identifying this version"
  default     = null
}
variable "tags" {
  type        = map(string)
  description = "A mapping of tags to assign to the resource"
  default     = null
}
