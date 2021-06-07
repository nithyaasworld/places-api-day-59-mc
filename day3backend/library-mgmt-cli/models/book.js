const mongoose = require("mongoose");
const URLShortenerSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
    required: true,
    },
    shortener: {
        type: string,
        unique: true,
        required: true,
    },
}, {timestamps: true});

const BookModel = new mongoose.model('Book', BookSchema);
module.exports = BookModel;