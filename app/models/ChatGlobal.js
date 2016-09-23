
var mongoose = require('mongoose');

module.exports = mongoose.model('ChatGlobal', 
{
	
    Usuario: String,
    Mensaje: String,
    Fecha: {type: Date}
});
