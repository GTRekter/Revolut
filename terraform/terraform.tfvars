config = {
    region = "us-east-1"
}
dynamodb_tables = [
    {
        table_name     = "users"
        billing_mode   = "PROVISIONED"
        read_capacity  = 1
        write_capacity = 1
        hash_key       = "username"
        attribute = [
            {
                name = "username"
                type = "S"
            }
        ]
    }
]
elastic_beanstalk_applications = [
    {
        name                  = "eba-revolut-use-01"
        service_role          = ""
        environments = [
            
        ]
    }
]