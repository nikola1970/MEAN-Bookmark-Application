(function(){

    config.$inject = ["$routeProvider", "$httpProvider", "$locationProvider"];

    angular.module("bookmarkApp", ["ngRoute", "ngAnimate", "toastr"]).config(config);

    function config($routeProvider, $httpProvider, $locationProvider) {



        $httpProvider.interceptors.push("Interceptor");

        $routeProvider
            .when("/", {
                templateUrl: "./app/templates/home.html"
            })
            .when("/login", {
                templateUrl: "./app/templates/login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .when("/signup", {
                templateUrl: "./app/templates/signup.html",
                controller: "SignupController",
                controllerAs: "signup"
            })
            .when("/logout", {
                templateUrl: "./app/templates/logout.html"
            })
            .otherwise({
                redirecTo: "/"
            });

            $locationProvider.html5Mode(true);
        
    }

}());
