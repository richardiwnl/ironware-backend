import multer from 'multer';
import slugify from 'slugify';
import { extname, resolve } from 'path';

const rand = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('O arquivo precisa ser JPG ou JPEG'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${slugify(file.originalname, {
          replacement: '_',
        })}_${Date.now()}_${rand()}${extname(file.originalname)}`
      );
    },
  }),
};
