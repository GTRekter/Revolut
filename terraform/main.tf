provider "aws" {
    region = var.config.region
}

module "dynamodb" {
  source   = "./modules/aws_dynamodb_table"
  for_each = { for dynamodb_table in var.dynamodb_tables : dynamodb_table.table_name => dynamodb_table }
  
  table_name             = each.key
  billing_mode           = each.value.billing_mode
  hash_key               = each.value.hash_key
  range_key              = try(each.value.range_key, null)
  read_capacity          = each.value.read_capacity
  write_capacity         = each.value.write_capacity
  stream_enabled         = try(each.value.stream_enabled, null)
  stream_view_type       = try(each.value.stream_view_type, null)
  point_in_time_recovery = try(each.value.point_in_time_recovery, null)
  server_side_encryption = try(each.value.server_side_encryption, null)
  global_secondary_index = try(each.value.global_secondary_index, null)
  local_secondary_index  = try(each.value.local_secondary_index, null)
  attribute              = try(each.value.attribute, []) 
  ttl                    = try(each.value.ttl, null)
  replica                = try(each.value.replica, [])
  tags                   = local.tags
}

module "elastic_beanstalk_application" {
  source   = "./modules/aws_elastic_beanstalk_application"
  for_each = { for elastic_beanstalk_application in var.elastic_beanstalk_applications : elastic_beanstalk_application.name => elastic_beanstalk_application }

  name                  = each.key
  description           = try(each.value.description, null)
  service_role          = each.value.service_role
  max_count             = try(each.value.max_count, null)
  max_age_in_days       = try(each.value.max_age_in_days, null)
  delete_source_from_s3 = try(each.value.delete_source_from_s3, null)
  environments          = try(each.value.environments, null)
  tags                  = local.tags
}