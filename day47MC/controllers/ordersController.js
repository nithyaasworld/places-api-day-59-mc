const OrderModel = require("../models/orders");

const getAllOrders = async () => {
    let orders = await OrderModel.find({});
    return orders;
}
const getOrderByID = async (id) => {
    let result;
    await OrderModel.findOne({ _id: id }).then((data) => {
        result = { status: true, response: data };
    }).catch((err) => {
        result = { status: false, response: err };
    })
    return result;
}