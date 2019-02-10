const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const {generateMessage, generateLocMsg} = require('./utils/message');
const {isString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);  //web socket server for emit and listen
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {  //io.on -> register an event, connection -> event
	console.log('New user connected');

			
	socket.on('join', (params, callback) => {
		if (!isString(params.name) || !isString(params.room)){
			return callback('Name and Room name required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`)); //broadcast -> send msg to every other user except sender
		callback();
	});

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}
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