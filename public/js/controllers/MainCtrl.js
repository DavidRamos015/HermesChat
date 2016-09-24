// var app = angular.module('MainCtrl', ['chatService']);
var app = angular.module('MainCtrl', ['chatService', 'pusher-angular']);

// app.controller("mainController", ['$scope','Chat',function ($scope,Chat) 
app.controller("mainController", ['$scope', '$pusher', 'Chat', function($scope, $pusher, Chat) 
{

    $scope.Inicializar=function()
    {
        $scope.ShowSpinner=false;

        $scope.Login = 
        {
            Usuario: localStorage.getItem('Username'),
        };
    }
	


	
    $scope.Aceptar =function()
    {
    	//if($scope.ShowSpinner)
    	//return;
 
    	localStorage.setItem('Username', $scope.Login.Usuario);

        Chat.agregarUsuarioLogin($scope.Login)
            .then(function(response) 
            {
                window.location = '/chatear'; 
            }, function(response) 
            {
                $scope.MostrarMensaje=true;
                $scope.Mensaje="Error al momento de iniciar." 
                alert("No se pudo autenticar " + response.data);
            });

    	//$scope.ShowSpinner=true;
    }

    $scope.Inicializar();

}]);

