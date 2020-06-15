const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const parseSnsMessage = require('./parse-sns-event');
const BUCKET_NAME = process.env.BUCKET_NAME;

exports.handler = async (event, context) => {
    const messages = parseSnsMessage(event);
    return Promise.all(messages.map(message=> saveToS3(message, context.awsRequestId)));
};

saveToS3 = (data, id) => {
    const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hash = id;

    return s3.putObject({
        Key: `${year}-${month}-${day}-${hash}`,
        Bucket: BUCKET_NAME,
        ContentType: 'application/json',
        Body: JSON.stringify(data, null, 2)
    }).promise();
};
