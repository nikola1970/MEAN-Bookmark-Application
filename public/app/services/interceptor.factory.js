(function(){

    var Interceptor = function(AuthFactory){

        var request = function(config) {

            var token = AuthFactory.getToken();

            if (token) {
                config.headers["x-access-token"] = token;
            }

            return config;
        };

        return {
            request: request
        }

    };

    Interceptor.$inject = ["AuthFactory"];

    angular.module("bookmarkApp").factory("Interceptor", Interceptor);


}());
