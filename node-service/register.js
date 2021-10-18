// 'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
// const bluebird = require('bluebird');
const bcrypt = require('bcryptjs');

// AWS.config.setPromisesDependency(bluebird);

const dynamoDb = new AWS.DynamoDB.DocumentClient();


exports.submit = (event, context, callback) => {
  console.log('event: ', event.name);
  console.log('body: ', event.body);
  const body = typeof event.name === 'string' ? event :
    typeof event.body === 'string' ? JSON.parse(event.body) : null
  if (!body) errorResponse(callback, 'Bad Request', 400)
  const awsId = context.awsRequestId

  // if (typeof user.name !== 'string' || typeof user.email !== 'string' || typeof user.password !== 'string') {
  //   return errorResponse(callback, 'User Details not saved. Please check user parameters', 400);    
  // }

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

const submitUser = (user) => {
  console.log('user: ', user);
  const timestamp = new Date().getTime();
  const id = uuid.v4();
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
  return dynamoDb.put(userData).promise().then(res => ({ id, name: user.name, email: user.email }));
  // return dynamoDb.put(userData).promise();

};


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

// const successResponse = (callback, message, statusCode = 200, body) => {
//   callback(null, {
//     statusCode,
//     body: JSON.stringify(body),
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     }
//   });
// };


