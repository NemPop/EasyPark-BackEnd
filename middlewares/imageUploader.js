// import multer from "multer";
// import { extname } from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.imageURL}-${Date.now()}${extname(file.originalname)}`);
//   },
// });

// const imageUploader = multer({ storage });
// export default imageUploader;

import multer from "multer";
import FirebaseStorage from "multer-firebase-storage";
import { v4 as uuidv4 } from "uuid";

const imageUploader = multer({
  storage: FirebaseStorage({
    bucketName: "gs://easypark-backend.appspot.com",
    credentials: {
      privateKey: process.env.PRIVATE_KEY_FIREBASE,
      project_id: process.env.PROJECT_ID_FIREBASE,
      client_email: process.env.CLIENT_EMAIL_FIREBASE,
    },
    public: true,
    nameSuffix: `-${uuidv4()}`,
  }),
});

export default imageUploader;
