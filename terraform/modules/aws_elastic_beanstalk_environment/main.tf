resource "aws_elastic_beanstalk_environment" "elastic_beanstalk_environment" {
  name                = var.name
  application         = var.application
  solution_stack_name = var.solution_stack_name
  cname_prefix        = var.cname_prefix
  description         = var.description
  tier                = var.tier
  template_name       = var.template_name
  platform_arn        = var.platform_arn
  wait_for_ready_timeout = var.wait_for_ready_timeout
  poll_interval          = var.poll_interval
  version_label          = var.version_label
  tags                   = var.tags
}