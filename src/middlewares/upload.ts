import multer from 'multer';

import { Request } from 'express';
import { AppError } from '../common/app-error';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) return cb(null, true);
  cb(new AppError('Only image (jpeg, jpg, png, webp) are allowed', 400));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadSingleImage = upload.single('image');
export const uploadMultipleImages = upload.array('images', 3);
