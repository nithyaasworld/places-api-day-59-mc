const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Address" }],
    },
  },
  { timestamps: true }
);

const UserModel = new mongoose.model("User", UserSchema);
module.exports = UserModel;
