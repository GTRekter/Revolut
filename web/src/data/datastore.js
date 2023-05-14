const { Datastore } = require('@google-cloud/datastore');
require('dotenv').config();

let datastore;
if (process.env.GCP_USE_EMULATOR === 'true') {
  console.log(`Initializing Datastore`)
  datastore = new Datastore({
    projectId: process.env.GCP_PROJECT_ID,
    apiEndpoint: process.env.DATASTORE_HOST
  });
  console.log(`Datastore initialized`)
} else {
  console.log(`Initializing Datastore`)
  datastore = new Datastore({ 
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: `./${process.env.GCP_KEY_FILE_NAME}.json`
  });
  console.log(`Datastore initialized`)
}

module.exports = datastore;
