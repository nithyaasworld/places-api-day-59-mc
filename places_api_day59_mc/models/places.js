const mongoose = require("mongoose");
const PlacesSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const PlacesModel = new mongoose.model('Places', PlacesSchema);
module.exports = PlacesModel; 