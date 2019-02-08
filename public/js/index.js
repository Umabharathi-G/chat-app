var socket = io();

socket.on('connect', function() {    // listen to 'connect' event
	console.log('Connected to server');

	socket.emit('createMessage', {
		to: 'Stefanos',
		text: 'haii'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});
	

socket.on('newMessage', function(message) {
	console.log('New message', message);
});