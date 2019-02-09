const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const {generateMessage, generateLocMsg} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  //web socket server for emit and listen

app.use(express.static(publicPath));

io.on('connection', (socket) => {  //io.on -> register an event, connection -> event
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined')); //broadcast -> send msg to every other user except sender
			
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});

	socket.on('createMessage', (msg,callback) => {
		console.log('createMessage', msg);

		io.emit('newMessage', generateMessage(msg.from, msg.text));
		callback();
	});


	socket.on('createLocMsg', (coords) => {
		io.emit('newLocMsg', generateLocMsg('User', coords.latitude,coords.longitude));
	});
});

server.listen(port, () => {
	console.log(`Server is up and running on ${port}`);

});