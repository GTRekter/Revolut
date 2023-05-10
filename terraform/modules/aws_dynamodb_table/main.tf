resource "aws_dynamodb_table" "dynamodb_table" {
  name                 = var.table_name
  hash_key             = var.hash_key
  range_key            = var.range_key
  billing_mode         = var.billing_mode
  read_capacity        = var.read_capacity
  write_capacity       = var.write_capacity
  stream_enabled       = var.stream_enabled
  stream_view_type     = var.stream_view_type
  tags                 = var.tags
  dynamic "point_in_time_recovery" {
    for_each = var.point_in_time_recovery != null ? [var.point_in_time_recovery] : []
    content {
      enabled = point_in_time_recovery.value
    }
  }
  dynamic "server_side_encryption" {
    for_each = var.server_side_encryption != null ? [var.server_side_encryption] : []
    content {
      enabled       = server_side_encryption.value.enabled
      kms_key_arn   = server_side_encryption.value.kms_key_arn
    }
  }
  dynamic "global_secondary_index" {
    for_each = var.global_secondary_index != null ? [var.global_secondary_index] : []
    content {
      name               = global_secondary_index.value.name
      hash_key           = global_secondary_index.value.hash_key
      range_key          = global_secondary_index.value.range_key
      projection_type    = global_secondary_index.value.projection_type
      write_capacity     = global_secondary_index.value.write_capacity
      read_capacity      = global_secondary_index.value.read_capacity
      non_key_attributes = global_secondary_index.value.non_key_attributes
    }
  }
  dynamic "local_secondary_index" {
    for_each = var.local_secondary_index != null ? [var.local_secondary_index] : []
    content {
      name               = local_secondary_index.value.name
      range_key          = local_secondary_index.value.range_key
      projection_type    = local_secondary_index.value.projection_type
      non_key_attributes = local_secondary_index.value.non_key_attributes
    }
  }
  dynamic "attribute" {
    for_each = var.attribute
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }
  dynamic "ttl" {
    for_each = var.ttl != null ? [var.ttl] : []
    content {
      attribute_name = ttl.value.attribute_name
      enabled = ttl.value.enabled
    }
  }
  dynamic "replica" {
    for_each = var.replica
    content {
      region_name = replica.value.region_name
    }
  }
}
