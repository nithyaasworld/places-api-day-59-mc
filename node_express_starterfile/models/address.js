const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema(
  {
    // city, pincode, state, country, addressLine1, addressLine2, label
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AddressModel = new mongoose.model("Address", AddressSchema);
module.exports = AddressModel;
