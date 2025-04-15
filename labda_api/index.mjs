import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "minicloud_web";

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "DELETE /{category}/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              category: event.pathParameters.category,
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id} under ${event.pathParameters.category}`;
        break;
      case "GET /{category}/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              category: event.pathParameters.category,
              id: event.pathParameters.id,
            },
          })
        );
        body = body.Item;
        break;
      case "GET /":
        body = await dynamo.send(
          new ScanCommand({
            TableName: tableName,
          })
        );
        body = body.Items;
        break;
      case "PUT /{category}":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              category: event.pathParameters.category,
              id: new Date().getTime().toString(),
              image_url: requestJSON.image_url,
              data: requestJSON.data
            },
          })
        );
        body = `Put item under ${event.pathParameters.category}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
