var app = angular.module('chatCtrl', ['chatService', 'pusher-angular']);

app.controller("chatController", ['$scope', '$pusher', 'Chat', function($scope, $pusher, Chat) 
{
 

    var client = new Pusher('250c3c0240f861733482', 
    {
        encrypted: true
    });

    var pusher = $pusher(client);
    var channel = pusher.subscribe('chat_global');

    $scope.limpiar = function() 
    {
        $scope.MostrarMensaje=false;
        $scope.Mensaje=""

        $scope.chat = 
        {
            Mensaje: "",
            Usuario: $scope.Username,
        };
    } 

    $scope.Salir =function()
    {
        $scope.Username="";
        localStorage.setItem('Username', $scope.Username);
    }

    function CargarChats() 
    {
        $scope.Username = localStorage.getItem('Username');
        $scope.limpiar();

        Chat.obtenerComentariosGlobales().then(function(response) 
            {
                $scope.Chats = response.data;
            },function(response) 
            {
                $scope.MostrarMensaje=true;
                $scope.Mensaje="Error al obtener chats." 
            });
    }

    CargarChats();

    channel.bind('Comentarios', function(comentario) 
    {
        $scope.Chats.push(comentario);
    });

    $scope.Comentar = function() 
    { 
        $scope.MostrarMensaje=false;
        $scope.Mensaje="";

        console.log($scope.Username );

        if(!$scope.Username  || ($scope.Username  !=null && $scope.Username .length < 2)) 
        {
            $scope.MostrarMensaje=true;
            $scope.Mensaje="Debe autenticarse antes de comentar."
            return;
        }

        Chat.agregarComentarioGlobal($scope.chat)
            .then(function(response) 
            {
                $scope.limpiar();
            }, function(response) 
            {
                $scope.MostrarMensaje=true;
                $scope.Mensaje="No se pudo agregar el comentario." 
            });
    };

}]);