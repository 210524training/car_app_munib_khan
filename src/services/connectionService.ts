import AWS from "aws-sdk";
require("dotenv").config();


const docClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: "latest"
});

export default docClient;
