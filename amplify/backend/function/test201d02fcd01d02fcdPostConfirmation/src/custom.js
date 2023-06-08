const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const ddbClient = new DynamoDBClient({ region: "us-east-1" }); // Replace 'us-east-1' with your desired AWS region

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log("Error: No user was written to DynamoDB");
    return event;
  }

  // Save the user to DynamoDB
  const date = new Date();

  const params = {
    TableName: process.env.USERTABLE,
    Item: {
      id: { S: event.request.userAttributes.sub },
      __typename: { S: "User" },
      username: { S: event.userName },
      email: { S: event.request.userAttributes.email },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
  };

  try {
    await ddbClient.send(new PutItemCommand(params));
    console.log("Success");
  } catch (e) {
    console.log("Error", e);
  }

  return event;
};
