(function(){

    var BookmarkFactory = function($routeParams, $http){
        
        var self = this;
        
        var bookmarksGetAll = function(user){
            return $http.get("/bookmarks/?user=" + user); // saljem usera kroz query string i hvatam ga na serveru
        };
        
        var findBookmark = function(id) {
            return $http.get("/bookmarks/bookmark/" + id);
        };

        var addBookmark = function(newBookmark){
            return $http.post("/bookmarks", newBookmark);
        };
        
        var editBookmark = function(id, editedBookmark){
            return $http.put("/bookmarks/bookmark/" + id, editedBookmark);
        };

        var deleteBookmark = function(id){
            return $http.delete("/bookmarks/bookmark/" + id);
        };
        
        
        return {
            bookmarksGetAll: bookmarksGetAll,
            editBookmark: editBookmark,
            deleteBookmark: deleteBookmark,
            addBookmark: addBookmark,
            findBookmark: findBookmark
        };
    };

    BookmarkFactory.$inject = ["$routeParams", "$http"];

    angular.module("bookmarkApp").factory("BookmarkFactory", BookmarkFactory);


}());
