import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import config from '../../config/config';

const bucket = <string>config.aws.bucketName;
const region = <string>config.aws.reigon;
const accessKeyId = <string>config.aws.accessKeyId;
const secretAccessKey = <string>config.aws.secretAccessKey;

aws.config.update({
  secretAccessKey,
  accessKeyId,
  region,
});
const s3 = new aws.S3();

const storage = multerS3({
  s3,
  bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  // acl: 'public-read',
  metadata: function (req: Express.Request, file: Express.Multer.File, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString());
  },
});

// const fileFilter =(req, res, cb:)=>{
//     if (file.mimetype ==='image/jpeg' || file.mimetype === 'image/png' ){
//         cb(null, true)
//     }else{
//         cb(err, false)
//     }
// }

// function getUpload(key) {
//     const params = {
//         Key: key,
//         Bucket: bucket
//     }
//     return s3.getObject(params)
//     .createReadStream()
// }

function deleteUpload(key: string | aws.S3.ObjectIdentifier[]) {
  if (typeof key == 'object') {
    const params: aws.S3.Types.DeleteObjectsRequest = {
      Bucket: bucket,
      Delete: {
        Objects: key,
        Quiet: true,
      },
    };
    return s3.deleteObjects(params).promise();
  } else {
    const params: aws.S3.Types.DeleteObjectRequest = {
      Key: key,
      Bucket: bucket,
    };
    return s3.deleteObject(params).promise();
  }
}

const avi = multer({
  storage: storage,
}).single('avatar');

const img = multer({
  storage: storage,
}).array('img');

export { avi, img, deleteUpload };
