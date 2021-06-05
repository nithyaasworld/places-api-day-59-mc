const mongoose = require("mongoose");
const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    memberID: {
        type: Number,
        default: Date.now,
    },
}, {timestamps: true});
const MemberModel = new mongoose.model('Member', MemberSchema);
module.exports = MemberModel;