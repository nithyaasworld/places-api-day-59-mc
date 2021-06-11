const mongoose = require("mongoose");
const OrderItemSchema = new mongoose.Schema({
    pizza: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Pizza',
    }, 
    quantity: {
        type: Number,
        required: true,
    },
},{timestamps: true});

const OrderItemModel = new mongoose.model('OrderItem', OrderItemSchema);
module.exports = OrderItemModel;