 
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var path     	   = require('path');
var methodOverride = require('method-override');
 
var db = require('./config/db');

 
mongoose.connect(db.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() 
{
    console.log('Conexion a mongoDB.');
});

var port = process.env.PORT || 3000;  


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname,'public')));


require('./app/routes')(app);


app.listen(port);	
console.log('Iniciado en el puerto ' + port);
exports = module.exports = app;