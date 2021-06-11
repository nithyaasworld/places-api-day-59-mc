const mongoose = require("mongoose");
const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: {
        type: Array,
    },
},{timestamps: true});

const PizzaModel = new mongoose.model('Pizza', PizzaSchema);
module.exports = PizzaModel;