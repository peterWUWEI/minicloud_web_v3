const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const sharp = require("sharp");
const s3 = new S3Client();

exports.handler = async (event) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const id = key.split("/")[1];

  try {
    // Get uploaded image
    const { Body } = await s3.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const buffer = await streamToBuffer(Body); // Implement stream conversion

    // Resize
    const thumbnail = await sharp(buffer).resize(300, 300).toBuffer();

    // Upload thumbnail
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.THUMBNAIL_BUCKET,
        Key: `uploads/${id}/thumbnail.jpg`,
        Body: thumbnail,
        ContentType: "image/jpeg",
      })
    );

    // Update DynamoDB
    // await dynamodb.update({
    //   TableName: 'ImageMetadata',
    //   Key: { id: uuid },
    //   UpdateExpression: 'SET thumbnailUrl = :url, #status = :status',
    //   ExpressionAttributeValues: {
    //     ':url': `https://thumbnails-bucket.s3.amazonaws.com/uploads/${uuid}/thumbnail.jpg`,
    //     ':status': 'completed'
    //   },
    //   ExpressionAttributeNames: { '#status': 'status' }
    // });
  } catch (err) {
    // Update status to error
    // await dynamodb.update({
    //   TableName: 'ImageMetadata',
    //   Key: { id: uuid },
    //   UpdateExpression: 'SET #status = :status',
    //   ExpressionAttributeValues: { ':status': 'error' },
    //   ExpressionAttributeNames: { '#status': 'status' }
    // });
    throw err;
  }
};
