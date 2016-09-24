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
            // templateUrl: 'views/chatGlobal.html',
            templateUrl: 'views/chatGlobal.html',
            controller: 'chatController'
        })
        .when('/chatPrivado', 
        {
            // templateUrl: 'views/chatGlobal.html',
            templateUrl: 'views/chatPrivado.html',
            controller: 'chatController'
        }) ;

        $locationProvider.html5Mode(true);
}]);