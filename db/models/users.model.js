var mongoose = require("mongoose");
var validator = require("validator");


var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        min: 5,
        required: true,
        unique: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email address"],
        required: true,
        unique: true
    }
});


mongoose.model("User", UserSchema);