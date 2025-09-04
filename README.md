# Security Solution

## Auth

#### Register.

`POST  http://localhost:5000/api/v1/auth/register`

#### Login.

`POST http://localhost:5000/api/v1/auth/login`

## Products

#### Create Product.

`POST http://localhost:5000/api/v1/products`

#### Get Products.

`GET http://localhost:5000/api/v1/products`

#### Get Single Product.

`GET http://localhost:5000/api/v1/products/:slug`

#### Update Single Product.

`PATCH http://localhost:5000/api/v1/products/:slug`

#### Delete Single Product.

`DELETE http://localhost:5000/api/v1/products/:slug`

## Category

#### Create Category.

`POST http://localhost:5000/api/v1/categories`

#### Get Categories.

`GET http://localhost:5000/api/v1/categories`

#### Update Category.

`PATCH http://localhost:5000/api/v1/categories/:id`

#### Delete Category.

`DELETE http://localhost:5000/api/v1/categories/:id`

## Sub Category

#### Create Subcategory.

`POST http://localhost:5000/api/v1/categories/sub`

#### Get Subcategories.

`GET http://localhost:5000/api/v1/categories/sub`

#### Update Subcategory.

`PATCH http://localhost:5000/api/v1/categories/sub/:id`

#### Delete Subcategory.

`DELETE http://localhost:5000/api/v1/categories/sub/:id`
