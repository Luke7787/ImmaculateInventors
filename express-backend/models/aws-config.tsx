const AWS = require('aws-sdk');
const multer = require('multer');
// const multerS3 = require('multer-s3');
const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config()


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

const s3 = new AWS.S3();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

module.exports = { upload, s3Client };
