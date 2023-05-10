resource "aws_elastic_beanstalk_application" "elastic_beanstalk_application" {
  name        = var.name
  description = var.description
  appversion_lifecycle {
    service_role          = var.service_role
    max_count             = var.max_count
    max_age_in_days       = var.max_age_in_days
    delete_source_from_s3 = var.delete_source_from_s3
  }
  tags = var.tags
}

module "elastic_beanstalk_environment" {
  source   = "../aws_elastic_beanstalk_environment"
  for_each = { for environment in var.environments : environment.name => environment }

  name                   = each.key
  application            = each.value.application
  solution_stack_name    = each.value.solution_stack_name
  cname_prefix           = each.value.cname_prefix
  description            = each.value.description
  tier                   = each.value.tier
  setting                = each.value.setting
  template_name          = each.value.template_name
  platform_arn           = each.value.platform_arn
  wait_for_ready_timeout = each.value.wait_for_ready_timeout
  poll_interval          = each.value.poll_interval
  version_label          = each.value.version_label
  tags                   = each.value.tags
}