const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
require('dotenv').config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const dynamoDbClient = DynamoDBDocumentClient.from(client);
const USER_TABLE_NAME = 'users';

async function saveUser(user) {
  const item = {
    username: user.username,
    dateOfBirth: user.dateOfBirth
  };
  const params = {
    TableName: USER_TABLE_NAME,
    Item: item,
    ConditionExpression: "attribute_not_exists(username)"
  };
  try {
    await dynamoDbClient.send(new PutCommand(params));
    return item;
  } 
  catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      throw new Error('User already exists');
    }
    throw error;
  }
}
async function getUserByUsername(username) {
  const params = {
    TableName: USER_TABLE_NAME,
    Key: { username: username }
  };
  const { Item } = await dynamoDbClient.send(new GetCommand(params));
  if (Item) {
    return Item
  } else {
    return null
  }
}

module.exports = {
  saveUser,
  getUserByUsername
};
