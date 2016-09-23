var app = angular.module('MainCtrl', []);


app.controller("mainController", ['$scope',function ($scope) 
{

	$scope.Username = localStorage.getItem('Username');

	$scope.ShowSpinner=false;
	
    $scope.Aceptar =function()
    {
    	//if($scope.ShowSpinner)
    	//return;
 
    	localStorage.setItem('Username', $scope.Username);

    	//$scope.ShowSpinner=true;
    	window.location = '/chatear'; 
    	
    }
}]);