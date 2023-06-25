const express = require('express');
const routes = express.Router();
const {getAllProducts,getProductById,getProductsByCategory,getProductsByFilter, getProductsBySearch, createProduct, deleteProduct, updateProduct}=require('../Controllers/productsController');


//////////get methods///////////

routes.get('/:sort',getAllProducts);

routes.get('/:id',getProductById);

routes.get('/:category',getProductsByCategory);

routes.get('/filter/:sort',getProductsByFilter);

//get products by search
routes.get('/',getProductsBySearch)

//create new product
routes.post('/',createProduct)

//update existing product
routes.put('/:id',updateProduct)

//delete product
routes.delete('/:id',deleteProduct)

module.exports = routes