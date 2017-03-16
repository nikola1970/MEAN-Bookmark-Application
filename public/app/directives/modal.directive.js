(function(){

    var ModalDirective = function(){
        return {
            templateUrl: "./app/templates/modal.directive.html",
            restrict: "E",
            replace: true
        }
    };


    angular.module("bookmarkApp").directive("modal", ModalDirective);



}());
