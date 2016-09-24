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

        Chat.EliminarAlCerrarSesion($scope.Username).then(function(response) 
            {
                console.log(response.data);
                console.log("Actualizar lista");

                //var indice = $scope.ListaUsuarios.indexOf(response.data);
                //$scope.ListaUsuarios.splice(indice, 1);
                //$scope.CargarUsuarios();
            },function(response) 
            {
                $scope.MostrarMensaje=true;
                $scope.Mensaje="Error al obtener eliminar." 
            });

        $scope.Username="";
        localStorage.setItem('Username', $scope.Username);
        $scope.CargarUsuarios();
    }

    $scope.CargarChats = function()
    {
        $scope.Username = localStorage.getItem('Username');
        $scope.limpiar();
        console.log("usuario:" +$scope.Username);

        Chat.obtenerComentariosGlobales().then(function(response) 
            {
                $scope.Chats = response.data;
            },function(response) 
            {
                $scope.MostrarMensaje=true;
                $scope.Mensaje="Error al obtener chats." 
            });
    }

    $scope.CargarUsuarios=function()
    {
        Chat.obtenerUsuariosLogueados().then(function(response) 
        {
            $scope.Usuarios = response.data;
        },function(response) 
        {
            $scope.MostrarMensaje=true;
            $scope.Mensaje="Error al obtener chats." 
        });
    }


    channel.bind('Comentarios', function(comentario) 
    {
        $scope.Chats.push(comentario);
    });

    channel.bind('ListaUsuarios', function(usuario) 
    {
        $scope.Usuarios.push(usuario);
    });

    channel.bind('CerrarSesion', function(usuario) 
    {
        console.log("Un usuario cerro sesion") 
        var indice = $scope.Usuarios.indexOf(usuario.Usuario);
        $scope.Usuarios.splice(indice, 1);     
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




    $scope.Inicializar = function()
    {
        $scope.CargarChats();
        $scope.CargarUsuarios();
    }

    $scope.Inicializar();

}]);