import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.imageURL}-${Date.now()}${extname(file.originalname)}`);
  },
});

const imageUploader = multer({ storage });
export default imageUploader;
