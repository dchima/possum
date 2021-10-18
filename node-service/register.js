const uuid = require('uuid');
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * 
 * @param {*} event - aws event
 * @param {*} context - aws context
 * @param {*} callback - callback function
 * @returns {object} - response body to client
 */
exports.submit = (event, context, callback) => {
  console.log('event: ', event.name);
  console.log('body: ', event.body);
  const body = typeof event.name === 'string' ? event :
    typeof event.body === 'string' ? JSON.parse(event.body) : null
  if (!body) errorResponse(callback, 'Bad Request', 400)
  const awsId = context.awsRequestId

  // submit user
  submitUser(body).then(res => {
    callback(null, {
        statusCode: 201,
        body: JSON.stringify({ 
          message: 'successfully registered user',
          details: { ...res, awsId }
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
}).catch((err) => {
    errorResponse(callback, 'Failed to add user', 500)
  });
};

/**
 * submit user function
 * @param {object} user - user object
 * @returns {object} submitted uer id and name
 */
const submitUser = (user) => {
  console.log('user: ', user);
  const timestamp = new Date().getTime();
  const id = uuid.v4();
  
  // hash user password in the process for extra security
  const userData = {
    TableName: process.env.REGISTRATION_TABLE,
    Item: {
      ...user,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
      id,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  };

  // post to dynamo database
  return dynamoDb.put(userData).promise().then(res => ({ id, name: user.name, email: user.email }));

};

/**
 * Error Response fuction
 * @param {*} callback - callback function
 * @param {*} message - error message
 * @param {*} code - error code
 */
const errorResponse = (callback, message, code = 500) => {
  callback(null, {
    statusCode: code,
    body: JSON.stringify({
      message,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  });
};

