const express = require("express");
const router = express.Router();
const { orderItems } = require("../Models/OrderedItems");
const AppError = require("../Helpers/AppError");
const Order = require("../Models/Order");
const mongoose = require("mongoose");
const verifyToken = require("../Helpers/tokenAuth");

//methods[get,post,patch,delete]

const {
  getAllOrders,
  getOrderById,
  getUserOrder,
  addOrder,
} = require("../Controllers/orderController");

router.get("/", verifyToken, getAllOrders);
router.get("/:id", getOrderById);
router.get("/user/:id", getUserOrder);

router.post("/", addOrder);
// router.patch('/:id', updateOrder)
// router.delete('/:id', deletOrder)

module.exports = router;
