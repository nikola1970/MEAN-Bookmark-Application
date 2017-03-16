var db = require("../config/config");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(db.dbname);

mongoose.connection.on("connected", function(){
    console.log("Connected to the database " + db.dbname);
});

mongoose.connection.on("error", function(err){
    console.log("Connection error: " + err);
});

mongoose.connection.on("disconnected", function(){
    console.log("Disconnected from the databse");
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Disconnected through app terminator");
        process.exit(0);
    });
});

require("./models/users.model");
require("./models/bookmarks.model");