(function(){

    var TableController = function($http, BookmarkFactory, UsersFactory, toastr){

        var self = this;
        this.modalVisible = false;

        function loadAllBookmarks() {
            UsersFactory.getUser().then(function (user) {
                self.user = user.data.username;
                BookmarkFactory.bookmarksGetAll(self.user).then(function (response) {
                    if (!response.data.success) { // ako je error sa database
                        self.success = false;
                        toastr.error(response.data.message);
                    } else {
                        if (response.data.bookmarks.length == 0) {
                            toastr.warning("No bookmarks found in the database");
                            self.success = false;
                            self.bookmarks = [];
                        } else {
                            self.success = true;
                            self.bookmarks = response.data.bookmarks;
                            for (var x in self.bookmarks) {
                                self.bookmarks[x].createDate = new Date(self.bookmarks[x].createDate).getTime();
                            }
                        }
                    }
                });
            });
        };

        loadAllBookmarks();

        this.addBookmark = function(){
            var newBookmark = {
                name: self.name,
                address: self.address,
                createdBy: self.user
            };
            BookmarkFactory.addBookmark(newBookmark).then(function(response){
                if (!response.data.success) {
                    self.success = false;
                    toastr.error(response.data.message);
                } else {
                    self.success = true;
                    toastr.success(response.data.message);
                    self.name = "";
                    self.address = "";
                    loadAllBookmarks();
                }
            });
        };

        this.openModal = function(id){
            BookmarkFactory.findBookmark(id).then(function(response){
                self.id = id;
                if (!response.data.success) {
                    toastr.warning(response.data.message);
                } else {
                    self.bookmarkNameToEdit = response.data.bookmark.name;
                    self.bookmarkAddressToEdit = response.data.bookmark.address;
                    self.modalVisible = !self.modalVisible;
                }
            });
        };

        this.closeModal = function(){
            self.modalVisible = !self.modalVisible;
        };

        this.editBookmark = function(){
            var editedBookmark = {
                name: self.bookmarkNameToEdit,
                address: self.bookmarkAddressToEdit
            }
            BookmarkFactory.editBookmark(self.id, editedBookmark).then(function(response){
                if (!response.data.success) {
                    self.success = false;
                    toastr.error(response.data.message);
                } else {
                    self.success = true;
                    toastr.success(response.data.message);
                    self.closeModal();
                    loadAllBookmarks();
                }
            });
        };

        this.deleteBookmark = function(id){
            BookmarkFactory.deleteBookmark(id).then(function(response){
                if (!response.data.success) {
                    self.success = false;
                    toastr.error(response.data.message);
                } else {
                    self.success = true;
                    toastr.success(response.data.message);
                    loadAllBookmarks();
                }
            });
        };


    };

    TableController.$inject = ["$http", "BookmarkFactory", "UsersFactory", "toastr"];

    angular.module("bookmarkApp").controller("TableController", TableController);


}());