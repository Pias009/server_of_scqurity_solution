import { cloudinary } from '../../app/cloudinary.config';

export class UploadService {
  static async upload(buffer: Buffer, folderName: string) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder: folderName }, (error, result) => {
        if (error) return reject(error);
        resolve({ url: result?.secure_url, publicId: result?.public_id });
      });
      uploadStream.end(buffer);
    });
  }

  static async delete(publicId: string) {
    return cloudinary.uploader.destroy(publicId);
  }
}
