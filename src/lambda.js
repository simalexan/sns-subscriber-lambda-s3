const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const uuidv4 = require('uuid/v4');
const parseSnsMessage = require('./parse-sns-event');
const TOPIC_ARN = process.env.TOPIC_ARN;
const BUCKET_NAME = process.env.BUCKET_NAME;

exports.handler = (event) => {
    let messages = parseSnsMessage(event);
    return Promise.all(messages.map(saveToS3));
};

saveToS3 = (data) => {
    let date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hash = uuidv4();

    return s3.putObject({
        Key: `${year}-${month}-${day}-${hash}`,
        Bucket: BUCKET_NAME,
        ContentType: 'application/json',
        Body: JSON.stringify(data, null, 2)
    }).promise();
};
