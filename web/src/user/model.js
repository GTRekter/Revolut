require('dotenv').config();

const USER_TABLE_NAME = 'users';

// https://cloud.google.com/datastore/docs/tools/datastore-emulator
const datastore = require('../data/datastore');

function saveUser(user) {
  console.log(`Method saveUser begin`)
  const entityKey = datastore.key([USER_TABLE_NAME, user.username]);
  console.log(`entityKey: ${entityKey}`)
  const entity = {
    key: entityKey,
    data: [
      {
        name: 'dateOfBirth',
        value: user.dateOfBirth
      }
    ]
  };
  console.log(`Method saveUser end`)
  return datastore.save(entity)
}

function getUserByUsername(username) {
  console.log(`Method getUserByUsername begin`)
  const entityKey = datastore.key([USER_TABLE_NAME, username]);
  return datastore
    .get(entityKey)
    .then(([response]) => {
      let user = null;
      if (response) {
        user = {
          username: response[datastore.KEY].name,
          dateOfBirth: response.dateOfBirth
        };
      }
      console.log(`Method getUserByUsername end`)
      return user;
    })
    .catch((error) => {     
      console.log('Error retrieving user:', error);
      console.log(`Method getUserByUsername end`);
      return null
    });
}

module.exports = {
  saveUser,
  getUserByUsername
};
