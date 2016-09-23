
angular.module('chatService', []).factory('Chat', ['$http', function($http) {


	var agregar = function (comentario) 
	{
		return $http.post("/api/chatGlobal", comentario);
	};

	var obtener = function ()
	{
		return $http(
		{
			method : "GET",
			url : "/api/chatGlobal"
		});
	};

	return {
		agregarComentarioGlobal: agregar,
		obtenerComentariosGlobales: obtener
	};
}]);