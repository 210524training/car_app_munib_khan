import AWS from 'aws-sdk';
require("dotenv").config();

AWS.config.update({
    region: "us-east-2",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamo = new AWS.DynamoDB.DocumentClient();

// READ ALL 
export const getCars = async () => {
    const params = {
        TableName: "cars",
        region: "us-east-2"
    };
    const char = await dynamo.scan(params).promise();
    console.log(char);
    return char;
}

getCars();
