require("./db/db");

var express = require("express");
var bodyParser = require("body-parser");

var userRoutes = require("./routes/user.routes");
var bookmarkRoutes = require("./routes/bookmark.routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// app.use("/bookmarks", bookmarkRoutes);
app.use("/users", userRoutes);
app.use("/bookmarks", bookmarkRoutes);


app.listen(port, function(){
    console.log("Express is running!");
});