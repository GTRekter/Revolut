require('dotenv').config();

const USER_TABLE_NAME = 'users';

// https://cloud.google.com/datastore/docs/tools/datastore-emulator
const datastore = require('../data/datastore');

function saveUser(user) {
  const entityKey = datastore.key([USER_TABLE_NAME, user.username]);
  const entity = {
    key: entityKey,
    data: [
      {
        name: 'dateOfBirth',
        value: user.dateOfBirth
      }
    ]
  };
  return datastore.save(entity)
}

function getUserByUsername(username) {
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
      return user;
    })
    .catch((error) => {
      console.log('Error retrieving user:', error);
    });
}

module.exports = {
  saveUser,
  getUserByUsername
};
