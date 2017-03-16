var mongoose = require('mongoose');
var Bookmark = mongoose.model("Bookmark");


module.exports.getAllBookmarks = function(req, res){

    if (req.query.user) {
        Bookmark.find({createdBy: req.query.user}).exec(function(err, bookmarks){ // hvatamo usera kojeg smo poslali kao query param
            if (err) {
                res.json({success: false, message: "Error getting bookmarks from the database..."});
            } else if (!bookmarks) {
                res.status(200).json({success: true, message: "No bookmarks found in the databse!"});
            } else {
                res.status(200).json({success: true, bookmarks: bookmarks});
            }
        });
    } else {
        res.status(404).json({message: "FUCK OFF!"});
    }

};

module.exports.addBookmark = function(req, res){

    var bookmark = new Bookmark({
        address: req.body.address,
        name: req.body.name,
        createdBy: req.body.createdBy,
        createDate: Date.now()
    });

    bookmark.save(function(err, bookmark){
        if (err) {
            res.json({success: false, message: "Error while saving a bookmark into the databse"});
        } else {
            res.status(200).json({success: true, message: "Bookmark " + bookmark.name + " has been created", bookmark: bookmark});
        }
    });
};

module.exports.editBookmark = function(req, res){

    var id = req.params.id;

    Bookmark.findById(id, function(err, bookmark){
        if (err) {
            res.json({success: false, message: "Error finding a bookmark"});
        } else {
            bookmark.address = req.body.address;
            bookmark.name = req.body.name;

            bookmark.save(function(err, editedBookmark){
                if (err) {
                    res.json({success: false, message: "Error saving the bookmark"});
                } else {
                    res.status(200).json({success: true, message: "Bookmark " + editedBookmark.name + " successfuly edited"});
                }
            });
        }
    });
};

module.exports.findBookmark = function(req, res){

    var id = req.params.id;

    Bookmark.findById(id, function(err, bookmark){
        if (err) {
            throw err;
        } else if (!bookmark) {
            res.status(200).json({success: false, message: "No bookmark with this ID found"});
        } else {
            res.status(200).json({success: true, bookmark: bookmark});
        }
    });

};


module.exports.deleteBookmark = function(req, res){
    var id = req.params.id;
    // posalji usera sa requestom i proveri da li je isti kada dobije query nazad of findByIdAndRemove
    Bookmark.findByIdAndRemove(id, function(err, bookmark){
        if (err) {
            res.json({success: false, message: "Failed to delete this bookmark"});
        } else {
            res.status(200).json({success: true, message: "Bookmark " + bookmark.name + " successfully deleted"});
        }
    });
};


