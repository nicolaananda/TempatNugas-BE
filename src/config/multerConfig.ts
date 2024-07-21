import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "./s3Config";

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "_" + file.originalname);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 5 }, // limit 5 MB saja
});

export default upload;
