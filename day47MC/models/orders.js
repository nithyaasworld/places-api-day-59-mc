const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
        required: true,
        default: Date.now,
    },
    pizza: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }, 
    quantity: {
        type: Number,
        required: true,
    },
},{timestamps: true});

const OrderModel = new mongoose.model('Category', OrderSchema);
module.exports = OrderModel;