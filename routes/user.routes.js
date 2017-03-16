var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require("../config/config");

var UsersController = require("./controllers/users.controller");


router.route("/signup")
    .post(UsersController.signup);

router.route("/login")
    .post(UsersController.login);

router.use(function(req, res, next){
    var token = req.body.token || req.body.query || req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded){
            if (err) {
                res.json({success: false, message: "Token invalid"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({success: false, message: "No token provided"});
    }
});

router.route("/me")
    .post(function(req, res){
        res.send(req.decoded);
    });

module.exports = router;