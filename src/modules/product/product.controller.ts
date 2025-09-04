import { ResponseDto } from '../../common/response';
import { catchAsync } from '../../middlewares/catch-async';
import { ProductService } from './product.service';
import { productValidation } from './product.validation';

const createProduct = catchAsync(async (req, res) => {
  const newProduct = await ProductService.createProduct(req.body);
  res.status(201).json(ResponseDto.success('Product created successfully', newProduct));
});

const getProducts = catchAsync(async (req, res) => {
  const parsed = await productValidation.getProducts.parseAsync(req.query);
  const { products, meta } = await ProductService.getProducts(parsed);
  res.json(ResponseDto.success('Products fetched successfully', products, meta));
});

const getProductById = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const product = await ProductService.getProductBySlug(slug);
  res.json(ResponseDto.success('Product fetched successfully', product));
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const files = req.files as Express.Multer.File[];
  const productData = req.body;
  const updatedProduct = await ProductService.updateProduct({ id, input: productData, files });
  res.json(ResponseDto.success('Product updated successfully', updatedProduct));
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await ProductService.deleteProduct(id);
  res.json(ResponseDto.success('Product deleted successfully', deletedProduct));
});

export const productController = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
