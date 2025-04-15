# minicloud_web_v3
Minicloud Web Application Version 3 is redesgined and built on top of the AWS Serverless Architecture consists of API Gateway, Lambda Functions and DynamoDB. Backend API service code is migrated from a provisioned EC2 instance to Lambda Function hosting. The EC2 instance will be downgraded to a micro instance which only hosts light-weighted frontend service.

## Cost Reduction
In our old Version 2 design, backend APIs, frontend server and database server are hosted in the same EC2 instance (medium size). The cost of the EC2 server is around 40 USD dollars per month.
In the current Version 3 design, we are only using micro EC2 instance to host frontend server. API Gateway, Lambda Functions and DynamoDB costs are almost negligible given the tiny amount of data we are stroing and transferring on a monthly basis. The expected cost will be around 10+ USD dollars per month.

## Resilient to heavy traffic/Request Spikes
Lambda Functions and DynamoDB have the ability to scale automatically to handle sudden traffic spikes and provide consistent low latency whereas the previous design fails to handle.

## Server Migration to Japanses AWS Region
The server was originally hosted in the US region to cut cost (it was much cheaper back in 2021); however in 2025, the cost in Japan is almost equivalent to the cost in the US. We will be migrating the services to Japan to boost up the speed even more.

## AWS Official Documentation Reference
https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html