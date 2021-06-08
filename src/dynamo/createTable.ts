import AWS from 'aws-sdk';
require("dotenv").config();

AWS.config.update({
    region: "us-east-2",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const dynamo = new AWS.DynamoDB({ apiVersion: 'latest' });;


//Create Table

const params: AWS.DynamoDB.CreateTableInput = {
    TableName: "cars",
    KeySchema: [{
        AttributeName: "position",
        KeyType: "HASH"
    }
    ],
    AttributeDefinitions: [
        {
            AttributeName: "position",
            AttributeType: "S"
        }, {
            AttributeName: "name",
            AttributeType: "S"
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3
    },
    StreamSpecification: {
        StreamEnabled: false
    },
    GlobalSecondaryIndexes: [
        {
            IndexName: "name-index",
            KeySchema: [{
                AttributeName: "name",
                KeyType: "HASH"
            }],
            Projection: {
                ProjectionType: "ALL"
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 1,
                WriteCapacityUnits: 1
            },
        }
    ]

}

dynamo.createTable(params, (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Tab;e created", data);
    }
})



export default dynamo;