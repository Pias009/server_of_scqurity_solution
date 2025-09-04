import { TCreateProductInput, TGetProductsInput, TUpdateProductInput } from './product.validation';
import { ProductModel } from './product.model';
import { AppError } from '../../common/app-error';
import { PaginationHelper } from '../../common/pagination';
import { cloudinary } from '../../app/cloudinary.config';

type TUpdateProduct = {
  id: string;
  input: TUpdateProductInput;
  files?: Express.Multer.File[];
  removedImageIds?: string[];
};

export class ProductService {
  static async createProduct(input: TCreateProductInput) {
    const isProductExist = await ProductModel.findOne({ slug: input.slug });
    if (isProductExist) throw new AppError('Product with this slug already exists', 409);

    if (input.subCategoryId === '') {
      input.subCategoryId = null;
    }

    const product = await ProductModel.create(input);
    return product;
  }

  static async getProducts(query: TGetProductsInput) {
    const { page, limit, search, category, brand, maxPrice, minPrice } = query;
    const paginationHelper = new PaginationHelper(page, limit);
    const skip = paginationHelper.getSkip();

    const dbQuery = {
      isDeleted: false,
      ...(search && {
        $or: [{ name: { $regex: search, $options: 'i' } }, { slug: { $regex: search, $options: 'i' } }],
      }),
      ...(category && { category }),
      ...(brand && { brand }),
      ...((maxPrice || minPrice) && {
        price: { ...(minPrice && { $gte: minPrice }), ...(maxPrice && { $lte: maxPrice }) },
      }),
    };

    const products = await ProductModel.find(dbQuery).skip(skip).limit(limit);

    const total = await ProductModel.countDocuments(dbQuery);
    const meta = paginationHelper.generateMeta(total);
    return { products, meta };
  }

  static async getProductBySlug(slug: string) {
    const product = await ProductModel.findOne({ slug });
    if (!product) throw new AppError('Product not found', 404);
    return product;
  }

  static async updateProduct({ id, input: { removedImageIds, ...input }, files }: TUpdateProduct) {
    const product = await ProductModel.findById(id);
    if (!product) throw new AppError('Product not found', 404);

    // 1️⃣ Remove images if specified
    if (removedImageIds?.length) {
      for (const publicId of removedImageIds) {
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
          const remainingImages = product.images.filter((img) => img.publicId !== publicId);
          product.images = remainingImages;
        } catch (err) {
          console.warn(`Failed to delete image ${publicId}:`, err);
        }
      }
    }

    // 2️⃣ Upload new images
    if (files?.length) {
      for (const file of files) {
        try {
          const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
          const result = await cloudinary.uploader.upload(base64, {
            folder: 'products',
            resource_type: 'image',
          });
          product.images.push({ url: result.secure_url, publicId: result.public_id });
        } catch (err) {
          console.warn(`Failed to upload image "${file.originalname}":`, err);
        }
      }
    }

    // 3️⃣ Update other fields
    Object.assign(product, input);

    // 4️⃣ Save changes
    await product.save();
    return product;
  }

  static async deleteProduct(id: string) {
    const product = await ProductModel.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } });
    if (!product) throw new AppError('Product not found', 404);
    return product;
  }
}
