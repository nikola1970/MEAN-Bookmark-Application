(function(){

    var MainController = function(UsersFactory, $location, $timeout, $rootScope){

        var self = this;

        $rootScope.$on("$routeChangeStart", function(){
            if (UsersFactory.isLoggedIn()) {
                console.log("Success: User is logged in!");
                UsersFactory.getUser().then(function(data) {
                    self.user = data.data.username;
                });
            } else {
                console.log("Failure: User is not logged in!");
                self.user = "";
                $location.path("/login");
            }
        });

        this.logout = function(){
            UsersFactory.logout();
            $timeout(function(){
                $location.path("/");
            }, 1500);
        };


    };

    MainController.$inject = ["UsersFactory", "$location", "$timeout", "$rootScope"];

    angular.module("bookmarkApp").controller("MainController", MainController);



}());