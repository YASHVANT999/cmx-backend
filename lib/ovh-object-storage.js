const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
console.log('------------------------->',process.env.OVH_ACCESS_KEY, process.env.OVH_SECRET_KEY, process.env.OVH_CONTAINER);
const s3 = new S3Client({
    endpoint: 'https://s3.us-east-va.io.cloud.ovh.us',
    region: 'us-east-va',
    s3ForcePathStyle: true,
    credentials: {
        accessKeyId: process.env.OVH_ACCESS_KEY,
        secretAccessKey: process.env.OVH_SECRET_KEY,
    },
});

const ovhStorageUpload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: process.env.OVH_CONTAINER || 'cmx-storage',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            const currentTime = new Date()
                .toISOString()
                .slice(11, 19)
                .replace(/:/g, "");
            const fileName = `${currentDate}_${currentTime}${file.originalname.replaceAll(' ', '')}`;
            cb(null, fileName);
        },
    }),
});

const deleteFileFromOVH = async (fileUrl) => {
    try {
        const fileKey = fileUrl.split('/').pop();
        await s3.send(new DeleteObjectCommand({
            Bucket: process.env.OVH_CONTAINER || 'cmx-storage',
            Key: fileKey,
        }));

        console.log('File deleted successfully:', fileKey);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error('Failed to delete file');
    }
};

module.exports = {
    ovhStorageUpload,
    deleteFileFromOVH,
};
