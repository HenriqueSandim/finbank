import multer from "multer";

const uploadUserImageMiddleware = multer({
  storage: multer.diskStorage({
    destination: "upload",
    filename: (req, file, callback) => {
      const filename = `${file.originalname}`;

      return callback(null, filename);
    },
  }),
});

export default uploadUserImageMiddleware;
