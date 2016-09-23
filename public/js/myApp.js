var app = angular.module('myApp', ['ngRoute','MainCtrl','chatCtrl']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) 
{
    $routeProvider
        .when('/', 
        {
            templateUrl: 'views/login.html',
            controller: 'mainController'
        }) 
        .when('/chatear', 
        {
            templateUrl: 'views/chatPrivado.html',
            controller: 'chatController'
        }) ;

        $locationProvider.html5Mode(true);
}]);