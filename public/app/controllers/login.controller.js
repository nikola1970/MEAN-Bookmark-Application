(function(){

    var LoginController = function(UsersFactory, toastr, $location, $timeout){

        var self = this;
        this.success = true;
        this.responseMessage = "";

        this.login = function(){
            UsersFactory.login(self.user).then(function(user){
               if (user.data.success) {
                   toastr.success(user.data.message);
                   self.user.username = "";
                   self.user.password = "";
                   self.responseMessage = "";
                   $timeout(function(){
                       $location.path("/")
                   }, 1500);
               } else {
                   self.success = false;
                   self.responseMessage = user.data.message;
                   self.user.username = "";
                   self.user.password = "";
               }
            }).catch(function(err){
                console.log(err);
            });
        };

    };

    LoginController.$inject = ["UsersFactory", "toastr", "$location", "$timeout"];

    angular.module("bookmarkApp").controller("LoginController", LoginController);

}());