variable "config" {
  type = object({
    region = string
  })
}
variable "dynamodb_tables" {
  description = "A map of DynamoDB tables to create"
  default = {}
}
variable "elastic_beanstalk_applications" {
  description = "A map of Beanstalk applications to create"
  default = {}
}