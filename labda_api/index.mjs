import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "minicloud_web";
const userTableName = "minicloud_users";

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
              data: requestJSON.data,
            },
          })
        );
        body = `Put item under ${event.pathParameters.category}`;
        break;
      case "POST /users/login":
        let loginRequestJSON = JSON.parse(event.body);
        body = await dynamo.send(
          new GetCommand({
            TableName: userTableName,
            Key: {
              email: loginRequestJSON.email,
            },
          })
        );
        let user = body.Item;
        if (user.password == loginRequestJSON.password) {
          body = `Login Successfully as ${loginRequestJSON.email}`;
        } else {
          throw new Error(`Login Failed: "Your input credentials don't match"`);
        }
        break;
      case "POST /generate-presigned-url":
        requestJSON = JSON.parse(event.body);
        const client = new S3Client({ region: "ap-northeast-1" });
        const command = new PutObjectCommand({
          Bucket: "minicloud-web-jp",
          Key: `uploads/${requestJSON.id}/original.jpg`,
        });
        body = await getSignedUrl(client, command, { expiresIn: 60 });
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
