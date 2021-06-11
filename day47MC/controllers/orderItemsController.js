const OrderItemModel = require("../models/orderItem");

const addAnOrderItem = async ({ pizzaId, quantity }) => {
    const newOrderItem = new OrderItemModel({
        pizza: pizzaId,
        quantity,
    });
    let result;
    await newOrderItem
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
  
const getAllOrderItems = async () => {
    let orders;
    await OrderItemModel.find({}).then((data) => {
        orders = { status: true, response: data };
    }).catch((err) => {
        orders = { status: false, response: err };
    })
    return orders;
}
const getOrderItemsByID = async (id) => {
    let result;
    await OrderItemModel.findOne({ _id: id }).then((data) => {
        console.log('data is: ', data);
        result = { status: true, response: data };
    }).catch((err) => {
        result = { status: false, response: err };
    })
    return result;
}
module.exports = { addAnOrderItem, getAllOrderItems, getOrderItemsByID };