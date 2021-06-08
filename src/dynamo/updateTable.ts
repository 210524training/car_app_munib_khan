import AWS from 'aws-sdk';
require("dotenv").config();

// AWS.config.update({
//     region: process.env.AWS_DEFAULT_REGION,
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "us-east-2",
    endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: "latest"
});

interface carItem {
    position: string,
    name: string,
    model: string,
    year: number,
    stock: number
}

// Insert or Update Item 
export const updateCar = async (car: carItem) => {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
        TableName: "cars",
        Item: car
    }
    try {
        const result = await dynamo.put(params).promise();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const test = {
    position: "f14",
    name: "Honda",
    model: "Accord",
    year: 2010,
    stock: 5
}
updateCar(test);
