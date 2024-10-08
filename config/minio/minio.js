const Minio = require('minio');
const multer = require('multer');
const uuid = require('uuid');

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_HOST,
    port: Number(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const uploadMulter = multer({ storage: multer.memoryStorage() });

const bucket = 'desirium';
minioClient.bucketExists(bucket).then((exists) => {
    if (!exists) {
        minioClient.makeBucket(bucket).then(() => {
            console.log(`Bucket ${bucket} doesn't exists. Craeted.`);
        }).catch((err) => {
            console.error(err);
        });
    }
}).catch((err) => {
    console.error(err);
});

async function uploadFile(file, fileName) {
    fileName ??= uuid.v4();
    if (typeof file !== "object") {
        throw new Error("Invalid type");
    }

    return await minioClient.putObject(bucket, fileName, file.buffer, file.size);
}

async function getFileUrl(tag) {
    return await minioClient.presignedUrl('GET', bucket, tag);
}

module.exports = {uploadFile, uploadMulter, getFileUrl}
