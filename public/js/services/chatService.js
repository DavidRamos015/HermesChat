
angular.module('chatService', []).factory('Chat', ['$http', function($http) {


	var agregarComentarioChatGlobal = function (comentario) 
	{
		return $http.post("/api/chatGlobal", comentario);
	};

	var obtenerChatsGlobales = function ()
	{
		return $http(
		{
			method : "GET",
			url : "/api/chatGlobal"
		});
	};

	var agregarUsuario = function (usuario) 
	{
		return $http.post("/api/Usuario", usuario);
	};

	var eliminarUsuario = function (usuario) 
	{
		return $http.delete("/api/Usuario?Usuario="+usuario);
	};

	var obtenerListaUsuariosLogueados = function ()
	{
		return $http(
		{
			method : "GET",
			url : "/api/Usuario"
		});
	};

	return {
		agregarComentarioGlobal: agregarComentarioChatGlobal,
		obtenerComentariosGlobales: obtenerChatsGlobales,
		agregarUsuarioLogin: agregarUsuario,
		obtenerUsuariosLogueados: obtenerListaUsuariosLogueados,
		EliminarAlCerrarSesion: eliminarUsuario,
	};
}]);

