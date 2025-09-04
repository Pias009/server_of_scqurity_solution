import { AppError } from '../../common/app-error';
import { ResponseDto } from '../../common/response';
import { catchAsync } from '../../middlewares/catch-async';
import { UploadService } from './upload.service';

const upload = catchAsync(async (req, res) => {
  const file = req.file;
  const folderName = req.body.folderName;

  if (!file) throw new AppError('No file uploaded', 400);

  const result = await UploadService.upload(file.buffer, folderName);
  res.status(201).json(ResponseDto.success('File uploaded successfully', result));
});

const deleteFile = catchAsync(async (req, res) => {
  const { publicId } = req.body;
  await UploadService.delete(publicId);
  res.json(ResponseDto.success('File deleted successfully'));
});

export const uploadController = { upload, deleteFile };
