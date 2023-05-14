config = {
    project = "coherent-fold-386610"
    region  = "us-central1"
    zone    = "us-central1-c"
}

app_engine_applications = [ 
    {
        name          = "aea-revolut-usc-01"
        location_id   = "us-central"
        database_type = "CLOUD_DATASTORE_COMPATIBILITY"
    }
]