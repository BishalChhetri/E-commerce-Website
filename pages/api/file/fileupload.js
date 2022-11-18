import nc from "next-connect";

import multer from "multer";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "pant" + "-" + Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);

handler.post(async (req, res) => {
  res.status(200).send({ filename: `/images/${req.file.filename}` });
});

export default handler;
