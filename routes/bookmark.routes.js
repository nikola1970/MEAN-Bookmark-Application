var express = require("express");
var router = express.Router();

var BookmarksController = require("./controllers/bookmarks.controller");

router.route("/")
    .get(BookmarksController.getAllBookmarks)
    .post(BookmarksController.addBookmark);

router.route("/bookmark/:id")
    .get(BookmarksController.findBookmark)
    .put(BookmarksController.editBookmark)
    .delete(BookmarksController.deleteBookmark);

module.exports = router;
