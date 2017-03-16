var mongoose = require("mongoose");

var BookmarkSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});


mongoose.model("Bookmark", BookmarkSchema);