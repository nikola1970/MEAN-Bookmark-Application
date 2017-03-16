(function(){

    var SignupController = function(UsersFactory, toastr, $location, $timeout){

        var self = this;
        this.success = true;
        this.responseMessage = "";

        this.emptyFields = function() {
            self.user.username = "";
            self.user.password = "";
            self.user.email = "";
            self.user.repeatPassword = "";
        };

        this.signup = function(){
            UsersFactory.signup(self.user).then(function(user){
                if (user.data.success) {
                    toastr.success(user.data.message);
                    self.emptyFields();
                    self.responseMessage = "";
                    $timeout(function(){
                        $location.path("/login");
                    }, 1500);
                } else {
                    self.success = false;
                    self.responseMessage = user.data.message;
                }
            }).catch(function(err){
                console.log(err);
            });
        };

    };

    SignupController.$inject = ["UsersFactory", "toastr", "$location", "$timeout"];

    angular.module("bookmarkApp").controller("SignupController", SignupController);

}());