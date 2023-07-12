const express = require("express");
const router = express.Router();
const { orderItems } = require("../Models/OrderedItems");
const AppError = require("../Helpers/AppError");
const Order = require("../Models/Order");
const mongoose = require("mongoose");
const verifyToken = require("../Helpers/tokenAuth");

//methods[get,post,patch,delete]

const { getAllOrders,getOrderById,getUserOrder,addOrder,updateOrder,deleteOrder,updateOrderStatus,getPendingOrders} = require('../Controllers/orderController');

router.get('/',verifyToken, getAllOrders)
router.get('/pending/',verifyToken, getPendingOrders)
router.patch('/confirm/:id',verifyToken, updateOrderStatus)
router.get('/user/:id', getUserOrder)
router.get('/:id', getOrderById)
router.post('/',verifyToken, addOrder)
router.patch('/:id', verifyToken, updateOrder); 
router.delete('/:id',verifyToken, deleteOrder)


module.exports = router;
