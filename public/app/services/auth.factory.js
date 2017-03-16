(function(){

    var AuthFactory = function($window){

        var setToken = function(token){
            $window.localStorage.setItem("token", token);
        };

        var getToken = function(token){
            return $window.localStorage.getItem("token");
        };

        var deleteToken = function(){
            $window.localStorage.removeItem("token");
        };

        return {
            setToken: setToken,
            getToken: getToken,
            deleteToken: deleteToken
        }

    };

    AuthFactory.$inject = ["$window"];

    angular.module("bookmarkApp").factory("AuthFactory", AuthFactory);


}());
