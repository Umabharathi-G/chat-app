const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  //web socket server for emit and listen

app.use(express.static(publicPath));

io.on('connection', (socket) => {  //io.on -> register an event, connection -> event
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'Uma',
		text: 'Go stefanos',
		createdAt: new Date().getTime()
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	});
});

server.listen(port, () => {
	console.log(`Server is up and running on ${port}`);

});