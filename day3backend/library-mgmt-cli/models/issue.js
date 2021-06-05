const mongoose = require("mongoose");
const IssueSchema = new mongoose.Schema({
    bookRef: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        required: true,
    },
    memberRef: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Member',
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true});
const IssueModel = new mongoose.model('Issue', IssueSchema);
module.exports = IssueModel;