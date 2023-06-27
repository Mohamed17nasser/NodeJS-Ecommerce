require("dotenv").config();
const AppError = require("../Helpers/AppError");
const Products = require("../Models/Products");
const Categories = require("../Models/Categories");
const cloudinary = require("../Helpers/cloudinary.js");

////////////////////////////////////get methods//////////////////////////////////

//http://localhost:8080/products

const getAllProducts = async (req, res, next) => {
  try {
    const { sort } = req.params.sort;
    let products;
    switch (sort) {
      case 'lowest':
        products = await Products.find().sort({ price: 1 });
        break;
      case 'highest':
        products = await Products.find().sort({ price: -1 });
        break;
      default:
        products = await Products.find();
        break;
    }

    if (products.length === 0) {
      return next(new AppError("No products were found!"));
    }

    res.send(products);
  } catch (error) {
    return next(error);
  }
};

//http://localhost:8080/products/?product=
const getProductsBySearch = async(req,res,next)=>{
  const searchString = req.query.product;
  const searchedProducts = await Products.find({ name: { $regex: searchString,$options:"i" } })
  if (searchedProducts.length == 0) return next(new AppError('product not found',404));
  res.status(200).json(searchedProducts);
}

//http://localhost:8080/products/:id

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Products.findById(id);

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    res.send({ message: "Product retrieved successfully", product });
  } catch (err) 
  {
    return next(err);
  }
};

//http://localhost:8080/products/:category/

const getProductsByCategory = async (req, res, next) => {
  try
  {
    const category = await Categories.findById(req.params.category);
    if (!category) return next(new AppError("category does not exist"));
    const products = await Products.find({category});
    if (products.length == 0) return next(new AppError("no products were found!"));
    res.send({ message: "All products retrieved successfully", products });
  }
  catch (err) 
  {
    return next(err);
  }
};

//http://localhost:8080/products/filter/:sort

const getProductsByFilter = async (req, res, next) => {
  try
  {
    const {category,max,min} = req.body;
    let filter = { category };
    if (min && max) {
      filter.price = { $gte: min, $lte: max };
    } else if (min) {
      filter.price = { $gte: min };
    } else if (max) {
      filter.price = { $lte: max };
    }
    const { sort } = req.params.sort;
    let products;
    switch (sort) {
      case 'lowest':
        products = await Products.find(filter).sort({ price: 1 });
        break;
      case 'highest':
        products = await Products.find(filter).sort({ price: -1 });
        break;
      default:
        products = await Products.find(filter);
        break;
    }
    if (products.length == 0) return next(new AppError("no products were found!"));
    res.send({ message: "All posts retrieved successfully", products });
  }
  catch (err) 
  {
    return next(err);
  }
};

////////////////////////////////////post methods//////////////////////////////////

//http://localhost:8080/products/:category
const createProduct = async (req, res, next) => {
    const {category} = req.params;
    const { name,details,price,vendor,productRating,no_of_reviews,no_of_items_in_stock,availability,Reviews } = req.body;
    const {secure_url} = await cloudinary.uploader.upload(req.file.path,{folder:'productImage'});
    const product = new Products({ 
      name, 
      details,
      price,
      category,
      photo_url:secure_url,
      vendor,
      productRating,
      no_of_reviews,
      no_of_items_in_stock,
      availability,
      Reviews
    });
    await product.save();
    res.status(201).json({ message: "success" , secure_url });
};

////////////////////////////////////delete methods//////////////////////////////////

//http://localhost:8080/products/:id

const deleteProduct = async(req,res,next)=>{
  const {id} = req.params;
  if(!id) return next(new AppError('please enter product id',404));
  const deletedProduct = await Products.findByIdAndDelete(id);
  //delete product review
  res.status(200).json({message:'success',deletedProduct});
}

////////////////////////////////////update methods//////////////////////////////////

//http://localhost:8080/products/:id

const updateProduct = async(req,res,next)=>{
    const {id} = req.params;
    const product = req.body;
    const updatedProduct = await Products.findByIdAndUpdate(id,product,{new:true});
    res.status(200).json({message:"success",updatedProduct});
}


module.exports = { getAllProducts ,getProductById,getProductsByCategory,getProductsByFilter,getProductsBySearch,createProduct,deleteProduct,updateProduct};
