
module.exports = function(app) 
{

	var path = require('path');
	var Pusher = require('pusher');
	var chatCollection = require('../app/models/ChatGlobal');

	var pusher = new Pusher(
	{
	  appId: '244989',
	  key: '250c3c0240f861733482',
	  secret: 'c8735e3ab7247814ba71',
	  encrypted: true
	});

	app.get('/api/chatGlobal',function(req,res)
	{
		chatCollection.find(function (err, chats) 
		{
			if (err)
				res.status(500).send('Error en la base de datos');
			else
				res.status(200).json(chats);
		});
	});
	 
	app.post('/api/chatGlobal',function(req,res)
	{	
		console.log("Agregar chat");
		console.log(req.body);

		var nueva = new chatCollection(
		{
			Usuario: req.body.Usuario,
			Mensaje: req.body.Mensaje,
			Fecha  : Date.Now,
		});

		console.log("Guardar");
		console.log(nueva);
		
		nueva.save(function (error, chat) 
		{
			if (error) {
				res.status(500).send('No se ha podido agregar.');
			}
			else 
			{
				pusher.trigger('chat_global', 'Comentarios', chat);
				res.status(200).json({_id: chat._id});
			}
		});
	});
	 
	 
	app.get('*', function(req, res) 
	{
		res.sendFile(path.join(__dirname,'..','public','index.html'));
	});

};