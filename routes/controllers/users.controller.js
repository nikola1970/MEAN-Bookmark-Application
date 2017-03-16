var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var config = require("../../config/config");



module.exports.signup = function(req, res){


    // form validation
    if (!req.body.username) {
        return res.json({success: false, message: "Please enter your username"});
    } else if (!req.body.password) {
        return res.json({success: false, message: "Please enter your password"});
    } else if (req.body.password !== req.body.repeatPassword) {
        return res.json({success: false, message: "Passwords did not match"});
    } else if (!req.body.email) {
        return res.json({success: false, message: "Please enter your email"});
    }

    // prepare a user for saving
    var user = new User(req.body);

    // hash the password
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

    // save user to databse
    user.save(function(err, user){
        if (err) {
            res.json({success: false, message: "Username or Email already in use, or Email is not valid"});
        } else {
            res.status(201).json({success: true, message: "User " + user.username + " created"});
        }
    });

};


module.exports.login = function(req, res){

    // find user provided
    User.findOne({username: req.body.username}).exec(function(err, user){
        if (err) {
            res.status(400).json(err);
        } else if (!user) { // if no user found in db
            res.json({success: false, message: "User not found"});
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.sign({username: user.username}, config.secret, {expiresIn: "24h"});
                res.status(200).json({success: true, message: user.username + " successfully logged in", token: token});
            } else {
                res.json({success: false, message: "Wrong password"});
            }
        }
    });
};