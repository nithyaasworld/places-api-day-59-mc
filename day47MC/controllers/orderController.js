const OrderModel = require("../models/orders");

const addAnOrder = async (orders) => {
    const newOrder = new OrderModel({
        orders
    });
    let result;
    await newOrder
      .save()
      .then((data) => {
        result = {
          status: true,
          response: `Following data has been added successfully: ${data}`,
        };
      })
      .catch((err) => {
        result = { status: false, response: err };
      });
    return result;
};
  
const getAllOrders = async () => {
    let orders;
    await OrderModel.find({}).then((data) => {
        orders = { status: true, response: data };
    }).catch((err) => {
        orders = { status: false, response: err };
    })
    return orders;
}
const getOrdersByID = async (id) => {
    let result;
    await OrderModel.findOne({ _id: id }).then((data) => {
        result = { status: true, response: data };
    }).catch((err) => {
        result = { status: false, response: err };
    })
    return result;
}
module.exports = { addAnOrder, getAllOrders, getOrdersByID };