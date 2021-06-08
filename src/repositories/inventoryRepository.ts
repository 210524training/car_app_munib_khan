import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Car, { Position } from '../models/car';
import dynamo from '../dynamo/dynamo';

class InventoryRepository {
    constructor(
        private docClient: DocumentClient = dynamo
    ) { }


    async updateProduct(item: Car): Promise<boolean> {
        const params: DocumentClient.UpdateItemInput = {
            TableName: 'cars',
            Key: {
                position: item.position,
            },
            ReturnConsumedCapacity: 'TOTAL',
            UpdateExpression: 'SET stock = :s, price = :p',
            ExpressionAttributeValues: {
                ':p': item.price,
                ':s': item.stock,
            },
            ReturnValues: 'UPDATED_NEW',
        };

        try {
            const result = await this.docClient.update(params).promise();
            console.log(result);
            return true;
        } catch (error) {
            return false;
        }
    }

    async addProduct(item: Car): Promise<boolean> {
        const params: DocumentClient.PutItemInput = {
            TableName: 'cars',
            Item: item,
            ReturnConsumedCapacity: 'TOTAL',
            ConditionExpression: 'position <> :position',
            ExpressionAttributeValues: {
                ':position': item.position,
            },
        };

        try {
            const result = await this.docClient.put(params).promise();

            console.log(result);
            return true;
        } catch (error) {
            return false;
        }
    }

    async getByPosition(position: Position): Promise<Car | undefined> {
        const params: DocumentClient.GetItemInput = {
            TableName: 'cars',
            Key: {
                position,
            },
            ProjectionExpression: '#pos, #n, #s, #p',
            ExpressionAttributeNames: {
                '#pos': 'position',
                '#n': 'name',
                '#s': 'stock',
                '#p': 'price',
                "#y": "year"
            },
        };

        const data = await this.docClient.get(params).promise();

        return data.Item as Car | undefined;
    }

    async getByName(name: string): Promise<Car | undefined> {
        const params: DocumentClient.GetItemInput = {
            TableName: 'cars',
            Key: {
                name,
            },
            ProjectionExpression: '#pos, #n, #s, #p',
            ExpressionAttributeNames: {
                '#pos': 'position',
                '#n': 'name',
                '#s': 'stock',
                '#p': 'price',
            },

        };

        const data = await this.docClient.get(params).promise();

        return data.Item as Car | undefined;
    }

    async getAll(): Promise<Car[]> {
        const params: DocumentClient.ScanInput = {
            TableName: 'cars',
            ProjectionExpression: '#pos, #n, #s, #p, $y',
            ExpressionAttributeNames: {
                '#pos': 'position',
                '#n': 'name',
                '#s': 'stock',
                '#p': 'price',
                "#y": "year"
            },
        };

        const data = await this.docClient.scan(params).promise();

        if (data.Items) {
            return data.Items as Car[];
        }

        return [];
    }
}

export default new InventoryRepository();