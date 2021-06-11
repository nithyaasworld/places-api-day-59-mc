const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orders: {
        type: [{ type : mongoose.SchemaTypes.ObjectId, ref: 'OrderItem' }],
        required: true,
    }, 
},{timestamps: true});

const OrderModel = new mongoose.model('Orders', OrderSchema);
module.exports = OrderModel;