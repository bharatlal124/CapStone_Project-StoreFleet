import ProductModel from "./product.schema.js";

//add new product repo...
export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

// get all product repo....
export const getAllProductsRepo = async (query, limit, page) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < (await ProductModel.countDocuments(query).exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.products = await ProductModel.find(query)
    .limit(limit)
    .skip(startIndex)
    .exec();

  return results;
};

//update product repo....
export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

//delete product by id repo...
export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

//Get product details by id repo....
export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

//get total count of product repo...
export const getTotalCountsOfProduct = async () => {
  return await ProductModel.countDocuments();
};

//find product repo...
export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};
