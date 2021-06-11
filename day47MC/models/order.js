const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    orderItem: {
        type: Array,
        required: true,
    }, 
},{timestamps: true});

const OrderModel = new mongoose.model('Order', OrderSchema);
module.exports = OrderModel;