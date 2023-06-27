const mongoose = require("mongoose");
const { Schema } = mongoose;

//OrderedItems schema
const OrderedItemsSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    ref: "User",
  },
});
const OrderedItems = mongoose.model("OrderedItems", OrderedItemsSchema);
module.exports = OrderedItems;
