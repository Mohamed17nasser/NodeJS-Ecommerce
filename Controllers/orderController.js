require("dotenv").config();
const AppError = require("../Helpers/AppError");
const Order = require("../Models/Order");
const User = require("../Models/Users");

const getAllOrders= async (req, res, next) => {
    const user = await User.findById(req.id);
    console.log(user)
    if(user.role!=="admin") return next(new AppError ('unauthorized',403 ) )
    const orders = await Order.find().populate([{ path: 'userId', select: '_id username role' }]).sort({'dateOfOrder': -1});
    res.status(200).json({ message: 'success', orders })

}

const getOrderById = async (req, res, next) => {
    const foundedOrder = await Order.findById(req.params.id).populate([{ path: 'userId', select: '_id username' }]);
    res.status(200).json({ message: 'success', foundedOrder })
}

const addOrder = async (req, res, next) => {
   
        const { orderItems, Address, city, zip, country, phone, totalPrice } = req.body;
        // const userFromToken = req.User._id; // get the current user ID from the token
        const order = await Order.create({ orderItems, Address, city, zip, country, phone, totalPrice, userId:req.id }).popul;
        res.status(201).json({ message: 'success', order });
     
}

const getUserOrder = async (req, res, next) => {
    const { id } = req.params
    const userOrders = await Order.find({ userId: id }).populate([{ path: 'userId', select: '_id username email role' }])
    res.status(200).json({ message: 'success', userOrders })
}






// const updateOrder = async (req, res, next) => {
//     const { orderItems } = req.body
//     const { id } = req.params
//     const userFromToken = req.User
//     const foundedOrder = await Order.findById(id)
//     if (!foundedOrder) return next(new AppError('Order not found', 404))
//     if (foundedOrder.User.toString() !== userFromToken._id.toString()) return next(new AppError('unauthorized', 403))
//     const updatedOrder = await Order.findByIdAndUpdate(id, { orderItems }, { new: true })
//     res.status(201).json({ message: 'success', updatedOrder })

// }

// const deletOrder = async (req, res, next) => {
//     const { id } = req.params
//     const userFromToken = req.user
//     const foundedOrder = await Order.findById(id)
//     if (!foundedOrder) return next(new AppError('Order not found', 404))
//     if (foundedOrder.creator.toString() !== userFromToken._id.toString() && userFromToken.role !== 'admin') return next(new AppError('unauthorized', 403))
//     if (foundedOrder) {
//         const foundedOrderComments = await commentModel.find({ Order: foundedOrder._id })
//         const foundedOrderReviews = await reviewModel.find({ Order: foundedOrder._id })
//         /* delet Order with it's Comments */
//         if (foundedOrderComments.length > 0) {
//             foundedOrderComments.forEach(async (comment) => {
//                 await commentModel.findByIdAndDelete(comment._id)
//             })
//         }
//         /* delet Order with it's reviews */
//         if (foundedOrderReviews.length !== 0) {
//             foundedOrderReviews.forEach(async (review) => {
//                 await reviewModel.findByIdAndDelete(review._id)
//             })
//         }
//         const deletedOrder = await Order.findByIdAndDelete(id)
//         res.status(201).json({ message: 'success', deletedOrder })
//     }

// }

module.exports = {getAllOrders,getOrderById,getUserOrder,addOrder
    // getAllOrder, addOrder, getUserOrder, updateOrder, deletOrder, getOrderById, topRatedOrder 
};
