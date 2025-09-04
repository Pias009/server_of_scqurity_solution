import { ResponseDto } from '../../common/response';
import { catchAsync } from '../../middlewares/catch-async';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const input = req.body;
  const newCategory = await CategoryService.createCategory(input);
  res.status(201).json(ResponseDto.success('Category created successfully', newCategory));
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getCategories();
  res.json(ResponseDto.success('Categories fetched successfully', categories));
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const input = req.body;
  const updatedCategory = await CategoryService.updateCategory(id, input);
  res.json(ResponseDto.success('Category updated successfully', updatedCategory));
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await CategoryService.deleteCategory(id);
  res.json(ResponseDto.success('Category deleted successfully', deletedCategory));
});

const createSubCategory = catchAsync(async (req, res) => {
  const input = req.body;
  const newSubCategory = await CategoryService.createSubCategory(input);
  res.status(201).json(ResponseDto.success('Sub category created successfully', newSubCategory));
});

const getSubCategories = catchAsync(async (req, res) => {
  const parentId = req.query.parentId as string;
  const subCategories = await CategoryService.getSubCategories(parentId);
  res.json(ResponseDto.success('Sub categories fetched successfully', subCategories));
});

const updateSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const input = req.body;
  const updatedSubCategory = await CategoryService.updateSubCategory(id, input);
  res.json(ResponseDto.success('Sub category updated successfully', updatedSubCategory));
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deletedSubCategory = await CategoryService.deleteSubCategory(id);
  res.json(ResponseDto.success('Sub category deleted successfully', deletedSubCategory));
});

export const categoryController = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
};
