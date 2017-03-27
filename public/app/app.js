(function(){

    config.$inject = ["$routeProvider", "$httpProvider", "$locationProvider"];
    run.$inject = ["$location", "UsersFactory", "$rootScope"];

    angular.module("bookmarkApp", ["ngRoute", "ngAnimate", "toastr"]).config(config).run(run);

    function run($location, UsersFactory, $rootScope) {
        $rootScope.$on("$routeChangeStart", function(event, next, current){
            if (next.$$route.authenticated) {
               if (!UsersFactory.isLoggedIn()) {
                   event.preventDefault();
                   $location.path("/login");
               }
            } else if (!next.$$route.authenticated) {
                if (UsersFactory.isLoggedIn()) {
                    event.preventDefault();
                    $location.path("/");
                }
            }
        });
    }

    function config($routeProvider, $httpProvider, $locationProvider) {

        $httpProvider.interceptors.push("Interceptor");

        $routeProvider
            .when("/", {
                templateUrl: "./app/templates/home.html",
                authenticated: true
            })
            .when("/login", {
                templateUrl: "./app/templates/login.html",
                controller: "LoginController",
                controllerAs: "login",
                authenticated: false
            })
            .when("/signup", {
                templateUrl: "./app/templates/signup.html",
                controller: "SignupController",
                controllerAs: "signup",
                authenticated: false
            })
            .when("/logout", {
                templateUrl: "./app/templates/logout.html",
                authenticated: false
            })
            .otherwise({
                redirectTo: "/"
            });

            // $locationProvider.html5Mode({
            //     enabled: true,
            //     requireBase: false
            // });
        
    }

}());
