var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var less = require('less-middleware');
var validator = require('validator');

app.set('view engine', 'jade');
app.set('views', './views');

app.use(less('./public'));
app.use(express.static('./public'));

app.get('/', function(req, res) {
	res.render('chat');
});

io.on('connection', function(socket) {
	console.log('new connection from ' + socket.handshake.address);
	socket.on('message', function(message) {
		var escaped_message = {
			content: '',
			username: ''
		};
		escaped_message.content = validator.escape(message.content);
		escaped_message.username = validator.escape(message.username);
		io.emit('message', escaped_message);
	});
});

server.listen(3000);
