
module.exports = function(app) 
{

	var path = require('path');
	var Pusher = require('pusher');
	var chatCollection = require('../app/models/ChatGlobal');
	var usuarioCollection = require('../app/models/Usuario');

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

		var nuevo = new chatCollection(
		{
			Usuario: req.body.Usuario,
			Mensaje: req.body.Mensaje,
			Fecha  : Date.Now,
		});

		console.log("Guardar");
		console.log(nuevo);
		
		nuevo.save(function (error, chat) 
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


	app.get('/api/Usuario',function(req,res)
	{
		usuarioCollection.find(function (err, usuarios) 
		{
			if (err)
				res.status(500).send('Error en la base de datos');
			else
				res.status(200).json(usuarios);
		});
	});


	app.post('/api/Usuario',function(req,res)
	{
		console.log("Agregar un usuario ");
		console.log(req.body);

        usuarioCollection.findOne({Usuario : req.body.Usuario}, function (err, registro) 
	    {
	        if (!registro)
	        {

				var nuevo = new usuarioCollection(
				{
					Usuario: req.body.Usuario
				});

				nuevo.save(function (error, usuario) 
				{
					if (error) {
						res.status(500).send('No se ha podido agregar.');
					}
					else 
					{
						pusher.trigger('chat_global', 'ListaUsuarios', usuario);
						res.status(200).json({_id: usuario._id});
					}
				});
	        }
	        else
	        {                
	            console.log('Usuario ya existe',registro);
	           res.status(404).jsonp('Ya existe un usuario con el mismo nombre.');
	        }
	    });
 
	});

	app.delete('/api/Usuario',function(req,res)
	{
		console.log("Eliminar al usuario");
		console.log(req.query.Usuario);

		usuarioCollection.findOne({Usuario : req.query.Usuario}, function (err, registro) 
		{
			if (err)
				res.status(500).send('Error en la base de datos');
			else
			{
				if (registro)
				{
					console.log("Eliminar usuario");
					console.log(registro);

					registro.remove(function(error, result)
					{
						if (error)
							res.status(500).send('hubo un error en la base de datos');
						else
						{
							console.log("Disparar evento de usuario eliminado");
							pusher.trigger('chat_global', 'CerrarSesion', registro);
							res.status(200).json({_id: registro._id});
						}
					});
				}
				else
					res.status(404).send('Usuario no encontrado');
            }

		});
	});
 
	 
	 
	app.get('*', function(req, res) 
	{
		res.sendFile(path.join(__dirname,'..','public','index.html'));
	});

};

