(function(){

    var UsersFactory = function($http, AuthFactory, $q){

        var self = this;

        var login = function(user){
            return $http.post("/users/login", user).then(function(response){
                AuthFactory.setToken(response.data.token);
                return response;
            }).catch(function(err){
                console.log(err);
            });
        };

        var signup = function(user){
            return $http.post("/users/signup", user).then(function(response){
                return response;
            }).catch(function(err){
                console.log(err);
            });
        };

        var isLoggedIn = function(){
           return !!AuthFactory.getToken();
        };

        var logout = function(){
            AuthFactory.deleteToken();
        };

        var getUser = function(){
            if (AuthFactory.getToken()) {
                return $http.post("/users/me");
            } else {
                $q.reject({message: "User has no token"});
            }
        };

        return {
            login: login,
            signup: signup,
            isLoggedIn: isLoggedIn,
            logout: logout,
            getUser: getUser
        }
    };

    UsersFactory.$inject = ["$http", "AuthFactory", "$q"];

    angular.module("bookmarkApp").factory("UsersFactory", UsersFactory);


}());
