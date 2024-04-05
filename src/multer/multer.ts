import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function(req, avatar, cb) {
    cb(null, path.join(process.cwd(),"src",'uploads'));
  },
  filename: function(req, avatar, cb) {
    cb(null, Date.now() + '&' + avatar.originalname);
  }
});

export const upload = multer({ storage: storage });